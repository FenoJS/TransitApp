import React from 'react';
import RoutingForm from './RoutingForm';

import styles from './RoutingPanel.module.css';

const RoutingPanel = () => {
  return (
    <div className={styles.panel}>
      <RoutingForm />
    </div>
  );
};

export default RoutingPanel;
