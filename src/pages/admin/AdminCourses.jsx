// pages/admin/AdminCourses.jsx — which users have booked which courses
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, RefreshCcw, Users, GraduationCap, Search, ExternalLink } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import { courses } from '../../data/courses'

function timeAgo(iso) {
  if (!iso) return '—'
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const AdminCourses = () => {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(null)

  const load = () => {
    setError('')
    apiRequest('/api/admin/courses')
      .then((data) => setEnrollments(data.enrollments))
      .catch((err) => setError(err.message || 'Could not load course enrollments.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    setLoading(true)
    load()
  }, [])

  const grouped = useMemo(() => {
    const byCourse = {}
    for (const e of enrollments) {
      if (!byCourse[e.courseId]) byCourse[e.courseId] = []
      byCourse[e.courseId].push(e)
    }
    return courses
      .map((c) => ({ course: c, enrolled: byCourse[c.id] || [] }))
      .filter((row) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return (
          row.course.title.toLowerCase().includes(q) ||
          row.enrolled.some((e) => e.user.email.toLowerCase().includes(q) || (e.user.name || '').toLowerCase().includes(q))
        )
      })
      .sort((a, b) => b.enrolled.length - a.enrolled.length)
  }, [enrollments, query])

  const totalBookings = enrollments.length

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="text-blue-600" /> Course Bookings
          </h1>
          <p className="text-gray-500 text-sm mt-1">{totalBookings} total booking{totalBookings !== 1 ? 's' : ''} across {courses.length} courses</p>
        </div>
        <button
          onClick={() => { setLoading(true); load() }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50"
        >
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white mb-5 max-w-md">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by course, name, or email…"
          className="flex-1 bg-transparent text-sm outline-none text-gray-800"
        />
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading enrollments…
        </div>
      ) : (
        <div className="space-y-3">
          {grouped.map(({ course, enrolled }) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === course.id ? null : course.id)}
                className="w-full flex items-center justify-between gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full shrink-0">{course.code}</span>
                  <span className="font-semibold text-gray-900 truncate">{course.title}</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600 shrink-0">
                  <Users size={14} /> {enrolled.length}
                </span>
              </button>

              {expanded === course.id && (
                <div className="border-t border-gray-100">
                  {enrolled.length === 0 ? (
                    <p className="text-sm text-gray-400 px-4 py-4">No one has booked this course yet.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                          <th className="px-4 py-2 font-medium">Learner</th>
                          <th className="px-4 py-2 font-medium">Email</th>
                          <th className="px-4 py-2 font-medium">Plan</th>
                          <th className="px-4 py-2 font-medium">Booked</th>
                          <th className="px-4 py-2 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrolled.map((e) => (
                          <tr key={e.user.id} className="border-t border-gray-50">
                            <td className="px-4 py-2.5 text-gray-800 font-medium">{e.user.name || 'Unnamed'}</td>
                            <td className="px-4 py-2.5 text-gray-500">{e.user.email}</td>
                            <td className="px-4 py-2.5">
                              {e.user.isPro ? (
                                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">PRO</span>
                              ) : (
                                <span className="text-[11px] font-medium text-gray-400">Free</span>
                              )}
                            </td>
                            <td className="px-4 py-2.5 text-gray-500">{timeAgo(e.bookedAt)}</td>
                            <td className="px-4 py-2.5 text-right">
                              <Link to={`/admin/users/${e.user.id}`} className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-medium">
                                View user <ExternalLink size={12} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminCourses
