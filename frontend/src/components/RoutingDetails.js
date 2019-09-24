import React from 'react';
import RouteDetails from './RouteDetails';

import styles from './RoutingDetails.module.scss';

const RoutingDetails = props => {
  return (
    <div className={styles.detailsWrapper}>
      {props.routes.map((route, index) => {
        return (
          <RouteDetails
            route={route}
            key={index}
            routeNumber={index + 1}
            handleRouteToRender={props.handleRouteToRender}
          />
        );
      })}
    </div>
  );
};

export default RoutingDetails;
