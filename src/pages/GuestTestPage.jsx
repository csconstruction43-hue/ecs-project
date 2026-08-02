import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import QuestionAudio from '../components/QuestionAudio'
import Seo from '../components/Seo'

function GuestTestPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800)
  const [answers, setAnswers] = useState([])

  // Complete 50 Real Exam-Style Questions
  const questions = [
    // Health & Safety Fundamentals (1-10)
    { id: 1, text: "What does PPE stand for?", options: ["Personal Protective Equipment", "Public Protection Equipment", "Personal Property Equipment", "Professional Protection Equipment"], correct: "Personal Protective Equipment", explanation: "PPE stands for Personal Protective Equipment. This includes hard hats, safety boots, high-visibility clothing, gloves, and eye protection." },
    { id: 2, text: "What is the main purpose of the Health and Safety at Work Act 1974?", options: ["To protect the public", "To secure health, safety and welfare of people at work", "To reduce construction costs", "To improve productivity"], correct: "To secure health, safety and welfare of people at work", explanation: "The HSWA 1974 provides the legal framework to promote, stimulate and encourage high standards of health and safety in the workplace." },
    { id: 3, text: "What does RIDDOR stand for?", options: ["Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", "Regular Inspection of Dangerous Duties", "Risk Assessment Document", "Regulatory Health Standards"], correct: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", explanation: "RIDDOR requires reporting of certain serious workplace accidents, occupational diseases, and dangerous occurrences." },
    { id: 4, text: "What is a 'competent person' under health and safety law?", options: ["Someone with a degree", "Someone with sufficient training, experience and knowledge", "The site manager", "Any worker on site"], correct: "Someone with sufficient training, experience and knowledge", explanation: "A competent person has the necessary skills, knowledge and experience to identify hazards and control risks." },
    { id: 5, text: "What is the first step in a risk assessment?", options: ["Identify hazards", "Evaluate risks", "Record findings", "Review assessment"], correct: "Identify hazards", explanation: "The first step is to identify potential hazards that could cause harm." },
    
    // PPE & Equipment (6-12)
    { id: 6, text: "What colour band does a CO2 fire extinguisher have?", options: ["Red", "Blue", "Black", "Yellow"], correct: "Black", explanation: "CO2 fire extinguishers have a black colour band. They are used for electrical fires and leave no residue." },
    { id: 7, text: "When should you wear your hard hat on site?", options: ["Only when working at height", "Only when the supervisor is watching", "At all times on site", "Only in designated areas"], correct: "At all times on site", explanation: "Hard hats must be worn at all times on a construction site, as there is always risk of falling objects." },
    { id: 8, text: "What is the correct technique for lifting a heavy box?", options: ["Bend your back and keep legs straight", "Keep back straight and bend your knees", "Twist your body while lifting", "Lift with one hand only"], correct: "Keep back straight and bend your knees", explanation: "Keep your back straight, bend your knees, keep the load close to your body, and lift with your leg muscles." },
    { id: 9, text: "What type of gloves protect against chemical hazards?", options: ["Leather gloves", "Cotton gloves", "Nitrile rubber gloves", "Wool gloves"], correct: "Nitrile rubber gloves", explanation: "Nitrile rubber gloves provide protection against many chemicals, oils, and solvents." },
    { id: 10, text: "What is the minimum height for working at height regulations?", options: ["2 metres", "1 metre", "There is no minimum height", "3 metres"], correct: "There is no minimum height", explanation: "The Work at Height Regulations apply to any height where a fall could cause injury." },
    { id: 11, text: "What is the correct ladder angle for safe use?", options: ["90° (vertical)", "75° (1:4 ratio)", "60°", "45°"], correct: "75° (1:4 ratio)", explanation: "For every 4 units of height, the base should be 1 unit away from the wall - this creates a 75-degree angle." },
    { id: 12, text: "How often should ladders be inspected?", options: ["Every day before use", "Every week", "Every month", "Every year"], correct: "Every day before use", explanation: "Ladders should be inspected before each use by the user, plus formal inspections at regular intervals." },
    
    // Safety Signs (13-18)
    { id: 13, text: "What shape are prohibition signs?", options: ["Triangle", "Circle", "Square", "Rectangle"], correct: "Circle", explanation: "Prohibition signs are circular with a red border and a red diagonal line through the pictogram." },
    { id: 14, text: "What shape are warning signs?", options: ["Circle", "Triangle", "Square", "Rectangle"], correct: "Triangle", explanation: "Warning signs are yellow triangles with a black border and black pictogram." },
    { id: 15, text: "What colour are mandatory safety signs?", options: ["Red", "Blue", "Yellow", "Green"], correct: "Blue", explanation: "Mandatory signs (like 'Safety Helmets Must Be Worn') are blue circles with white pictograms." },
    { id: 16, text: "What colour are emergency escape/first aid signs?", options: ["Red", "Blue", "Yellow", "Green"], correct: "Green", explanation: "Green signs indicate emergency exits, first aid equipment, and safety showers." },
    { id: 17, text: "What does a yellow and black striped sign indicate?", options: ["Danger", "Caution/Warning", "Safe condition", "Mandatory action"], correct: "Caution/Warning", explanation: "Yellow and black striped signs indicate a hazard or warning." },
    { id: 18, text: "What does a red circle with a diagonal line mean?", options: ["You must do this", "Prohibition - do not do this", "Warning - be careful", "Emergency information"], correct: "Prohibition - do not do this", explanation: "A red circle with a diagonal line indicates an action that is prohibited." },
    
    // Working at Height (19-24)
    { id: 19, text: "What is a key feature of mobile elevated work platforms (MEWPs)?", options: ["They require a harness at all times", "They can be used without training", "They don't need stabilisers", "They are only for indoor use"], correct: "They require a harness at all times", explanation: "Operators must wear a harness attached to the platform at all times when using MEWPs." },
    { id: 20, text: "What is the minimum guardrail height for scaffolding?", options: ["850mm", "950mm", "1050mm", "1150mm"], correct: "950mm", explanation: "Scaffold guardrails must be at least 950mm high with a mid-rail at 470mm." },
    { id: 21, text: "At what height should edge protection be used?", options: ["Above 1 metre", "Above 2 metres", "Where there is a risk of a fall", "Above 3 metres"], correct: "Where there is a risk of a fall", explanation: "Edge protection should be used wherever there is a risk of falling, regardless of height." },
    { id: 22, text: "What is the maximum gap allowed between scaffold boards?", options: ["10mm", "15mm", "20mm", "25mm"], correct: "25mm", explanation: "The gap between scaffold boards should not exceed 25mm to prevent tools or materials falling through." },
    { id: 23, text: "When using a safety harness, the lanyard should be:", options: ["As long as possible", "As short as possible", "Attached to a suitable anchor point", "Tied to a fixed object"], correct: "Attached to a suitable anchor point", explanation: "The lanyard must be attached to a suitable anchor point that can support the required loads." },
    { id: 24, text: "What is a 'collective' fall protection measure?", options: ["Safety harness", "Guard rails", "Safety net", "Both guard rails and safety nets"], correct: "Both guard rails and safety nets", explanation: "Collective measures protect everyone (e.g., guard rails, safety nets) rather than just one person." },
    
    // Manual Handling (25-30)
    { id: 25, text: "What does TILE stand for in manual handling?", options: ["Task, Individual, Load, Environment", "Training, Instruction, Lifting, Equipment", "Time, Intensity, Location, Effort", "Tools, Items, Lifting, Ergonomics"], correct: "Task, Individual, Load, Environment", explanation: "TILE is the acronym for assessing manual handling risks: Task, Individual, Load, Environment." },
    { id: 26, text: "What is the maximum recommended weight for lifting at waist height for a man?", options: ["5kg", "10kg", "25kg", "40kg"], correct: "25kg", explanation: "The recommended maximum weight for lifting at waist height is 25kg for men and 16kg for women." },
    { id: 27, text: "What should you do before lifting a load?", options: ["Lift quickly", "Assess the load and your route", "Use one hand only", "Lift with your back"], correct: "Assess the load and your route", explanation: "Always assess the load weight, your route, and any obstructions before lifting." },
    { id: 28, text: "What is the correct position for your feet when lifting?", options: ["Together", "Shoulder width apart", "One foot forward", "Both feet back"], correct: "Shoulder width apart", explanation: "Keep your feet shoulder-width apart to provide a stable base for lifting." },
    { id: 29, text: "What does the 'Individual' in TILE refer to?", options: ["The person's training and capability", "The type of load", "The workplace conditions", "The task complexity"], correct: "The person's training and capability", explanation: "Individual factors include the person's physical capability, training, and any health conditions." },
    { id: 30, text: "What should you do if a load is too heavy to lift alone?", options: ["Try harder", "Get help or use mechanical aids", "Leave it where it is", "Drag it"], correct: "Get help or use mechanical aids", explanation: "Always seek assistance or use equipment rather than risking injury." },
    
    // Fire Safety (31-36)
    { id: 31, text: "What is the fire triangle?", options: ["Heat, Fuel, Oxygen", "Heat, Smoke, Flames", "Fuel, Air, Water", "Oxygen, Carbon, Heat"], correct: "Heat, Fuel, Oxygen", explanation: "The fire triangle consists of three elements: heat, fuel, and oxygen. Remove any one to extinguish the fire." },
    { id: 32, text: "What type of fire extinguisher is used for electrical fires?", options: ["Water (Red)", "Foam (Cream)", "CO2 (Black)", "Wet chemical (Yellow)"], correct: "CO2 (Black)", explanation: "CO2 extinguishers (black label) are safe for electrical fires as they don't conduct electricity." },
    { id: 33, text: "What should you do if you discover a fire?", options: ["Try to put it out yourself", "Raise the alarm and evacuate", "Run away", "Call your supervisor only"], correct: "Raise the alarm and evacuate", explanation: "Always raise the alarm immediately and evacuate. Only attempt to fight fires if trained." },
    { id: 34, text: "What colour is a foam fire extinguisher?", options: ["Red", "Blue", "Cream", "Black"], correct: "Cream", explanation: "Foam extinguishers have a cream label and are used for flammable liquid fires." },
    { id: 35, text: "What is a 'hot work permit' used for?", options: ["Working in hot weather", "Work involving flames or sparks", "Working near heaters", "Summer work"], correct: "Work involving flames or sparks", explanation: "Hot work permits are required for activities like welding, cutting, or grinding that create sparks." },
    { id: 36, text: "How often should fire drills be conducted on construction sites?", options: ["Weekly", "Monthly", "Every 3 months", "At regular intervals (site dependent)"], correct: "At regular intervals (site dependent)", explanation: "Fire drills should be conducted regularly based on site risk assessment, typically every 3-6 months." },
    
    // COSHH & Hazardous Substances (37-42)
    { id: 37, text: "What does COSHH stand for?", options: ["Control of Substances Hazardous to Health", "Control of Safety Hazards", "Code of Safe Handling", "Construction Safety Standards"], correct: "Control of Substances Hazardous to Health", explanation: "COSHH is the law requiring employers to control substances that are hazardous to health." },
    { id: 38, text: "What is the most common cause of work-related ill health in construction?", options: ["Falls", "Electrical shocks", "Dust and fumes (respiratory)", "Noise"], correct: "Dust and fumes (respiratory)", explanation: "Respiratory conditions from dust (including silica) and fumes are the most common occupational illness." },
    { id: 39, text: "What should you check on a COSHH safety data sheet?", options: ["Price of the substance", "Hazards and control measures", "Manufacturer address", "Product colour"], correct: "Hazards and control measures", explanation: "Safety data sheets provide information on hazards, safe handling, and emergency measures." },
    { id: 40, text: "What does 'RPE' stand for in safety terms?", options: ["Regular Protective Equipment", "Respiratory Protective Equipment", "Risk Prevention Equipment", "Rapid Protection Equipment"], correct: "Respiratory Protective Equipment", explanation: "RPE includes masks and respirators to protect against inhaling hazardous substances." },
    { id: 41, text: "What is the main health risk from silica dust?", options: ["Skin cancer", "Silicosis (lung disease)", "Hearing loss", "Eye damage"], correct: "Silicosis (lung disease)", explanation: "Inhalation of silica dust can cause silicosis, a serious and incurable lung disease." },
    { id: 42, text: "What does 'COSHH Essentials' provide?", options: ["Training courses", "Guidance on controlling hazardous substances", "Equipment catalogues", "Legal advice"], correct: "Guidance on controlling hazardous substances", explanation: "COSHH Essentials is a HSE tool providing practical advice on controlling hazardous substances." },
    
    // Site Safety & Transport (43-48)
    { id: 43, text: "What is the most common cause of accidents on construction sites?", options: ["Falling from height", "Slips and trips", "Electrical shocks", "Manual handling"], correct: "Slips and trips", explanation: "Slips and trips are the most common cause of workplace injuries in construction." },
    { id: 44, text: "What should you do if you see a reversing vehicle on site?", options: ["Walk behind it", "Make eye contact with driver", "Keep clear and use designated walkways", "Signal the driver to stop"], correct: "Keep clear and use designated walkways", explanation: "Always keep clear of reversing vehicles and use designated pedestrian walkways." },
    { id: 45, text: "What is a 'banksman' responsible for?", options: ["Safety signs", "Guiding vehicle movements", "First aid", "Fire safety"], correct: "Guiding vehicle movements", explanation: "A banksman guides vehicle drivers when reversing or manoeuvring in confined spaces." },
    { id: 46, text: "What colour are the lights on a reversing vehicle?", options: ["Red", "White", "Amber", "Blue"], correct: "White", explanation: "Reversing vehicles typically have white reversing lights and may also have an audible alarm." },
    { id: 47, text: "What is the minimum distance from an open trench edge?", options: ["0.5 metres", "1 metre", "2 metres", "3 metres"], correct: "2 metres", explanation: "Stay at least 2 metres away from unprotected trench edges to prevent collapse incidents." },
    { id: 48, text: "What does 'SLAM' stand for in safety?", options: ["Stop, Look, Assess, Manage", "Safety Learning and Monitoring", "Site Loss Assessment Method", "Stop, Listen, Act, Move"], correct: "Stop, Look, Assess, Manage", explanation: "SLAM is a technique encouraging workers to stop, look, assess, and manage risks before starting tasks." },
    
    // Health & Environment (49-50)
    { id: 49, text: "What is the lower action value for noise exposure?", options: ["70 dB", "80 dB", "85 dB", "90 dB"], correct: "80 dB", explanation: "The lower exposure action value for noise is 80 dB(A), requiring hearing protection to be available." },
    { id: 50, text: "What does 'HAVS' stand for?", options: ["Health and Vehicle Safety", "Hand-Arm Vibration Syndrome", "Hazard Assessment Verification", "Height and Vertical Safety"], correct: "Hand-Arm Vibration Syndrome", explanation: "HAVS is a condition caused by prolonged use of vibrating tools, affecting blood vessels and nerves." }
  ]

  const currentQ = questions[currentIndex]

  // Timer effect
  useEffect(() => {
    if (testCompleted || showResult) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setTestCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [testCompleted, showResult, currentIndex])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQ.correct
    if (isCorrect) setScore(score + 1)
    setAnswers([...answers, { 
      id: currentQ.id,
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
    setTimeLeft(1800)
    setAnswers([])
  }

  const getTimerColor = () => {
    if (timeLeft < 60) return 'text-red-600'
    if (timeLeft < 300) return 'text-blue-500'
    return 'text-green-600'
  }

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 86
    const correctCount = score
    const incorrectCount = questions.length - score
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Test Completed!</h2>
            <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}/{questions.length}
            </div>
            <div className="text-xl mb-4">{percentage.toFixed(1)}%</div>
            
            {/* Pass/Fail Banner */}
            <div className={`p-4 rounded-lg mb-6 ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {passed 
                ? '🎉 Congratulations! You passed! You\'re ready for the real ECS test.' 
                : '😞 You did not pass. The pass mark is 86% (43/50). Keep practicing!'}
            </div>

            {/* Score Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                <div className="text-sm text-green-700">Correct Answers</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
                <div className="text-sm text-red-700">Incorrect Answers</div>
              </div>
            </div>
            
            {/* Answer Review */}
            <div className="text-left mb-6">
              <h3 className="font-bold text-lg mb-3">📝 Answer Review:</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {answers.map((ans) => (
                  <div key={ans.id} className={`p-3 rounded-lg ${ans.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm flex-1">Q{ans.id}: {ans.question}</p>
                      <span className={`text-xs px-2 py-1 rounded ${ans.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {ans.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="text-sm mt-1">Your answer: <span className={ans.isCorrect ? 'text-green-700' : 'text-red-700'}>{ans.selected}</span></p>
                    {!ans.isCorrect && <p className="text-sm text-gray-600">Correct answer: <span className="font-medium">{ans.correct}</span></p>}
                    <p className="text-xs text-gray-500 mt-2">{ans.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upgrade CTA */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg mb-6 border border-slate-200">
              <p className="text-slate-800 font-semibold">🎉 Want more? Upgrade to Premium for:</p>
              <ul className="text-sm text-slate-700 mt-2 text-left list-disc list-inside">
                <li>✓ Unlimited 50-question tests</li>
                <li>✓ AI-powered explanations</li>
                <li>✓ All 11 ECS topics</li>
                <li>✓ Analytics dashboard & pass probability</li>
                <li>✓ Practice by topic</li>
              </ul>
            </div>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={restartTest} className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition">
                🔄 Try Again
              </button>
              <Link to="/mock-test" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition">
                📚 More Tests
              </Link>
              <Link to="/pricing" className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition font-semibold">
                ⭐ Upgrade to Premium →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Seo
        title="Free ECS Mock Test: Try a Real Guest Practice Exam"
        description="Take a free ECS mock test with no sign-up needed. Try real exam-style questions, instant marking and a genuine feel for the HSE test."
        path="/guest-test"
      />
      {/* Free Trial Banner */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-3 mb-4 text-center">
        <p className="text-slate-800 text-sm">
          🎉 <span className="font-semibold">Free Trial</span> - {questions.length} questions | 30 minutes | Pass mark: 86%
          <Link to="/pricing" className="font-semibold underline ml-2 text-blue-700 hover:text-blue-900">Upgrade to Premium</Link> 
          for unlimited access!
        </p>
      </div>

      {/* Header with Timer and Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Free ECS Mock Test 2026</h1>
            <p className="text-gray-500 text-sm">50 questions | 30 minutes | Pass mark: 86% (43/50)</p>
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-center">
            <div className={`text-3xl font-bold ${getTimerColor()}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-gray-500">Time Remaining</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-2 flex justify-between text-sm text-gray-600">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {score} / {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-3 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-4 flex justify-between items-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
            Question #{currentIndex + 1}
          </span>
          <span className="text-xs text-gray-400">ECS Exam Style</span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed">
          {currentQ.text}
        </h2>

        <QuestionAudio text={currentQ.text} isPro={false} />
        
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const letters = ['A', 'B', 'C', 'D']
            let optionClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer flex items-center gap-3"
            
            if (showResult) {
              if (option === currentQ.correct) {
                optionClass += " bg-green-50 border-green-500"
              } else if (selectedAnswer === option && option !== currentQ.correct) {
                optionClass += " bg-red-50 border-red-500"
              } else {
                optionClass += " border-gray-200 bg-gray-50 opacity-70"
              }
            } else {
              optionClass += " hover:border-green-500 hover:bg-green-50 border-gray-200"
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
                {showResult && option === currentQ.correct && <span className="text-green-500 text-xl">✓</span>}
                {showResult && selectedAnswer === option && option !== currentQ.correct && <span className="text-red-500 text-xl">✗</span>}
              </button>
            )
          })}
        </div>

        {/* Explanation Box */}
        {showResult && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <span className="font-semibold text-blue-800">AI Explanation</span>
            </div>
            <p className="text-gray-700">{currentQ.explanation}</p>
            <button 
              onClick={nextQuestion}
              className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition w-full font-semibold"
            >
              {currentIndex + 1 < questions.length ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        )}
      </div>

      {/* Premium CTA Sidebar */}
      <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 text-white text-center">
        <p className="text-sm">✨ <span className="font-semibold">Premium Members</span> get AI explanations, detailed analytics, topic-wise practice, and unlimited full tests!</p>
        <Link to="/pricing" className="inline-block mt-2 bg-white text-green-700 px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition shadow-md">
          Upgrade to Premium →
        </Link>
      </div>
    </div>
  )
}

export default GuestTestPage