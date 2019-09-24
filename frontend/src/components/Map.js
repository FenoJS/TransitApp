import React, { Component } from 'react';
import L from 'leaflet';
import polyUtil from 'polyline-encoded';

import { Map as MapContainer } from 'react-leaflet';
import { Marker, Popup, TileLayer, ZoomControl, Polyline } from 'react-leaflet';

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
    console.log(poly);
    // this.setState({
    //   polylines: true,
    // });
    return poly;
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
    } = this.props;
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
            className={'custom'}
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
        {this.props.route &&
          this.renderPolylines(this.getPolylines(this.props.route))}
      </MapContainer>
    );
  }
}

export default Map;
