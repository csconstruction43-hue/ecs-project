// pages/AM2SimulatorPage.jsx
// AM2 Simulator — practice checklists for each AM2 task area, plus a
// scenario-based timed mock exam drawing from the AM2 quiz bank.
import React, { useState, useMemo, useEffect, useRef } from 'react'
import {
  Wrench, Clock, CheckCircle2, Circle, AlertTriangle, ChevronDown,
  ChevronUp, PlayCircle, RotateCcw, Award, ArrowRight, ArrowLeft, XCircle
} from 'lucide-react'
import Seo from '../components/Seo'
import { AM2_TASKS, AM2_QUIZ_QUESTIONS, AM2_TOTAL_TIME_MIN } from '../data/am2Data'

const CHECKLIST_KEY = 'am2SimulatorChecklist'

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveChecked(obj) {
  try {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(obj))
  } catch {
    // ignore quota errors
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ---------------------------------------------------------------- Task card
function TaskCard({ task, isOpen, onToggle, checked, onToggleStep }) {
  const totalSteps = task.steps.length
  const doneSteps = task.steps.filter((_, i) => checked[`${task.id}-${i}`]).length
  const pct = Math.round((doneSteps / totalSteps) * 100)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            {task.code.split(' ')[1]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              <span className="text-[11px] font-medium text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 flex items-center gap-1">
                <Clock size={11} /> {task.duration} min
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-400 w-8">{pct}%</span>
          </div>
          {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mt-4 mb-2">Checklist</h4>
          <ul className="space-y-1.5 mb-4">
            {task.steps.map((step, i) => {
              const key = `${task.id}-${i}`
              const isChecked = !!checked[key]
              return (
                <li key={key}>
                  <button
                    onClick={() => onToggleStep(key)}
                    className="w-full flex items-start gap-2.5 text-left px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isChecked ? (
                      <CheckCircle2 size={17} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <Circle size={17} className="text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {step}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Common mistakes</h4>
          <ul className="space-y-1.5">
            {task.mistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2.5 px-2 py-1 text-sm text-amber-700">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-500" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ------------------------------------------------------------- Mock exam UI
const EXAM_LENGTH = 15
const EXAM_TIME_SEC = 15 * 60 // 15 minutes for 15 scenario questions

function MockExam({ onExit }) {
  const questions = useMemo(() => shuffle(AM2_QUIZ_QUESTIONS).slice(0, EXAM_LENGTH), [])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(EXAM_TIME_SEC)
  const timerRef = useRef(null)

  useEffect(() => {
    if (submitted) return
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current)
          setSubmitted(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [submitted])

  const current = questions[index]
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secs = String(secondsLeft % 60).padStart(2, '0')

  const selectAnswer = (opt) => setAnswers((a) => ({ ...a, [current.id]: opt }))

  const score = useMemo(() => {
    if (!submitted) return 0
    return questions.filter((q) => answers[q.id] === q.correct).length
  }, [submitted, questions, answers])

  if (submitted) {
    const pct = Math.round((score / questions.length) * 100)
    const pass = pct >= 70
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${pass ? 'bg-emerald-50' : 'bg-red-50'}`}>
            <Award size={28} className={pass ? 'text-emerald-500' : 'text-red-500'} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{pct}% — {pass ? 'Pass' : 'Below pass mark'}</h2>
          <p className="text-gray-500 mt-1">You got {score} out of {questions.length} scenario questions correct.</p>
        </div>

        <div className="space-y-3 mb-6">
          {questions.map((q, i) => {
            const userAns = answers[q.id]
            const correct = userAns === q.correct
            return (
              <div key={q.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start gap-2.5">
                  {correct ? (
                    <CheckCircle2 size={17} className="text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={17} className="text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800">{i + 1}. {q.text}</p>
                    {!correct && (
                      <p className="text-xs text-gray-500 mt-1">
                        Your answer: <span className="text-red-600">{userAns || '(no answer)'}</span> · Correct: <span className="text-emerald-600">{q.correct}</span>
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{q.explanation}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onExit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            <RotateCcw size={16} /> Back to task practice
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-500">Question {index + 1} of {questions.length}</span>
        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${secondsLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
          <Clock size={14} /> {mins}:{secs}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden mb-6">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-5">{current.text}</h2>

      <div className="space-y-2.5 mb-8">
        {current.options.map((opt) => {
          const selected = answers[current.id] === opt
          return (
            <button
              key={opt}
              onClick={() => selectAnswer(opt)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                selected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>
        {index === questions.length - 1 ? (
          <button
            onClick={() => setSubmitted(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            Submit exam
          </button>
        ) : (
          <button
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Next <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Page
function AM2SimulatorPage() {
  const [openTaskId, setOpenTaskId] = useState(AM2_TASKS[0]?.id || null)
  const [checked, setChecked] = useState(loadChecked)
  const [mode, setMode] = useState('practice') // 'practice' | 'exam'

  const toggleStep = (key) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      saveChecked(next)
      return next
    })
  }

  const totalSteps = AM2_TASKS.reduce((sum, t) => sum + t.steps.length, 0)
  const doneSteps = Object.values(checked).filter(Boolean).length
  const overallPct = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="AM2 Simulator | Practice Tasks & Mock Exam — ECSPrep"
        description="Practice every AM2 assessment task — safe isolation, installation, inspection & testing, fault diagnosis and ancillary questions — plus a timed scenario mock exam."
        path="/am2-simulator"
      />

      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4 pt-14 pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-blue-200 mb-5">
            <Wrench size={13} /> AM2 Simulator
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Practice the AM2 the way it's assessed
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Work through all five task areas with step-by-step checklists, then test yourself
            against the clock with a scenario-based mock exam. Unofficial revision material — total
            task time in the real AM2 is around {AM2_TOTAL_TIME_MIN} minutes.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 -mt-10 pb-16">
        {/* Mode switch */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex gap-2 mb-6">
          <button
            onClick={() => setMode('practice')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              mode === 'practice' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <CheckCircle2 size={16} /> Task Practice
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              mode === 'exam' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <PlayCircle size={16} /> Timed Mock Exam
          </button>
        </div>

        {mode === 'practice' ? (
          <>
            {/* Overall progress */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-blue-100 flex items-center justify-center relative shrink-0">
                <span className="text-sm font-bold text-blue-600">{overallPct}%</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Overall checklist progress</p>
                <p className="text-sm text-gray-500">{doneSteps} of {totalSteps} steps ticked off across all five tasks</p>
              </div>
            </div>

            <div className="space-y-4">
              {AM2_TASKS.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isOpen={openTaskId === task.id}
                  onToggle={() => setOpenTaskId(openTaskId === task.id ? null : task.id)}
                  checked={checked}
                  onToggleStep={toggleStep}
                />
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center mt-8">
              This is unofficial revision material to help you prepare and is not the real NET/EAL
              AM2 task brief or paperwork. Always follow your training provider's guidance and BS 7671.
            </p>
          </>
        ) : (
          <MockExam key={mode} onExit={() => setMode('practice')} />
        )}
      </div>
    </div>
  )
}

export default AM2SimulatorPage
