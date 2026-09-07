// components/PageDisabledLock.jsx
// Shown to regular users when an admin has switched a page "off" from
// Admin > Settings. Admins bypass this entirely and always see the real page.
import React from 'react'
import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'

export default function PageDisabledLock({ title = 'This page is currently unavailable', message }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <FaLock className="text-gray-400 text-2xl" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {message || 'This page has been temporarily disabled by the site admin. Please check back later.'}
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
