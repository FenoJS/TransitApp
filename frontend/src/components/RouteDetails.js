import React from 'react';

import styles from './RouteDetails.module.scss';
import busIcon from '../assets/images/bus.png';
import tramIcon from '../assets/images/tram.png';
import subwayIcon from '../assets/images/subway.png';
import pedestrianIcon from '../assets/images/man.png';

const RouteDetails = props => {
  const handleHover = number => {
    props.handleRouteToRender(number);
    console.log('hovered', number);
  };

  const renderVehicles = route => {
    console.log(route);
    const vehicles = route.legs.map(leg => {
      if (leg.mode !== 'WALK') {
        const icons = {
          bus: busIcon,
          tram: tramIcon,
          subway: subwayIcon,
          rail: subwayIcon,
        };
        return (
          <>
            <img
              className={styles.vehicleImg}
              src={icons[leg.mode.toLowerCase()]}
              alt={leg.mode.toLowerCase()}
            />
            <span className={styles.vehicleNum}>{leg.route}</span>
          </>
        );
      }
    });
    return vehicles;
  };
  return (
    <div
      className={styles.routeContainer}
      onMouseOver={() => handleHover(props.routeNumber)}
    >
      <div className={styles.routeDepartureBox}>
        Wyjdź o: {props.route.duration}
      </div>
      <div className={styles.routeDetailsBox}>
        <div className={styles.vehicles}>{renderVehicles(props.route)}</div>
        <div className={styles.routeDuration}>{props.route.duration}</div>
      </div>
    </div>
  );
};

export default RouteDetails;
