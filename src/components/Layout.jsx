import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useActivityPing } from '../lib/useActivityPing'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'
import PageDisabledLock from './PageDisabledLock'
import AnnouncementBanner from './AnnouncementBanner'
import FestivalBanner from './FestivalBanner'

// Routes a visitor must still be able to reach even while the site is in
// maintenance mode — otherwise an admin who isn't logged in on this device
// could never log back in to switch maintenance mode off again.
const MAINTENANCE_EXEMPT_PATHS = ['/login', '/register', '/forgot-password', '/reset-password']

const Layout = () => {
  // Quietly tells the backend "this signed-in user is here" every ~20s so
  // the admin panel's online status / last-active / current-page analytics
  // actually has data to show. (This was written in lib/useActivityPing.js
  // but never called from anywhere — the admin dashboard was always
  // showing everyone as offline because of that.)
  useActivityPing()

  const { isAdmin } = useAuth()
  const location = useLocation()
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [checkingMaintenance, setCheckingMaintenance] = useState(true)
  const [publicSettings, setPublicSettings] = useState(null)

  useEffect(() => {
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => {
        setMaintenanceMode(data.maintenanceMode === true)
        setPublicSettings(data)
      })
      .catch(() => setMaintenanceMode(false))
      .finally(() => setCheckingMaintenance(false))
  }, [])

  const isExemptPath = MAINTENANCE_EXEMPT_PATHS.some((p) => location.pathname.startsWith(p))

  if (maintenanceMode && !isAdmin && !isExemptPath && !checkingMaintenance) {
    return (
      <div className="pb-16 xl:pb-0">
        <PageDisabledLock
          title="We'll be right back"
          message="The site is currently down for maintenance. Please check back shortly."
        />
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      {/* Navbar */}

      <FestivalBanner settings={publicSettings} />
      <AnnouncementBanner settings={publicSettings} />

      {/* Bottom padding keeps content clear of the fixed mobile bottom nav */}
      <div className="pb-16 xl:pb-0">
        <Outlet />
      </div>

      {/* Footer */}
    </>
  )
}

export default Layout 