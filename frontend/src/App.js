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
      startMarkerCord: null,
      goalMarkerCord: null,
    };
  }

  handleMarkersCord = e => {
    console.log('get cords');
  };

  render() {
    return (
      <>
        <Header />
        <Map
          mapPosition={this.state.mapPosition}
          handleMarkersCord={this.handleMarkersCord}
          startMarkerCord={this.state.startMarkerCord}
          goalMarkerCord={this.state.goalMarkerCord}
        />
        <RoutingPanel />
      </>
    );
  }
}

export default App;
