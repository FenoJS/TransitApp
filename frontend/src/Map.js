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
    this.popup = React.createRef();
    this.state = {
      isPopup: false,
    };
  }

  handleMarkersPosition = e => {
    this.props.handleMarkersCords(e.target.id, this.state.popupCords);
  };

  closePopusOnClick = e => {
    // this.popup.current.leafletElement.options.leaflet.map.closePopup();
    this.setState({
      isPopup: false,
    });
    this.handleMarkersPosition(e);
  };

  togglePopup = e => {
    const isPopup = this.state.isPopup;
    this.setState({
      isPopup: !isPopup,
      popupCords: e.latlng,
    });
  };

  addMarker = () => {};

  updateLatLng = e => {
    console.log(e.target._latlng);
  };

  render() {
    const { isPopup, popupCords } = this.state;
    console.log(this.props);
    return (
      <MapContainer
        center={this.props.mapPosition}
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
          <Popup position={popupCords} ref={this.popup}>
            <button onClick={this.closePopusOnClick} id="startMarkerCords">
              Ustaw lokalizację początkową
            </button>
            <button onClick={this.closePopusOnClick} id="goalMarkerCords">
              Ustaw lokalizację docelową
            </button>
          </Popup>
        )}
        {this.props.startMarkerCords && (
          <Marker
            position={this.props.startMarkerCords}
            draggable={true}
            onDragEnd={this.updateLatLng}
          ></Marker>
        )}
        {this.props.goalMarkerCords && (
          <Marker
            position={this.props.goalMarkerCords}
            draggable={true}
            onMove={this.updateLatLng}
          ></Marker>
        )}
      </MapContainer>
    );
  }
}

export default Map;
