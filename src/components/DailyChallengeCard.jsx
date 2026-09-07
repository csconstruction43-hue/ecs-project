// components/DailyChallengeCard.jsx
// Shows today's rotating Daily Challenge (see DAILY_CHALLENGES in
// lib/gamification.js), the user's live progress toward it, and a Claim
// button once it's complete. Reused on the Dashboard and Achievements page.
import React, { useEffect, useState } from 'react'
import { Gift, CheckCircle2 } from 'lucide-react'
import { loadState, getDailyChallenge, claimDailyChallenge } from '../lib/gamification'

export default function DailyChallengeCard({ className = '' }) {
  const [challenge, setChallenge] = useState(() => getDailyChallenge(loadState()))
  const [claiming, setClaiming] = useState(false)

  // Re-read after any test completes so progress updates live without a
  // full page reload.
  useEffect(() => {
    function refresh() {
      setChallenge(getDailyChallenge(loadState()))
    }
    window.addEventListener('gamification:update', refresh)
    return () => window.removeEventListener('gamification:update', refresh)
  }, [])

  function handleClaim() {
    setClaiming(true)
    const result = claimDailyChallenge()
    if (result.claimed) {
      setChallenge(getDailyChallenge(result.state))
    }
    setClaiming(false)
  }

  const pct = Math.min(100, Math.round((challenge.progress / challenge.target) * 100))

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{challenge.icon}</span>
          <div className="text-xs font-semibold tracking-wide text-amber-600 uppercase">Daily Challenge</div>
        </div>
        <div className="text-xs text-gray-400 dark:text-slate-500">+{challenge.reward.xp} XP · +{challenge.reward.coins} coins</div>
      </div>
      <div className="font-semibold text-gray-900 dark:text-slate-100 text-sm mb-2">{challenge.title}</div>
      <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${challenge.completed ? 'bg-green-500' : 'bg-amber-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-slate-400">
          {challenge.progress}/{challenge.target} complete
        </span>
        {challenge.claimed ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
            <CheckCircle2 size={14} /> Claimed
          </span>
        ) : challenge.completed ? (
          <button
            onClick={handleClaim}
            disabled={claiming}
            className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
          >
            <Gift size={14} /> Claim reward
          </button>
        ) : (
          <span className="text-xs text-gray-400 dark:text-slate-500">Resets at midnight</span>
        )}
      </div>
    </div>
  )
}
