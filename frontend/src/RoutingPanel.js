import React from 'react';
import RoutingForm from './RoutingForm';

import styles from './RoutingPanel.module.css';

const RoutingPanel = props => {
  return (
    <div className={styles.panel}>
      <RoutingForm
        getMarkerFromAddress={props.getMarkerFromAddress}
        startDirection={props.startDirection}
        goalDirection={props.goalDirection}
      />
    </div>
  );
};

export default RoutingPanel;
