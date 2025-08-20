//@ts-nocheck

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ data }:any) => {
    const coordinates = data?.filter(
        coord =>
          coord.latitude !== null &&
          coord.latitude !== '' &&
          coord.longitude !== null &&
          coord.longitude !== ''
      );

  const defaultPosition = coordinates.length > 0 ? [coordinates[0].latitude, coordinates[0].longitude] : [0, 0];

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            attribution="Tiles &copy; Carto"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={[coord.latitude, coord.longitude]}>
          <Popup>
            {`Latitude: ${coord.latitude}, Longitude: ${coord.longitude}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>

  );
};

export default MapComponent;
