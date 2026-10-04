import { useEffect, useState } from "react"
import { getIncidents } from "../services/incident.service"
import { useAuthStore } from "../store/authStore"

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
  
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    async function loadIncidents() {
      if(!token) return

      const response = await getIncidents(token)

      setIncidents(response.data)
    }

    loadIncidents()
  }, [token])
  
  return (
    <div>
      <h1>Incident Map</h1>

      {incidents.map((incident) => (
        <p key={incident.id}>
          {incident.title}
        </p>
      ))}
    </div>
  )
}

export default MapPage