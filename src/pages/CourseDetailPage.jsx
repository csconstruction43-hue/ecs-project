// pages/CourseDetailPage.jsx
import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock, Signal, Laptop, Sparkles,
  Loader2, Lock, PartyPopper, PlayCircle, BookOpen, Crown,
} from 'lucide-react'
import Seo from '../components/Seo'
import { getCourseById, coursePerks, courses } from '../data/courses'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user, isPro, refreshUser } = useAuth()
  const course = getCourseById(courseId)

  const [booking, setBooking] = useState(false)
  const [error, setError] = useState('')
  const [justRequested, setJustRequested] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  const isBooked = useMemo(
    () => !!(user?.bookedCourses || []).some((c) => c.id === courseId),
    [user, courseId]
  )
  const isPending = useMemo(
    () => !!(user?.pendingCourseRequests || []).some((c) => c.id === courseId) || justRequested,
    [user, courseId, justRequested]
  )

  // Every course needs an active Pro plan first — if the user doesn't
  // have one, "Request This Course" sends them to the pricing page
  // instead of the app silently unlocking Pro for free.
  const needsPayment = !isPro

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h1>
        <p className="text-gray-500 mb-6">This course may have been renamed or removed.</p>
        <Link to="/courses" className="text-blue-600 font-semibold hover:underline">← Back to all courses</Link>
      </div>
    )
  }

  const handleBook = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${courseId}` } })
      return
    }
    if (needsPayment) {
      navigate('/plans', {
        state: { from: `/courses/${courseId}`, reason: 'course-payment', courseName: course.shortTitle },
      })
      return
    }
    setBooking(true)
    setError('')
    try {
      await apiRequest(`/api/courses/${courseId}/book`, { method: 'POST' })
      if (refreshUser) await refreshUser()
      setJustRequested(true)
    } catch (err) {
      setError(err.message || 'Could not send your booking request. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  const handleCancel = async () => {
    setCancelling(true)
    try {
      await apiRequest(`/api/courses/${courseId}/request`, { method: 'DELETE' })
      if (refreshUser) await refreshUser()
      setJustRequested(false)
    } catch (err) {
      setError(err.message || 'Could not cancel your request. Please try again.')
    } finally {
      setCancelling(false)
    }
  }

  const related = courses.filter((c) => c.id !== course.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={`${course.title} — Online Course | ECSPrep`}
        description={course.summary}
        path={`/courses/${course.id}`}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-slate-900 to-blue-950 text-white">
        <div className="h-1.5 w-full" style={{ background: 'var(--hazard-stripe)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 max-w-5xl py-10 md:py-14">
          <Link to="/courses" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> All courses
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-wide bg-blue-500/20 border border-blue-400/30 px-2.5 py-1 rounded-full">{course.code}</span>
            <span className="text-xs font-bold tracking-wide bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">{course.tag}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">{course.title}</h1>
          <p className="text-blue-100/90 text-lg max-w-2xl mb-6">{course.summary}</p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span className="flex items-center gap-1.5"><Laptop size={15} /> {course.format}</span>
            <span className="flex items-center gap-1.5"><Signal size={15} /> {course.level}</span>
            <span className="flex items-center gap-1.5"><Clock size={15} /> {course.duration}</span>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: curriculum */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll do in this course</h2>
              <div className="space-y-4">
                {course.modules.map((mod, i) => (
                  <div key={mod.title} className="bg-white rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <h3 className="font-semibold text-gray-900">{mod.title}</h3>
                    </div>
                    <ul className="pl-10 space-y-1.5">
                      {mod.points.map((p) => (
                        <li key={p} className="text-sm text-gray-600 flex items-start gap-2">
                          <PlayCircle size={13} className="text-blue-400 mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll walk away with</h2>
              <ul className="space-y-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-gray-700 text-sm bg-white border border-gray-200 rounded-xl p-3.5">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" /> {o}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-purple-500" />
                <h2 className="text-xl font-bold text-gray-900">25+ Pro tools this unlocks</h2>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 rounded-2xl border p-5 ${isBooked ? 'bg-green-50/40 border-green-200' : 'bg-white border-gray-200'}`}>
                {coursePerks.map((perk) =>
                  isBooked ? (
                    <Link
                      key={perk.label}
                      to={perk.path}
                      className="flex items-start gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
                      {perk.label}
                    </Link>
                  ) : (
                    <div key={perk.label} className="flex items-start gap-2 text-sm text-gray-500">
                      <Lock size={13} className="text-gray-300 mt-1 shrink-0" />
                      {perk.label}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right: booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              {isBooked ? (
                <div className="text-center">
                  <PartyPopper className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">You're booked in!</h3>
                  <p className="text-sm text-gray-500 mb-5">All 25+ Pro tools for this course are unlocked.</p>
                  <Link
                    to="/my-courses"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen size={16} /> Go to My Courses
                  </Link>
                </div>
              ) : isPending ? (
                <div className="text-center">
                  <Loader2 className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Request sent!</h3>
                  <p className="text-sm text-gray-500 mb-5">
                    Your booking request has gone to our admin team for approval. Course tools unlock as soon as it's approved.
                  </p>
                  <Link
                    to="/my-courses"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <BookOpen size={16} /> View My Courses
                  </Link>
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="mt-3 text-xs text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    {cancelling ? 'Cancelling…' : 'Cancel this request'}
                  </button>
                  {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1 text-sm font-bold tracking-wide text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full">
                      <Sparkles size={14} /> PRO TOOLKIT INCLUDED
                    </span>
                  </div>
                  <button
                    onClick={handleBook}
                    disabled={booking}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                  >
                    {booking ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : needsPayment ? (
                      <Crown size={16} />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                    {booking ? 'Sending request…' : needsPayment ? 'Choose a Plan to Book' : 'Request This Course'}
                  </button>
                  {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
                  {!user && <p className="text-xs text-gray-400 mt-3 text-center">You'll be asked to sign in first.</p>}
                  {user && needsPayment && (
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      This course needs an active Pro plan — you'll pick one on the next page.
                    </p>
                  )}
                  {user && !needsPayment && (
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      Your request goes to our admin team — course tools unlock once it's approved.
                    </p>
                  )}
                  <ul className="mt-5 space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Lifetime access</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> 100% online, self-paced</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> 25+ Pro tools on approval</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> 7-day money-back guarantee</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Related courses */}
        {related.length > 0 && (
          <div className="container mx-auto px-4 max-w-5xl mt-14">
            <h2 className="text-lg font-bold text-gray-900 mb-4">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((c) => (
                <Link
                  key={c.id}
                  to={`/courses/${c.id}`}
                  className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-4"
                >
                  <p className="text-xs font-bold text-blue-600 mb-1">{c.code}</p>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{c.shortTitle}</p>
                  <p className="text-xs font-semibold text-purple-600">Pro included</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default CourseDetailPage
