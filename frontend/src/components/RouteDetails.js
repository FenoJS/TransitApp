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

  const renderLeaveTime = () => {
    const walkDuration = props.route.legs[0].duration;
    const departureTime = props.route.legs[1].startTime;
    const now = Date.now();
    console.log(now, walkDuration);
    const time =
      new Date(departureTime - now).getMinutes() - Math.ceil(walkDuration / 60);
    return time;
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
            <div className={styles.vehicleNum}>{leg.route}</div>
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
      <div className={styles.routeDeparture}>
        <span>Wyjdź za: </span>
        <div className={styles.departureTime}>{renderLeaveTime()} min</div>
      </div>
      <div className={styles.routeDetailsWrapper}>
        <div className={styles.routeDetails}>
          <div className={styles.vehicles}>{renderVehicles(props.route)}</div>
          <div className={styles.routeDuration}>
            {Math.ceil(props.route.duration / 60)} min
          </div>
        </div>
        <div className={styles.departureDetails}>
          <span className={styles.travelTime}>
            <img className={styles.pedestrianImg} src={pedestrianIcon} alt="" />
            {Math.ceil(props.route.legs[0].duration / 60)} min
          </span>
          <span className={styles.travelStartTime}>
            {new Date(props.route.legs[1].startTime).toString().slice(16, 21)}
          </span>
          <span className={styles.travelTime}>
            {new Date(
              props.route.legs[props.route.legs.length - 2].endTime -
                props.route.legs[1].startTime
            ).getMinutes()}{' '}
            min
          </span>
          <span className={styles.travelEndTime}>
            {new Date(props.route.legs[props.route.legs.length - 2].endTime)
              .toString()
              .slice(16, 21)}
          </span>
          <span className={styles.travelTime}>
            <img className={styles.pedestrianImg} src={pedestrianIcon} alt="" />
            {Math.ceil(
              props.route.legs[props.route.legs.length - 1].duration / 60
            )}{' '}
            min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
