import React, { Component } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './Map';
import Header from './Header';
import RoutingPanel from './RoutingPanel';

//import styles from './App.module.css';

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
        />
        <RoutingPanel
          getMarkerFromAddress={this.getMarkerFromAddress}
          startDirection={this.state.startDirection}
          goalDirection={this.state.goalDirection}
        />
      </>
    );
  }
}

export default App;
