import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [8.7244041, 77.7350118]; // Vehicle location coordinates

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Vehicle Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
