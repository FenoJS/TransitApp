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

  handleMarkersCords = (marker, cords) => {
    console.log('get cords', marker, cords);
    this.setState({
      [marker]: cords,
    });
  };

  handleDirections = (direction, value) => {
    this.setState({
      [direction]: value,
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
    console.log(
      results[0].raw.address.road,
      results[0].raw.address.house_number
    );

    return results[0].raw.address.road;
    //console.log(results);
  };

  async componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   'did update',
    //   prevState.startMarkerPos,
    //   this.state.startMarkerPos
    // );
    // if (
    //   JSON.stringify(prevState.startMarkerPos) !==
    //   JSON.stringify(this.state.startMarkerPos)
    // ) {
    //   console.log('test');
    //   this.setState({
    //     startDirection: 'test street name',
    //   });
    // }
    if (prevState.startMarkerPos !== this.state.startMarkerPos) {
      console.log('test');
      const address = await this.getAddressFromGeocode(
        this.state.startMarkerPos
      );
      await this.setState({
        startDirection: address,
      });
    }
  }

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
        />
      </>
    );
  }
}

export default App;
