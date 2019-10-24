import React, { Component } from 'react';
import L from 'leaflet';
import polyUtil from 'polyline-encoded';

import { Map as MapContainer } from 'react-leaflet';
import { Marker, Popup, TileLayer, ZoomControl, Polyline } from 'react-leaflet';
import { divIcon } from 'leaflet';

import styles from './Map.module.scss';
import './customPopup.css';

const mapRootStyles = {
  height: 'calc(100vh - 70px)',
  width: '100%',
};

const markerIcon = icon =>
  L.icon({
    iconUrl: icon,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopup: false,
    };
  }

  closePopup = () => {
    this.setState({
      isPopup: false,
    });
  };

  togglePopup = e => {
    const { isPopup } = this.state;
    this.setState({
      isPopup: !isPopup,
      popupCords: e.latlng,
    });
  };

  addMarker = (marker, cordsFromPopup) => {
    this.closePopup();
    this.props.handleMarkersCords(marker, cordsFromPopup);
  };

  updateMarkerPos = (marker, e) => {
    this.props.handleMarkersCords(marker, e.target._latlng);
  };

  getPolylines = route => {
    const polylines = route.legs.map(leg => {
      return leg.legGeometry.points;
    });
    console.log(polylines);
    return polylines;
  };

  renderPolylines = polylines => {
    const colors = ['gray', '#73c94e', 'blue', 'red'];
    const poly = polylines.map((polyline, i) => {
      return (
        <Polyline
          positions={polyUtil.decode(polyline)}
          color={colors[i]}
          weight={5}
        />
      );
    });
    return poly;
  };

  renderVehiclesMarkers = route => {
    const markers = route.legs.map(leg => {
      if (leg.mode !== 'WALK') {
        const icon = divIcon({
          className: '',
          html: `<div class=${styles.vehicleNumMarker}>${leg.route}</div>`,
        });
        return <Marker position={[leg.from.lat, leg.from.lon]} icon={icon} />;
      }
    });
    return markers;
  };

  render() {
    console.log('render Map', this.state, this.props);
    const { isPopup, popupCords } = this.state;
    const {
      mapPosition,
      startMarkerPos,
      goalMarkerPos,
      startMarkerIcon,
      goalMarkerIcon,
      route,
    } = this.props;

    // const icon = divIcon({
    //   className: '',
    //   html: `<div class=${styles.vehicleNumMarker}>${route &&
    //     route.legs[1].route}</div>`,
    // });

    // const marker = route && (
    //   <Marker
    //     position={[route.legs[1].from.lat, route.legs[1].from.lon]}
    //     icon={icon}
    //   />
    // );

    return (
      <MapContainer
        center={mapPosition}
        zoom={13}
        style={mapRootStyles}
        zoomControl={false}
        onClick={this.togglePopup}
        onContextMenu={this.togglePopup}
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //   'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        />
        {isPopup && (
          <Popup
            className={'markersPopup'}
            position={popupCords}
            closeButton={false}
            offset={{
              x: 125,
              y: 100,
            }}
          >
            <button
              type="button"
              onClick={() => this.addMarker('startMarkerPos', popupCords)}
            >
              <img className={styles.buttonImg} src={startMarkerIcon} alt="" />
              <span>Ustaw lokalizację początkową</span>
            </button>
            <button
              type="button"
              onClick={() => this.addMarker('goalMarkerPos', popupCords)}
            >
              <img className={styles.buttonImg} src={goalMarkerIcon} alt="" />
              <span>Ustaw lokalizację docelową</span>
            </button>
          </Popup>
        )}
        {startMarkerPos && (
          <Marker
            icon={markerIcon(startMarkerIcon)}
            position={startMarkerPos}
            draggable
            onDragEnd={e => this.updateMarkerPos('startMarkerPos', e)}
          />
        )}
        {goalMarkerPos && (
          <Marker
            icon={markerIcon(goalMarkerIcon)}
            position={goalMarkerPos}
            draggable
            onDragEnd={e => this.updateMarkerPos('goalMarkerPos', e)}
          />
        )}
        {route && this.renderPolylines(this.getPolylines(route))}
        {route && this.renderVehiclesMarkers(route)}
      </MapContainer>
    );
  }
}

export default Map;
