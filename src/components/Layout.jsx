import React from 'react'
import { Outlet } from 'react-router-dom'
import { useActivityPing } from '../lib/useActivityPing'

const Layout = () => {
  // Quietly tells the backend "this signed-in user is here" every ~20s so
  // the admin panel's online status / last-active / current-page analytics
  // actually has data to show. (This was written in lib/useActivityPing.js
  // but never called from anywhere — the admin dashboard was always
  // showing everyone as offline because of that.)
  useActivityPing()

  return (
    <>
      {/* Header */}
      {/* Navbar */}

      {/* Bottom padding keeps content clear of the fixed mobile bottom nav */}
      <div className="pb-16 xl:pb-0">
        <Outlet />
      </div>

      {/* Footer */}
    </>
  )
}

export default Layout 