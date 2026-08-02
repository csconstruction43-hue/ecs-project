// pages/StudyPlanPage.jsx
// New module: turns a user's exam date + their real weak-topic data (from
// the wrong-questions bank already recorded by every mock test) into a
// day-by-day revision schedule. Free users get a short preview; Pro users
// get the full schedule built from their actual weakest topics.
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Target, CheckCircle2, Circle, Sparkles, RotateCcw } from 'lucide-react'
import Seo from '../components/Seo'
import ProGate from '../components/ProGate'
import { useAuth } from '../context/AuthContext'

const EXAM_DATE_KEY = 'studyPlanExamDate'
const PROGRESS_KEY = 'studyPlanProgress'
const FREE_DAYS_VISIBLE = 3

// Used when there's no wrong-answer history yet (new user) so the plan
// still has useful content instead of being empty.
const GENERIC_TOPICS = [
  'Health & Safety fundamentals',
  'Risk assessment & method statements',
  'PPE & safe systems of work',
  'Manual handling',
  'COSHH & hazardous substances',
  'Working at height',
  'Fire safety & emergency procedures',
  'Site security & access control',
]

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function weakestTopics() {
  const bank = loadJSON('wrongQuestionsBank', [])
  const byTopic = new Map()
  bank.forEach((q) => {
    const topic = q.topic || 'General'
    byTopic.set(topic, (byTopic.get(topic) || 0) + (q.timesWrong || 1))
  })
  return Array.from(byTopic.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic)
}

function buildPlan(daysLeft, topics) {
  const plan = []
  if (daysLeft <= 0) return plan
  const pool = topics.length > 0 ? topics : GENERIC_TOPICS
  let topicIdx = 0

  for (let day = 1; day <= daysLeft; day++) {
    const isLastDay = day === daysLeft
    const isMockDay = !isLastDay && day % 3 === 0
    if (isLastDay) {
      plan.push({ day, kind: 'rest', title: 'Light review only', detail: 'Skim your weak topics, get an early night. Don\u2019t cram new material the day before your test.' })
    } else if (isMockDay) {
      plan.push({ day, kind: 'mock', title: 'Full timed mock test', detail: 'Simulate exam conditions — full length, no pausing, no notes.' })
    } else {
      const topic = pool[topicIdx % pool.length]
      topicIdx += 1
      plan.push({ day, kind: 'topic', title: `Focus topic: ${topic}`, detail: 'Practice by topic, then review any questions you get wrong straight away.' })
    }
  }
  return plan
}

function daysBetween(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffMs = target.getTime() - today.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

function StudyPlanPage() {
  const { isPro } = useAuth()
  const [examDate, setExamDate] = useState(() => loadJSON(EXAM_DATE_KEY, ''))
  const [progress, setProgress] = useState(() => loadJSON(PROGRESS_KEY, {}))

  useEffect(() => {
    try { localStorage.setItem(EXAM_DATE_KEY, JSON.stringify(examDate)) } catch { /* ignore */ }
  }, [examDate])

  useEffect(() => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)) } catch { /* ignore */ }
  }, [progress])

  const daysLeft = useMemo(() => daysBetween(examDate), [examDate])
  const topics = useMemo(() => weakestTopics(), [])
  const plan = useMemo(() => (daysLeft ? buildPlan(daysLeft, topics) : []), [daysLeft, topics])

  const toggleDay = (day) => {
    setProgress((prev) => ({ ...prev, [day]: !prev[day] }))
  }

  const resetPlan = () => {
    setExamDate('')
    setProgress({})
  }

  const completedCount = plan.filter((p) => progress[p.day]).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Seo
        title="Study Plan | ECSPrep"
        description="Get a personalised, day-by-day ECS revision schedule based on your exam date and your actual weak topics."
        path="/study-plan"
      />

      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <CalendarDays className="text-blue-600" size={26} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your study plan</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Tell us your exam date. We'll build a day-by-day schedule around the topics you're actually
          getting wrong — pulled straight from your test history, not a generic checklist.
        </p>
      </div>

      {/* Exam date input */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Target className="text-blue-500 shrink-0" size={22} />
          <div>
            <p className="font-semibold text-gray-900">When is your ECS test?</p>
            <p className="text-sm text-gray-400">Your plan updates automatically.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            min={new Date().toISOString().slice(0, 10)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {examDate && (
            <button
              onClick={resetPlan}
              className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
              title="Reset plan"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>
      </div>

      {!examDate && (
        <div className="text-center text-gray-400 py-12 border border-dashed border-gray-200 rounded-2xl">
          Pick an exam date above to generate your plan.
        </div>
      )}

      {examDate && daysLeft !== null && daysLeft < 0 && (
        <div className="text-center text-red-500 py-8 border border-red-100 bg-red-50 rounded-2xl">
          That date's already passed — pick an upcoming exam date to build a plan.
        </div>
      )}

      {examDate && daysLeft !== null && daysLeft >= 0 && (
        <>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Sparkles size={16} className="text-blue-500" />
              {daysLeft === 0 ? 'Your test is today — good luck!' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} to go`}
              {topics.length > 0 && <span className="text-gray-400">· plan built from {topics.length} weak topic{topics.length === 1 ? '' : 's'} in your history</span>}
            </div>
            {plan.length > 0 && (
              <span className="text-sm font-medium text-gray-600">{completedCount}/{plan.length} days done</span>
            )}
          </div>

          <div className="space-y-3">
            {plan.slice(0, isPro ? plan.length : FREE_DAYS_VISIBLE).map((item) => {
              const done = !!progress[item.day]
              return (
                <button
                  key={item.day}
                  onClick={() => toggleDay(item.day)}
                  className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition ${
                    done ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-100 hover:border-blue-200'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={22} />
                  ) : (
                    <Circle className="text-gray-300 shrink-0 mt-0.5" size={22} />
                  )}
                  <div>
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-0.5">Day {item.day}</p>
                    <p className={`font-semibold ${done ? 'text-emerald-800 line-through' : 'text-gray-900'}`}>{item.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{item.detail}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {!isPro && plan.length > FREE_DAYS_VISIBLE && (
            <div className="mt-4">
              <ProGate
                title="See your full study plan"
                description={`Unlock all ${plan.length} days, personalised to your weakest topics, with Pro.`}
              >
                <div className="space-y-3">
                  {plan.slice(FREE_DAYS_VISIBLE, FREE_DAYS_VISIBLE + 3).map((item) => (
                    <div key={item.day} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white">
                      <Circle className="text-gray-300 shrink-0 mt-0.5" size={22} />
                      <div>
                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-0.5">Day {item.day}</p>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ProGate>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/practice" className="text-blue-600 font-semibold hover:underline text-sm">
              Go to Practice by Topic →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default StudyPlanPage
