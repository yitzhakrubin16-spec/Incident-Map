const API_URL = import.meta.env.VITE_API_URL

export async function loginRequest(email:string, password:string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }
    
    return data
}