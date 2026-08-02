// components/XPToast.jsx
// Mounted once near the root of the app (see App.jsx). Listens for the
// "gamification:update" event dispatched by recordTestResult() whenever any
// test — mock test, topic practice, or any specialist ECS card test —
// finishes, and shows a small toast: XP earned, level-up, and any newly
// unlocked badges. Fully decoupled from every individual test page.
import React, { useEffect, useState } from 'react'
import { Sparkles, Trophy, Flame } from 'lucide-react'

export default function XPToast() {
  const [toast, setToast] = useState(null)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    function handle(e) {
      const { xpEarned, leveledUp, newLevel, newBadges, streak } = e.detail || {}
      if (!xpEarned) return
      setLeaving(false)
      setToast({ xpEarned, leveledUp, newLevel, newBadges: newBadges || [], streak })
    }
    window.addEventListener('gamification:update', handle)
    return () => window.removeEventListener('gamification:update', handle)
  }, [])

  useEffect(() => {
    if (!toast) return
    const dismissTimer = setTimeout(() => setLeaving(true), 4500)
    const clearTimer = setTimeout(() => setToast(null), 4800)
    return () => {
      clearTimeout(dismissTimer)
      clearTimeout(clearTimer)
    }
  }, [toast])

  if (!toast) return null

  return (
    <div
      className={`fixed top-4 right-4 z-[100] w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl p-4 ${
        leaving ? 'xp-toast-exit' : 'xp-toast-enter'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
          <Sparkles size={18} />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-gray-900 dark:text-slate-100 text-sm">+{toast.xpEarned} XP earned!</div>
          {toast.streak > 1 && (
            <div className="text-xs text-blue-500 flex items-center gap-1 mt-0.5">
              <Flame size={12} /> {toast.streak}-day streak
            </div>
          )}
        </div>
      </div>

      {toast.leveledUp && (
        <div className="mt-2 flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
          <Trophy size={14} /> Level up! You're now Level {toast.newLevel}
        </div>
      )}

      {toast.newBadges.map((b) => (
        <div key={b.id} className="mt-2 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/20 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-400">
          <span className="text-base">{b.icon}</span> Badge unlocked: {b.name}
        </div>
      ))}
    </div>
  )
}
