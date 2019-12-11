import React from 'react';
import RoutingForm from './RoutingForm';
import RoutingDetails from './RoutingDetails';

import styles from './RoutingPanel.module.scss';

const RoutingPanel = props => {
  const {
    getMarkerFromAddress,
    startDirection,
    goalDirection,
    startMarkerIcon,
    goalMarkerIcon,
    handleRouteSubmit,
    isLoading,
    routes,
    handleRouteToRender,
  } = props;
  return (
    <div className={styles.panel}>
      <RoutingForm
        getMarkerFromAddress={getMarkerFromAddress}
        startDirection={startDirection}
        goalDirection={goalDirection}
        startMarkerIcon={startMarkerIcon}
        goalMarkerIcon={goalMarkerIcon}
        handleRouteSubmit={handleRouteSubmit}
        isLoading={isLoading}
      />

      {routes && (
        <RoutingDetails routes={routes} handleRouteToRender={handleRouteToRender}></RoutingDetails>
      )}
    </div>
  );
};

export default RoutingPanel;
