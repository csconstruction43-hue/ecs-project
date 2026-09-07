// lib/gamification.js
// Client-side gamification engine: XP, Levels, Daily Streaks, Badges, Coins,
// Daily Challenges, Streak Freezes, Daily XP Goals and Combo bonuses.
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

// Combo bonus — rewards a long run of consecutive correct answers within a
// single test (computed from the answers array in testResults.js).
const COMBO_TIERS = [
  { min: 20, bonus: 100 },
  { min: 10, bonus: 50 },
  { min: 5, bonus: 20 },
]

const MAX_STREAK_FREEZES = 3
const STREAK_FREEZE_COST = 150 // coins

// Daily Login Bonus — a small, separate reward just for opening the app
// each day, on top of whatever XP a test session earns. Reuses the same
// streak counter as processTestCompletion() (via updateStreak) so there's
// a single source of truth for "streak", whether it grows from taking a
// test or simply logging in on a new day. Capped so a very long streak
// doesn't snowball into an unbounded daily XP grant.
const LOGIN_BONUS_BASE_XP = 15
const LOGIN_BONUS_XP_PER_STREAK_DAY = 3
const LOGIN_BONUS_STREAK_CAP = 20

const DEFAULT_DAILY_GOAL = 50
const MIN_DAILY_GOAL = 20
const MAX_DAILY_GOAL = 500

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

// Rotating daily challenges — the day-of-year picks which one is "today's"
// challenge, so it's deterministic without needing a backend.
export const DAILY_CHALLENGES = [
  { id: 'complete_1', metric: 'testsToday', target: 1, title: 'Complete 1 test today', icon: '📝', reward: { xp: 20, coins: 10 } },
  { id: 'complete_2', metric: 'testsToday', target: 2, title: 'Complete 2 tests today', icon: '📝', reward: { xp: 40, coins: 15 } },
  { id: 'answer_15', metric: 'correctToday', target: 15, title: 'Answer 15 questions correctly today', icon: '✅', reward: { xp: 50, coins: 15 } },
  { id: 'answer_25', metric: 'correctToday', target: 25, title: 'Answer 25 questions correctly today', icon: '✅', reward: { xp: 70, coins: 20 } },
  { id: 'score_90', metric: 'highScoreToday', target: 1, title: 'Score 90% or higher on any test', icon: '🎯', reward: { xp: 80, coins: 25 } },
  { id: 'perfect_1', metric: 'perfectToday', target: 1, title: 'Get a perfect score today', icon: '💯', reward: { xp: 100, coins: 30 } },
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
  // New badges
  { id: 'combo_10', name: 'On a Roll', desc: 'Get 10 correct answers in a row in one test', icon: '🎳', check: (s) => (s.bestCombo || 0) >= 10 },
  { id: 'combo_20', name: 'Unbroken', desc: 'Get 20 correct answers in a row in one test', icon: '🌟', check: (s) => (s.bestCombo || 0) >= 20 },
  { id: 'daily_grinder', name: 'Daily Grinder', desc: 'Complete 5 Daily Challenges', icon: '🗓️', check: (s) => (s.dailyChallengesCompleted || 0) >= 5 },
  { id: 'daily_champion', name: 'Daily Challenge Champion', desc: 'Complete 20 Daily Challenges', icon: '🏆', check: (s) => (s.dailyChallengesCompleted || 0) >= 20 },
  { id: 'goal_streak_7', name: 'Consistent Achiever', desc: 'Hit your daily XP goal 7 days in a row', icon: '📈', check: (s) => (s.bestGoalStreak || 0) >= 7 },
  { id: 'streak_saved', name: 'Second Chance', desc: 'Use a Streak Freeze to save your streak', icon: '🧊', check: (s) => (s.freezesUsed || 0) >= 1 },
]

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function dayOfYear(dateStr) {
  const d = new Date(dateStr)
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d - start) / 86400000)
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
    lastLoginBonusDate: null,
    testsCompleted: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    perfectScores: 0,
    coins: 0,
    wrongQuestionsCleared: 0,
    badges: [],
    // Combo bonus
    bestCombo: 0,
    // Daily Challenge
    challengeDate: null,
    testsToday: 0,
    correctToday: 0,
    highScoreToday: false,
    perfectToday: false,
    challengeClaimed: false,
    dailyChallengesCompleted: 0,
    // Streak Freeze
    streakFreezes: 1, // everyone starts with one free freeze
    freezesUsed: 0,
    lastFreezeAwardStreak: 0,
    // Daily XP Goal
    dailyGoal: DEFAULT_DAILY_GOAL,
    todayXP: 0,
    todayXPDate: null,
    goalStreak: 0,
    bestGoalStreak: 0,
    goalMetDate: null,
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
// Same day -> unchanged. Yesterday -> +1. A single missed day is covered by
// a Streak Freeze if one is available. Any bigger gap -> resets to 1.
function updateStreak(state) {
  const today = todayStr()
  if (state.lastActiveDate === today) return state
  const gap = state.lastActiveDate ? daysBetween(state.lastActiveDate, today) : null
  let streak = 1
  let streakFreezes = state.streakFreezes || 0
  let freezesUsed = state.freezesUsed || 0
  if (gap === 1) {
    streak = state.streak + 1
  } else if (gap === 2 && streakFreezes > 0) {
    // Exactly one day was missed — spend a freeze to keep the streak alive.
    streak = state.streak + 1
    streakFreezes -= 1
    freezesUsed += 1
  }
  const bestStreak = Math.max(state.bestStreak || 0, streak)

  // Award a new Streak Freeze every 7-day streak milestone, capped.
  let lastFreezeAwardStreak = state.lastFreezeAwardStreak || 0
  if (bestStreak >= lastFreezeAwardStreak + 7 && streakFreezes < MAX_STREAK_FREEZES) {
    streakFreezes = Math.min(MAX_STREAK_FREEZES, streakFreezes + 1)
    lastFreezeAwardStreak = lastFreezeAwardStreak + 7
  }

  return { ...state, streak, bestStreak, lastActiveDate: today, streakFreezes, freezesUsed, lastFreezeAwardStreak }
}

