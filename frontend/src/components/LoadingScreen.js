import React from 'react';

import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingBox}>Loading ...</div>
    </div>
  );
};

export default LoadingScreen;
