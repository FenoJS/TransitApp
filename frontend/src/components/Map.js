import React, { Component } from 'react';
import L from 'leaflet';
import polyUtil from 'polyline-encoded';

import { Map as MapContainer } from 'react-leaflet';
import { Marker, Popup, TileLayer, ZoomControl, Polyline } from 'react-leaflet';
import { divIcon } from 'leaflet';

import busIcon from '../assets/images/bus.png';
import tramIcon from '../assets/images/tram.png';
import subwayIcon from '../assets/images/subway.png';

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

  updateDraggedMarkerPos = (marker, e) => {
    this.props.handleMarkersCords(marker, e.target._latlng, true);
  };

  renderPolylines = route => {
    const colors = ['#6fa7de', '#f48a8b', '#89cc6c', '#d21d7a'];
    let j = 0;
    let color;
    let dash;
    const poly = route.legs.map((leg, i) => {
      if (leg.mode !== 'WALK') {
        color = colors[j];
        j++;
      }
      if (leg.mode === 'WALK') {
        color = 'gray';
      }

      return (
        <Polyline
          positions={polyUtil.decode(leg.legGeometry.points)}
          color={color}
          weight={5}
          dashArray={leg.mode === 'WALK' && (5, 10)}
          key={Date.now() / 1000 + i}
        />
      );
    });
    return poly;
  };

  renderVehiclesMarkers = route => {
    const markers = route.legs.map(leg => {
      if (leg.mode !== 'WALK') {
        const img = {
          bus: busIcon,
          tram: tramIcon,
          subway: subwayIcon,
          rail: subwayIcon,
        };
        const icon = divIcon({
          className: '',
          html: `<div class=${styles.markerContainer}><img src=${
            img[leg.mode.toLowerCase()]
          } class=${styles.vehicleImg} alt=""/>
          <span class=${styles.vehicleNum}>${leg.route}</span></div>`,
        });
        return <Marker position={[leg.from.lat, leg.from.lon]} icon={icon} />;
      }
    });
    return markers;
  };

  render() {
    const { isPopup, popupCords } = this.state;
    const {
      mapPosition,
      startMarkerPos,
      goalMarkerPos,
      startMarkerIcon,
      goalMarkerIcon,
      route,
    } = this.props;

    const bounds = L.latLngBounds([startMarkerPos, goalMarkerPos]);
    const boundsZoomedOut = startMarkerPos && bounds.pad(0.5);

    return (
      <MapContainer
        center={mapPosition}
        zoom={13}
        style={mapRootStyles}
        zoomControl={false}
        onClick={this.togglePopup}
        onContextMenu={this.togglePopup}
        bounds={startMarkerPos && goalMarkerPos && boundsZoomedOut}
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png" //   'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
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
            onDragEnd={e => this.updateDraggedMarkerPos('startMarkerPos', e)}
          />
        )}
        {goalMarkerPos && (
          <Marker
            icon={markerIcon(goalMarkerIcon)}
            position={goalMarkerPos}
            draggable
            onDragEnd={e => this.updateDraggedMarkerPos('goalMarkerPos', e)}
          />
        )}
        {route && !this.props.isLoading && this.renderPolylines(route)}
        {route && !this.props.isLoading && this.renderVehiclesMarkers(route)}
      </MapContainer>
    );
  }
}

export default Map;
