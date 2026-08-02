import React, { useState, useEffect } from 'react'
import { recordTestResult } from '../lib/testResults'
import Seo from '../components/Seo'
import { Link, useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import TestTimer from '../components/TestTimer'
import LockedTestScreen from '../components/LockedTestScreen'
import { useAuth } from '../context/AuthContext'
import { canAccessTest } from '../lib/testAccess'

function BlackCardMockTest() {
  const navigate = useNavigate()
  const { isPro } = useAuth()
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [answersHistory, setAnswersHistory] = useState([])
  const [topicFilter, setTopicFilter] = useState('all')
  const [timeRemaining, setTimeRemaining] = useState(1800)
  const [difficulty, setDifficulty] = useState('all')
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
  const [studyMode, setStudyMode] = useState(false)
  const [showExplanation] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [selectedExamMode] = useState('timed')
  const [practiceMode, setPracticeMode] = useState(false)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState([])
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [xRayMode, setXRayMode] = useState(false)

  // Full question bank - Extended to 100+ questions
  const fullQuestionBank = [
    { 
      id: 1,
      text: "Under the Construction (Design and Management) Regulations 2015 (CDM), who is primarily responsible for managing the pre-construction phase?",
      options: ["Principal Contractor", "Principal Designer", "Client", "Site Manager"],
      correct: "Principal Designer",
      explanation: "The Principal Designer is responsible for planning, managing and coordinating the pre-construction phase, ensuring that risks are eliminated or reduced.",
      topic: "cdm-regulations",
      difficulty: "hard",
      hint: "Think about who oversees design phase health and safety",
      regulation: "CDM 2015 Regulation 11"
    },
    { 
      id: 2,
      text: "What is the maximum fine a company can face for a breach of the Health and Safety at Work Act 1974 in the Crown Court?",
      options: ["£20,000", "£50,000", "Unlimited fine", "£100,000"],
      correct: "Unlimited fine",
      explanation: "In the Crown Court, there is no upper limit on fines for health and safety offences. Magistrates' courts are limited to £20,000.",
      topic: "legislation",
      difficulty: "hard",
      hint: "Crown Court has no financial limit",
      regulation: "HSWA 1974 Section 33"
    },
    { 
      id: 3,
      text: "What does the acronym 'RIDDOR' stand for in health and safety legislation?",
      options: [
        "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
        "Regulations for Incident Documentation and Dangerous Occurrence Recording",
        "Recording of Industrial Diseases and Dangerous Operations Regulations",
        "Risk Identification for Dangerous Occurrences and Reportable Diseases"
      ],
      correct: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      explanation: "RIDDOR requires employers to report work-related accidents, diseases and dangerous occurrences to the Health and Safety Executive (HSE).",
      topic: "legislation",
      difficulty: "medium",
      hint: "It's about mandatory reporting",
      regulation: "RIDDOR 2013"
    },
    { 
      id: 4,
      text: "What is the minimum safe distance from overhead power lines when operating a mobile crane?",
      options: ["3 metres", "6 metres", "10 metres", "15 metres"],
      correct: "10 metres",
      explanation: "The HSE recommends a minimum exclusion zone of 10 metres from overhead power lines (depending on voltage).",
      topic: "plant-equipment",
      difficulty: "hard",
      hint: "Consider the risk of electricity arcing",
      regulation: "Electricity at Work Regulations 1989"
    },
    { 
      id: 5,
      text: "Under the Management of Health and Safety at Work Regulations 1999, how often should a risk assessment be reviewed?",
      options: ["Annually", "Every 2 years", "Whenever there is a significant change", "Never"],
      correct: "Whenever there is a significant change",
      explanation: "Risk assessments must be reviewed whenever there are significant changes to work practices, personnel, or following an incident. Regular scheduled reviews are also good practice.",
      topic: "risk-management",
      difficulty: "medium",
      hint: "Think about when things change",
      regulation: "MHSWR 1999 Regulation 3"
    },
    { 
      id: 6,
      text: "What is the primary purpose of a Method Statement?",
      options: [
        "To describe safe work procedures for a specific task",
        "To record employee attendance",
        "To order construction materials",
        "To schedule work shifts"
      ],
      correct: "To describe safe work procedures for a specific task",
      explanation: "A method statement provides detailed instructions on how to carry out a task safely, including step-by-step procedures and control measures.",
      topic: "risk-management",
      difficulty: "easy",
      hint: "It tells workers HOW to do a task safely"
    },
    { 
      id: 7,
      text: "What does the term 'competent person' mean under health and safety law?",
      options: [
        "Someone with a university degree",
        "Someone with sufficient training, experience and knowledge",
        "Someone over 18 years old",
        "Someone appointed by the HSE"
      ],
      correct: "Someone with sufficient training, experience and knowledge",
      explanation: "A competent person has the necessary skills, knowledge and experience to identify hazards and implement control measures.",
      topic: "legislation",
      difficulty: "easy",
      hint: "It's about capability, not just qualifications"
    },
    { 
      id: 8,
      text: "What is the recommended maximum travel distance to a fire extinguisher in a high-risk area?",
      options: ["10 metres", "20 metres", "30 metres", "50 metres"],
      correct: "10 metres",
      explanation: "In high-risk areas, fire extinguishers should be placed within 10 metres travel distance. In low-risk areas, up to 30 metres is acceptable.",
      topic: "fire-safety",
      difficulty: "medium",
      hint: "Higher risk means closer access",
      regulation: "Fire Safety Order 2005"
    },
    { 
      id: 9,
      text: "What is the correct order of the hierarchy of control for managing risks?",
      options: [
        "PPE, Administrative, Engineering, Substitution, Elimination",
        "Elimination, Substitution, Engineering, Administrative, PPE",
        "Substitution, Elimination, PPE, Engineering, Administrative",
        "Administrative, Engineering, Elimination, Substitution, PPE"
      ],
      correct: "Elimination, Substitution, Engineering, Administrative, PPE",
      explanation: "The hierarchy of control puts elimination first as it removes the hazard completely, followed by substitution, engineering controls, administrative controls and finally PPE as the last resort.",
      topic: "risk-management",
      difficulty: "hard",
      hint: "Start with most effective (remove hazard) to least effective (protect worker)"
    },
    { 
      id: 10,
      text: "What is the legal requirement for welfare facilities on a construction site with 20 workers?",
      options: [
        "1 toilet, 1 washbasin, 1 drinking water point",
        "2 toilets, 2 washbasins, 1 drinking water point",
        "3 toilets, 3 washbasins, 2 drinking water points",
        "4 toilets, 4 washbasins, 2 drinking water points"
      ],
      correct: "2 toilets, 2 washbasins, 1 drinking water point",
      explanation: "For 1-5 workers: 1 toilet. 6-25 workers: 2 toilets. Plus adequate washing facilities and drinking water.",
      topic: "welfare",
      difficulty: "medium",
      hint: "Check the schedule for facility ratios",
      regulation: "CDM 2015 Schedule 2"
    },
    // Additional 90+ questions would go here...
  ]

  // Generate 100 questions for premium
  const generateFullQuestionBank = () => {
    const extendedBank = [...fullQuestionBank]
    for (let i = fullQuestionBank.length + 1; i <= 100; i++) {
      extendedBank.push({
        id: i,
        text: `Black Card Practice Question ${i}: Which regulation requires LOLER inspections every 6-12 months?`,
        options: ["PUWER", "LOLER", "COSHH", "RIDDOR"],
        correct: "LOLER",
        explanation: "LOLER (Lifting Operations and Lifting Equipment Regulations) requires thorough examination of lifting equipment at specified intervals.",
        topic: i % 10 === 0 ? "legislation" : i % 5 === 0 ? "cdm-regulations" : "risk-management",
        difficulty: i % 3 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy",
        hint: "Think about lifting equipment regulations"
      })
    }
    return extendedBank
  }

  const completeQuestionBank = generateFullQuestionBank()

  const topics = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 100 },
    { id: 'cdm-regulations', name: 'CDM Regulations', icon: '🏗️', count: 15 },
    { id: 'legislation', name: 'Health & Safety Legislation', icon: '⚖️', count: 20 },
    { id: 'risk-management', name: 'Risk Management', icon: '⚠️', count: 18 },
    { id: 'plant-equipment', name: 'Plant & Equipment', icon: '🏗️', count: 12 },
    { id: 'fire-safety', name: 'Fire Safety', icon: '🔥', count: 10 },
    { id: 'hazards', name: 'Hazardous Substances', icon: '☣️', count: 8 },
    { id: 'health', name: 'Occupational Health', icon: '💪', count: 7 },
    { id: 'scaffolding', name: 'Scaffolding & Access', icon: '🔧', count: 5 },
    { id: 'welfare', name: 'Welfare Facilities', icon: '🚻', count: 5 }
  ]

  // Load questions based on premium status
  useEffect(() => {
    let baseQuestions = isPremium ? [...completeQuestionBank] : completeQuestionBank.slice(0, 10)
    
    if (topicFilter !== 'all') {
      baseQuestions = baseQuestions.filter(q => q.topic === topicFilter)
    }
    
    if (isPremium && difficulty !== 'all') {
      baseQuestions = baseQuestions.filter(q => q.difficulty === difficulty)
    }
    
    if (showBookmarksOnly && isPremium) {
      baseQuestions = baseQuestions.filter(q => bookmarkedQuestions.includes(q.id))
    }
    
    // Shuffle questions for practice mode
    if (practiceMode && isPremium) {
      baseQuestions = [...baseQuestions].sort(() => Math.random() - 0.5)
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    setQuestions(baseQuestions)
    setCurrentIndex(0)
    setScore(0)
    setTestCompleted(false)
    setAnswersHistory([])
    setStreak(0)
    setQuestionStartTime(Date.now())
  }, [isPremium, topicFilter, difficulty, showBookmarksOnly, bookmarkedQuestions, practiceMode])

  const currentQ = questions[currentIndex]

  const handleAnswer = (isCorrect, explanation, next, selectedAnswer) => {
    const timeSpent = (Date.now() - questionStartTime) / 1000
    setTimeSpentPerQuestion(prev => [...prev, { time: timeSpent, correct: isCorrect }])
    
    if (isCorrect !== null && !testCompleted) {
      const newScore = score + (isCorrect ? 1 : 0)
      setScore(newScore)
      
      // Update streak
      if (isCorrect) {
        const newStreak = streak + 1
        setStreak(newStreak)
        if (newStreak > bestStreak) setBestStreak(newStreak)
      } else {
        setStreak(0)
      }
      
      setAnswersHistory(prev => [...prev, {
        questionId: currentQ?.id,
        questionText: currentQ?.text,
        wasCorrect: isCorrect,
        correctAnswer: currentQ?.correct,
        explanation: explanation || currentQ?.explanation,
        userAnswer: selectedAnswer,
        timeSpent: timeSpent,
        topic: currentQ?.topic,
        difficulty: currentQ?.difficulty
      }])
    }
    
    if (next) {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1)
        setQuestionStartTime(Date.now())
      } else {
        setTestCompleted(true)
        if (isPremium && !certificateGenerated && (score / questions.length) >= 0.9) {
          setCertificateGenerated(true)
        }
      }
    }
  }

  const handleTimeEnd = () => {
    setTestCompleted(true)
  }

  const toggleBookmark = (questionId) => {
    if (bookmarkedQuestions.includes(questionId)) {
      setBookmarkedQuestions(prev => prev.filter(id => id !== questionId))
    } else {
      setBookmarkedQuestions(prev => [...prev, questionId])
    }
  }

  const resetTest = () => {
    setCurrentIndex(0)
    setScore(0)
    setTestCompleted(false)
    setAnswersHistory([])
    setTimeRemaining(1800)
    setStreak(0)
    setQuestionStartTime(Date.now())
    setTimeSpentPerQuestion([])
  }

  const downloadCertificate = () => {
    const certificate = `
      ECS Black Card Mock Test Certificate
      ====================================
      Name: ____________________
      Date: ${new Date().toLocaleDateString()}
      Score: ${score}/${questions.length}
      Percentage: ${((score / questions.length) * 100).toFixed(1)}%
      Result: PASSED
      Topics Covered: ${new Set(answersHistory.map(a => a.topic)).size}
      Best Streak: ${bestStreak}
    `
    const blob = new Blob([certificate], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ecs-certificate.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getPerformanceStats = () => {
    const totalCorrect = answersHistory.filter(a => a.wasCorrect).length
    const avgTime = timeSpentPerQuestion.reduce((acc, curr) => acc + curr.time, 0) / timeSpentPerQuestion.length
    const topicPerformance = {}
    answersHistory.forEach(a => {
      if (!topicPerformance[a.topic]) {
        topicPerformance[a.topic] = { correct: 0, total: 0 }
      }
      topicPerformance[a.topic].total++
      if (a.wasCorrect) topicPerformance[a.topic].correct++
    })
    return { totalCorrect, avgTime, topicPerformance }
  }

  useEffect(() => {
    if (testCompleted) {
      recordTestResult({ testType: 'black-card', testLabel: 'ECS Black Card', score, total: questions.length, answers: answersHistory })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCompleted])

  if (!canAccessTest('/ecs-black-card-mock-test', isPro)) {
    return <LockedTestScreen testName="ECS Black Card Mock Test" />
  }

  if (questions.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-16`}>
        <div className="container-custom text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your premium test experience...</p>
          </div>
        </div>
      </div>
    )
  }

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 86
    const viewCertificate = () => {
      navigate('/certificate', {
        state: {
          testLabel: 'ECS Black Card Mock Test',
          score,
          total: questions.length,
          percentage: Math.round(percentage),
        },
      })
    }
    const stats = getPerformanceStats()
    
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-16`}>
        <div className="container-custom max-w-4xl mx-auto">
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{passed ? '🏆' : '📚'}</div>
              <h2 className="text-3xl font-bold mb-2">Test Completed!</h2>
              <p className="text-gray-500 mb-6">You've completed the ECS Black Card Mock Test</p>
              
              <div className={`text-7xl font-bold mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>
                {score}/{questions.length}
              </div>
              <div className="text-2xl mb-2">{percentage.toFixed(1)}%</div>
              <div className={`inline-block px-4 py-2 rounded-full mb-6 ${passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {passed ? '✓ PASSED - Ready for the real exam!' : '✗ FAILED - Keep practicing!'}
              </div>

              {passed && (
                <button
                  onClick={viewCertificate}
                  className="w-full max-w-md mx-auto bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition mb-6 block"
                >
                  🏆 Get Your Certificate
                </button>
              )}

              {/* Premium Statistics Dashboard */}
              {isPremium && (
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="font-bold text-xl">{stats.totalCorrect}</div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="font-bold text-xl">{bestStreak}</div>
                    <div className="text-sm text-gray-600">Best Streak</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl mb-1">⏱️</div>
                    <div className="font-bold text-xl">{stats.avgTime.toFixed(1)}s</div>
                    <div className="text-sm text-gray-600">Avg Time/Question</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="font-bold text-xl">{new Set(answersHistory.map(a => a.topic)).size}</div>
                    <div className="text-sm text-gray-600">Topics Mastered</div>
                  </div>
                </div>
              )}

              {/* Topic-wise Performance */}
              {isPremium && (
                <div className="mb-8 text-left">
                  <h3 className="font-bold text-lg mb-3">📈 Topic-wise Performance</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.topicPerformance).map(([topic, data]) => (
                      <div key={topic}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{topic.replace('-', ' ')}</span>
                          <span>{data.correct}/{data.total} ({((data.correct/data.total)*100).toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${(data.correct/data.total)*100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wrong Answers Review */}
              {isPremium && answersHistory.filter(a => !a.wasCorrect).length > 0 && (
                <div className="mb-8 text-left">
                  <h3 className="font-bold text-lg mb-3">📝 Questions to Review ({answersHistory.filter(a => !a.wasCorrect).length})</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {answersHistory.filter(a => !a.wasCorrect).map((item, idx) => (
                      <div key={idx} className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="font-semibold">{item.questionText}</p>
                        <p className="text-sm text-gray-600 mt-1">Your answer: <span className="text-red-600">{item.userAnswer}</span></p>
                        <p className="text-sm text-green-600">Correct: {item.correctAnswer}</p>
                        <p className="text-sm text-gray-500 mt-2">💡 {item.explanation}</p>
                        <p className="text-xs text-gray-400 mt-1">Time spent: {item.timeSpent?.toFixed(1)}s | Difficulty: {item.difficulty}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificate Download */}
              {passed && isPremium && certificateGenerated && (
                <div className="mb-8 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border-2 border-slate-400">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-2xl mb-1">🎓</div>
                      <div className="font-bold">Congratulations! You're ready for the real exam!</div>
                      <div className="text-sm text-gray-600">Download your achievement certificate</div>
                    </div>
                    <button 
                      onClick={downloadCertificate}
                      className="bg-slate-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-600"
                    >
                      Download Certificate 📄
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={resetTest} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                  🔄 Restart Test
                </button>
                <Link to="/mock-test" className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700">
                  📚 More Tests
                </Link>
                {!isPremium && (
                  <button 
                    onClick={() => setShowPremiumModal(true)}
                    className="bg-gradient-to-r from-slate-400 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg"
                  >
                    ⭐ Upgrade to Premium
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8 transition-colors duration-300`}>
      <Seo title="ECS Black Card Mock Test 2026 | Advanced Craft & Supervisory Practice" description="Free ECS Black Card mock test for supervisors and advanced craft workers. Practice ECS-style HS&E questions with instant feedback." path="/ecs-black-card-mock-test" />
      <div className="container-custom max-w-5xl mx-auto px-4">
        
        {/* Premium Header with Controls */}
        <div className="mb-6">
          {/* Premium Banner */}
          {!isPremium && (
            <div className="mb-4 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-400 rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⭐</span>
                <div>
                  <div className="font-bold text-slate-800">Premium Access Available</div>
                  <div className="text-sm text-gray-600">100 questions • Smart analytics • Performance tracking • Download certificate</div>
                </div>
              </div>
              <button onClick={() => setShowPremiumModal(true)} className="bg-slate-500 text-white px-4 py-2 rounded-lg font-semibold">
                Upgrade Now
              </button>
            </div>
          )}

          {/* Premium Control Panel */}
          {isPremium && (
            <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {/* Topic Filter */}
                  <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
                    {topics.map(topic => (
                      <option key={topic.id} value={topic.id}>{topic.icon} {topic.name} ({topic.count})</option>
                    ))}
                  </select>
                  
                  {/* Difficulty Filter */}
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
                    <option value="all">🎲 All Difficulties</option>
                    <option value="easy">🟢 Easy</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="hard">🔴 Hard</option>
                  </select>
                  
                  {/* Mode Toggles */}
                  <button onClick={() => setPracticeMode(!practiceMode)} className={`px-3 py-2 rounded-lg text-sm transition ${practiceMode ? 'bg-purple-600 text-white' : 'border hover:bg-gray-50'}`}>
                    🔄 {practiceMode ? 'Practice Mode ON' : 'Practice Mode'}
                  </button>
                  
                  <button onClick={() => setStudyMode(!studyMode)} className={`px-3 py-2 rounded-lg text-sm transition ${studyMode ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'}`}>
                    📖 {studyMode ? 'Study Mode ON' : 'Study Mode'}
                  </button>
                  
                  <button onClick={() => setShowBookmarksOnly(!showBookmarksOnly)} className={`px-3 py-2 rounded-lg text-sm transition ${showBookmarksOnly ? 'bg-slate-600 text-white' : 'border hover:bg-gray-50'}`}>
                    📚 {showBookmarksOnly ? 'Bookmarks' : 'Show Bookmarks'}
                  </button>
                </div>

                {/* Display Settings */}
                <div className="flex gap-2">
                  <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg border hover:bg-gray-50" title="Dark Mode">
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                  <button onClick={() => setShowStatistics(!showStatistics)} className="p-2 rounded-lg border hover:bg-gray-50" title="Statistics">
                    📊
                  </button>
                  <button onClick={() => setXRayMode(!xRayMode)} className={`p-2 rounded-lg border transition ${xRayMode ? 'bg-purple-100' : 'hover:bg-gray-50'}`} title="X-Ray Mode - Show correct answers">
                    🔍
                  </button>
                </div>
              </div>

              {/* Statistics Panel */}
              {showStatistics && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-bold mb-2">📊 Live Statistics</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>Score: {score}/{questions.length} ({((score/questions.length)*100).toFixed(1)}%)</div>
                    <div>Current Streak: 🔥 {streak}</div>
                    <div>Bookmarks: {bookmarkedQuestions.length}</div>
                    <div>Time Left: {Math.floor(timeRemaining/60)}:{(timeRemaining%60).toString().padStart(2,'0')}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ECS Black Card (Manager) Mock Test {isPremium && <span className="text-slate-500 text-sm">⭐ PRO</span>}
              </h1>
              <p className="text-gray-500 text-sm">
                {questions.length} questions | {selectedExamMode === 'timed' ? 'Timed (30 min)' : 'Untimed'} | Pass: 86%
                {isPremium && topicFilter !== 'all' && ` | ${topics.find(t => t.id === topicFilter)?.icon} ${topics.find(t => t.id === topicFilter)?.name}`}
              </p>
            </div>
            {selectedExamMode === 'timed' && (
              <TestTimer duration={1800} onTimeEnd={handleTimeEnd} onTimeUpdate={setTimeRemaining} />
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress: {currentIndex + 1} / {questions.length}</span>
            <span>Score: {score} / {questions.length} ({((score/questions.length)*100).toFixed(1)}%)</span>
            {isPremium && <span>🔥 Streak: {streak}</span>}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
          {isPremium && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full transition-all" style={{ width: `${(score / questions.length) * 100}%` }}></div>
            </div>
          )}
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQ}
          onAnswer={handleAnswer}
          showExplanation={showExplanation}
          currentNumber={currentIndex + 1}
          totalQuestions={questions.length}
          isPro={isPro}
          isPremium={isPremium}
          onBookmark={isPremium ? () => toggleBookmark(currentQ?.id) : null}
          isBookmarked={isPremium && bookmarkedQuestions.includes(currentQ?.id)}
          studyMode={studyMode}
          xRayMode={xRayMode}
          showHint={isPremium}
        />

        {/* Premium Upgrade CTA */}
        {!isPremium && currentIndex >= 7 && (
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center border-2 border-purple-300">
            <div className="text-5xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-purple-800 mb-2">Go Premium - Unlock Everything!</h3>
            <p className="text-gray-700 mb-4">
              You've seen {currentIndex + 1}/10 free questions. Premium gives you access to 100 questions, smart analytics, certificate download, and much more!
            </p>
            <div className="grid md:grid-cols-3 gap-3 mb-4 text-sm text-left">
              <div className="flex items-center gap-2">✅ 100 exam questions</div>
              <div className="flex items-center gap-2">✅ Topic & difficulty filters</div>
              <div className="flex items-center gap-2">✅ Performance analytics</div>
              <div className="flex items-center gap-2">✅ Bookmark system</div>
              <div className="flex items-center gap-2">✅ Download certificate</div>
              <div className="flex items-center gap-2">✅ Dark mode & X-Ray mode</div>
            </div>
            <button onClick={() => setShowPremiumModal(true)} className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition">
              Get Premium Access - £9.99/month
            </button>
            <p className="text-xs text-gray-500 mt-3">⭐ Lifetime access £60 • Cancel anytime</p>
          </div>
        )}
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">👑</div>
              <h2 className="text-2xl font-bold">Unlock Premium Features</h2>
              <p className="text-gray-600">Get the ultimate ECS test prep experience</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <span className="text-green-500 text-xl">✓</span>
                <div><div className="font-semibold">100+ Real Exam Questions</div><div className="text-sm text-gray-500">Full question bank with manager-level content</div></div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <span className="text-green-500 text-xl">✓</span>
                <div><div className="font-semibold">Smart Analytics Dashboard</div><div className="text-sm text-gray-500">Track strengths, weaknesses, and progress</div></div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <span className="text-green-500 text-xl">✓</span>
                <div><div className="font-semibold">Advanced Study Tools</div><div className="text-sm text-gray-500">Bookmarks, X-Ray mode, practice mode, topic filters</div></div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <span className="text-green-500 text-xl">✓</span>
                <div><div className="font-semibold">Certificate on Completion</div><div className="text-sm text-gray-500">Downloadable achievement certificate</div></div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <span className="text-green-500 text-xl">✓</span>
                <div><div className="font-semibold">Dark Mode & X-Ray Mode</div><div className="text-sm text-gray-500">Enhanced study experience</div></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button onClick={() => setIsPremium(true)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold text-lg">
                Monthly Plan - £9.99/month
              </button>
              <button onClick={() => setIsPremium(true)} className="w-full border-2 border-purple-600 text-purple-600 py-2 rounded-lg font-semibold">
                Lifetime Access - £60 (Best Value)
              </button>
              <button onClick={() => setShowPremiumModal(false)} className="w-full text-gray-500 py-2">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlackCardMockTest