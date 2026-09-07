// lib/testResults.js
// Called once, right when a mock test finishes. Does four things:
//  1. Saves to localStorage under "testHistory" — the existing AnalyticsPage
//     already reads this key to build charts/progress.
//  2. Best-effort submits the score to the backend leaderboard. If the
//     person isn't logged in (or the backend is briefly unreachable) this
//     silently does nothing — it should never block or break the results
//     screen.
//  3. Saves any wrong answers into the "wrongQuestionsBank" used by the
//     Revision Centre's Wrong-Questions-Only mode.
//  4. Runs the gamification engine (XP / streak / badges) and dispatches a
//     "gamification:update" window event so a global toast can show
//     "+120 XP" / "Badge unlocked" without every test page needing to know
//     about gamification directly.
import { apiRequest } from './api'
import { processTestCompletion, computeCombo } from './gamification'
import { enqueueRequest } from './offlineQueue'

const WRONG_BANK_KEY = 'wrongQuestionsBank'
const MAX_WRONG_BANK = 500

// Different test components use slightly different field names for the
// same thing (question/questionText, selected/userAnswer, correct/
// correctAnswer, isCorrect/wasCorrect). This normalizes any of them.
function normalizeAnswer(a) {
  if (!a) return null
  const question = a.question || a.questionText || ''
  if (!question) return null
  return {
    question,
    userAnswer: a.selected ?? a.userAnswer ?? '',
    correctAnswer: a.correct ?? a.correctAnswer ?? '',
    explanation: a.explanation || '',
    topic: a.topic || a.testLabel || '',
    isCorrect: a.isCorrect ?? a.wasCorrect ?? false,
  }
}

function loadWrongBank() {
  try {
    return JSON.parse(localStorage.getItem(WRONG_BANK_KEY) || '[]')
  } catch {
    return []
  }
}

function saveWrongBank(bank) {
  try {
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank.slice(-MAX_WRONG_BANK)))
  } catch {
    // ignore quota errors
  }
}

// Adds newly-wrong questions to the bank (dedupe by question text, bump
// timesWrong on repeat misses).
function updateWrongBank(answers, testLabel) {
  if (!answers || answers.length === 0) return
  const bank = loadWrongBank()
  const byQuestion = new Map(bank.map((q) => [q.question, q]))

  answers.forEach((raw) => {
    const a = normalizeAnswer(raw)
    if (!a) return
    if (!a.isCorrect) {
      const existing = byQuestion.get(a.question)
      byQuestion.set(a.question, {
        question: a.question,
        userAnswer: a.userAnswer || existing?.userAnswer || '',
        correctAnswer: a.correctAnswer,
        explanation: a.explanation,
        topic: a.topic || testLabel || existing?.topic || 'General',
        timesWrong: (existing?.timesWrong || 0) + 1,
        lastSeen: new Date().toISOString(),
      })
    }
  })

  saveWrongBank(Array.from(byQuestion.values()))
}

export function recordTestResult({ testType, testLabel, score, total, answers }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  try {
    const history = JSON.parse(localStorage.getItem('testHistory') || '[]')
    history.push({
      testType,
      testLabel,
      score,
      total,
      percentage,
      date: new Date().toISOString(),
    })
    localStorage.setItem('testHistory', JSON.stringify(history.slice(-200))) // keep it bounded
  } catch {
    // localStorage can fail in private-browsing mode — non-critical, ignore.
  }

  if (Array.isArray(answers) && answers.length > 0) {
    updateWrongBank(answers, testLabel)
  }

  // Gamification: XP, streak, badges, combo bonus, daily challenge & goal
  // progress. Never blocks the results screen.
  try {
    const combo = Array.isArray(answers) && answers.length > 0 ? computeCombo(answers) : null
    const result = processTestCompletion({ score, total, combo })
    window.dispatchEvent(new CustomEvent('gamification:update', { detail: result }))
  } catch {
    // ignore — gamification is a nice-to-have, never break test results
  }

  // New: offline resilience. If this fails because the device has no
  // signal (rather than simply not being logged in), queue it so the
  // leaderboard/streak still gets the result once connectivity returns —
  // previously an offline submission here was just silently lost.
  const leaderboardRequest = { path: '/api/leaderboard/submit', options: { method: 'POST', body: { testType, score, total } } }
  apiRequest(leaderboardRequest.path, leaderboardRequest.options).catch(() => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      enqueueRequest(leaderboardRequest.path, leaderboardRequest.options)
    }
    // Otherwise: not logged in, or a real server error — the local
    // history above still works, and retrying a non-network failure
    // forever wouldn't help.
  })

  return { percentage }
}

export function getWrongQuestionsBank() {
  return loadWrongBank()
}

export function removeFromWrongBank(question) {
  const bank = loadWrongBank().filter((q) => q.question !== question)
  saveWrongBank(bank)
}

export function clearWrongBank() {
  saveWrongBank([])
}

// Weekly Recap — compares this calendar week (Mon-Sun) against last week
// using the same "testHistory" data the Dashboard/Analytics pages already
// read, so no extra storage is needed.
function startOfWeek(d) {
  const date = new Date(d)
  const day = date.getDay() // 0 = Sun
  const diff = (day === 0 ? -6 : 1) - day // shift to Monday
  date.setDate(date.getDate() + diff)
  date.setHours(0, 0, 0, 0)
  return date
}

function summarize(entries) {
  const tests = entries.length
  const avg = tests > 0 ? Math.round(entries.reduce((sum, e) => sum + (e.percentage || 0), 0) / tests) : 0
  return { tests, avg }
}

export function getWeeklyRecap() {
  let history = []
  try {
    history = JSON.parse(localStorage.getItem('testHistory') || '[]')
  } catch {
    history = []
  }

  const now = new Date()
  const thisWeekStart = startOfWeek(now)
  const lastWeekStart = new Date(thisWeekStart)
  lastWeekStart.setDate(lastWeekStart.getDate() - 7)

  const thisWeekEntries = history.filter((e) => new Date(e.date) >= thisWeekStart)
  const lastWeekEntries = history.filter((e) => new Date(e.date) >= lastWeekStart && new Date(e.date) < thisWeekStart)

  const thisWeek = summarize(thisWeekEntries)
  const lastWeek = summarize(lastWeekEntries)

  return {
    thisWeek,
    lastWeek,
    testsDelta: thisWeek.tests - lastWeek.tests,
    avgDelta: thisWeek.tests > 0 && lastWeek.tests > 0 ? thisWeek.avg - lastWeek.avg : null,
  }
}
