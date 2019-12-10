import React from 'react';

import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingBox}>
        <span className={styles.loading}>Loading</span>
        <div className={`${styles.dot} ${styles.dotOne}`}>.</div>
        <div className={`${styles.dot} ${styles.dotTwo}`}>.</div>
        <div className={`${styles.dot} ${styles.dotThree}`}>.</div>
        <div className={`${styles.dot} ${styles.dotFour}`}>.</div>
        <div className={`${styles.dot} ${styles.dotFive}`}>.</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
