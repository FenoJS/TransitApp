import React from 'react';
import RoutingForm from './RoutingForm';
import RoutingDetails from './RoutingDetails';

import styles from './RoutingPanel.module.scss';

const RoutingPanel = props => {
  return (
    <div className={styles.panel}>
      <RoutingForm
        getMarkerFromAddress={props.getMarkerFromAddress}
        startDirection={props.startDirection}
        goalDirection={props.goalDirection}
        startMarkerIcon={props.startMarkerIcon}
        goalMarkerIcon={props.goalMarkerIcon}
        handleRouteSubmit={props.handleRouteSubmit}
      />

      {props.routes && <RoutingDetails routes={props.routes}></RoutingDetails>}
    </div>
  );
};

export default RoutingPanel;
