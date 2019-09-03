import React from 'react';
import RoutingForm from './RoutingForm';

import styles from './RoutingPanel.module.css';

const RoutingPanel = props => {
  return (
    <div className={styles.panel}>
      <RoutingForm
        handleDirections={props.handleDirections}
        startDirection={props.startDirection}
        goalDirection={props.goalDirection}
      />
    </div>
  );
};

export default RoutingPanel;
