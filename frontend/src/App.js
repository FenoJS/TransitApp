import React, { Component } from 'react';
import Map from './Map';
import Header from './Header';
import RoutingPanel from './RoutingPanel';

//import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPosition: [52.229675, 21.01223],
      startDirectionStreet: '',
      goalDirectionStreet: '',
      startMarkerCords: null,
      goalMarkerCords: null,
    };
  }

  handleMarkersCords = (marker, cords) => {
    console.log('get cords', marker, cords);
    this.setState({
      [marker]: cords,
    });
  };

  render() {
    return (
      <>
        <Header />
        <Map
          mapPosition={this.state.mapPosition}
          handleMarkersCords={this.handleMarkersCords}
          startMarkerCords={this.state.startMarkerCords}
          goalMarkerCords={this.state.goalMarkerCords}
        />
        <RoutingPanel />
      </>
    );
  }
}

export default App;