// Resets the per-day Daily Challenge counters whenever the date rolls over,
// then keeps them updated as tests complete today.
function updateDailyChallengeProgress(state, { score, total, perfect }) {
  const today = todayStr()
  if (state.challengeDate !== today) {
    state.challengeDate = today
    state.testsToday = 0
    state.correctToday = 0
    state.highScoreToday = false
    state.perfectToday = false
    state.challengeClaimed = false
  }
  state.testsToday += 1
  state.correctToday += score
  if (total > 0 && score / total >= 0.9) state.highScoreToday = true
  if (perfect) state.perfectToday = true
  return state
}

// Picks today's challenge deterministically (same challenge for everyone on
// a given calendar day) and reports current progress toward it.
export function getDailyChallenge(stateArg) {
  const state = stateArg || loadState()
  const today = todayStr()
  const challenge = DAILY_CHALLENGES[dayOfYear(today) % DAILY_CHALLENGES.length]
  const sameDay = state.challengeDate === today
  const progressMap = {
    testsToday: sameDay ? state.testsToday || 0 : 0,
    correctToday: sameDay ? state.correctToday || 0 : 0,
    highScoreToday: sameDay ? (state.highScoreToday ? 1 : 0) : 0,
    perfectToday: sameDay ? (state.perfectToday ? 1 : 0) : 0,
  }
  const progress = Math.min(challenge.target, progressMap[challenge.metric] || 0)
  const completed = progress >= challenge.target
  const claimed = sameDay ? !!state.challengeClaimed : false
  return { ...challenge, progress, completed, claimed }
}

// Grants the reward for today's completed-but-unclaimed Daily Challenge.
export function claimDailyChallenge() {
  const state = loadState()
  const today = todayStr()
  const challenge = getDailyChallenge(state)
  if (state.challengeDate !== today || !challenge.completed || challenge.claimed) {
    return { claimed: false, state }
  }
  state.xp += challenge.reward.xp
  state.coins = (state.coins || 0) + challenge.reward.coins
  state.challengeClaimed = true
  state.dailyChallengesCompleted = (state.dailyChallengesCompleted || 0) + 1

  const newlyUnlocked = []
  BADGES.forEach((b) => {
    if (!state.badges.includes(b.id) && b.check(state)) {
      state.badges.push(b.id)
      newlyUnlocked.push(b)
    }
  })

  saveState(state)
  return { claimed: true, reward: challenge.reward, newBadges: newlyUnlocked, state }
}

// Sets the user's personal daily XP goal (clamped to a sane range).
export function setDailyGoal(xp) {
  const state = loadState()
  state.dailyGoal = Math.max(MIN_DAILY_GOAL, Math.min(MAX_DAILY_GOAL, Math.round(xp) || DEFAULT_DAILY_GOAL))
  saveState(state)
  return state
}

// Spends coins to buy an extra Streak Freeze, up to the cap.
export function buyStreakFreeze() {
  const state = loadState()
  if ((state.streakFreezes || 0) >= MAX_STREAK_FREEZES) return { success: false, reason: 'max', state }
  if ((state.coins || 0) < STREAK_FREEZE_COST) return { success: false, reason: 'coins', state }
  state.coins -= STREAK_FREEZE_COST
  state.streakFreezes = (state.streakFreezes || 0) + 1
  saveState(state)
  return { success: true, state }
}

