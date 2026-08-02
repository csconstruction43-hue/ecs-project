// lib/gamification.js
// Client-side gamification engine: XP, Levels, Daily Streaks, Badges, Coins.
// Everything lives in localStorage under "gamification" so it works instantly
// for guests and logged-in users alike (no backend migration required).
// Every test-completion flow already funnels through recordTestResult() in
// testResults.js, so hooking in there gives every test type (mock tests,
// topic practice, all specialist card tests) gamification for free.

const STORAGE_KEY = 'gamification'

const XP_PER_CORRECT = 10
const XP_PER_TEST_COMPLETE = 25
const XP_PASS_BONUS = 50
const XP_PERFECT_BONUS = 100

// Level thresholds — cumulative XP required to reach each level.
export const LEVELS = [
  { level: 1, title: 'Site Newbie', xpRequired: 0 },
  { level: 2, title: 'Ground Worker', xpRequired: 150 },
  { level: 3, title: 'Site Operative', xpRequired: 400 },
  { level: 4, title: 'Skilled Worker', xpRequired: 800 },
  { level: 5, title: 'Team Leader', xpRequired: 1400 },
  { level: 6, title: 'Supervisor', xpRequired: 2200 },
  { level: 7, title: 'Site Manager', xpRequired: 3200 },
  { level: 8, title: 'Safety Officer', xpRequired: 4500 },
  { level: 9, title: 'H&S Expert', xpRequired: 6200 },
  { level: 10, title: 'ECS Champion', xpRequired: 8500 },
]

export const BADGES = [
  { id: 'first_test', name: 'First Steps', desc: 'Complete your first test', icon: '🎯', check: (s) => s.testsCompleted >= 1 },
  { id: 'five_tests', name: 'Getting Started', desc: 'Complete 5 tests', icon: '📚', check: (s) => s.testsCompleted >= 5 },
  { id: 'twentyfive_tests', name: 'Dedicated Learner', desc: 'Complete 25 tests', icon: '🏗️', check: (s) => s.testsCompleted >= 25 },
  { id: 'fifty_tests', name: 'Test Veteran', desc: 'Complete 50 tests', icon: '🎓', check: (s) => s.testsCompleted >= 50 },
  { id: 'perfect_score', name: 'Perfectionist', desc: 'Score 100% on a test', icon: '💯', check: (s) => s.perfectScores >= 1 },
  { id: 'streak_3', name: 'Warming Up', desc: '3-day streak', icon: '🔥', check: (s) => s.bestStreak >= 3 },
  { id: 'streak_7', name: 'Week Warrior', desc: '7-day streak', icon: '🔥', check: (s) => s.bestStreak >= 7 },
  { id: 'streak_30', name: 'Unstoppable', desc: '30-day streak', icon: '⚡', check: (s) => s.bestStreak >= 30 },
  { id: 'hundred_correct', name: 'Century Club', desc: 'Answer 100 questions correctly', icon: '✅', check: (s) => s.totalCorrect >= 100 },
  { id: 'five_hundred_correct', name: 'Knowledge Machine', desc: 'Answer 500 questions correctly', icon: '🧠', check: (s) => s.totalCorrect >= 500 },
  { id: 'level_5', name: 'Rising Star', desc: 'Reach Level 5', icon: '⭐', check: (s) => levelForXP(s.xp).level >= 5 },
  { id: 'level_10', name: 'ECS Legend', desc: 'Reach Level 10', icon: '👑', check: (s) => levelForXP(s.xp).level >= 10 },
  { id: 'comeback', name: 'Wrong-to-Right', desc: 'Clear 10 questions from your Wrong Questions bank', icon: '🔁', check: (s) => (s.wrongQuestionsCleared || 0) >= 10 },
]

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(a, b) {
  const d1 = new Date(a), d2 = new Date(b)
  return Math.round((d2 - d1) / 86400000)
}

function defaultState() {
  return {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    testsCompleted: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    perfectScores: 0,
    coins: 0,
    wrongQuestionsCleared: 0,
    badges: [],
  }
}

export function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (!raw) return defaultState()
    return { ...defaultState(), ...raw }
  } catch {
    return defaultState()
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota errors
  }
}

export function levelForXP(xp) {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (xp >= l.xpRequired) current = l
  }
  const idx = LEVELS.findIndex((l) => l.level === current.level)
  const next = LEVELS[idx + 1] || null
  const xpIntoLevel = xp - current.xpRequired
  const xpForNext = next ? next.xpRequired - current.xpRequired : 0
  const progressPct = next ? Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100)) : 100
  return { ...current, next, xpIntoLevel, xpForNext, progressPct }
}

// Updates the daily streak based on today's date vs the last active date.
// Same day -> unchanged. Yesterday -> +1. Any bigger gap -> resets to 1.
function updateStreak(state) {
  const today = todayStr()
  if (state.lastActiveDate === today) return state
  const gap = state.lastActiveDate ? daysBetween(state.lastActiveDate, today) : null
  let streak = 1
  if (gap === 1) streak = state.streak + 1
  const bestStreak = Math.max(state.bestStreak || 0, streak)
  return { ...state, streak, bestStreak, lastActiveDate: today }
}

/**
 * Call once per completed test. Returns everything the UI needs to show a
 * toast: xpEarned, leveledUp, newLevel, newBadges, streak.
 */
export function processTestCompletion({ score = 0, total = 0 }) {
  let state = loadState()
  const prevLevel = levelForXP(state.xp).level

  state = updateStreak(state)

  const passed = total > 0 && score / total >= 0.8
  const perfect = total > 0 && score === total
  let xpEarned = XP_PER_TEST_COMPLETE + score * XP_PER_CORRECT
  if (passed) xpEarned += XP_PASS_BONUS
  if (perfect) xpEarned += XP_PERFECT_BONUS

  state.xp += xpEarned
  state.testsCompleted += 1
  state.totalCorrect += score
  state.totalQuestions += total
  if (perfect) state.perfectScores += 1
  state.coins = (state.coins || 0) + Math.round(xpEarned / 5)

  const newLevel = levelForXP(state.xp).level
  const leveledUp = newLevel > prevLevel

  const newlyUnlocked = []
  BADGES.forEach((b) => {
    if (!state.badges.includes(b.id) && b.check(state)) {
      state.badges.push(b.id)
      newlyUnlocked.push(b)
    }
  })

  saveState(state)

  return {
    xpEarned,
    leveledUp,
    newLevel,
    newBadges: newlyUnlocked,
    streak: state.streak,
    coins: state.coins,
    state,
  }
}

// Called when the user clears a question from their Wrong Questions bank
// by answering it correctly during revision.
export function recordWrongQuestionCleared() {
  const state = loadState()
  state.wrongQuestionsCleared = (state.wrongQuestionsCleared || 0) + 1
  const newlyUnlocked = []
  BADGES.forEach((b) => {
    if (!state.badges.includes(b.id) && b.check(state)) {
      state.badges.push(b.id)
      newlyUnlocked.push(b)
    }
  })
  saveState(state)
  return { newBadges: newlyUnlocked, state }
}

export function getBadgeById(id) {
  return BADGES.find((b) => b.id === id) || null
}
