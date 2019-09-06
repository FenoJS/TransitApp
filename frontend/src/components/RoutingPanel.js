import React from 'react';
import RoutingForm from './RoutingForm';

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
      />
    </div>
  );
};

export default RoutingPanel;
