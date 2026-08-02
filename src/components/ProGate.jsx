// components/ProGate.jsx
// Wraps premium content. Pro users see the real children.
// Free users see a blurred preview with an upgrade call-to-action.
import React from 'react'
import { Link } from 'react-router-dom'
import { Lock, Crown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function ProGate({ children, title = 'This is a Pro feature', description = 'Upgrade to unlock this content.', minimal = false }) {
  const { isPro } = useAuth()

  if (isPro) return children

  if (minimal) {
    return (
      <Link
        to="/plans"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors"
      >
        <Lock size={14} /> Pro feature — Upgrade to unlock
      </Link>
    )
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200">
      <div className="pointer-events-none select-none blur-sm opacity-60">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/60">
        <div className="text-center px-6 py-8 max-w-sm">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="text-slate-600" size={22} />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <Link
            to="/plans"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg transition-all"
          >
            <Crown size={16} /> Upgrade to Pro
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProGate
