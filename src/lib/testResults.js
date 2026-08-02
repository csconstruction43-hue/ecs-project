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
import { processTestCompletion } from './gamification'

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

  // Gamification: XP, streak, badges. Never blocks the results screen.
  try {
    const result = processTestCompletion({ score, total })
    window.dispatchEvent(new CustomEvent('gamification:update', { detail: result }))
  } catch {
    // ignore — gamification is a nice-to-have, never break test results
  }

  apiRequest('/api/leaderboard/submit', {
    method: 'POST',
    body: { testType, score, total },
  }).catch(() => {
    // Not logged in yet, or offline — the local history above still works.
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
