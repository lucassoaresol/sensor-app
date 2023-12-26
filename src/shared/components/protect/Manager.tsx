import { useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../contexts'

export const ProtectedManager = () => {
  const { userProfile } = useAuthContext()

  const isAcess = useMemo(() => {
    if (userProfile?.role === 'MANAGER' || userProfile?.role === 'ADMIN')
      return true
    return false
  }, [userProfile])

  return isAcess ? <Outlet /> : <Navigate to="/" />
}
