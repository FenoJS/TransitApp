import React from 'react';
import Map from './Map';
import Header from './Header';
import RoutingPanel from './RoutingPanel';

//import styles from './App.module.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Map />
        <RoutingPanel />
      </>
    );
  }
}

export default App;
