const API_URL = import.meta.env.VITE_API_URL

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