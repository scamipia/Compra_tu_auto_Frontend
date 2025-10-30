import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role!!)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
