import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, Clock, GraduationCap, RefreshCw, ExternalLink } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import { getCourseById } from '../../data/courses'

export default function AdminCourseRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState({})

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const { requests: r } = await apiRequest('/api/admin/course-requests')
      setRequests(r)
    } catch (e) {
      setError(e.message || 'Could not load course requests.')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const key = (userId, courseId) => `${userId}:${courseId}`

  const handleDecision = async (userId, courseId, decision) => {
    setProcessing((p) => ({ ...p, [key(userId, courseId)]: true }))
    try {
      await apiRequest(`/api/admin/course-requests/${userId}/${courseId}/${decision}`, { method: 'POST' })
      await load()
    } catch (e) {
      alert(e.message || 'Could not process this request.')
    } finally {
      setProcessing((p) => ({ ...p, [key(userId, courseId)]: false }))
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="text-purple-600" /> Course Requests
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Approve or reject pending course booking requests</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading requests…</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No pending course requests</p>
          <p className="text-gray-400 text-sm mt-1">All requests have been processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(({ courseId, requestedAt, user }) => {
            const course = getCourseById(courseId)
            const busy = !!processing[key(user.id, courseId)]
            return (
              <div key={key(user.id, courseId)} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock size={14} className="text-amber-500" />
                    <span className="text-xs text-gray-400">{requestedAt ? new Date(requestedAt).toLocaleString('en-GB') : ''}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Requested course:</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold text-purple-700 bg-purple-50">
                      {course ? course.title : courseId}
                    </span>
                    <Link to={`/admin/users/${user.id}`} className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-medium">
                      View user <ExternalLink size={12} />
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecision(user.id, courseId, 'reject')}
                      disabled={busy}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      <XCircle size={15} /> Reject
                    </button>
                    <button
                      onClick={() => handleDecision(user.id, courseId, 'approve')}
                      disabled={busy}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <CheckCircle size={15} /> Approve
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
