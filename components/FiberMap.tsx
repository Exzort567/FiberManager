"use client";
import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// ✅ Define Fiber Type
interface Fiber {
  fiberID: string;
  status: string;
  installationDate: string;
  coordinates: { lat: number; lng: number }[];
  connectedTo: string;
}

export default function FiberMap() {
  const [fibers, setFibers] = useState<Fiber[]>([]);

  useEffect(() => {
    fetch("https://fibermanager.onrender.com") // ✅ Replace with your actual Render backend URL
      .then((res) => res.json())
      .then((data: Fiber[]) => setFibers(data));
  }, []);
  

  return (
    <MapContainer
      center={[9.9111, 124.0934]} // ✅ Center on your location (Canmaya Diot)
      zoom={16} // ✅ Closer zoom for better detail
      className="h-screen w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {fibers.map((fiber) => (
        <Polyline
          key={fiber.fiberID}
          positions={fiber.coordinates.map(coord => [coord.lat, coord.lng] as [number, number])}
          pathOptions={{ color: fiber.status === "Running" ? "green" : "red" }}
        >
          <Popup>
            <h2>Fiber Code: {fiber.fiberID}</h2>
            <p>Status: {fiber.status}</p>
            <p>Installed: {fiber.installationDate}</p>
            <p>Connected to: {fiber.connectedTo}</p>
          </Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
}
