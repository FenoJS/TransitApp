import React from 'react';
import { Map as MapContainer } from 'react-leaflet';
import { Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

let numMapClicks = 0;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.popup = React.createRef();
    this.state = {
      mapStyle: {
        height: 'calc(100vh - 70px)',
        width: '100%',
      },
      mapPosition: [52.229675, 21.01223],
      startMarkerCord: null,
      finishMarkerCord: null,
    };
  }

  getLatLng = e => {
    console.log(e.latlng);
  };

  popupHandler = e => {
    this.getLatLng(e);
  };

  closePopusOnClick = e => {
    console.log(e.target);
    this.popup.current.leafletElement.options.leaflet.map.closePopup();

    this.setState({
      [e.target.id]: this.state.popup.position,
    });
  };

  addPopup = e => {
    this.setState({
      popup: {
        key: numMapClicks++,
        position: e.latlng,
      },
    });
  };

  addMarker = () => {};

  updateLatLng = e => {
    console.log(e.target._latlng);
  };

  render() {
    const {
      popup,
      mapPosition,
      mapStyle,
      startMarkerCord,
      finishMarkerCord,
    } = this.state;
    console.log(popup);

    return (
      <MapContainer
        center={mapPosition}
        zoom={13}
        style={mapStyle}
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
            <button onClick={this.closePopusOnClick} id="startMarkerCord">
              Ustaw lokalizację początkową
            </button>
            <button onClick={this.closePopusOnClick} id="finishMarkerCord">
              Ustaw lokalizację docelową
            </button>
          </Popup>
        )}
        {startMarkerCord && (
          <Marker
            position={startMarkerCord}
            draggable={true}
            onDragEnd={this.updateLatLng}
          ></Marker>
        )}
        {finishMarkerCord && (
          <Marker
            position={finishMarkerCord}
            draggable={true}
            onMove={this.updateLatLng}
          ></Marker>
        )}
      </MapContainer>
    );
  }
}

export default Map;
