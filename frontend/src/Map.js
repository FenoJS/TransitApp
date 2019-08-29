import React, { useEffect } from 'react';
import L from 'leaflet';

const Map = () => {
  const style = {
    height: '100vh',
    width: '100%',
  };

  useEffect(() => {
    const mymap = L.map('mapid').setView([52.229675, 21.01223], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
    }).addTo(mymap);
  }, []);

  return <div id="mapid" style={style}></div>;
};

export default Map;
