// pages/AchievementsPage.jsx
import React, { useMemo, useState } from 'react'
import { Flame, Coins, Trophy, Lock, Snowflake, Target, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import {
  loadState,
  levelForXP,
  LEVELS,
  BADGES,
  buyStreakFreeze,
  getStreakFreezeCost,
  getMaxStreakFreezes,
  setDailyGoal,
} from '../lib/gamification'
import { getWeeklyRecap } from '../lib/testResults'
import DailyChallengeCard from '../components/DailyChallengeCard'

function Bar({ pct, colorClass = 'bg-gradient-to-r from-blue-500 to-purple-600' }) {
  return (
    <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className={`h-full ${colorClass} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function AchievementsPage() {
  const [state, setState] = useState(() => loadState())
  const [goalInput, setGoalInput] = useState(state.dailyGoal)
  const [buyMessage, setBuyMessage] = useState('')
  const levelInfo = useMemo(() => levelForXP(state.xp), [state.xp])
  const unlockedIds = new Set(state.badges || [])
  const weeklyRecap = useMemo(() => getWeeklyRecap(), [])
  const freezeCost = getStreakFreezeCost()
  const maxFreezes = getMaxStreakFreezes()
  const goalPct = Math.min(100, Math.round(((state.todayXP || 0) / (state.dailyGoal || 1)) * 100))

  function handleBuyFreeze() {
    const result = buyStreakFreeze()
    if (result.success) {
      setState(result.state)
      setBuyMessage('Streak Freeze purchased!')
    } else if (result.reason === 'max') {
      setBuyMessage(`You already have the max of ${maxFreezes} freezes.`)
    } else {
      setBuyMessage(`You need ${freezeCost} coins for a Streak Freeze.`)
    }
    setTimeout(() => setBuyMessage(''), 3000)
  }

  function handleSaveGoal() {
    const updated = setDailyGoal(Number(goalInput) || 50)
    setState(updated)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Trophy size={30} className="text-slate-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Achievements</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">Your XP, level, streak and unlocked badges</p>
        </div>
      </div>

      {/* Top stat row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <div className="text-xs text-gray-500 dark:text-slate-400 mb-1">Total XP</div>
          <div className="text-3xl font-bold text-blue-600">{state.xp.toLocaleString()}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <div className="text-xs text-gray-500 dark:text-slate-400 mb-1 flex items-center gap-1"><Flame size={12} className="text-blue-500" /> Current Streak</div>
          <div className="text-3xl font-bold text-blue-500">{state.streak} {state.streak === 1 ? 'day' : 'days'}</div>
          <div className="text-xs text-gray-400 mt-1">Best: {state.bestStreak} days</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <div className="text-xs text-gray-500 dark:text-slate-400 mb-1 flex items-center gap-1"><Coins size={12} className="text-slate-500" /> Coins</div>
          <div className="text-3xl font-bold text-slate-600">{(state.coins || 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Daily Challenge */}
      <DailyChallengeCard className="mb-6" />

      {/* Streak Freeze + Daily Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Streak Freeze */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Snowflake size={16} className="text-sky-500" />
            <div className="text-xs font-semibold tracking-wide text-sky-600 uppercase">Streak Freeze</div>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
            Protects your streak if you miss a day. You earn one free freeze every 7-day streak, or buy one with coins.
          </p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {state.streakFreezes || 0}<span className="text-sm text-gray-400 font-normal"> / {maxFreezes} available</span>
            </span>
            <button
              onClick={handleBuyFreeze}
              className="text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Buy for {freezeCost} coins
            </button>
          </div>
          {buyMessage && <div className="text-xs text-sky-600 font-medium">{buyMessage}</div>}
        </div>

        {/* Daily XP Goal */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-purple-500" />
            <div className="text-xs font-semibold tracking-wide text-purple-600 uppercase">Daily XP Goal</div>
          </div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-700 dark:text-slate-300 font-medium">{state.todayXP || 0} / {state.dailyGoal} XP today</span>
            <span className="text-xs text-gray-400">Goal streak: {state.goalStreak || 0}d</span>
          </div>
          <Bar pct={goalPct} colorClass="bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex items-center gap-2 mt-3">
            <input
              type="number"
              min={20}
              max={500}
              step={10}
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="w-24 text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100"
            />
            <button
              onClick={handleSaveGoal}
              className="text-xs font-semibold bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Set goal
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Recap */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 mb-8">
        <div className="text-xs font-semibold tracking-wide text-gray-500 dark:text-slate-400 uppercase mb-3">This Week vs Last Week</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Tests taken</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-slate-100">{weeklyRecap.thisWeek.tests}</span>
              <span className="text-xs text-gray-400">vs {weeklyRecap.lastWeek.tests} last week</span>
              {weeklyRecap.testsDelta > 0 && <TrendingUp size={14} className="text-green-500" />}
              {weeklyRecap.testsDelta < 0 && <TrendingDown size={14} className="text-red-500" />}
              {weeklyRecap.testsDelta === 0 && <Minus size={14} className="text-gray-300" />}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Average score</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {weeklyRecap.thisWeek.tests > 0 ? `${weeklyRecap.thisWeek.avg}%` : '-'}
              </span>
              {weeklyRecap.avgDelta !== null && (
                <span className={`text-xs font-medium ${weeklyRecap.avgDelta >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {weeklyRecap.avgDelta >= 0 ? '+' : ''}{weeklyRecap.avgDelta}pt vs last week
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Level progress */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs font-semibold tracking-wide text-blue-500 uppercase">Level {levelInfo.level}</div>
            <div className="text-xl font-bold text-gray-900 dark:text-slate-100">{levelInfo.title}</div>
          </div>
          {levelInfo.next && (
            <div className="text-right text-xs text-gray-500 dark:text-slate-400">
              {levelInfo.xpForNext - levelInfo.xpIntoLevel} XP to Level {levelInfo.next.level}<br />
              <span className="font-semibold text-gray-700 dark:text-slate-300">{levelInfo.next.title}</span>
            </div>
          )}
        </div>
        <Bar pct={levelInfo.progressPct} />
        <div className="flex flex-wrap gap-1.5 mt-4">
          {LEVELS.map((l) => (
            <div
              key={l.level}
              title={l.title}
              className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                l.level <= levelInfo.level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500'
              }`}
            >
              Lv{l.level}
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-4">
          Badges <span className="text-sm font-normal text-gray-400">({unlockedIds.size}/{BADGES.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const unlocked = unlockedIds.has(b.id)
            return (
              <div
                key={b.id}
                className={`rounded-xl border p-4 text-center transition-colors ${
                  unlocked
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    : 'bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{unlocked ? b.icon : <Lock size={26} className="mx-auto text-gray-300" />}</div>
                <div className="font-semibold text-sm text-gray-900 dark:text-slate-100">{b.name}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{b.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