export function getStreakFreezeCost() {
  return STREAK_FREEZE_COST
}

export function getMaxStreakFreezes() {
  return MAX_STREAK_FREEZES
}

// Tracks today's XP toward the user's daily goal and their goal-day streak
// (consecutive calendar days on which the goal was met).
function updateDailyGoalProgress(state, xpEarned) {
  const today = todayStr()
  if (state.todayXPDate !== today) {
    state.todayXPDate = today
    state.todayXP = 0
  }
  state.todayXP += xpEarned

  const goal = state.dailyGoal || DEFAULT_DAILY_GOAL
  if (state.todayXP >= goal && state.goalMetDate !== today) {
    const gap = state.goalMetDate ? daysBetween(state.goalMetDate, today) : null
    state.goalStreak = gap === 1 ? (state.goalStreak || 0) + 1 : 1
    state.goalMetDate = today
    state.bestGoalStreak = Math.max(state.bestGoalStreak || 0, state.goalStreak)
  }
  return state
}

// Computes the longest run of consecutive correct answers from a test's
// answers array, and the bonus XP/coins it earns (see COMBO_TIERS).
export function computeCombo(answers) {
  if (!Array.isArray(answers) || answers.length === 0) return { bestCombo: 0, bonusXP: 0 }
  let current = 0
  let best = 0
  answers.forEach((a) => {
    const correct = a?.isCorrect ?? a?.wasCorrect ?? false
    if (correct) {
      current += 1
      best = Math.max(best, current)
    } else {
      current = 0
    }
  })
  const tier = COMBO_TIERS.find((t) => best >= t.min)
  return { bestCombo: best, bonusXP: tier ? tier.bonus : 0 }
}

/**
 * Call once per completed test. Returns everything the UI needs to show a
 * toast: xpEarned, leveledUp, newLevel, newBadges, streak.
 * `combo` is optional — pass the result of computeCombo(answers) when the
 * caller has access to per-question answers (testResults.js does).
 */
export function processTestCompletion({ score = 0, total = 0, combo = null }) {
  let state = loadState()
  const prevLevel = levelForXP(state.xp).level

  state = updateStreak(state)

  const passed = total > 0 && score / total >= 0.8
  const perfect = total > 0 && score === total
  let xpEarned = XP_PER_TEST_COMPLETE + score * XP_PER_CORRECT
  if (passed) xpEarned += XP_PASS_BONUS
  if (perfect) xpEarned += XP_PERFECT_BONUS

  const comboBonus = combo?.bonusXP || 0
  xpEarned += comboBonus
  if (combo && combo.bestCombo) {
    state.bestCombo = Math.max(state.bestCombo || 0, combo.bestCombo)
  }

  state.xp += xpEarned
  state.testsCompleted += 1
  state.totalCorrect += score
  state.totalQuestions += total
  if (perfect) state.perfectScores += 1
  state.coins = (state.coins || 0) + Math.round(xpEarned / 5)

  state = updateDailyChallengeProgress(state, { score, total, perfect })
  state = updateDailyGoalProgress(state, xpEarned)

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

  const challengeNowComplete = getDailyChallenge(state).completed && !state.challengeClaimed

  return {
    xpEarned,
    comboBonus,
    bestCombo: state.bestCombo,
    leveledUp,
    newLevel,
    newBadges: newlyUnlocked,
    streak: state.streak,
    coins: state.coins,
    challengeReady: challengeNowComplete,
    state,
  }
}

// Call once per app load/login for a signed-in user (see AppShell). Grants
// a small XP + coin reward for the day's first visit, on top of whatever
// a test session earns. Safe to call multiple times in the same day — a
// no-op after the first successful claim, guarded by lastLoginBonusDate
// (separate from lastActiveDate, since a user could complete a test and
// log in on the same day without double-claiming).
export function claimDailyLoginBonus() {
  let state = loadState()
  const today = todayStr()
  if (state.lastLoginBonusDate === today) {
    return { claimed: false, alreadyClaimedToday: true, streak: state.streak, state }
  }

  const prevLevel = levelForXP(state.xp).level
  state = updateStreak(state) // no-op if a test already advanced today's streak

  const xpEarned = LOGIN_BONUS_BASE_XP + Math.min(state.streak, LOGIN_BONUS_STREAK_CAP) * LOGIN_BONUS_XP_PER_STREAK_DAY
  const coinsEarned = Math.round(xpEarned / 5)
  state.xp += xpEarned
  state.coins = (state.coins || 0) + coinsEarned
  state.lastLoginBonusDate = today

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
    claimed: true,
    source: 'daily_login',
    xpEarned,
    coinsEarned,
    streak: state.streak,
    leveledUp,
    newLevel,
    newBadges: newlyUnlocked,
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
