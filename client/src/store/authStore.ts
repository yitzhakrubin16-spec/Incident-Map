import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
    id: string
    email: string
    role: "user" | "admin"
    createdAt: string
}

type AuthState = {
    token: string | null
    user: User | null
    login: (user: User, token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            login: (user, token) => {
                set({user, token})
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                })
            },
        }),
        {
            name: "auth-storage"
        },
    ),
)