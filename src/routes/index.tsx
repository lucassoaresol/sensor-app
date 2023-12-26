import { Navigate, Route, Routes } from 'react-router-dom'
import {
  HomePage,
  LoginPage,
  MapPage,
  MapSimPage,
  PasswordPage,
  RecoveryPage,
} from '../pages'
import { ProtectedAuth } from '../shared'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/password" element={<RecoveryPage />}>
        <Route path=":token" element={<PasswordPage />} />
      </Route>
      <Route element={<ProtectedAuth />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/map/:lat/:long" element={<MapSimPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
