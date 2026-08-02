// pages/AchievementsPage.jsx
import React, { useMemo } from 'react'
import { Flame, Coins, Trophy, Lock } from 'lucide-react'
import { loadState, levelForXP, LEVELS, BADGES } from '../lib/gamification'

function Bar({ pct }) {
  return (
    <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function AchievementsPage() {
  const state = useMemo(loadState, [])
  const levelInfo = useMemo(() => levelForXP(state.xp), [state.xp])
  const unlockedIds = new Set(state.badges || [])

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
