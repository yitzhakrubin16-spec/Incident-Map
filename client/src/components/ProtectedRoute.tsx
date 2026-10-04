import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute