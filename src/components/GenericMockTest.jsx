// components/GenericMockTest.jsx
// One reusable test-taking engine shared by every "extra"/specialist ECS
// test page. Previously these routes had no component behind them at all,
// so they rendered the blank NotFoundPage — this component (backed by
// data/extraTests.js) fixes that for every one of them at once.
import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaClock, FaCheckCircle, FaTimesCircle, FaLightbulb, FaArrowRight, FaRedoAlt, FaTrophy, FaChartLine } from 'react-icons/fa'
import Seo from './Seo'
import AIExplainButton from './AIExplainButton'
import QuestionAudio from './QuestionAudio'
import LockedTestScreen from './LockedTestScreen'
import { useAuth } from '../context/AuthContext'
import { canAccessTest } from '../lib/testAccess'
import { recordTestResult } from '../lib/testResults'
import { extraTests } from '../data/extraTests'

function GenericMockTest() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isPro } = useAuth()
  const config = extraTests[location.pathname]

  // HSE uses config.getQuestions() to draw a fresh randomised 50-question
  // exam (following the official ECS topic distribution) on every attempt —
  // just like the real assessment, which draws randomly from its bank and
  // randomises answer order. Other tests use a fixed config.questions array.
  // restartKey forces a fresh draw when the user clicks "Try Again".
  const [restartKey, setRestartKey] = useState(0)
  const questions = useMemo(() => {
    if (!config) return []
    return typeof config.getQuestions === 'function' ? config.getQuestions() : (config.questions || [])
  }, [location.pathname, config, restartKey])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(config ? config.duration : 1800)
  const [answers, setAnswers] = useState([])
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    if (testCompleted || showResult || !config) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTestCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [testCompleted, showResult, currentIndex, config])

  useEffect(() => {
    if (testCompleted && config) {
      recordTestResult({ testType: location.pathname, testLabel: config.title, score, total: questions.length, answers })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCompleted])

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Test not found</h1>
          <p className="text-gray-500 mb-4">This test page doesn't exist yet.</p>
          <Link to="/mock-test" className="text-blue-600 font-semibold">← Back to all mock tests</Link>
        </div>
      </div>
    )
  }

  if (!canAccessTest(location.pathname, isPro)) {
    return <LockedTestScreen testName={config.title} />
  }

  const currentQ = questions[currentIndex]
  const passMark = config.passMark || 0.8

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = () => (timeLeft < 60 ? 'text-red-600' : timeLeft < 300 ? 'text-blue-500' : 'text-green-600')
  const getTimerBgColor = () => (timeLeft < 60 ? 'bg-red-100 border-red-200' : timeLeft < 300 ? 'bg-blue-100 border-blue-200' : 'bg-green-50 border-green-200')

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQ.correct
    if (isCorrect) setScore(score + 1)
    setAnswers([...answers, {
      id: currentIndex,
      question: currentQ.text,
      selected: answer,
      correct: currentQ.correct,
      explanation: currentQ.explanation,
      isCorrect,
      categoryId: currentQ.categoryId,
      category: currentQ.category,
    }])
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
      setShowResult(false)
      setSelectedAnswer(null)
    } else {
      setTestCompleted(true)
    }
  }

  const restartTest = () => {
    setRestartKey((k) => k + 1)
    setCurrentIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setTestCompleted(false)
    setTimeLeft(config.duration)
    setAnswers([])
    setShowReview(false)
  }

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= passMark * 100
    const correctCount = score
    const incorrectCount = questions.length - score

    // Topic-by-topic breakdown — only meaningful for the full 50-question
    // HSE exam, which spans all 11 official topics. Uses the categoryId
    // captured on each answer.
    let topicBreakdown = []
    if (config.isFullExam) {
      const grouped = {}
      for (const ans of answers) {
        if (!ans.categoryId) continue
        if (!grouped[ans.categoryId]) grouped[ans.categoryId] = { category: ans.category, correct: 0, total: 0 }
        grouped[ans.categoryId].total += 1
        if (ans.isCorrect) grouped[ans.categoryId].correct += 1
      }
      topicBreakdown = Object.entries(grouped)
        .map(([categoryId, { category, correct, total }]) => ({
          categoryId: Number(categoryId),
          category,
          correct,
          total,
          pct: total ? Math.round((correct / total) * 100) : 0,
        }))
        .sort((a, b) => a.pct - b.pct)
    }
    const weakTopics = topicBreakdown.filter((t) => t.pct < 70)

    const viewCertificate = () => {
      navigate('/certificate', {
        state: { testLabel: config.title, score, total: questions.length, percentage: Math.round(percentage) },
      })
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className={`p-6 text-center ${passed ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'} text-white`}>
              <div className="flex justify-center mb-4">
                {passed ? <FaTrophy className="text-5xl" /> : <FaTimesCircle className="text-5xl" />}
              </div>
              <h2 className="text-3xl font-bold mb-2">{passed ? 'Congratulations!' : 'Test Completed'}</h2>
              <p className="text-white/90">{passed ? `You passed the ${config.title}!` : 'Keep practicing — you\'ll get there!'}</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-gray-100 rounded-full px-8 py-4">
                  <div className={`text-5xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {score}/{questions.length}
                  </div>
                  <div className="text-gray-500 mt-1">{percentage.toFixed(1)}%</div>
                </div>
                <div className="mt-4 text-gray-600">
                  Pass mark: <span className="font-semibold">{Math.round(passMark * 100)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                  <FaCheckCircle className="text-green-600 text-2xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                  <div className="text-sm text-green-700">Correct Answers</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                  <FaTimesCircle className="text-red-600 text-2xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
                  <div className="text-sm text-red-700">Incorrect Answers</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl mb-8 ${passed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} text-center`}>
                {passed
                  ? `🎉 Excellent work! You're ready for the real ${config.title}.`
                  : `📚 You scored ${score}/${questions.length}. Review your answers below and try again.`}
              </div>

              {config.isFullExam && topicBreakdown.length > 0 && (
                <div className="mb-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">📊 Topic-by-Topic Breakdown</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    How you did across the {topicBreakdown.length} ECS HSE topics covered in this attempt.
                  </p>
                  <div className="space-y-3">
                    {topicBreakdown.map((t) => (
                      <div key={t.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{t.category}</span>
                          <span className={`font-semibold ${t.pct < 70 ? 'text-red-600' : t.pct < 100 ? 'text-blue-600' : 'text-green-600'}`}>
                            {t.correct}/{t.total} ({t.pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${t.pct < 70 ? 'bg-red-500' : t.pct < 100 ? 'bg-blue-500' : 'bg-green-500'}`}
                            style={{ width: `${t.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {weakTopics.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-3">
                        🎯 Focus your revision here — these topics scored under 70%:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {weakTopics.map((t) => (
                          <Link
                            key={t.categoryId}
                            to={`/ecs-hse-practice-${t.categoryId}`}
                            className="inline-block bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-red-200 transition"
                          >
                            Practice: {t.category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {passed && (
                <button onClick={viewCertificate} className="w-full bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition mb-6 flex items-center justify-center gap-2">
                  <FaTrophy /> Get Your Certificate
                </button>
              )}

              <button onClick={() => setShowReview(!showReview)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition mb-6 flex items-center justify-center gap-2">
                <FaChartLine />
                {showReview ? 'Hide Answer Review' : 'Show Detailed Answer Review'}
                <FaArrowRight className={`text-sm transition-transform ${showReview ? 'rotate-90' : ''}`} />
              </button>

              {showReview && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">📝 Detailed Answer Review:</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {answers.map((ans) => (
                      <div key={ans.id} className={`p-4 rounded-xl ${ans.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-sm flex-1">Q{ans.id + 1}: {ans.question}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ml-2 ${ans.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {ans.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          <span className="text-gray-600">Your answer:</span>{' '}
                          <span className={ans.isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>{ans.selected}</span>
                        </p>
                        {!ans.isCorrect && (
                          <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Correct answer:</span> {ans.correct}</p>
                        )}
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex items-start gap-2">
                            <FaLightbulb className="text-blue-500 text-sm mt-0.5" />
                            <p className="text-xs text-gray-600">{ans.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 mb-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <FaTrophy className="text-slate-500 text-xl" />
                  <h3 className="font-bold text-slate-800">Upgrade to Premium for Full Access</h3>
                </div>
                <Link to="/pricing" className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  ⭐ Upgrade to Premium
                </Link>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={restartTest} className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-600 hover:text-white transition font-semibold flex items-center gap-2">
                  <FaRedoAlt /> Try Again
                </button>
                <Link to="/mock-test" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition font-semibold">
                  📚 More Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4">
      <Seo title={`${config.title} 2026 | Free Practice Questions & Answers`} description={`Free ${config.title} with real ECS-style questions, instant answers and explanations.`} path={location.pathname} />
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {config.icon} {config.title}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{questions.length} questions | Pass mark: {Math.round(passMark * 100)}%</p>
            </div>
            <div className={`rounded-xl px-5 py-3 text-center ${getTimerBgColor()}`}>
              <div className={`text-3xl font-bold ${getTimerColor()} flex items-center gap-2`}>
                <FaClock className="text-xl" />
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Time Remaining</p>
            </div>
          </div>

          {config.info && (
            config.info.official ? (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <span className="font-semibold">📘 Sourced from the published ECS revision guide.</span> Every question here comes from
                the published ECS {config.info.sourceNote}.{' '}
                {config.isFullExam
                  ? "Each attempt draws 50 random questions following ECS's own topic distribution, exactly like the real assessment."
                  : 'This is a topic-focused practice set drawn only from the published ECS questions for this topic.'}{' '}
                {config.info.officialUrl && (
                  <a href={config.info.officialUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                    See ECS's page
                  </a>
                )}
                {config.isFullExam && (
                  <>
                    {' · '}
                    <Link to="/ecs-hse-practice" className="underline font-medium">
                      Practice by topic instead
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                <span className="font-semibold">⚠️ Unofficial practice questions.</span> {config.info.officialStatement}{' '}
                {config.info.disclaimer}{' '}
                {config.info.officialUrl && (
                  <a href={config.info.officialUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                    See ECS's guidance
                  </a>
                )}
              </div>
            )
          )}

          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>Score: <span className="font-bold text-green-600">{score}</span> / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-3 transition-all duration-500 ease-out" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="mb-4 flex justify-between items-center">
              <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                Question #{currentIndex + 1}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> {config.title}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed">{currentQ.text}</h2>

            <QuestionAudio text={currentQ.text} isPro={isPro} />

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const letters = ['A', 'B', 'C', 'D']
                let optionClass = 'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-3'
                if (showResult) {
                  if (option === currentQ.correct) optionClass += ' bg-green-50 border-green-500 shadow-sm'
                  else if (selectedAnswer === option && option !== currentQ.correct) optionClass += ' bg-red-50 border-red-500'
                  else optionClass += ' border-gray-200 bg-gray-50 opacity-60'
                } else {
                  optionClass += ' hover:border-green-500 hover:bg-green-50 border-gray-200 hover:shadow-md'
                }
                return (
                  <button key={idx} onClick={() => !showResult && handleAnswer(option)} className={optionClass} disabled={showResult}>
                    <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-full ${showResult && option === currentQ.correct ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {letters[idx]}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showResult && option === currentQ.correct && <FaCheckCircle className="text-green-500 text-xl" />}
                    {showResult && selectedAnswer === option && option !== currentQ.correct && <FaTimesCircle className="text-red-500 text-xl" />}
                  </button>
                )
              })}
            </div>

            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <FaLightbulb className="text-blue-600 text-lg" />
                  <span className="font-semibold text-blue-800">Explanation</span>
                </div>
                <p className="text-gray-700">{currentQ.explanation}</p>
                <AIExplainButton
                  explanation={currentQ.explanation}
                  topic={config.title}
                />
                <button onClick={nextQuestion} className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition w-full font-semibold flex items-center justify-center gap-2">
                  {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 text-white text-center shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FaTrophy className="text-slate-300" />
            <p className="font-semibold">Premium Members Get Full Access</p>
            <FaTrophy className="text-slate-300" />
          </div>
          <Link to="/pricing" className="inline-block bg-white text-green-700 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition shadow-md">
            Upgrade to Premium →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GenericMockTest
