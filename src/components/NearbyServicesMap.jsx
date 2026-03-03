import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function NearbyServicesMap() {
  const position = [20.5937, 78.9629];

  return (
    <section className="nearby-services-section">
      <h3>📍 Nearby Agricultural Services</h3>

      <MapContainer center={position} zoom={5} style={{ height: "450px" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>📍 Default Location (India)</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

export default NearbyServicesMap;
