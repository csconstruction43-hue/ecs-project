// pages/MyCoursesPage.jsx — the logged-in user's booked courses
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, GraduationCap, CheckCircle2, Compass, Clock, X, Loader2 } from 'lucide-react'
import Seo from '../components/Seo'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'
import { getCourseById, coursePerks } from '../data/courses'

const MyCoursesPage = () => {
  const { user, refreshUser } = useAuth()
  const [cancelling, setCancelling] = useState({})
  const booked = (user?.bookedCourses || [])
    .map((b) => ({ ...b, course: getCourseById(b.id) }))
    .filter((b) => b.course)
  const pending = (user?.pendingCourseRequests || [])
    .map((p) => ({ ...p, course: getCourseById(p.id) }))
    .filter((p) => p.course)

  const handleCancel = async (courseId) => {
    setCancelling((c) => ({ ...c, [courseId]: true }))
    try {
      await apiRequest(`/api/courses/${courseId}/request`, { method: 'DELETE' })
      if (refreshUser) await refreshUser()
    } catch (err) {
      alert(err.message || 'Could not cancel this request. Please try again.')
    } finally {
      setCancelling((c) => ({ ...c, [courseId]: false }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="My Courses | ECSPrep" description="Your booked ECSPrep online courses and unlocked Pro study tools." path="/my-courses" noindex />

      <section className="bg-white border-b">
        <div className="container mx-auto px-4 max-w-5xl py-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2.5">
            <BookOpen className="text-blue-600" /> My Courses
          </h1>
          <p className="text-gray-500 mt-1">Everything you've booked, in one place.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {pending.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold tracking-wide text-amber-700 uppercase mb-3 flex items-center gap-2">
                <Clock size={14} /> Awaiting admin approval
              </h2>
              <div className="space-y-3">
                {pending.map(({ course, requestedAt }) => (
                  <div key={course.id} className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">{course.code}</span>
                      <h3 className="font-bold text-gray-900 mt-2">{course.title}</h3>
                      {requestedAt && (
                        <p className="text-xs text-gray-500 mt-1">Requested {new Date(requestedAt).toLocaleDateString('en-GB')}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">Pending approval</span>
                      <button
                        onClick={() => handleCancel(course.id)}
                        disabled={cancelling[course.id]}
                        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-red-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                      >
                        {cancelling[course.id] ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />} Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {booked.length === 0 && pending.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <Compass className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h2 className="font-bold text-gray-900 text-lg mb-1">No courses booked yet</h2>
              <p className="text-gray-500 mb-5 max-w-md mx-auto">
                Book any online course to unlock unlimited mock exams, AI explanations, and 25+ Pro study tools for it.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Courses <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {booked.map(({ course, bookedAt }) => (
                <div key={course.id} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{course.code}</span>
                      <h2 className="text-lg font-bold text-gray-900 mt-2">{course.title}</h2>
                      {bookedAt && (
                        <p className="text-xs text-gray-400 mt-1">Booked {new Date(bookedAt).toLocaleDateString('en-GB')}</p>
                      )}
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline shrink-0"
                    >
                      View course <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 border-t border-gray-100 pt-4">
                    {coursePerks.slice(0, 8).map((perk) => (
                      <Link
                        key={perk.label}
                        to={perk.path}
                        className="flex items-start gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> {perk.label}
                      </Link>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">+ {coursePerks.length - 8} more Pro tools unlocked for this course</p>
                </div>
              ))}
            </div>
          )}

          {(booked.length > 0 || pending.length > 0) && (
            <div className="mt-8 text-center">
              <Link to="/courses" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                <GraduationCap size={16} /> Book another course
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default MyCoursesPage
