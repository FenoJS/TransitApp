import React, { Component } from 'react';
import Map from './Map';
import Header from './Header';
import RoutingPanel from './RoutingPanel';

import { OpenStreetMapProvider } from 'leaflet-geosearch';

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

    return `${address.road ? address.road : geoString} ${
      address.house_number ? address.house_number : ''
    }`;
  };

  handleDirections = (direction, value) => {
    this.setState({
      [direction]: value,
    });
  };

  getMarkerFromAddress = address => {};

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
          handleDirections={this.handleDirections}
          startDirection={this.state.startDirection}
          goalDirection={this.state.goalDirection}
        />
      </>
    );
  }
}

export default App;
