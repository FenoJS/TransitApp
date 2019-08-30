import React from 'react';
import { Map as MapContainer } from 'react-leaflet';
import { Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

const Map = () => {
  const style = {
    height: 'calc(100vh - 70px)',
    width: '100%',
  };

  const position = [52.229675, 21.01223];

  return (
    <MapContainer center={position} zoom={13} style={style} zoomControl={false}>
      <ZoomControl position="topright" />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      />
    </MapContainer>
  );
};

export default Map;
