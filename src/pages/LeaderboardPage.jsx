// pages/LeaderboardPage.jsx
// Public leaderboard of top scorers. Names are shown as "First L." for
// privacy — see the backend's /api/leaderboard endpoint.
import React, { useEffect, useState } from 'react'
import { Trophy, Medal, Loader2, Crown } from 'lucide-react'
import { apiRequest } from '../lib/api'
import Seo from '../components/Seo'

const medalColors = ['text-slate-500', 'text-gray-400', 'text-blue-700']

function LeaderboardPage() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest('/api/leaderboard', { auth: false })
      .then((data) => setEntries(data.leaderboard))
      .catch((err) => setError(err.message || 'Could not load the leaderboard.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Seo
        title="ECS Mock Test Leaderboard | Top Scorers"
        description="See how your ECS mock test scores compare to other ECSPrep users. Complete tests to climb the leaderboard."
        path="/leaderboard"
      />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Trophy className="mx-auto text-blue-600 mb-3" size={36} />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-500 mt-2">Top ECS mock test scores this season</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
            <Loader2 className="animate-spin" size={20} /> Loading leaderboard...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {entries.length === 0 && (
              <div className="p-10 text-center text-gray-400">
                No scores yet — be the first! Complete a mock test to appear here.
              </div>
            )}
            {entries.map((entry, i) => (
              <div
                key={`${entry.name}-${i}`}
                className={`flex items-center gap-4 px-6 py-4 ${i !== entries.length - 1 ? 'border-b border-gray-100' : ''} ${i < 3 ? 'bg-blue-50/40' : ''}`}
              >
                <div className="w-8 text-center font-bold text-gray-400 flex items-center justify-center">
                  {i < 3 ? <Medal className={medalColors[i]} size={22} /> : i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    {entry.name}
                    {entry.isPro && (
                      <span className="text-[10px] uppercase tracking-wide bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Crown size={10} /> Pro
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400">{entry.testsCompleted} test{entry.testsCompleted === 1 ? '' : 's'} completed</p>
                </div>
                <div className="text-xl font-bold text-blue-600">{entry.bestScore}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeaderboardPage
