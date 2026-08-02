import React, { useState, useEffect } from 'react'
import Seo from '../components/Seo'
import { Link, useNavigate } from 'react-router-dom'
import { FaClock, FaCheckCircle, FaTimesCircle, FaLightbulb, FaArrowRight, FaRedoAlt, FaTrophy, FaChartLine } from 'react-icons/fa'
import { recordTestResult } from '../lib/testResults'
import AIExplainButton from '../components/AIExplainButton'
import QuestionAudio from '../components/QuestionAudio'
import LockedTestScreen from '../components/LockedTestScreen'
import { useAuth } from '../context/AuthContext'
import { canAccessTest } from '../lib/testAccess'

function GreenCardMockTest() {
  const navigate = useNavigate()
  const { isPro } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [answers, setAnswers] = useState([])
  const [showReview, setShowReview] = useState(false)

  // 50 Real Exam-Style Questions for Green Card
  const questions = [
    { id: 1, text: "What does PPE stand for?", options: ["Personal Protective Equipment", "Public Protection Equipment", "Personal Property Equipment", "Professional Protection Equipment"], correct: "Personal Protective Equipment", explanation: "PPE stands for Personal Protective Equipment. This includes hard hats, safety boots, high-visibility clothing, gloves, and eye protection. It's the last line of defense after engineering controls." },
    { id: 2, text: "What is the main purpose of the Health and Safety at Work Act 1974?", options: ["To protect the public", "To secure health, safety and welfare of people at work", "To reduce construction costs", "To improve productivity"], correct: "To secure health, safety and welfare of people at work", explanation: "The HSWA 1974 provides the legal framework to promote, stimulate and encourage high standards of health and safety in the workplace." },
    { id: 3, text: "What does RIDDOR stand for?", options: ["Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", "Regular Inspection of Dangerous Duties", "Risk Assessment Document", "Regulatory Health Standards"], correct: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", explanation: "RIDDOR requires reporting of certain serious workplace accidents, occupational diseases, and dangerous occurrences to the HSE." },
    { id: 4, text: "What is a 'competent person' under health and safety law?", options: ["Someone with a degree", "Someone with sufficient training, experience and knowledge", "The site manager", "Any worker on site"], correct: "Someone with sufficient training, experience and knowledge", explanation: "A competent person has the necessary skills, knowledge and experience to identify hazards and control risks." },
    { id: 5, text: "What is the first step in a risk assessment?", options: ["Identify hazards", "Evaluate risks", "Record findings", "Review assessment"], correct: "Identify hazards", explanation: "The first step is to identify potential hazards that could cause harm. The 5 steps are: Identify hazards, Decide who might be harmed, Evaluate risks, Record findings, Review regularly." },
    { id: 6, text: "What colour band does a CO2 fire extinguisher have?", options: ["Red", "Blue", "Black", "Yellow"], correct: "Black", explanation: "CO2 fire extinguishers have a black colour band. They are used for electrical fires and leave no residue, making them safe for electrical equipment." },
    { id: 7, text: "When should you wear your hard hat on site?", options: ["Only when working at height", "Only when the supervisor is watching", "At all times on site", "Only in designated areas"], correct: "At all times on site", explanation: "Hard hats must be worn at all times on a construction site, as there is always risk of falling objects from height." },
    { id: 8, text: "What is the correct technique for lifting a heavy box?", options: ["Bend your back and keep legs straight", "Keep back straight and bend your knees", "Twist your body while lifting", "Lift with one hand only"], correct: "Keep back straight and bend your knees", explanation: "Keep your back straight, bend your knees, keep the load close to your body, and lift with your leg muscles. Avoid twisting while carrying." },
    { id: 9, text: "What is the minimum height for working at height regulations?", options: ["2 metres", "1 metre", "There is no minimum height", "3 metres"], correct: "There is no minimum height", explanation: "The Work at Height Regulations apply to any height where a fall could cause injury. This includes working above ground, but also falling into holes or openings at ground level." },
    { id: 10, text: "What shape are prohibition signs?", options: ["Triangle", "Circle", "Square", "Rectangle"], correct: "Circle", explanation: "Prohibition signs are circular with a red border and a red diagonal line through the pictogram. They indicate actions that are not allowed (e.g., 'No Smoking')." },
    { id: 11, text: "What shape are warning signs?", options: ["Circle", "Triangle", "Square", "Rectangle"], correct: "Triangle", explanation: "Warning signs are yellow triangles with a black border and black pictogram. They alert to hazards like 'Danger: Electricity' or 'Caution: Slippery Floor'." },
    { id: 12, text: "What colour are mandatory safety signs?", options: ["Red", "Blue", "Yellow", "Green"], correct: "Blue", explanation: "Mandatory signs (like 'Safety Helmets Must Be Worn') are blue circles with white pictograms. They indicate actions that must be taken." },
    { id: 13, text: "What colour are emergency escape/first aid signs?", options: ["Red", "Blue", "Yellow", "Green"], correct: "Green", explanation: "Green signs indicate emergency exits, first aid equipment, and safety showers. They provide information about safe conditions." },
    { id: 14, text: "What does a yellow and black striped sign indicate?", options: ["Danger", "Caution/Warning", "Safe condition", "Mandatory action"], correct: "Caution/Warning", explanation: "Yellow and black striped signs indicate a hazard or warning. They are often used for trip hazards, low ceilings, or temporary hazards." },
    { id: 15, text: "What is the correct ladder angle for safe use?", options: ["90° (vertical)", "75° (1:4 ratio)", "60°", "45°"], correct: "75° (1:4 ratio)", explanation: "For every 4 units of height, the base should be 1 unit away from the wall - this creates a 75-degree angle. This provides the best stability." },
    { id: 16, text: "How often should ladders be inspected?", options: ["Every day before use", "Every week", "Every month", "Every year"], correct: "Every day before use", explanation: "Ladders should be inspected before each use by the user, plus formal inspections at regular intervals (typically every 6-12 months)." },
    { id: 17, text: "What is a key feature of mobile elevated work platforms (MEWPs)?", options: ["They require a harness at all times", "They can be used without training", "They don't need stabilisers", "They are only for indoor use"], correct: "They require a harness at all times", explanation: "Operators must wear a harness attached to the platform at all times when using MEWPs. This prevents ejection from the platform." },
    { id: 18, text: "What is the minimum guardrail height for scaffolding?", options: ["850mm", "950mm", "1050mm", "1150mm"], correct: "950mm", explanation: "Scaffold guardrails must be at least 950mm high (approximately 37 inches) with a mid-rail at 470mm." },
    { id: 19, text: "At what height should edge protection be used?", options: ["Above 1 metre", "Above 2 metres", "Where there is a risk of a fall", "Above 3 metres"], correct: "Where there is a risk of a fall", explanation: "Edge protection should be used wherever there is a risk of falling, regardless of height. Even a fall from ground level into an excavation can cause serious injury." },
    { id: 20, text: "What does TILE stand for in manual handling?", options: ["Task, Individual, Load, Environment", "Training, Instruction, Lifting, Equipment", "Time, Intensity, Location, Effort", "Tools, Items, Lifting, Ergonomics"], correct: "Task, Individual, Load, Environment", explanation: "TILE is the acronym for assessing manual handling risks: Task (what's involved), Individual (person's capability), Load (weight/characteristics), Environment (workplace conditions)." },
    { id: 21, text: "What is the maximum recommended weight for lifting at waist height for a man?", options: ["5kg", "10kg", "25kg", "40kg"], correct: "25kg", explanation: "The recommended maximum weight for lifting at waist height is 25kg for men and 16kg for women. These are guidelines - individual capability varies." },
    { id: 22, text: "What should you do before lifting a load?", options: ["Lift quickly", "Assess the load and your route", "Use one hand only", "Lift with your back"], correct: "Assess the load and your route", explanation: "Always assess the load weight, your route, and any obstructions before lifting. Check for sharp edges, stability, and the need for assistance." },
    { id: 23, text: "What is the correct position for your feet when lifting?", options: ["Together", "Shoulder width apart", "One foot forward", "Both feet back"], correct: "Shoulder width apart", explanation: "Keep your feet shoulder-width apart to provide a stable base for lifting. One foot slightly forward can also help with balance." },
    { id: 24, text: "What is the fire triangle?", options: ["Heat, Fuel, Oxygen", "Heat, Smoke, Flames", "Fuel, Air, Water", "Oxygen, Carbon, Heat"], correct: "Heat, Fuel, Oxygen", explanation: "The fire triangle consists of three elements: heat, fuel, and oxygen. Remove any one to extinguish the fire." },
    { id: 25, text: "What type of fire extinguisher is used for electrical fires?", options: ["Water (Red)", "Foam (Cream)", "CO2 (Black)", "Wet chemical (Yellow)"], correct: "CO2 (Black)", explanation: "CO2 extinguishers (black label) are safe for electrical fires as they don't conduct electricity. They work by displacing oxygen." },
    { id: 26, text: "What should you do if you discover a fire?", options: ["Try to put it out yourself", "Raise the alarm and evacuate", "Run away", "Call your supervisor only"], correct: "Raise the alarm and evacuate", explanation: "Always raise the alarm immediately and evacuate. Only attempt to fight fires if trained and the fire is small, not spreading, and you have a clear exit." },
    { id: 27, text: "What colour is a foam fire extinguisher?", options: ["Red", "Blue", "Cream", "Black"], correct: "Cream", explanation: "Foam extinguishers have a cream label and are used for flammable liquid fires (Class B) and solid combustible fires (Class A)." },
    { id: 28, text: "What does COSHH stand for?", options: ["Control of Substances Hazardous to Health", "Control of Safety Hazards", "Code of Safe Handling", "Construction Safety Standards"], correct: "Control of Substances Hazardous to Health", explanation: "COSHH is the law requiring employers to control substances that are hazardous to health, including chemicals, dust, fumes, and biological agents." },
    { id: 29, text: "What is the most common cause of work-related ill health in construction?", options: ["Falls", "Electrical shocks", "Dust and fumes (respiratory)", "Noise"], correct: "Dust and fumes (respiratory)", explanation: "Respiratory conditions from dust (including silica) and fumes are the most common occupational illness. This includes asthma, COPD, and silicosis." },
    { id: 30, text: "What should you check on a COSHH safety data sheet?", options: ["Price of the substance", "Hazards and control measures", "Manufacturer address", "Product colour"], correct: "Hazards and control measures", explanation: "Safety data sheets provide information on hazards, safe handling, storage, emergency measures, and required PPE. Always review before using hazardous substances." },
    { id: 31, text: "What does 'RPE' stand for in safety terms?", options: ["Regular Protective Equipment", "Respiratory Protective Equipment", "Risk Prevention Equipment", "Rapid Protection Equipment"], correct: "Respiratory Protective Equipment", explanation: "RPE includes masks and respirators to protect against inhaling hazardous substances. Must be fit-tested and suitable for the specific hazard." },
    { id: 32, text: "What is the main health risk from silica dust?", options: ["Skin cancer", "Silicosis (lung disease)", "Hearing loss", "Eye damage"], correct: "Silicosis (lung disease)", explanation: "Inhalation of respirable crystalline silica dust can cause silicosis, a serious and incurable lung disease. It also increases lung cancer risk." },
    { id: 33, text: "What is the most common cause of accidents on construction sites?", options: ["Falling from height", "Slips and trips", "Electrical shocks", "Manual handling"], correct: "Slips and trips", explanation: "Slips and trips are the most common cause of workplace injuries in construction, accounting for nearly one-third of all reported accidents." },
    { id: 34, text: "What should you do if you see a reversing vehicle on site?", options: ["Walk behind it", "Make eye contact with driver", "Keep clear and use designated walkways", "Signal the driver to stop"], correct: "Keep clear and use designated walkways", explanation: "Always keep clear of reversing vehicles and use designated pedestrian walkways. Never assume the driver has seen you." },
    { id: 35, text: "What is a 'banksman' responsible for?", options: ["Safety signs", "Guiding vehicle movements", "First aid", "Fire safety"], correct: "Guiding vehicle movements", explanation: "A banksman guides vehicle drivers when reversing or manoeuvring in confined spaces. They use hand signals to communicate where visibility is poor." },
    { id: 36, text: "What colour are the lights on a reversing vehicle?", options: ["Red", "White", "Amber", "Blue"], correct: "White", explanation: "Reversing vehicles typically have white reversing lights and may also have an audible reversing alarm to warn pedestrians." },
    { id: 37, text: "What is the minimum distance from an open trench edge?", options: ["0.5 metres", "1 metre", "2 metres", "3 metres"], correct: "2 metres", explanation: "Stay at least 2 metres away from unprotected trench edges to prevent collapse incidents. Materials should also be stored at least 2 metres from the edge." },
    { id: 38, text: "What does 'SLAM' stand for in safety?", options: ["Stop, Look, Assess, Manage", "Safety Learning and Monitoring", "Site Loss Assessment Method", "Stop, Listen, Act, Move"], correct: "Stop, Look, Assess, Manage", explanation: "SLAM is a technique encouraging workers to stop, look, assess, and manage risks before starting tasks. It promotes a moment of reflection before work." },
    { id: 39, text: "What is the lower action value for noise exposure?", options: ["70 dB", "80 dB", "85 dB", "90 dB"], correct: "80 dB", explanation: "The lower exposure action value for noise is 80 dB(A), requiring hearing protection to be available. At 85 dB(A), hearing protection is mandatory." },
    { id: 40, text: "What does 'HAVS' stand for?", options: ["Health and Vehicle Safety", "Hand-Arm Vibration Syndrome", "Hazard Assessment Verification", "Height and Vertical Safety"], correct: "Hand-Arm Vibration Syndrome", explanation: "HAVS is a condition caused by prolonged use of vibrating tools (e.g., breakers, grinders). Symptoms include tingling, numbness, and white finger." },
    { id: 41, text: "What is a 'hot work permit' used for?", options: ["Working in hot weather", "Work involving flames or sparks", "Working near heaters", "Summer work"], correct: "Work involving flames or sparks", explanation: "Hot work permits are required for activities like welding, cutting, or grinding that create sparks. They ensure fire safety precautions are in place." },
    { id: 42, text: "How often should fire drills be conducted on construction sites?", options: ["Weekly", "Monthly", "Every 3 months", "At regular intervals (site dependent)"], correct: "At regular intervals (site dependent)", explanation: "Fire drills should be conducted regularly based on site risk assessment, typically every 3-6 months." },
    { id: 43, text: "What is the maximum gap allowed between scaffold boards?", options: ["10mm", "15mm", "20mm", "25mm"], correct: "25mm", explanation: "The gap between scaffold boards should not exceed 25mm (approximately 1 inch) to prevent tools or materials falling through." },
    { id: 44, text: "When using a safety harness, the lanyard should be:", options: ["As long as possible", "As short as possible", "Attached to a suitable anchor point", "Tied to a fixed object"], correct: "Attached to a suitable anchor point", explanation: "The lanyard must be attached to a suitable anchor point that can support the required loads (typically at least 12kN or 2700lbs)." },
    { id: 45, text: "What is a 'collective' fall protection measure?", options: ["Safety harness", "Guard rails", "Safety net", "Both guard rails and safety nets"], correct: "Both guard rails and safety nets", explanation: "Collective measures protect everyone (e.g., guard rails, safety nets, scaffolding) rather than just one person." },
    { id: 46, text: "What does the 'Individual' in TILE refer to?", options: ["The person's training and capability", "The type of load", "The workplace conditions", "The task complexity"], correct: "The person's training and capability", explanation: "Individual factors include the person's physical capability, training, experience, health conditions, and any personal protective equipment being worn." },
    { id: 47, text: "What should you do if a load is too heavy to lift alone?", options: ["Try harder", "Get help or use mechanical aids", "Leave it where it is", "Drag it"], correct: "Get help or use mechanical aids", explanation: "Always seek assistance or use equipment (trolley, forklift, hoist) rather than risking injury. No job is worth back injury or permanent damage." },
    { id: 48, text: "What does a red circle with a diagonal line mean?", options: ["You must do this", "Prohibition - do not do this", "Warning - be careful", "Emergency information"], correct: "Prohibition - do not do this", explanation: "A red circle with a diagonal line indicates an action that is prohibited. Examples include 'No Entry', 'No Smoking', or 'No Pedestrians'." },
    { id: 49, text: "What type of gloves protect against chemical hazards?", options: ["Leather gloves", "Cotton gloves", "Nitrile rubber gloves", "Wool gloves"], correct: "Nitrile rubber gloves", explanation: "Nitrile rubber gloves provide protection against many chemicals, oils, and solvents. They offer better chemical resistance than latex or vinyl." },
    { id: 50, text: "What is the purpose of a site induction?", options: ["To introduce new workers to site safety rules", "To test worker skills", "To complete paperwork", "To assign work tasks"], correct: "To introduce new workers to site safety rules", explanation: "A site induction is mandatory for all new workers to explain site-specific hazards, emergency procedures, and safety rules before starting work." },
    { id: 51, text: "What should you do before using a ladder on site?", options: ["Just climb it, ladders are always safe", "Check it for damage and ensure it's secured on firm, level ground", "Ask a colleague to hold the bottom, no other checks needed", "Use it only if it looks new"], correct: "Check it for damage and ensure it's secured on firm, level ground", explanation: "Before use, ladders must be visually checked for damage (cracked stiles, missing rungs, worn feet), placed on firm and level ground, and secured or footed to prevent slipping." },
    { id: 52, text: "What is COSHH primarily concerned with?", options: ["Working at height", "Control of substances hazardous to health", "Manual handling techniques", "Fire evacuation procedures"], correct: "Control of substances hazardous to health", explanation: "COSHH (Control of Substances Hazardous to Health) Regulations require employers to control exposure to hazardous substances such as dust, fumes, chemicals and biological agents to prevent ill health." },
    { id: 53, text: "Who is responsible for reporting a near-miss on site?", options: ["Only the site manager", "Only the person who caused it", "Any worker who witnesses or is involved in it", "No one, near-misses don't need reporting"], correct: "Any worker who witnesses or is involved in it", explanation: "Every worker has a responsibility to report near-misses, since they highlight hazards before an actual injury occurs and help prevent future accidents." }
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

  const getTimerColor = () => {
    if (timeLeft < 60) return 'text-red-600'
    if (timeLeft < 300) return 'text-blue-500'
    return 'text-green-600'
  }

  const getTimerBgColor = () => {
    if (timeLeft < 60) return 'bg-red-100 border-red-200'
    if (timeLeft < 300) return 'bg-blue-100 border-blue-200'
    return 'bg-green-50 border-green-200'
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
    setShowReview(false)
  }

  // Record the attempt exactly once, the moment the test flips to completed.
  useEffect(() => {
    if (testCompleted) {
      recordTestResult({ testType: 'green-card', testLabel: 'ECS Green Card', score, total: questions.length, answers })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCompleted])

  if (!canAccessTest('/ecs-green-card-mock-test', isPro)) {
    return <LockedTestScreen testName="ECS Green Card Mock Test" />
  }

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 86
    const correctCount = score
    const incorrectCount = questions.length - score

    const viewCertificate = () => {
      navigate('/certificate', {
        state: {
          testLabel: 'ECS Green Card Mock Test',
          score,
          total: questions.length,
          percentage: Math.round(percentage),
        },
      })
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Banner */}
            <div className={`p-6 text-center ${passed ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'} text-white`}>
              <div className="flex justify-center mb-4">
                {passed ? <FaTrophy className="text-5xl" /> : <FaTimesCircle className="text-5xl" />}
              </div>
              <h2 className="text-3xl font-bold mb-2">{passed ? 'Congratulations!' : 'Test Completed'}</h2>
              <p className="text-white/90">{passed ? 'You passed the ECS Green Card mock test!' : 'Keep practicing - you\'ll get there!'}</p>
            </div>

            <div className="p-8">
              {/* Score Display */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gray-100 rounded-full px-8 py-4">
                  <div className={`text-5xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {score}/{questions.length}
                  </div>
                  <div className="text-gray-500 mt-1">{percentage.toFixed(1)}%</div>
                </div>
                <div className="mt-4 text-gray-600">
                  Pass mark: <span className="font-semibold">86% (43/50)</span>
                </div>
              </div>

              {/* Score Summary Grid */}
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

              {/* Performance Message */}
              <div className={`p-4 rounded-xl mb-8 ${passed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} text-center`}>
                {passed 
                  ? '🎉 Excellent work! You\'re ready for the real ECS Green Card test. Book your exam with confidence!' 
                  : `📚 You scored ${score}/50. The pass mark is 43/50. Review your answers below and try again.`}
              </div>

              {passed && (
                <button
                  onClick={viewCertificate}
                  className="w-full bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition mb-6 flex items-center justify-center gap-2"
                >
                  <FaTrophy /> Get Your Certificate
                </button>
              )}

              {/* Answer Review Toggle */}
              <button
                onClick={() => setShowReview(!showReview)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition mb-6 flex items-center justify-center gap-2"
              >
                <FaChartLine />
                {showReview ? 'Hide Answer Review' : 'Show Detailed Answer Review'}
                <FaArrowRight className={`text-sm transition-transform ${showReview ? 'rotate-90' : ''}`} />
              </button>

              {/* Answer Review */}
              {showReview && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">📝 Detailed Answer Review:</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {answers.map((ans) => (
                      <div key={ans.id} className={`p-4 rounded-xl ${ans.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-sm flex-1">Q{ans.id}: {ans.question}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ml-2 ${ans.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {ans.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          <span className="text-gray-600">Your answer:</span>{' '}
                          <span className={ans.isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>{ans.selected}</span>
                        </p>
                        {!ans.isCorrect && (
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Correct answer:</span> {ans.correct}
                          </p>
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

              {/* Premium Upgrade Section */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 mb-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <FaTrophy className="text-slate-500 text-xl" />
                  <h3 className="font-bold text-slate-800">Upgrade to Premium for Full Access</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700 mb-4">
                  <div className="flex items-center gap-2">✓ Unlimited 50-question tests</div>
                  <div className="flex items-center gap-2">✓ AI-powered explanations</div>
                  <div className="flex items-center gap-2">✓ All 11 ECS topics</div>
                  <div className="flex items-center gap-2">✓ Analytics dashboard & pass probability</div>
                  <div className="flex items-center gap-2">✓ Practice by topic</div>
                  <div className="flex items-center gap-2">✓ Progress tracking & My Mistakes</div>
                </div>
                <Link to="/pricing" className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  ⭐ Upgrade to Premium — From £4.99/week
                </Link>
                <p className="text-xs text-center text-slate-600 mt-2">7-day money-back guarantee</p>
              </div>

              {/* Action Buttons */}
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
      <Seo title="ECS Green Card Mock Test 2026 | Free Practice Questions & Answers" description="Free ECS Green Card mock test with real ECS-style questions. Practice the Health, Safety and Environment (HS&E) test online, get instant answers and explanations." path="/ecs-green-card-mock-test" />
      <div className="container mx-auto max-w-4xl">
        {/* Header with Timer */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🟢 ECS Green Card Mock Test
              </h1>
              <p className="text-gray-500 text-sm mt-1">50 questions | 30 minutes | Pass mark: 86% (43/50)</p>
            </div>
            <div className={`rounded-xl px-5 py-3 text-center ${getTimerBgColor()}`}>
              <div className={`text-3xl font-bold ${getTimerColor()} flex items-center gap-2`}>
                <FaClock className="text-xl" />
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Time Remaining</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>Score: <span className="font-bold text-green-600">{score}</span> / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-3 transition-all duration-500 ease-out"
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
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> Green Card (Operatives)
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
                  <span className="font-semibold text-blue-800">Explanation</span>
                </div>
                <p className="text-gray-700">{currentQ.explanation}</p>
                <AIExplainButton
                  explanation={currentQ.explanation}
                  topic="ECS Green Card"
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

        {/* Premium CTA */}
        <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 text-white text-center shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FaTrophy className="text-slate-300" />
            <p className="font-semibold">Premium Members Get Full Access</p>
            <FaTrophy className="text-slate-300" />
          </div>
          <p className="text-sm text-green-100 mb-3">AI explanations • Detailed analytics • Topic-wise practice • Unlimited tests</p>
          <Link to="/pricing" className="inline-block bg-white text-green-700 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition shadow-md">
            Upgrade to Premium →
          </Link>
        </div>
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

export default GreenCardMockTest