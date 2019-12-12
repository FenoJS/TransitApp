import React from 'react';

import CitiesDropdown from './CitiesDropdown';

import logo from '../assets/images/logo.png';
import logoSmall from '../assets/images/logo2.png';
import guestAvatar from '../assets/images/guestAvatar.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      {/* <img src={logo} srcSet={`${logoSmall} 1x, ${logo} 2x`} alt="logo" className={styles.logo} /> */}
      <picture>
        <source media="(max-width: 430px)" srcSet={`${logoSmall} 1x`} />

        <source media="(max-width: 1400px)" srcSet={`${logo} 1x`} />

        <img src={logo} className={styles.logo} alt="App logo" />
      </picture>

      <div className={styles.sideBarWrapper}>
        <CitiesDropdown />
        <div className={styles.loginContainer}>
          <div className={styles.avatarBox}>
            <img src={guestAvatar} alt="user avatar" className={styles.avatar} />
          </div>

          <span className={styles.signIn}>Zaloguj się</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
