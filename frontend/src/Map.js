import React, { Component } from 'react';
import { Map as MapContainer } from 'react-leaflet';
import { Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

let numMapClicks = 0;

const mapRootStyles = {
  height: 'calc(100vh - 70px)',
  width: '100%',
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.popup = React.createRef();
    this.state = {
      startMarkerCords: null,
      goalMarkerCords: null,
    };
  }

  getLatLng = e => {
    console.log(e.latlng);
  };

  popupHandler = e => {
    this.getLatLng(e);
  };

  handleMarkersPosition = e => {
    this.setState({
      [e.target.id]: this.state.popup.position,
    });
  };

  closePopusOnClick = e => {
    console.log(e.target);
    this.popup.current.leafletElement.options.leaflet.map.closePopup();

    this.handleMarkersPosition(e);
  };

  addPopup = e => {
    this.setState({
      popup: {
        position: e.latlng,
      },
    });
  };

  addMarker = () => {};

  updateLatLng = e => {
    console.log(e.target._latlng);
  };

  componentDidUpdate(prevState) {
    if (
      this.state.startMarkerCords !== prevState.startMarkerCords &&
      this.state.goalMarkerCords !== prevState.goalMarkerCords
    ) {
      console.log('startMarkerCords or goalMarkerCords has changed');
      this.props.handleMarkersCord();
    }
  }

  render() {
    const { popup, startMarkerCords, goalMarkerCords } = this.state;
    console.log(popup);

    return (
      <MapContainer
        center={this.props.mapPosition}
        zoom={13}
        style={mapRootStyles}
        zoomControl={false}
        onClick={this.addPopup}
        onContextMenu={this.addPopup}
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        />
        {popup && (
          <Popup
            key={`popup-${popup.key}`}
            position={popup.position}
            ref={this.popup}
          >
            <button onClick={this.closePopusOnClick} id="startMarkerCords">
              Ustaw lokalizację początkową
            </button>
            <button onClick={this.closePopusOnClick} id="goalMarkerCords">
              Ustaw lokalizację docelową
            </button>
          </Popup>
        )}
        {startMarkerCords && (
          <Marker
            position={startMarkerCords}
            draggable={true}
            onDragEnd={this.updateLatLng}
          ></Marker>
        )}
        {goalMarkerCords && (
          <Marker
            position={goalMarkerCords}
            draggable={true}
            onMove={this.updateLatLng}
          ></Marker>
        )}
      </MapContainer>
    );
  }
}

export default Map;
