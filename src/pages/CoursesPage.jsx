// pages/CoursesPage.jsx — full online course catalogue
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, Signal, ArrowRight, Laptop, GraduationCap, Sparkles } from 'lucide-react'
import Seo from '../components/Seo'
import { courses, COURSE_LEVELS, coursePerks } from '../data/courses'
import { useAuth } from '../context/AuthContext'

const levelColor = {
  Beginner: 'bg-green-50 text-green-700 border-green-200',
  Intermediate: 'bg-blue-50 text-blue-700 border-blue-200',
  Advanced: 'bg-slate-100 text-slate-700 border-slate-300',
}

const CoursesPage = () => {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')

  const bookedIds = useMemo(
    () => new Set((user?.bookedCourses || []).map((c) => c.id)),
    [user]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courses
      .filter((c) => (levelFilter === 'All' ? true : c.level === levelFilter))
      .filter((c) => (q ? (c.title + c.shortTitle + c.code).toLowerCase().includes(q) : true))
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [query, levelFilter])

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Online Electrician & ECS Courses A–Z | ECSPrep"
        description="Browse every ECSPrep online course — Level 2 & 3 Electrical Installations, 18th Edition, Inspection & Testing, EV Charging, Solar PV, ECS cards and more. 100% online, self-paced."
        path="/courses"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-slate-900 to-blue-950 text-white">
        <div className="h-1.5 w-full" style={{ background: 'var(--hazard-stripe)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 max-w-6xl py-14 md:py-18 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Laptop size={14} /> 100% Online · Learn at your own pace
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Every ECS &amp; Electrician Course, A to Z</h1>
          <p className="text-blue-100/90 max-w-2xl mx-auto">
            From your first Green Card to advanced specialisms like EV Charging and Solar PV — every course includes a full
            mock exam, question bank, and 25+ Pro study tools once booked.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-[64px] xl:top-[113px] z-30">
        <div className="container mx-auto px-4 max-w-6xl py-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses (e.g. EV charging, Level 3, PAT)…"
              className="flex-1 bg-transparent text-sm outline-none text-gray-800"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {['All', ...COURSE_LEVELS].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  levelFilter === lvl
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-sm text-gray-500 mb-4">{filtered.length} course{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => {
              const isBooked = bookedIds.has(course.id)
              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all p-5 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {course.code}
                    </span>
                    {isBooked ? (
                      <span className="text-[11px] font-bold tracking-wide text-green-700 bg-green-50 px-2 py-1 rounded-full">
                        BOOKED
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold tracking-wide text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                        {course.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.summary}</p>

                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${levelColor[course.level]}`}>
                        <Signal size={11} /> {course.level}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wide text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
                        <Sparkles size={12} /> PRO INCLUDED
                      </span>
                      <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold">
                        {isBooked ? 'Continue' : 'View course'} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">No courses match your search.</div>
          )}
        </div>
      </section>

      {/* What you unlock */}
      <section className="py-14 bg-white border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Sparkles size={13} /> BOOK ANY COURSE
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">25+ Pro Tools Unlock the Moment You Book</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every course comes with the full Pro study toolkit included.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            {coursePerks.map((perk) => (
              <div key={perk.label} className="flex items-start gap-2 text-sm text-gray-700">
                <GraduationCap size={15} className="text-blue-500 mt-0.5 shrink-0" />
                {perk.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoursesPage
