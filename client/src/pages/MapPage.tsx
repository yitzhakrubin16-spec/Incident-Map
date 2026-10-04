import { useEffect, useState } from "react"
import { getIncidents } from "../services/incident.service"
import { useAuthStore } from "../store/authStore"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MapClickHandler from "../components/MapClickHandler"

type Incident = {
  id: string
  title: string
  description: string
  category: "fire" | "flood" | "accident" | "medical" | "other"
  status: "open" | "in_progress" | "closed"
  location: {
    lat: number
    lng: number
  }
  createdBy: string
  createdAt: string
  updatedAt: string
}

function MapPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    async function loadIncidents() {
      if (!token) return

      const response = await getIncidents(token)

      setIncidents(response.data)
    }

    loadIncidents()
  }, [token])
  
  return (
    <div>
      <h1>Incident Map</h1>

      <MapContainer
      center={[32.0853, 34.7818]}
      zoom={12}
      style={{height: "500px", width:"100%"}}
      >
        <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler 
        onMapClick={(lat, lng) => {
          setSelectedLocation({ lat, lng })
        }}
        />
        {incidents.map((incident) => (
          <Marker
          key={incident.id}
          position={[incident.location.lat, incident.location.lng]}
          >
            <Popup>
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>
              <p>{incident.category}</p>
              <p>{incident.status}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapPage