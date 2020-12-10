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
    const { startMarkerPos, goalMarkerPos } = this.state;

    if (startMarkerPos && goalMarkerPos) {
      const startCords = startMarkerPos;
      const goalCords = goalMarkerPos;
      const queryHour = new Date().getHours();
      const queryMinutes = new Date().getMinutes();
      const currentTime = `
        ${queryHour < 10 ? '0' : ''}${queryHour}:${queryMinutes < 10 ? '0' : ''}${queryMinutes}
        `;

      this.setState({
        isLoading: true,
      });
      const data = await fetch(
        `https://cors-anywhere.herokuapp.com/http://23.102.180.220:8080/otp/routers/default/plan?fromPlace=${startCords}&toPlace=${goalCords}&date=2019-08-26&time=${currentTime}`
      ).then((res) => res.json());

      const routesData = await data.plan.itineraries;
      await this.setState({
        routes: routesData,
        isLoading: false,
      });
    }
  };

  getAddressFromGeocode = async (geocode) => {
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
    await this.setState({
      [markerToUpdate[direction]]: [results[0].y, results[0].x],
      [direction]: address,
    });
    if (this.state.startMarkerPos && this.state.goalMarkerPos) {
      await this.handleRouteSubmit();
    }
  };

  handleRouteToRender = (routeNumber) => {
    this.setState({
      routeToRender: routeNumber,
    });
  };

  render() {
    console.log('render App');

    const {
      mapPosition,
      startMarkerPos,
      goalMarkerPos,
      isLoading,
      routes,
      routeToRender,
      startDirection,
      goalDirection,
    } = this.state;

    return (
      <>
        <Header />
        {isLoading && <LoadingScreen />}
        <Map
          mapPosition={mapPosition}
          handleMarkersCords={this.handleMarkersCords}
          startMarkerPos={startMarkerPos}
          goalMarkerPos={goalMarkerPos}
          startMarkerIcon={startMarkerIcon}
          goalMarkerIcon={goalMarkerIcon}
          isLoading={isLoading}
          route={routes && routes[routeToRender - 1]}
        />
        <RoutingPanel
          getMarkerFromAddress={this.getMarkerFromAddress}
          startDirection={startDirection}
          goalDirection={goalDirection}
          startMarkerIcon={startMarkerIcon}
          goalMarkerIcon={goalMarkerIcon}
          handleRouteSubmit={this.handleRouteSubmit}
          routes={routes}
          handleRouteToRender={this.handleRouteToRender}
          isLoading={isLoading}
        />
      </>
    );
  }
}

export default App;
