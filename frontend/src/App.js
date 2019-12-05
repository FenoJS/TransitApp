import React, { Component } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Map from "./components/Map";
import Header from "./components/Header";
import RoutingPanel from "./components/RoutingPanel";

import startMarkerIcon from "./assets/images/marker-blue.png";
import goalMarkerIcon from "./assets/images/marker-red.png";
import "./App.module.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPosition: [52.229675, 21.01223],
      startDirection: "",
      goalDirection: "",
      startMarkerPos: null,
      goalMarkerPos: null,
      routeToRender: 1
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  handleMarkersCords = async (marker, cords) => {
    const address = await this.getAddressFromGeocode(cords);
    const directionToUpdate = {
      startMarkerPos: "startDirection",
      goalMarkerPos: "goalDirection"
    };
    await this.setState({
      [marker]: cords,
      [directionToUpdate[marker]]: address
    });
  };

  handleRouteSubmit = async () => {
    console.log("submited");
    const startCords = this.state.startMarkerPos;
    const goalCords = this.state.goalMarkerPos;
    console.log(startCords, goalCords);
    const data = await fetch(
      `http://34.76.181.57:8080/otp/routers/default/plan?fromPlace=${startCords}&toPlace=${goalCords}&date=2019-08-26`
    ).then(res => res.json());

    const routesData = data.plan.itineraries;
    console.log("routesData", routesData);
    this.setState({
      routes: routesData
    });
  };
  // fromPlace=52.27315,21.06302&toPlace=52.25513,21.03436

  getAddressFromGeocode = async geocode => {
    const provider = new OpenStreetMapProvider({
      params: {
        addressdetails: 1
      }
    });
    const { lat, lng } = geocode;
    const results = await provider.search({
      query: [lat, lng]
    });

    const { address, lat: lat_x, lon: lng_y } = results[0].raw;
    const geoString = `${lat_x}, ${lng_y}`;

    // if there is no address show geocode
    return `${address.road ? address.road : geoString} ${
      address.house_number ? address.house_number : ""
    }`;
  };

  getMarkerFromAddress = async (address, direction) => {
    const provider = new OpenStreetMapProvider({
      params: {
        addressdetails: 1
      }
    });
    const results = await provider.search({
      query: `${address} ${"Warszawa, Mazowieckie"}`
    });
    const markerToUpdate = {
      startDirection: "startMarkerPos",
      goalDirection: "goalMarkerPos"
    };
    this.setState({
      [markerToUpdate[direction]]: [results[0].y, results[0].x],
      [direction]: address
    });
  };

  handleRouteToRender = routeNumber => {
    console.log("update number");
    this.setState({
      routeToRender: routeNumber
    });
  };

  render() {
    console.log("render App");
    return (
      <>
        <Header />
        <Map
          mapPosition={this.state.mapPosition}
          handleMarkersCords={this.handleMarkersCords}
          startMarkerPos={this.state.startMarkerPos}
          goalMarkerPos={this.state.goalMarkerPos}
          startMarkerIcon={startMarkerIcon}
          goalMarkerIcon={goalMarkerIcon}
          route={
            this.state.routes && this.state.routes[this.state.routeToRender - 1]
          }
        />
        <RoutingPanel
          getMarkerFromAddress={this.getMarkerFromAddress}
          startDirection={this.state.startDirection}
          goalDirection={this.state.goalDirection}
          startMarkerIcon={startMarkerIcon}
          goalMarkerIcon={goalMarkerIcon}
          handleRouteSubmit={this.handleRouteSubmit}
          routes={this.state.routes}
          handleRouteToRender={this.handleRouteToRender}
        />
      </>
    );
  }
}

export default App;
