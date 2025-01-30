"use client"

import "leaflet/dist/leaflet.css"
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet"

const MyMap = ({ geojsonData }: { geojsonData: any }) => {
  return (
    <>
      <MapContainer
        center={[35.6895, 139.6917]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={geojsonData} />
      </MapContainer>
    </>
  )
}

export default MyMap
