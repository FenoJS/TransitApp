import React from 'react';

import logo from '../assets/images/logo.png';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <nav className="nav"></nav>
    </div>
  );
};

export default Header;
