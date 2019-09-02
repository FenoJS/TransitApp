import React, { Component } from 'react';
import { Map as MapContainer } from 'react-leaflet';
import { Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

const mapRootStyles = {
  height: 'calc(100vh - 70px)',
  width: '100%',
};

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

  render() {
    console.log('render Map');
    const { isPopup, popupCords } = this.state;
    const { mapPosition, startMarkerPos, goalMarkerPos } = this.props;
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        />
        {isPopup && (
          <Popup position={popupCords}>
            <button
              type="button"
              onClick={() => this.addMarker('startMarkerPos', popupCords)}
            >
              Ustaw lokalizację początkową
            </button>
            <button
              type="button"
              onClick={() => this.addMarker('goalMarkerPos', popupCords)}
            >
              Ustaw lokalizację docelową
            </button>
          </Popup>
        )}
        {startMarkerPos && (
          <Marker
            position={startMarkerPos}
            draggable
            onDragEnd={e => this.updateMarkerPos('startMarkerPos', e)}
          />
        )}
        {goalMarkerPos && (
          <Marker
            position={goalMarkerPos}
            draggable
            onDragEnd={e => this.updateMarkerPos('goalMarkerPos', e)}
          />
        )}
      </MapContainer>
    );
  }
}

export default Map;
