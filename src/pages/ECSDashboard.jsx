import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HelpCircle, Clock, Trophy, CheckCircle2, Target, ArrowRight, Crown, Flame, Layers, RotateCcw, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AppShell from '../components/AppShell'
import { dashboardTopics, matchTopic } from '../data/dashboardTopics'
import { loadState, levelForXP } from '../lib/gamification'

const PASS_THRESHOLD = 70 // % — matches the real ECS pass mark used elsewhere in the app

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem('testHistory') || '[]')
  } catch {
    return []
  }
}

function StatCard({ icon: Icon, value, label, sub }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
        <Icon size={18} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {sub && <div className="text-xs text-blue-600 mt-1">{sub}</div>}
    </div>
  )
}

function ECSDashboard() {
  const { user } = useAuth()
  const firstName = (user?.name || 'there').split(' ')[0]
  const history = useMemo(loadHistory, [])
  const gamification = useMemo(loadState, [])
  const levelInfo = useMemo(() => levelForXP(gamification.xp), [gamification.xp])

  const stats = useMemo(() => {
    const testsTaken = history.length
    const questionsAnswered = history.reduce((sum, t) => sum + (Number(t.total) || 0), 0)
    const bestEntry = history.reduce((best, t) => (!best || t.percentage > best.percentage ? t : best), null)
    const passes = history.filter((t) => t.percentage >= PASS_THRESHOLD).length
    const passRate = testsTaken > 0 ? Math.round((passes / testsTaken) * 100) : 0
    const recentAvg =
      testsTaken > 0
        ? Math.round(history.slice(-5).reduce((sum, t) => sum + t.percentage, 0) / Math.min(5, testsTaken))
        : 0
    return { testsTaken, questionsAnswered, bestEntry, passRate, recentAvg }
  }, [history])

  const recentResults = useMemo(() => [...history].reverse().slice(0, 5), [history])

  const topicPerformance = useMemo(() => {
    const byTopic = {}
    history.forEach((t) => {
      const match = matchTopic(t.testLabel || t.testType || '')
      const key = match ? match.id : null
      if (!key) return
      if (!byTopic[key]) byTopic[key] = { total: 0, count: 0 }
      byTopic[key].total += t.percentage
      byTopic[key].count += 1
    })
    return dashboardTopics.map((topic) => {
      const data = byTopic[topic.id]
      return {
        ...topic,
        attempted: !!data,
        avg: data ? Math.round(data.total / data.count) : 0,
        count: data ? data.count : 0,
      }
    })
  }, [history])

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Track your progress and prepare for the test</p>
        </div>

        {/* Gamification widget */}
        <Link to="/achievements" className="block bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 text-white mb-6 hover:opacity-95 transition-opacity">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Trophy size={22} className="text-blue-300" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Level {levelInfo.level}</div>
                <div className="font-bold">{levelInfo.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <div className="text-slate-400 text-xs">XP</div>
                <div className="font-bold">{gamification.xp.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame size={16} className="text-blue-400" />
                <div>
                  <div className="text-slate-400 text-xs">Streak</div>
                  <div className="font-bold">{gamification.streak} {gamification.streak === 1 ? 'day' : 'days'}</div>
                </div>
              </div>
              <div className="hidden sm:block w-28">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: `${levelInfo.progressPct}%` }} />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Revision Centre quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link to="/flashcards" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Layers size={18} /></div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Flashcards</div>
              <div className="text-xs text-gray-500">Quick-fire revision</div>
            </div>
          </Link>
          <Link to="/revision/wrong-questions" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0"><RotateCcw size={18} /></div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Wrong Questions Only</div>
              <div className="text-xs text-gray-500">Master what you missed</div>
            </div>
          </Link>
          <Link to="/quick-review" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">⚡</div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Quick Revision</div>
              <div className="text-xs text-gray-500">One-page topic notes</div>
            </div>
          </Link>
          <Link to="/ai-quiz-generator" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Sparkles size={18} /></div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">AI Quiz Generator</div>
              <div className="text-xs text-gray-500">Instant quiz, any topic</div>
            </div>
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={HelpCircle} value={stats.questionsAnswered} label="Questions Answered" />
          <StatCard icon={Clock} value={stats.testsTaken} label="Tests Taken" />
          <StatCard
            icon={Trophy}
            value={stats.bestEntry ? `${stats.bestEntry.score}/${stats.bestEntry.total}` : '-'}
            label="Best Score"
            sub={stats.bestEntry ? `${stats.bestEntry.percentage}%` : null}
          />
          <StatCard icon={CheckCircle2} value={`${stats.passRate}%`} label="Pass Rate" />
        </div>

        {/* Pass probability */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wide text-blue-100 uppercase mb-1">Pass Probability</div>
              <div className="text-4xl font-extrabold">{stats.testsTaken > 0 ? `${stats.recentAvg}%` : '0%'}</div>
            </div>
            {stats.testsTaken === 0 ? (
              <Link to="/mock-test" className="inline-flex items-center gap-1.5 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                <Target size={16} /> Take your first test to see your probability.
              </Link>
            ) : (
              <Link to="/mock-test" className="inline-flex items-center gap-1.5 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                Take Another Test <ArrowRight size={16} />
              </Link>
            )}
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-4">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.testsTaken > 0 ? stats.recentAvg : 0}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Results */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Results</h3>
              <Link to="/mock-test" className="text-sm text-blue-600 font-medium hover:underline">Start Test →</Link>
            </div>
            {recentResults.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-3">No tests taken yet</p>
                <Link to="/mock-test" className="text-blue-600 font-medium hover:underline">Take your first Mock Test →</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentResults.map((r, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{r.testLabel || r.testType}</div>
                      <div className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</div>
                    </div>
                    <span className={`font-bold ${r.percentage >= PASS_THRESHOLD ? 'text-green-600' : 'text-red-600'}`}>
                      {r.score}/{r.total} ({r.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Topic Performance */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Topic Performance</h3>
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {topicPerformance.map((t) => (
                <Link
                  key={t.id}
                  to="/practice"
                  className="block group"
                >
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="flex items-center gap-2 text-gray-700 group-hover:text-blue-600 font-medium truncate">
                      <span>{t.icon}</span> {t.name}
                    </span>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">
                      {t.attempted ? `${t.avg}%` : 'Not started'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${t.attempted ? (t.avg >= PASS_THRESHOLD ? 'bg-green-500' : 'bg-slate-500') : 'bg-gray-200'}`}
                      style={{ width: `${t.attempted ? t.avg : 0}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
          <div className="flex items-center gap-2 mb-1">
            <Crown size={18} className="text-slate-500" />
            <h2 className="text-lg font-bold text-gray-900">Welcome back, {firstName}! 👋</h2>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Every feature is unlocked on your account — full mock tests, AI explanations, exam mode, analytics and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/mock-test" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Take a Test
            </Link>
            <Link to="/practice" className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
              Practice by Topic
            </Link>
            <Link to="/my-mistakes" className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
              Review Mistakes
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default ECSDashboard
