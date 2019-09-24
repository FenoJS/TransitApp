import React from 'react';

import styles from './RouteDetails.module.scss';

const RouteDetails = props => {
  const handleHover = number => {
    props.handleRouteToRender(number);
    console.log('hovered', number);
  };
  return (
    <div
      className={styles.route}
      onMouseOver={() => handleHover(props.routeNumber)}
    >
      {props.route.duration}
    </div>
  );
};

export default RouteDetails;
