import React from 'react';
import RouteDetails from './RouteDetails';

const RoutingDetails = props => {
  return props.routes.map(route => {
    return <RouteDetails route={route}></RouteDetails>;
  });
};

export default RoutingDetails;
