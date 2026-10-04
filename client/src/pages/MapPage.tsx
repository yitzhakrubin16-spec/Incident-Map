import { useEffect, useState,  type SubmitEvent } from "react"
import { getIncidents, createIncident } from "../services/incident.service"
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
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<
    "fire" | "flood" | "accident" | "medical" | "other"
  >("other")
  const [filterCategory, setFilterCategory] = useState("")
  const [error, setError] = useState("")

  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    async function loadIncidents() {
      if (!token) return

      const response = await getIncidents(
        token,
        filterCategory || undefined
      )

      setIncidents(response.data)
    }

    loadIncidents()
  }, [token, filterCategory])
  
  async function handleCreateIncident(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!token || !selectedLocation) return

    try {
      const response = await createIncident(token, {
        title,
        description,
        category,
        location: selectedLocation
      })
      if (!filterCategory || response.data.category === filterCategory) {
        setIncidents((current) => [...current, response.data])
      }

      setTitle("")
      setDescription("")
      setCategory("other")
      setSelectedLocation(null)
      setError("")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  return (
    <div>
      <h1>Incident Map</h1>

      <select value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="fire">Fire</option>
        <option value="flood">Flood</option>
        <option value="accident">Accident</option>
        <option value="medical">Medical</option>
        <option value="other">Other</option>
      </select>
      {selectedLocation && (
        <form onSubmit={handleCreateIncident}>
          <input type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          />

          <textarea placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />

          <select 
          value={category}
          onChange={(e) => 
          setCategory(
            e.target.value as 
            | "fire" 
            | "flood"
            | "accident"
            | "medical"
            | "other"
            )}>

              <option value="fire">Fire</option>
              <option value="flood">Flood</option>
              <option value="accident">Accident</option>
              <option value="medical">Medical</option>
              <option value="other">Other</option>
          </select>

          <button type="submit">Create Incident</button>
          {error && <p>{error}</p>}
        </form>
      )}

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