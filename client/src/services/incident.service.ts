const API_URL = import.meta.env.VITE_API_URL

type CreateIncidentData = {
    title: string
    description: string
    category: "fire" | "flood" | "accident" | "medical" | "other"
    location: {
        lat: number
        lng: number
    }
}

export async function getIncidents(token: string) {
    const response = await fetch(`${API_URL}/incidents`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}


export async function createIncident(
    token: string,
    incidentData: CreateIncidentData
) {
    const response = await fetch(`${API_URL}/incidents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(incidentData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}