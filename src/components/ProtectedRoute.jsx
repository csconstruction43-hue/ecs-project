// components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, requireAdmin = false, requirePro = false }) => {
  const { user, isAdmin, isPro, loading } = useAuth()
  const location = useLocation()

  // While the session is being restored from the stored token (e.g. right
  // after a page refresh), avoid bouncing an already-logged-in user to
  // /login just because `user` hasn't resolved yet.
  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  if (requirePro && !isPro) {
    return <Navigate to="/plans" replace state={{ from: location.pathname, reason: 'pro-required' }} />
  }

  return children
}

export default ProtectedRoute
