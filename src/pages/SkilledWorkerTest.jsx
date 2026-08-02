import React, { useState, useEffect } from 'react'
import { recordTestResult } from '../lib/testResults'
import Seo from '../components/Seo'
import { Link, useNavigate } from 'react-router-dom'
import AIExplainButton from '../components/AIExplainButton'
import QuestionAudio from '../components/QuestionAudio'
import LockedTestScreen from '../components/LockedTestScreen'
import { useAuth } from '../context/AuthContext'
import { canAccessTest } from '../lib/testAccess'

function SkilledWorkerTest() {
  const navigate = useNavigate()
  const { isPro } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [topicFilter, setTopicFilter] = useState('all')
  const [answeredHistory, setAnsweredHistory] = useState([])

  // Full question bank (50+ questions for premium)
  const fullQuestionBank = [
    // Health & Safety Fundamentals
    { text: "What does the Health and Safety at Work Act 1974 require employers to do?", options: ["Provide free lunches", "Ensure health, safety and welfare of employees", "Give bonuses every month", "Provide company cars"], correct: "Ensure health, safety and welfare of employees", explanation: "The Health and Safety at Work Act 1974 places a duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of their employees.", topic: "health-safety" },
    { text: "What is RIDDOR?", options: ["A safety equipment brand", "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", "Risk assessment document", "Safety training course"], correct: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", explanation: "RIDDOR requires reporting of work-related accidents, diseases and dangerous occurrences.", topic: "health-safety" },
    { text: "Which of the following is a potential effect of exposure to hazardous substances?", options: ["Improved breathing", "Skin irritation", "Increased energy", "Better vision"], correct: "Skin irritation", explanation: "Exposure to hazardous substances can lead to skin irritation among other health issues.", topic: "hazards" },
    { text: "What is the limitation of using a dust mask as RPE?", options: ["It is too expensive", "It cannot filter out gases or vapors", "It is uncomfortable to wear", "It only lasts for 1 hour"], correct: "It cannot filter out gases or vapors", explanation: "Dust masks cannot filter out gaseous substances and are only effective against particles.", topic: "ppe" },
    { text: "Why is it important to use tools with double insulation?", options: ["They are lighter", "They provide additional protection against electric shock", "They last longer", "They are cheaper"], correct: "They provide additional protection against electric shock", explanation: "Double insulation provides extra protection by having two separate layers of insulation.", topic: "electrical" },
    { text: "Who is responsible for managing risks in excavation work?", options: ["The worker", "The safety officer only", "The site manager", "The HSE inspector"], correct: "The site manager", explanation: "The site manager is responsible for overseeing and managing site risks including excavations.", topic: "site-safety" },
    { text: "What should be done if site transport routes are poorly lit?", options: ["Ignore it", "Work faster", "Report the issue and use temporary lighting", "Leave the site"], correct: "Report the issue and use temporary lighting", explanation: "Poorly lit areas should be reported and addressed with temporary lighting for safety.", topic: "site-safety" },
    { text: "What should you do if someone is experiencing a severe allergic reaction?", options: ["Give them water", "Help them use their epinephrine auto-injector", "Call their family first", "Wait to see if it gets worse"], correct: "Help them use their epinephrine auto-injector", explanation: "Using an epinephrine auto-injector can quickly counteract the allergic reaction.", topic: "first-aid" },
    { text: "What is the correct ladder angle for safe use?", options: ["90 degrees (vertical)", "75 degrees (1:4 ratio)", "60 degrees", "45 degrees"], correct: "75 degrees (1:4 ratio)", explanation: "For every 4 units of height, the base should be 1 unit away from the wall - this creates a 75-degree angle.", topic: "working-at-height" },
    { text: "How often should ladders be inspected?", options: ["Every day before use", "Every week", "Every month", "Every year"], correct: "Every day before use", explanation: "Ladders should be inspected before each use by the user, plus formal inspections at regular intervals.", topic: "working-at-height" },
    { text: "What does COSHH stand for?", options: ["Control of Substances Hazardous to Health", "Company Order for Safety and Health Hazards", "Control of Safety and Health Hazards", "Code of Safety and Health"], correct: "Control of Substances Hazardous to Health", explanation: "COSHH is the law that requires employers to control substances that are hazardous to health.", topic: "hazards" },
    { text: "What is the minimum height for guardrails on scaffolding?", options: ["850mm", "950mm", "1000mm", "1100mm"], correct: "950mm", explanation: "Guardrails on scaffolding should be at least 950mm high to prevent falls.", topic: "scaffolding" },
    { text: "What colour are fire safety signs that indicate fire equipment?", options: ["Blue", "Green", "Red", "Yellow"], correct: "Red", explanation: "Red signs indicate fire equipment locations such as fire extinguishers and fire alarms.", topic: "fire-safety" },
    { text: "What does PPE stand for?", options: ["Personal Protective Equipment", "Public Protection Equipment", "Personal Property Exchange", "Professional Protection Equipment"], correct: "Personal Protective Equipment", explanation: "PPE includes items like hard hats, gloves, goggles and safety boots.", topic: "ppe" },
    { text: "When should a hard hat be replaced?", options: ["Every 6 months", "Every 2 years", "Every 5 years or after a heavy impact", "Only when it looks damaged"], correct: "Every 5 years or after a heavy impact", explanation: "Hard hats have a shelf life and should be replaced every 5 years or immediately after a significant impact.", topic: "ppe" },
    { text: "What is the safe voltage for portable hand tools on construction sites?", options: ["240V", "110V", "400V", "12V"], correct: "110V", explanation: "110V is the standard safe voltage for portable hand tools on UK construction sites, often via a centre-tapped transformer.", topic: "electrical" },
    { text: "What does a blue circular safety sign indicate?", options: ["Warning", "Mandatory action", "Prohibition", "Emergency information"], correct: "Mandatory action", explanation: "Blue circular signs indicate something you must do, such as wearing safety glasses.", topic: "signs" },
    { text: "What does a yellow triangle safety sign indicate?", options: ["Warning of a hazard", "Mandatory action", "Prohibition", "Safe condition"], correct: "Warning of a hazard", explanation: "Yellow triangular signs warn of potential hazards like 'Caution: Wet Floor'.", topic: "signs" },
    { text: "What is the first thing you should do if you discover a fire?", options: ["Try to extinguish it", "Raise the alarm", "Run away", "Call your manager"], correct: "Raise the alarm", explanation: "The first priority is to alert others by raising the alarm, then tackle the fire only if safe to do so.", topic: "fire-safety" },
    { text: "What is the correct procedure for manual handling?", options: ["Bend your back", "Keep the load away from your body", "Assess the load, bend knees, keep back straight", "Lift quickly"], correct: "Assess the load, bend knees, keep back straight", explanation: "Proper manual handling technique reduces the risk of back injury.", topic: "manual-handling" }
  ]

  // Filter questions based on topic and premium status
  useEffect(() => {
    let filtered = [...fullQuestionBank]
    if (topicFilter !== 'all') {
      filtered = filtered.filter(q => q.topic === topicFilter)
    }
    // Non-premium users get first 10 questions
    if (!isPremium && filtered.length > 10) {
      filtered = filtered.slice(0, 10)
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    setQuestions(filtered)
    setLoading(false)
    resetTest()
  }, [isPremium, topicFilter])

  const currentQ = questions[currentIndex]

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQ.correct
    if (isCorrect) setScore(score + 1)
    setShowResult(true)
    setAnsweredHistory([...answeredHistory, {
      question: currentQ.text,
      selected: answer,
      correct: currentQ.correct,
      isCorrect: isCorrect,
      explanation: currentQ.explanation
    }])
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

  const resetTest = () => {
    setCurrentIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setTestCompleted(false)
    setAnsweredHistory([])
  }

  const upgradeToPremium = () => {
    setIsPremium(true)
  }

  useEffect(() => {
    if (testCompleted) {
      recordTestResult({ testType: 'skilled-worker', testLabel: 'ECS Skilled Worker', score, total: questions.length, answers: answeredHistory })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCompleted])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-xl">Loading questions...</div>
      </div>
    )
  }

  if (!canAccessTest('/ecs-skilled-worker-test', isPro)) {
    return <LockedTestScreen testName="ECS Skilled Worker Test" />
  }

  if (testCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 86
    const viewCertificate = () => {
      navigate('/certificate', {
        state: {
          testLabel: 'ECS Skilled Worker Mock Test',
          score,
          total: questions.length,
          percentage: Math.round(percentage),
        },
      })
    }
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Test Completed!</h2>
          <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {score}/{questions.length}
          </div>
          <div className="text-xl mb-4">
            {percentage}% - {passed ? 'PASS' : 'FAIL'} {passed ? '✓' : '✗'}
          </div>
          {!passed && (
            <p className="text-red-600 mb-4">
              You need 86% to pass. Try again!
            </p>
          )}

          {passed && (
            <button
              onClick={viewCertificate}
              className="w-full bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition mb-4"
            >
              🏆 Get Your Certificate
            </button>
          )}
          
          {/* Premium Upgrade Prompt for Non-Premium Users */}
          {!isPremium && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-2">🚀 Go Premium!</h3>
              <p className="text-gray-700 mb-3">
                You completed {questions.length}/50 questions. Upgrade to access all 50+ questions, AI explanations, and progress tracking.
              </p>
              <button 
                onClick={upgradeToPremium}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
              >
                Upgrade Now - £4.99/week
              </button>
              <p className="text-xs text-gray-500 mt-2">Cancel anytime • Lifetime access £60</p>
            </div>
          )}
          
          <div className="space-x-4 mt-6">
            <button onClick={resetTest} className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
              Try Again
            </button>
            <Link to="/mock-test" className="bg-green-600 text-white px-6 py-3 rounded-lg inline-block">
              More Tests
            </Link>
          </div>
        </div>

        {/* Answer History for Premium Users */}
        {isPremium && answeredHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">📋 Your Answer History</h3>
            <div className="space-y-4">
              {answeredHistory.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${item.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`text-lg ${item.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {item.isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold">{item.question}</p>
                      <p className="text-sm text-gray-600">
                        Your answer: <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>{item.selected}</span>
                        {!item.isCorrect && <span> (Correct: {item.correct})</span>}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">💡 {item.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Seo title="ECS Skilled Worker Mock Test 2026 | Free ECS Practice Questions" description="Practice the ECS Skilled Worker mock test free online. Real ECS-style HS&E questions, instant answers and explanations to help you pass first time." path="/ecs-skilled-worker-test" />
      {/* Premium Banner for Non-Premium */}
      {!isPremium && (
        <div className="mb-6 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-400 rounded-xl p-4 flex justify-between items-center">
          <div>
            <span className="font-bold text-slate-800">⭐ Premium Available</span>
            <p className="text-sm text-gray-600">Unlimited questions • AI explanations • Progress tracking</p>
          </div>
          <button onClick={upgradeToPremium} className="bg-slate-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            Upgrade
          </button>
        </div>
      )}

      {/* Premium Badge for Premium Users */}
      {isPremium && (
        <div className="mb-6 bg-purple-100 border border-purple-300 rounded-xl p-3 text-center">
          <span className="font-bold text-purple-700">⭐ PREMIUM ACTIVE</span>
          <span className="text-sm text-purple-600 ml-2">• Full access to {questions.length} questions • AI explanations</span>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">ECS Skilled Worker Mock Test 2026</h1>
        <p className="text-gray-600 mb-4">Free Blue Card Mock Test {isPremium ? '(Premium - Full Access)' : '(Free - Limited Questions)'}</p>
        
        {/* Topic Filter - Only for Premium */}
        {isPremium && (
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Filter by Topic:</label>
            <select 
              value={topicFilter} 
              onChange={(e) => setTopicFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-auto"
            >
              <option value="all">All Topics (50+ questions)</option>
              <option value="health-safety">Health & Safety Fundamentals</option>
              <option value="working-at-height">Working at Height</option>
              <option value="ppe">PPE</option>
              <option value="electrical">Electrical Safety</option>
              <option value="fire-safety">Fire Safety</option>
              <option value="hazards">Hazardous Substances</option>
              <option value="signs">Safety Signs</option>
              <option value="manual-handling">Manual Handling</option>
              <option value="first-aid">First Aid</option>
              <option value="scaffolding">Scaffolding</option>
              <option value="site-safety">Site Safety</option>
            </select>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="font-bold text-blue-800">Free ECS mock test</div>
            <div className="text-sm text-blue-600">{isPremium ? '50+ questions' : '10 free questions'}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="font-bold text-green-800">All 11 ECS topics</div>
            <div className="text-sm text-green-600">{isPremium ? 'Full coverage' : 'Limited preview'}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="font-bold text-purple-800">AI explanations on every question</div>
            <div className="text-sm text-purple-600">{isPremium ? 'Detailed AI answers' : 'Basic explanations'}</div>
          </div>
        </div>

        {/* Main Description - Collapsed for Pro */}
        <details className="bg-white rounded-xl shadow-md p-4 mb-6 cursor-pointer">
          <summary className="font-bold text-lg">What is the ECS Blue Card (Skilled Worker)?</summary>
          <div className="mt-3">
            <p className="text-gray-700 mb-3">
              The ECS Blue Card, officially the Skilled Worker Card, is the card for qualified tradespeople. 
              Where the Green Labourer Card shows basic site-safety awareness, the Blue Card proves that its 
              holder has achieved a recognised trade qualification at NVQ or SVQ Level 2.
            </p>
            <h3 className="font-bold mt-3">Which test do you take for a Blue Card?</h3>
            <p className="text-gray-700">To get a Blue Card you sit the same ECS Operatives test. Pass mark is 43/50 (86%).</p>
          </div>
        </details>
      </div>

      {/* Mock Test Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="border-b pb-3 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Blue Card Mock Test</h2>
            {isPremium && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {topicFilter !== 'all' ? topicFilter : `${questions.length} questions`}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">Question {currentIndex + 1} of {questions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">
            Score: {score}/{questions.length}
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">{currentQ?.text}</h2>
        <QuestionAudio text={currentQ?.text} isPro={isPro} />
        
        <div className="space-y-3">
          {currentQ?.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && handleAnswer(option)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                showResult && option === currentQ.correct
                  ? 'bg-green-100 border-green-500'
                  : showResult && option === selectedAnswer && option !== currentQ.correct
                  ? 'bg-red-100 border-red-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showResult && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className={selectedAnswer === currentQ.correct ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
              {selectedAnswer === currentQ.correct ? "✓ Correct!" : "✗ Incorrect!"}
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              <span className="font-semibold">Explanation:</span> {currentQ.explanation}
            </p>
            <AIExplainButton
              explanation={currentQ.explanation}
              topic="ECS Skilled Worker Test"
            />
            <button onClick={nextQuestion} className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              {currentIndex + 1 === questions.length ? "Finish Test" : "Next →"}
            </button>
          </div>
        )}
      </div>

      {/* Premium Feature Cards - Show upgrade options */}
      {!isPremium && (
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-bold text-lg">Unlock Full Access</h3>
            <p className="text-sm text-gray-600 mb-3">50+ real exam questions, 11 ECS topics, AI explanations</p>
            <button onClick={upgradeToPremium} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Upgrade to Premium
            </button>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-5 border-2 border-blue-200">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-bold text-lg">Track Your Progress</h3>
            <p className="text-sm text-gray-600 mb-3">Save scores, review mistakes, monitor improvement over time</p>
            <button onClick={upgradeToPremium} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Get Premium
            </button>
          </div>
        </div>
      )}

      {/* Related Tests Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Related ECS Tests</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/ecs-green-card-mock-test" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="font-bold text-green-600">Green Card Test (Labourers)</div>
            <p className="text-sm text-gray-500">Free mock test for the ECS Green Labourer Card</p>
          </Link>
          <Link to="/mock-test" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="font-bold text-blue-600">ECS Mock Test</div>
            <p className="text-sm text-gray-500">50 questions, full ECS operatives exam</p>
          </Link>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link to="/mock-test" className="text-blue-600 hover:underline">
          ← Back to ECS Mock Test home
        </Link>
      </div>
    </div>
  )
}

export default SkilledWorkerTest