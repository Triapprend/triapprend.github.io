"use client"
const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [139.6917, 35.6895],
            [139.7017, 35.6895],
            [139.7017, 35.6995],
            [139.6917, 35.6995],
            [139.6917, 35.6895],
          ],
        ],
      },
      properties: {
        name: "Example Area",
      },
    },
  ],
}

import "leaflet/dist/leaflet.css"
import { GeoJSON, MapContainer, Polygon, TileLayer } from "react-leaflet"

export default function Home() {
  return (
    <>
      <MapContainer
        bounds={[
          [35.6895, 139.6917],
          [35.6995, 139.7017],
        ]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Polygon
          pathOptions={{ color: "red" }}
          positions={[
            [35.6895, 139.6917],
            [35.6895, 139.7017],
            [35.6995, 139.6917],
          ]}
        />
        <Polygon
          pathOptions={{ color: "blue" }}
          positions={[
            [35.6895, 139.6917],
            [35.6945, 139.7017],
            [35.6945, 139.6917],
          ]}
        />
      </MapContainer>
    </>
  )
}
