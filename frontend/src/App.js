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

  componentDidUpdate(prevProps, prevState) {
    console.log(
      'did update',
      prevState.startMarkerPos,
      this.state.startMarkerPos
    );
    if (
      JSON.stringify(prevState.startMarkerPos) !==
      JSON.stringify(this.state.startMarkerPos)
    ) {
      console.log('test');
      this.setState({
        startDirection: 'test street name',
      });
    }
    if (prevState.startDirection !== this.state.startDirection) {
      console.log('test');
      this.setState({
        startMarkerPos: { lat: 52.23274103614767, lng: 20.991783142084847 },
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
