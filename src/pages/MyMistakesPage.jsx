import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Calendar,
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  X
} from 'lucide-react'
import { getWrongQuestionsBank } from '../lib/testResults'

// "Mastered" is a lightweight personal tag layered on top of the real
// wrong-answers bank (lib/testResults.js) — it doesn't remove the question
// from Revision Centre's "Wrong Questions Only" mode, it's just a way to
// mark "I know this one now" while still keeping the history.
const MASTERED_KEY = 'masteredMistakes'

function loadMasteredSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(MASTERED_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

function saveMasteredSet(set) {
  try {
    localStorage.setItem(MASTERED_KEY, JSON.stringify(Array.from(set)))
  } catch {
    // ignore quota errors
  }
}

// The bank only tracks how many times a question's been missed, not an
// explicit difficulty — this derives a reasonable label from that.
function difficultyFromTimesWrong(timesWrong) {
  if (timesWrong >= 3) return 'Hard'
  if (timesWrong === 2) return 'Medium'
  return 'Easy'
}

function buildMistakesFromBank(masteredSet) {
  return getWrongQuestionsBank().map((q, i) => ({
    id: q.question || `mistake-${i}`,
    text: q.question,
    userAnswer: q.userAnswer || '',
    correctAnswer: q.correctAnswer,
    topic: q.topic || 'General',
    date: q.lastSeen || new Date().toISOString(),
    explanation: q.explanation || 'No explanation was recorded for this question.',
    difficulty: difficultyFromTimesWrong(q.timesWrong || 1),
    attemptedCount: q.timesWrong || 1,
    mastered: masteredSet.has(q.question),
  }))
}

const MyMistakesPage = () => {
  const [, setMasteredSet] = useState(loadMasteredSet)
  const [mistakes, setMistakes] = useState(() => buildMistakesFromBank(loadMasteredSet()))
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'

  const topics = ['all', ...new Set(mistakes.map(m => m.topic))]
  const difficulties = ['all', 'Easy', 'Medium', 'Hard']

  const filteredMistakes = mistakes.filter(mistake => {
    const matchesSearch = mistake.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mistake.userAnswer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = selectedTopic === 'all' || mistake.topic === selectedTopic
    const matchesDifficulty = selectedDifficulty === 'all' || mistake.difficulty === selectedDifficulty
    return matchesSearch && matchesTopic && matchesDifficulty
  })

  const stats = useMemo(() => ({
    total: mistakes.length,
    mastered: mistakes.filter(m => m.mastered).length,
    inProgress: mistakes.filter(m => !m.mastered).length,
    topics: new Set(mistakes.map(m => m.topic)).size,
  }), [mistakes])

  const handleMarkMastered = (id) => {
    setMasteredSet((prevSet) => {
      const next = new Set(prevSet)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      saveMasteredSet(next)
      setMistakes((prev) => prev.map((m) => (m.id === id ? { ...m, mastered: next.has(id) } : m)))
      return next
    })
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-slate-600 bg-slate-50'
      case 'Hard': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const MistakeCard = ({ mistake, isExpanded }) => {
    const isMastered = mistake.mastered
    
    return (
      <div className={`bg-white rounded-xl shadow-sm border transition-all ${
        isMastered ? 'border-green-200 bg-gradient-to-r from-white to-green-50' : 'border-gray-200'
      } hover:shadow-md`}>
        <div className="p-5">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 bg-red-100 text-red-700 rounded-full">
                  {mistake.topic}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor(mistake.difficulty)}`}>
                  {mistake.difficulty}
                </span>
                {isMastered && (
                  <span className="text-xs font-medium px-2.5 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} /> Mastered
                  </span>
                )}
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} /> {new Date(mistake.date).toLocaleDateString()}
                </span>
              </div>

              {/* Question */}
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                {mistake.text}
              </h3>

              {/* Answers */}
              <div className="space-y-2 mb-3">
                {mistake.userAnswer && (
                  <div className="flex items-start gap-2">
                    <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-gray-600">Your answer: </span>
                      <span className="text-sm text-red-600 font-medium">{mistake.userAnswer}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-600">Correct answer: </span>
                    <span className="text-sm text-green-600 font-medium">{mistake.correctAnswer}</span>
                  </div>
                </div>
              </div>

              {/* Attempts */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <RotateCcw size={14} /> Missed {mistake.attemptedCount} time{mistake.attemptedCount !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Expandable Explanation */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : mistake.id)}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1 mt-2"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {isExpanded ? 'Hide Explanation' : 'Show Explanation'}
              </button>

              {isExpanded && (
                <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-slideDown">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">💡 Explanation:</span> {mistake.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Link
                to="/revision/wrong-questions"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition transform hover:scale-105 shadow-md hover:shadow-lg text-center"
              >
                Practice Again
              </Link>
              <button
                onClick={() => handleMarkMastered(mistake.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isMastered
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'border border-green-500 text-green-600 hover:bg-green-50'
                }`}
              >
                {isMastered ? '✓ Mastered' : 'Mark as Mastered'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MistakeGridCard = ({ mistake }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium px-2.5 py-1 bg-red-100 text-red-700 rounded-full">
          {mistake.topic}
        </span>
        {mistake.mastered && <CheckCircle size={18} className="text-green-500" />}
      </div>
      <p className="font-medium text-gray-900 mb-3 line-clamp-2">{mistake.text}</p>
      <div className="space-y-1 mb-3 text-sm">
        {mistake.userAnswer && (
          <p className="flex items-center gap-1">
            <XCircle size={14} className="text-red-500" />
            <span className="text-gray-600">{mistake.userAnswer}</span>
          </p>
        )}
        <p className="flex items-center gap-1">
          <CheckCircle size={14} className="text-green-500" />
          <span className="text-gray-600">{mistake.correctAnswer}</span>
        </p>
      </div>
      <Link
        to="/revision/wrong-questions"
        className="block w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition text-center"
      >
        Practice Again
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={36} className="text-red-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Mistakes
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Every question you've gotten wrong across your mock tests, pulled automatically as you practice.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Mistakes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <AlertCircle size={32} className="text-red-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Mastered</p>
                <p className="text-2xl font-bold text-green-600">{stats.mastered}</p>
              </div>
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${stats.total ? (stats.mastered / stats.total) * 100 : 0}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <TrendingUp size={32} className="text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Topics Covered</p>
                <p className="text-2xl font-bold text-blue-600">{stats.topics}</p>
              </div>
              <BookOpen size={32} className="text-blue-400" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions or answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>
                  {topic === 'all' ? 'All Topics' : topic}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Difficulties' : diff}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2.5 rounded-lg font-medium transition ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2.5 rounded-lg font-medium transition ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grid View
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredMistakes.length} of {mistakes.length} mistakes
          </p>
          {filteredMistakes.length > 0 && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedTopic('all')
                setSelectedDifficulty('all')
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Mistakes Display */}
        {filteredMistakes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mistakes to show!</h3>
            <p className="text-gray-600">
              {mistakes.length === 0 
                ? "You haven't gotten any questions wrong yet — take a mock test and anything you miss will show up here automatically." 
                : "No mistakes match your filters. Try adjusting your search criteria."}
            </p>
            {mistakes.length === 0 && (
              <Link
                to="/mock-test"
                className="inline-block mt-5 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Take a mock test
              </Link>
            )}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredMistakes.map((mistake) => (
              <MistakeCard 
                key={mistake.id} 
                mistake={mistake} 
                isExpanded={expandedId === mistake.id}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMistakes.map((mistake) => (
              <MistakeGridCard key={mistake.id} mistake={mistake} />
            ))}
          </div>
        )}

        {/* Motivation Section */}
        {stats.inProgress > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Keep Practicing! 🎯</h3>
                <p className="text-blue-100">
                  You have {stats.inProgress} question{stats.inProgress !== 1 ? 's' : ''} to master. 
                  Practice them regularly to improve your score!
                </p>
              </div>
              <Link to="/revision/wrong-questions" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition">
                Start Practice Session
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default MyMistakesPage
