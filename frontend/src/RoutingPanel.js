import React from 'react';

const RoutingPanel = () => {
  const style = {
    position: 'absolute',
    left: '30px',
    top: '100px',
    height: '500px',
    width: '400px',
    backgroundColor: 'darkgrey',
    opacity: '0.5',
    zIndex: 9999,
  };
  return <div style={style}></div>;
};

export default RoutingPanel;
