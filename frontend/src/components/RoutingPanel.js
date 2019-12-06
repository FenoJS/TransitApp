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
        isLoading={props.isLoading}
      />

      {props.routes && (
        <RoutingDetails
          routes={props.routes}
          handleRouteToRender={props.handleRouteToRender}
        ></RoutingDetails>
      )}
    </div>
  );
};

export default RoutingPanel;
