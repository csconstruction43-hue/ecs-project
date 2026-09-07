// components/ImpersonationBanner.jsx
// New feature: shown across the whole app whenever an admin is viewing it
// as another user (see AuthContext.startImpersonation). Keeps the admin
// from forgetting they're "inside" someone else's account and gives them
// a one-click way back out.
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function ImpersonationBanner() {
  const { user, isImpersonating, stopImpersonation } = useAuth()
  const navigate = useNavigate()

  if (!user || !isImpersonating()) return null

  const handleReturn = () => {
    stopImpersonation()
    navigate('/admin/users')
  }

  return (
    <div className="fixed top-0 inset-x-0 z-[100] bg-amber-500 text-amber-950 text-sm font-medium px-4 py-2 flex items-center justify-center gap-3 shadow">
      <Eye size={15} />
      <span>You're viewing ECSPrep as <strong>{user.name}</strong> ({user.email}).</span>
      <button
        onClick={handleReturn}
        className="flex items-center gap-1.5 bg-amber-950 text-amber-50 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-amber-900 transition"
      >
        <LogOut size={12} /> Return to admin
      </button>
    </div>
  )
}

export default ImpersonationBanner
