import React from 'react';

import CitiesDropdown from './CitiesDropdown';

import logo from '../assets/images/logo.png';
import guestAvatar from '../assets/images/guestAvatar.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.sideBarWrapper}>
        {/* <div className={styles.placeholderfordropdowncomponent}>Warszawa</div> */}
        <CitiesDropdown />
        <div className={styles.loginContainer}>
          <div className={styles.avatarBox}>
            <img
              src={guestAvatar}
              alt="user avatar"
              className={styles.avatar}
            />
          </div>

          <span className={styles.signIn}>Zaloguj się</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
