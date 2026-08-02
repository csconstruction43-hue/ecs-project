// components/LockedTestScreen.jsx
// Shown instead of the test when a free user opens a Pro-only mock test.
import React from 'react'
import { Link } from 'react-router-dom'
import { FaLock, FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

export default function LockedTestScreen({ testName }) {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
          <FaLock className="text-purple-600 text-2xl" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">{testName} is a Pro test</h1>
        <p className="text-gray-500 mb-6">
          You've used your free mock tests. Upgrade to unlock every mock test, AI answer
          explanations, and full progress tracking.
        </p>
        <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 shrink-0" /> Unlimited access to every mock test</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 shrink-0" /> AI answer explanations on every question</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 shrink-0" /> Full analytics &amp; mistake tracking</li>
        </ul>
        <Link
          to="/plans"
          className="block w-full bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 transition"
        >
          {isAuthenticated ? 'See Plans →' : 'Sign up & See Plans →'}
        </Link>
        <Link to="/mock-test" className="block mt-3 text-sm text-gray-400 hover:text-gray-600">
          ← Back to free tests
        </Link>
      </div>
    </div>
  )
}
