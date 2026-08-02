// pages/MyLibraryPage.jsx
// Real downloadable study resources generated from the courses the user has
// actually booked (src/data/courses.js). No fake purchase history, no dead
// "#" download links, no fabricated expiry countdowns — everything here is
// either genuinely generated client-side or links to a real in-app page.
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Library, BookOpen, Download, ShoppingCart, FileText,
  ListChecks, GraduationCap, ArrowRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getCourseById } from '../data/courses'

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function buildRevisionNotes(course) {
  const lines = [
    `${course.title}`,
    `Revision Notes — ECSPrep`,
    '='.repeat(40),
    '',
    course.summary,
    '',
  ]
  course.modules.forEach((mod, i) => {
    lines.push(`${i + 1}. ${mod.title}`)
    mod.points.forEach((p) => lines.push(`   - ${p}`))
    lines.push('')
  })
  lines.push('What you should walk away with:')
  course.outcomes.forEach((o) => lines.push(`   ✓ ${o}`))
  return lines.join('\n')
}

function buildSyllabusChecklist(course) {
  const lines = [
    `${course.title} — Syllabus Checklist`,
    '='.repeat(40),
    '',
    'Tick each item off as you revise it:',
    '',
  ]
  course.modules.forEach((mod) => {
    lines.push(`[ ] ${mod.title}`)
    mod.points.forEach((p) => lines.push(`    [ ] ${p}`))
  })
  return lines.join('\n')
}

const MyLibraryPage = () => {
  const { user } = useAuth()
  const bookedCourses = (user?.bookedCourses || [])
    .map((b) => getCourseById(b.id))
    .filter(Boolean)

  if (bookedCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Library size={36} className="text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Library
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-12">
            Revision notes, syllabus checklists and flashcard prompts for every course you book — all in one place.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen size={56} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your library is empty</h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
              Book any online course and its revision notes, syllabus checklist and full Pro toolkit unlock here instantly.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/courses"
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart size={20} /> Browse Courses
              </Link>
              <Link
                to="/study-material"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all inline-flex items-center gap-2"
              >
                Free Study Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Library size={36} className="text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Library
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {bookedCourses.length} course{bookedCourses.length !== 1 ? 's' : ''} booked • lifetime access, no expiry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="p-5">
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{course.code}</span>
                <h3 className="font-bold text-lg text-gray-900 mt-2 mb-1">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.summary}</p>

                <div className="space-y-2">
                  <button
                    onClick={() => downloadTextFile(`${course.shortTitle} - Revision Notes.txt`, buildRevisionNotes(course))}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                      <FileText size={16} className="text-blue-500" /> Revision notes (.txt)
                    </span>
                    <Download size={15} className="text-gray-400" />
                  </button>
                  <button
                    onClick={() => downloadTextFile(`${course.shortTitle} - Syllabus Checklist.txt`, buildSyllabusChecklist(course))}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                      <ListChecks size={16} className="text-green-500" /> Syllabus checklist (.txt)
                    </span>
                    <Download size={15} className="text-gray-400" />
                  </button>
                  <Link
                    to={`/courses/${course.id}`}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                      <GraduationCap size={16} className="text-purple-500" /> Full course & mock exam
                    </span>
                    <ArrowRight size={15} className="text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/courses" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            <GraduationCap size={16} /> Book another course
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MyLibraryPage
