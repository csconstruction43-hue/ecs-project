// components/BlockedAccountScreen.jsx
// Rendered in place of the ENTIRE site (no header, footer, nav, routes —
// nothing) the moment a user's account is suspended by an admin, whether
// that's caught at login or live while they already had the site open
// (see AuthContext's account_suspended listener + polling effect). This is
// intentionally minimal — a blank page rather than the normal UI — so a
// blocked account has nothing left to browse or interact with.
import React from 'react'

export default function BlockedAccountScreen() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <p className="text-sm text-gray-400">
          Your account has been suspended. Contact support if you think this is a mistake.
        </p>
      </div>
    </div>
  )
}
