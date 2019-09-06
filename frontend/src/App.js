import React, { Component } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './components/Map';
import Header from './components/Header';
import RoutingPanel from './components/RoutingPanel';

import startMarkerIcon from './assets/images/marker-blue.png';
import goalMarkerIcon from './assets/images/marker-red.png';
import './App.module.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPosition: [52.229675, 21.01223],
      startDirection: '',
      goalDirection: '',
      startMarkerPos: null,
      goalMarkerPos: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  handleMarkersCords = async (marker, cords) => {
    const address = await this.getAddressFromGeocode(cords);
    const directionToUpdate = {
      startMarkerPos: 'startDirection',
      goalMarkerPos: 'goalDirection',
    };
    await this.setState({
      [marker]: cords,
      [directionToUpdate[marker]]: address,
    });
  };

  handleRouteSubmit = async () => {
    console.log('submited');
    const startCords = this.state.startMarkerPos;
    const goalCords = this.state.goalMarkerPos;
    console.log(startCords, goalCords);
    const data = await fetch(
      `http://localhost:8080/otp/routers/default/plan?fromPlace=${startCords}&toPlace=${goalCords}&date=2019-08-26&time=12:00`
    ).then(res => res.json());
    console.log(data.plan.itineraries);
    const testPolylineData = data.plan.itineraries[0].legs.map(leg => {
      return leg.legGeometry.points;
    });
    console.log(testPolylineData);
    this.setState({
      polylines: testPolylineData,
    });
  };
  // fromPlace=52.27315,21.06302&toPlace=52.25513,21.03436
  getAddressFromGeocode = async geocode => {
    const provider = new OpenStreetMapProvider({
      params: {
        addressdetails: 1,
      },
    });
    const { lat, lng } = geocode;
    const results = await provider.search({
      query: [lat, lng],
    });

    const { address, lat: lat_x, lon: lng_y } = results[0].raw;
    const geoString = `${lat_x}, ${lng_y}`;

    // if there is no address show geocode
    return `${address.road ? address.road : geoString} ${
      address.house_number ? address.house_number : ''
    }`;
  };

  getMarkerFromAddress = async (address, direction) => {
    const provider = new OpenStreetMapProvider({
      params: {
        addressdetails: 1,
      },
    });
    const results = await provider.search({
      query: `${address} ${'Warszawa, Mazowieckie'}`,
    });
    const markerToUpdate = {
      startDirection: 'startMarkerPos',
      goalDirection: 'goalMarkerPos',
    };
    this.setState({
      [markerToUpdate[direction]]: [results[0].y, results[0].x],
      [direction]: address,
    });
  };

  render() {
    console.log('render App');
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
          polylines={this.state.polylines && this.state.polylines}
        />
        <RoutingPanel
          getMarkerFromAddress={this.getMarkerFromAddress}
          startDirection={this.state.startDirection}
          goalDirection={this.state.goalDirection}
          startMarkerIcon={startMarkerIcon}
          goalMarkerIcon={goalMarkerIcon}
          handleRouteSubmit={this.handleRouteSubmit}
        />
      </>
    );
  }
}

export default App;
