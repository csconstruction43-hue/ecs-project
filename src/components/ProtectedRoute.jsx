// components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, requireAdmin = false, requireSuperAdmin = false, requirePro = false }) => {
  const { user, isAdmin, isSuperAdmin, isPro, loading } = useAuth()
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

  // New feature: granular admin roles — a support_agent/content_editor
  // passes the general requireAdmin check above but is bounced back to the
  // admin dashboard if they hit a full-admin-only section directly by URL.
  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (requirePro && !isPro) {
    return <Navigate to="/plans" replace state={{ from: location.pathname, reason: 'pro-required' }} />
  }

  return children
}

export default ProtectedRoute
