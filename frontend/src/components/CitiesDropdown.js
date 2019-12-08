import React, { useState } from 'react';

import styles from './CitiesDropdown.module.scss';

const CitiesDropdown = () => {
  const cities = ['Gdańsk', 'Kraków', 'Łodź', 'Poznań', 'Warszawa'];

  const [selectedCity, setCity] = useState('Warszawa');
  const [isOpen, toggleMenu] = useState(false);

  const handleToggle = () => {
    toggleMenu(isOpen ? false : true);
  };

  const handleDropdownList = item => {
    setCity(item);
    handleToggle();
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.menu} ${isOpen ? styles.menuArrowUp : null}`}
        onClick={() => handleToggle()}
      >
        <span className={styles.ddInfo}>Wybierz miasto:</span>
        <span className={styles.selectedItem}>{selectedCity}</span>
      </div>
      {isOpen && (
        <ul className={styles.ddList}>
          {cities.map(city => (
            <li
              className={styles.ddItem}
              onClick={e => handleDropdownList(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitiesDropdown;
