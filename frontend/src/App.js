import React, { Component } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './components/Map';
import Header from './components/Header';
import RoutingPanel from './components/RoutingPanel';
import LoadingScreen from './components/LoadingScreen';

import startMarkerIcon from './assets/images/marker-blue.png';
import goalMarkerIcon from './assets/images/marker-red.png';
import './App.module.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      mapPosition: [52.229675, 21.01223],
      startDirection: '',
      goalDirection: '',
      startMarkerPos: null,
      goalMarkerPos: null,
      routeToRender: 1,
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  handleMarkersCords = async (marker, cords, isDragged) => {
    const address = await this.getAddressFromGeocode(cords);
    const directionToUpdate = {
      startMarkerPos: 'startDirection',
      goalMarkerPos: 'goalDirection',
    };
    await this.setState({
      [marker]: cords,
      [directionToUpdate[marker]]: address,
    });

    if (isDragged && this.state.startMarkerPos && this.state.goalMarkerPos) {
      await this.handleRouteSubmit();
    }
  };

  handleRouteSubmit = async () => {
    if (this.state.startMarkerPos && this.state.goalMarkerPos) {
      const startCords = this.state.startMarkerPos;
      const goalCords = this.state.goalMarkerPos;
      const queryHour = new Date().getHours();
      const queryMinutes = new Date().getMinutes();
      const currentTime = `${
        queryHour < 10 ? '0' : ''
      }${queryHour}:${queryMinutes}`;

      this.setState({
        isLoading: true,
      });
      const data = await fetch(
        `http://34.76.181.57:8080/otp/routers/default/plan?fromPlace=${startCords}&toPlace=${goalCords}&date=2019-08-26&time=${currentTime}`
      ).then(res => res.json());

      const routesData = await data.plan.itineraries;
      await this.setState({
        routes: routesData,
        isLoading: false,
      });
    }
  };

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

  handleRouteToRender = routeNumber => {
    this.setState({
      routeToRender: routeNumber,
    });
  };

  render() {
    console.log('render App');
    return (
      <>
        <Header />
        {this.state.isLoading && <LoadingScreen />}
        <Map
          mapPosition={this.state.mapPosition}
          handleMarkersCords={this.handleMarkersCords}
          startMarkerPos={this.state.startMarkerPos}
          goalMarkerPos={this.state.goalMarkerPos}
          startMarkerIcon={startMarkerIcon}
          goalMarkerIcon={goalMarkerIcon}
          isLoading={this.state.isLoading}
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
          isLoading={this.state.isLoading}
        />
      </>
    );
  }
}

export default App;
