// pages/AIQuizGeneratorPage.jsx
// Phase 3 AI feature: lets a Pro user pick any ECS topic (or type a custom
// one) plus a question count and difficulty, then has the AI generate a
// brand-new multiple-choice quiz on the spot — instead of being limited to
// the fixed question bank in src/data/questions.js. Reuses QuestionCard for
// the actual quiz-taking UI so it feels identical to every other test in
// the app, and records the result through the same recordTestResult() path
// so it shows up in Analytics / XP / Dashboard history like any other test.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Loader2, RefreshCw, ArrowLeft, Trophy } from 'lucide-react'
import AppShell from '../components/AppShell'
import QuestionCard from '../components/QuestionCard'
import { useAuth } from '../context/AuthContext'
import { generateQuiz } from '../lib/aiApi'
import { recordTestResult } from '../lib/testResults'
import Seo from '../components/Seo'
import { dashboardTopics } from '../data/dashboardTopics'

const COUNT_OPTIONS = [5, 10, 15, 20]
const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'hard', label: 'Hard' },
]

function AIQuizGeneratorPage() {
  const { isPro } = useAuth()
  const [topic, setTopic] = useState('')
  const [count, setCount] = useState(10)
  const [difficulty, setDifficulty] = useState('mixed')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [quiz, setQuiz] = useState(null) // { topic, difficulty, questions }
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const handleGenerate = async (topicOverride) => {
    const chosenTopic = (topicOverride ?? topic).trim()
    if (!chosenTopic) { setError('Pick a topic or type your own first.'); return }
    setError('')
    setLoading(true)
    try {
      const result = await generateQuiz({ topic: chosenTopic, count, difficulty })
      setQuiz(result)
      setCurrentIdx(0)
      setScore(0)
      setAnswers([])
      setFinished(false)
    } catch (err) {
      setError(err.message || 'Could not generate a quiz right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (isCorrect, explanation, advance) => {
    if (advance) {
      // "Next Question →" / "See Results" click from QuestionCard
      if (currentIdx + 1 >= quiz.questions.length) {
        setFinished(true)
        recordTestResult({
          testType: 'ai-quiz',
          testLabel: `AI Quiz: ${quiz.topic}`,
          score,
          total: quiz.questions.length,
          answers,
        })
      } else {
        setCurrentIdx((i) => i + 1)
      }
      return
    }
    if (isCorrect === null) return
    const q = quiz.questions[currentIdx]
    setScore((s) => s + (isCorrect ? 1 : 0))
    setAnswers((a) => [...a, {
      question: q.text,
      userAnswer: null, // QuestionCard doesn't hand us the picked option here; correctness is enough for scoring/wrong-bank
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      topic: quiz.topic,
      isCorrect,
    }])
  }

  const resetToForm = () => {
    setQuiz(null)
    setFinished(false)
  }

  return (
    <AppShell>
      <Seo
        title="AI Quiz Generator | ECSPrep"
        description="Generate a custom ECS practice quiz on any topic and difficulty with ECSPrep's AI quiz tool, for Pro members who want targeted extra practice."
        path="/ai-quiz-generator"
        noindex
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Quiz Generator</h1>
            <p className="text-sm text-gray-500">Fresh ECS-style practice questions on any topic, generated instantly.</p>
          </div>
        </div>

        {!isPro && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm text-slate-800">
            The AI Quiz Generator is a Pro feature.{' '}
            <Link to="/plans" className="font-semibold underline">Upgrade to unlock it →</Link>
          </div>
        )}

        {/* Setup form */}
        {!quiz && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Choose a topic</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {dashboardTopics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTopic(t.name)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    topic === t.name
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {t.icon} {t.name}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="...or type any topic, e.g. 'working near overhead power lines'"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Questions</label>
                <div className="flex gap-2">
                  {COUNT_OPTIONS.map((n) => (
                    <button
                      key={n}
                      onClick={() => setCount(n)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        count === n ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <div className="flex gap-2">
                  {DIFFICULTY_OPTIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDifficulty(d.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        difficulty === d.value ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

            <button
              onClick={() => handleGenerate()}
              disabled={loading || !isPro}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (<><Loader2 size={18} className="animate-spin" /> Generating your quiz…</>) : (<><Sparkles size={18} /> Generate Quiz</>)}
            </button>
          </div>
        )}

        {/* Quiz in progress */}
        {quiz && !finished && (
          <>
            <div className="flex items-center justify-between mb-4">
              <button onClick={resetToForm} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ArrowLeft size={14} /> New quiz
              </button>
              <span className="text-sm font-medium text-gray-500">{quiz.topic} · {quiz.difficulty}</span>
            </div>
            <QuestionCard
              question={quiz.questions[currentIdx]}
              onAnswer={handleAnswer}
              showExplanation
              currentNumber={currentIdx + 1}
              totalQuestions={quiz.questions.length}
              isPro={isPro}
            />
          </>
        )}

        {/* Results */}
        {quiz && finished && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Trophy size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Quiz complete!</h2>
            <p className="text-gray-500 mb-4">{quiz.topic}</p>
            <div className="text-4xl font-bold text-blue-600 mb-6">
              {score} / {quiz.questions.length}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleGenerate(quiz.topic)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                <RefreshCw size={16} /> Generate another
              </button>
              <button
                onClick={resetToForm}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                New topic
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}

export default AIQuizGeneratorPage
