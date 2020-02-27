import React from 'react';

import convertUnixToMinutes from '../utils/convertUnixToMinutes';
import formatTimer from '../utils/formatTimer';

import styles from './RouteDetails.module.scss';
import busIcon from '../assets/images/bus.png';
import tramIcon from '../assets/images/tram.png';
import subwayIcon from '../assets/images/subway.png';
import pedestrianIcon from '../assets/images/man.png';

const RouteDetails = props => {
  const handleHover = number => {
    props.handleRouteToRender(number);
  };

  const renderLeaveTime = () => {
    const walkDuration = props.route.legs[0].duration;
    const departureTime = props.route.legs[1].startTime;
    const now = Date.now();

    const departureTimeinMinutes = convertUnixToMinutes(departureTime);
    const currentTimeinMinutes = convertUnixToMinutes(now);

    const minutesToLeave = departureTimeinMinutes - currentTimeinMinutes;
    const totalHours = Math.floor(minutesToLeave / 60);
    const minutesToDisplay = minutesToLeave % 60;

    return formatTimer(minutesToDisplay, totalHours, walkDuration);
  };

  const renderVehicles = route => {
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
            <div className={styles.vehicleNum}>{leg.route}</div>
          </>
        );
      }
    });
    return vehicles;
  };

  const { route } = props;
  const { legs, duration } = route;
  return (
    <div className={styles.routeContainer} onMouseOver={() => handleHover(props.routeNumber)}>
      <div className={styles.routeDeparture}>
        <span>Wyjdź za: </span>
        <div className={styles.departureTime}>{renderLeaveTime()}</div>
      </div>
      <div className={styles.routeDetailsWrapper}>
        <div className={styles.routeDetails}>
          <div className={styles.vehicles}>{renderVehicles(route)}</div>
          <div className={styles.routeDuration}>
            {Math.ceil(duration / 60)}
            min
          </div>
        </div>
        <div className={styles.departureDetails}>
          <span className={styles.travelTime}>
            <img className={styles.pedestrianImg} src={pedestrianIcon} alt="" />
            {Math.ceil(legs[0].duration / 60)}
            min
          </span>
          <span className={styles.travelStartTime}>
            {new Date(legs[1].startTime).toString().slice(16, 21)}
          </span>
          <span className={styles.travelTime}>
            {new Date(legs[legs.length - 2].endTime - legs[1].startTime).getMinutes()} min
          </span>
          <span className={styles.travelEndTime}>
            {new Date(legs[legs.length - 2].endTime).toString().slice(16, 21)}
          </span>
          <span className={styles.travelTime}>
            <img className={styles.pedestrianImg} src={pedestrianIcon} alt="" />
            {Math.ceil(legs[legs.length - 1].duration / 60)}
            min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
