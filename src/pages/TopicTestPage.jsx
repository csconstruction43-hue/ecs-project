import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AIExplainButton from '../components/AIExplainButton'
import QuestionAudio from '../components/QuestionAudio'
import Seo from '../components/Seo'
import { useAuth } from '../context/AuthContext'
import { FaCheckCircle, FaTimesCircle, FaLightbulb, FaArrowRight, FaRedoAlt, FaHeadphones, FaLanguage, FaExclamationTriangle, FaFire, FaHardHat, FaTruck, FaHeartbeat } from 'react-icons/fa'

function TopicTestPage() {
  const { topicId } = useParams()
  const { isPro } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [answers, setAnswers] = useState([])

  const topicNames = {
    'working-at-height': 'Working at Height',
    'manual-handling': 'Manual Handling',
    'ppe': 'PPE',
    'fire-prevention': 'Fire Prevention',
    'safety-signs': 'Safety Signs'
  }
  
  const topicName = topicNames[topicId] || 'Practice Test'
  const isSafetySigns = topicId === 'safety-signs'

  // Detailed questions database
  const questionsByTopic = {
    'working-at-height': [
      { text: "When working at height, what is the first priority according to the hierarchy of controls?", options: ["Use a safety harness", "Avoid working at height if possible", "Use scaffolding", "Wear a hard hat"], correct: "Avoid working at height if possible", explanation: "The Work at Height Regulations require you to first consider if work at height can be avoided. If not, then take measures to prevent falls, then minimize consequences." },
      { text: "What is the minimum guardrail height for scaffolding?", options: ["850mm", "950mm", "1050mm", "1150mm"], correct: "950mm", explanation: "Scaffold guardrails must be at least 950mm high (approximately 37 inches) with a mid-rail at 470mm. Toe boards should be at least 150mm high." },
      { text: "What is the correct ladder angle for safe use?", options: ["90° (vertical)", "75° (1:4 ratio)", "60°", "45°"], correct: "75° (1:4 ratio)", explanation: "For every 4 units of height, the base should be 1 unit away from the wall - this creates a 75-degree angle, the safest position for a ladder." },
      { text: "How often should ladders be inspected?", options: ["Every day before use", "Every week", "Every month", "Every year"], correct: "Every day before use", explanation: "Ladders should be inspected before each use by the user, plus formal inspections at regular intervals (typically every 6-12 months)." },
      { text: "What is a key feature of mobile elevated work platforms (MEWPs)?", options: ["They require a harness at all times", "They can be used without training", "They don't need stabilisers", "They are only for indoor use"], correct: "They require a harness at all times", explanation: "Operators must wear a harness attached to the platform at all times when using MEWPs. This prevents ejection from the platform during movement." }
    ],
    'manual-handling': [
      { text: "What does TILE stand for in manual handling?", options: ["Task, Individual, Load, Environment", "Training, Instruction, Lifting, Equipment", "Time, Intensity, Location, Effort"], correct: "Task, Individual, Load, Environment", explanation: "TILE is the acronym for assessing manual handling risks: Task (what's involved), Individual (person's capability), Load (weight/characteristics), Environment (workplace conditions)." },
      { text: "What is the maximum recommended weight for lifting at waist height for a man?", options: ["5kg", "10kg", "25kg", "40kg"], correct: "25kg", explanation: "The recommended maximum weight for lifting at waist height is 25kg for men and 16kg for women. These are guidelines - individual capability varies." },
      { text: "What is the correct position for your feet when lifting?", options: ["Together", "Shoulder width apart", "One foot forward", "Both feet back"], correct: "Shoulder width apart", explanation: "Keep your feet shoulder-width apart to provide a stable base for lifting. One foot slightly forward can also help with balance." }
    ],
    'ppe': [
      { text: "When should you wear your hard hat on site?", options: ["At all times on site", "Only at height", "Only when supervisor watches", "Only in designated areas"], correct: "At all times on site", explanation: "Hard hats must be worn at all times on a construction site, as there is always risk of falling objects from height." },
      { text: "What does PPE stand for?", options: ["Personal Protective Equipment", "Public Protection Equipment", "Personal Property Equipment", "Professional Protection Equipment"], correct: "Personal Protective Equipment", explanation: "PPE stands for Personal Protective Equipment. This includes hard hats, safety boots, high-visibility clothing, gloves, and eye protection." },
      { text: "What type of gloves protect against chemical hazards?", options: ["Leather gloves", "Cotton gloves", "Nitrile rubber gloves", "Wool gloves"], correct: "Nitrile rubber gloves", explanation: "Nitrile rubber gloves provide protection against many chemicals, oils, and solvents." }
    ],
    'fire-prevention': [
      { text: "What is the fire triangle?", options: ["Heat, Fuel, Oxygen", "Heat, Smoke, Flames", "Fuel, Air, Water", "Oxygen, Carbon, Heat"], correct: "Heat, Fuel, Oxygen", explanation: "The fire triangle consists of three elements: heat, fuel, and oxygen. Remove any one to extinguish the fire." },
      { text: "What colour band does a CO2 fire extinguisher have?", options: ["Red", "Blue", "Black", "Yellow"], correct: "Black", explanation: "CO2 fire extinguishers have a black colour band. They are used for electrical fires and leave no residue." },
      { text: "What type of fire extinguisher is used for electrical fires?", options: ["Water (Red)", "Foam (Cream)", "CO2 (Black)", "Wet chemical (Yellow)"], correct: "CO2 (Black)", explanation: "CO2 extinguishers (black label) are safe for electrical fires as they don't conduct electricity." }
    ],
    'safety-signs': [
      { text: "What do green safety signs usually indicate?", options: ["Prohibition", "Fire safety", "Safe conditions", "Warning"], correct: "Safe conditions", explanation: "Green signs indicate emergency exits, first aid equipment, and safety showers. They provide information about safe conditions." },
      { text: "What shape are prohibition signs usually?", options: ["Circular with a line through it", "Triangular", "Rectangular", "Circular without a line"], correct: "Circular with a line through it", explanation: "Prohibition signs are circular with a red border and a red diagonal line through the pictogram. They indicate actions that are not allowed." },
      { text: "What colour is used for fire equipment signs?", options: ["Red", "Blue", "Yellow", "Green"], correct: "Red", explanation: "Fire equipment signs are red squares or rectangles. They locate firefighting equipment such as extinguishers and alarm call points." },
      { text: "What shape are warning signs?", options: ["Circle", "Triangle", "Square", "Rectangle"], correct: "Triangle", explanation: "Warning signs are yellow triangles with a black border and black pictogram. They alert to hazards like 'Danger: Electricity'." },
      { text: "What colour are mandatory safety signs?", options: ["Red", "Blue", "Yellow", "Green"], correct: "Blue", explanation: "Mandatory signs (like 'Safety Helmets Must Be Worn') are blue circles with white pictograms. They indicate actions that must be taken." },
      { text: "What does a yellow and black striped sign indicate?", options: ["Danger", "Caution/Warning", "Safe condition", "Mandatory action"], correct: "Caution/Warning", explanation: "Yellow and black striped signs indicate a hazard or warning. They are often used for trip hazards, low ceilings, or temporary hazards." }
    ]
  }

  const questions = questionsByTopic[topicId] || questionsByTopic['safety-signs']
  const currentQ = questions[currentIndex]

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQ.correct
    if (isCorrect) setScore(score + 1)
    setAnswers([...answers, { 
      question: currentQ.text, 
      selected: answer, 
      correct: currentQ.correct, 
      explanation: currentQ.explanation, 
      isCorrect 
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
    setCurrentIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setTestCompleted(false)
    setAnswers([])
  }

  // Safety Signs specific content
  const signTypes = [
    { name: "Prohibition", color: "red", shape: "Circle with diagonal bar", meaning: "You must NOT do something", example: "No smoking, No entry", icon: "⛔" },
    { name: "Mandatory", color: "blue", shape: "Circle", meaning: "You MUST do something", example: "Wear hard hat, Eye protection", icon: "🔵" },
    { name: "Warning", color: "yellow", shape: "Triangle", meaning: "Hazard or risk", example: "Deep excavation, Overhead load", icon: "⚠️" },
    { name: "Safe Condition", color: "green", shape: "Square/Rectangle", meaning: "Safe conditions, emergency routes", example: "First aid, Fire exit", icon: "🟢" },
    { name: "Fire Equipment", color: "red", shape: "Square", meaning: "Firefighting equipment location", example: "Extinguisher, Alarm point", icon: "🔥" },
  ]

  const commonMistakes = [
    { mistake: "Green means it is safe to proceed", correct: "Green signs show safe conditions and emergency escape, first aid and exits, not permission to carry on." },
    { mistake: "Blue is just an information colour", correct: "Blue circles are mandatory - they tell you something you MUST do, such as wear PPE." },
    { mistake: "Warning signs are red triangles", correct: "Warning signs are YELLOW triangles. Red is for prohibition and fire equipment." }
  ]

  const relatedTopics = [
    { name: "Fire Prevention", path: "/ecs-fire-prevention-test", icon: <FaFire /> },
    { name: "PPE", path: "/ecs-ppe-test", icon: <FaHardHat /> },
    { name: "Emergency Procedures", path: "/ecs-emergency-procedures-test", icon: <FaHeartbeat /> },
    { name: "Site Transport", path: "/ecs-site-transport-test", icon: <FaTruck /> }
  ]

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 80 // 80% for topic practice
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className={`p-6 text-center ${passed ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-blue-600 to-blue-700'} text-white`}>
              <div className="flex justify-center mb-4">
                {passed ? <FaCheckCircle className="text-5xl" /> : <FaTimesCircle className="text-5xl" />}
              </div>
              <h2 className="text-3xl font-bold mb-2">Practice Completed!</h2>
              <p className="text-white/90">You scored {score} out of {questions.length} on {topicName}</p>
            </div>

            <div className="p-8 text-center">
              <div className="text-6xl font-bold text-green-600 mb-4">{score}/{questions.length}</div>
              <div className="text-xl mb-4">{percentage.toFixed(1)}%</div>
              
              {isSafetySigns && (
                <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><FaLightbulb /> Quick Revision Tip</h3>
                  <p className="text-sm text-blue-700">Remember: <span className="font-semibold">Red circle</span> = Prohibition, <span className="font-semibold">Blue circle</span> = Mandatory, <span className="font-semibold">Yellow triangle</span> = Warning, <span className="font-semibold">Green square</span> = Safe condition!</p>
                </div>
              )}
              
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={restartTest} className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-600 hover:text-white transition font-semibold flex items-center gap-2">
                  <FaRedoAlt /> Practice Again
                </button>
                <Link to="/practice" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold">
                  More Topics →
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
      <Seo
        title="ECS Topic Practice Test with Explanations | ECSPrep"
        description="Sit a focused ECS topic practice test with instant, plain-English explanations for every question to speed up your revision."
        path="/topic-test"
      />
      <div className="container mx-auto max-w-4xl">
        {/* Back Link */}
        <Link to="/practice" className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 mb-4 text-sm">
          ← Back to topics
        </Link>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Quiz Area */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {isSafetySigns ? '🪧' : '📚'} {topicName} Practice Test
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">{questions.length} questions | Learn as you go</p>
                </div>
                {isSafetySigns && (
                  <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
                    <FaLanguage className="text-blue-600 text-lg mx-auto" />
                    <p className="text-xs text-blue-700 font-medium">Audio Available — 14 languages</p>
                    <p className="text-[10px] text-blue-500">See "Audio Assist" below</p>
                  </div>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>Score: <span className="font-bold text-green-600">{score}</span> / {questions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="mb-4 flex justify-between items-center">
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                    Question #{currentIndex + 1}
                  </span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed">
                  {currentQ.text}
                </h2>

                <QuestionAudio text={currentQ.text} isPro={isPro} />
                
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const letters = ['A', 'B', 'C', 'D']
                    let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-3"
                    
                    if (showResult) {
                      if (option === currentQ.correct) {
                        optionClass += " bg-green-50 border-green-500 shadow-sm"
                      } else if (selectedAnswer === option && option !== currentQ.correct) {
                        optionClass += " bg-red-50 border-red-500"
                      } else {
                        optionClass += " border-gray-200 bg-gray-50 opacity-60"
                      }
                    } else {
                      optionClass += " hover:border-green-500 hover:bg-green-50 border-gray-200 hover:shadow-md"
                    }
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => !showResult && handleAnswer(option)}
                        className={optionClass}
                        disabled={showResult}
                      >
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

                {/* Explanation Box */}
                {showResult && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                      <FaLightbulb className="text-blue-600 text-lg" />
                      <span className="font-semibold text-blue-800">AI Explanation</span>
                    </div>
                    <p className="text-gray-700">{currentQ.explanation}</p>
                    <AIExplainButton
                      explanation={currentQ.explanation}
                      topic="ECS Practice Topic"
                    />
                    <button 
                      onClick={nextQuestion}
                      className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition w-full font-semibold flex items-center justify-center gap-2"
                    >
                      {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
                      <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Info Sidebar */}
          <div className="lg:col-span-1">
            {isSafetySigns ? (
              <>
                {/* Sign Types Card */}
                <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">🪧 Safety Signs Guide</h3>
                  <div className="space-y-3">
                    {signTypes.map((sign, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{sign.icon}</span>
                          <div>
                            <p className="font-semibold text-sm">{sign.name}</p>
                            <p className="text-xs text-gray-500">{sign.color} {sign.shape}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{sign.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Mistakes Card */}
                <div className="bg-blue-50 rounded-2xl p-5 mb-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><FaExclamationTriangle /> Common Mistakes</h3>
                  <div className="space-y-3">
                    {commonMistakes.map((mistake, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="text-red-700 font-medium">❌ {mistake.mistake}</p>
                        <p className="text-green-700 text-xs mt-1">✓ {mistake.correct}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Topics */}
                <div className="bg-blue-50 rounded-2xl p-5 mb-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">📚 Related Topics</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {relatedTopics.map((topic, idx) => (
                      <Link key={idx} to={topic.path} className="bg-white rounded-lg p-2 text-center hover:shadow-md transition text-sm flex items-center justify-center gap-1">
                        {topic.icon} {topic.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Full Mock Test CTA */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 text-white text-center">
                  <p className="font-semibold mb-2">Ready to pass your ECS test?</p>
                  <p className="text-sm text-green-100 mb-3">Take the free ECS mock test now</p>
                  <Link to="/mock-test" className="inline-block bg-white text-green-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition">
                    Start Free Mock Test →
                  </Link>
                </div>
              </>
            ) : (
              // Non-safety-signs sidebar
              <>
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white text-center">
                  <FaLightbulb className="text-4xl mx-auto mb-3" />
                  <p className="font-semibold mb-2">Need more practice?</p>
                  <p className="text-sm text-green-100 mb-4">Try our full 50-question mock test</p>
                  <Link to="/mock-test" className="inline-block bg-white text-green-700 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition">
                    Take Full Mock Test →
                  </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-5 mt-6">
                  <h3 className="font-bold text-lg mb-3">📖 Study Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">✓ Practice daily for 30 minutes</li>
                    <li className="flex items-start gap-2">✓ Focus on your weak topics</li>
                    <li className="flex items-start gap-2">✓ Take timed mock tests</li>
                    <li className="flex items-start gap-2">✓ Review explanations carefully</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Polish Audio Notice for Safety Signs */}
        {isSafetySigns && (
          <div className="mt-6 bg-gray-100 rounded-2xl p-4 text-center text-sm text-gray-600">
            <FaHeadphones className="inline mr-2 text-green-600" />
            Audio is a translation aid. The English text on screen is authoritative, like the real ECS test.
          </div>
        )}

        {/* FAQ Section for Safety Signs */}
        {isSafetySigns && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">❓ Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-sm">What are the four main safety sign types?</p>
                <p className="text-xs text-gray-600 mt-1">Prohibition (red circle), mandatory (blue circle), warning (yellow triangle), and safe condition (green square). Fire equipment signs are red squares.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-sm">What does shape tell you?</p>
                <p className="text-xs text-gray-600 mt-1">Circle = act or stop, triangle = caution, square/rectangle = information and escape.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animation Style */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default TopicTestPage