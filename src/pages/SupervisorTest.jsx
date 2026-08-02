import React, { useState, useEffect } from 'react'
import { recordTestResult } from '../lib/testResults'
import AIExplainButton from '../components/AIExplainButton'
import QuestionAudio from '../components/QuestionAudio'
import LockedTestScreen from '../components/LockedTestScreen'
import { useAuth } from '../context/AuthContext'
import { canAccessTest } from '../lib/testAccess'
import Seo from '../components/Seo'
import { Link, useNavigate } from 'react-router-dom'
import { FaClock, FaCheckCircle, FaTimesCircle, FaLightbulb, FaArrowRight, FaRedoAlt, FaTrophy, FaChartLine, FaHardHat } from 'react-icons/fa'

function SupervisorTest() {
  const navigate = useNavigate()
  const { isPro } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800)
  const [answers, setAnswers] = useState([])
  const [showReview, setShowReview] = useState(false)

  // 50 Real Supervisor Exam-Style Questions for Gold Card
  const questions = [
    // Supervisor Decision Making & Leadership (1-8)
    { id: 1, text: "A supervisor's primary duty under the Health and Safety at Work Act is:", options: ["To ensure all workers have ECS cards", "To take reasonable care of their own and others' safety", "To complete all paperwork on time", "To report all incidents to HSE"], correct: "To take reasonable care of their own and others' safety", explanation: "Under Section 7 of HSWA, every employee has a duty to take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions." },
    { id: 2, text: "You are supervising a confined-space entry and the permit expires in 20 minutes. The work will take at least another hour. What do you do?", options: ["Continue working, permits are just paperwork", "Stop the work, evacuate and issue a new permit", "Ask the worker to finish quickly", "Extend the permit verbally"], correct: "Stop the work, evacuate and issue a new permit", explanation: "Permits are time-limited for a reason. Atmosphere and conditions must be re-tested for the new period. Never extend a permit without re-assessment." },
    { id: 3, text: "A new starter arrives on Monday morning without proof of induction. The job is on a critical path. What is the correct supervisor response?", options: ["Let them start to avoid delay", "Refuse site access until induction is complete", "Give them a verbal safety briefing only", "Ask them to work under supervision"], correct: "Refuse site access until induction is complete", explanation: "Schedule pressure is never a valid reason to bypass induction. You, the supervisor, are personally accountable if an un-inducted worker is injured." },
    { id: 4, text: "During a daily briefing a worker raises a safety concern that is not on your method statement. How should you handle it?", options: ["Ignore it, method statements are final", "Take it seriously and dynamically reassess", "Tell them to raise it with HR", "Finish briefing first then ignore"], correct: "Take it seriously and dynamically reassess", explanation: "Take the concern seriously, dynamically reassess the risk on the spot, and either amend the method statement or escalate to the principal contractor." },
    { id: 5, text: "You spot a sub-contractor using a damaged grinder. They claim their company allows it. What is your authority?", options: ["Only your own team, not subcontractors", "Stop the work immediately", "Report to their manager only", "Ignore it, not your problem"], correct: "Stop the work immediately", explanation: "As the site supervisor you have authority to stop the work immediately, regardless of which company employs the operative. HSWA applies to all persons on site." },
    { id: 6, text: "A near-miss is reported to you. The investigation will take several hours. What is your minimum obligation?", options: ["Ignore near misses", "Log it in the near-miss register same day", "Only investigate if injury occurred", "Report to HSE immediately"], correct: "Log it in the near-miss register same day", explanation: "Log the near miss in the site near-miss register the same day, share findings at toolbox talk, and feed data into safety analytics to spot trends." },
    { id: 7, text: "What is the supervisor's role in toolbox talks?", options: ["Sit and listen only", "Lead the talk, engage workers, and gather feedback", "Avoid them to save time", "Let workers run it"], correct: "Lead the talk, engage workers, and gather feedback", explanation: "Supervisors should lead toolbox talks, engage workers in discussion, address concerns, and gather feedback on safety issues from the team." },
    { id: 8, text: "What should a supervisor do when a worker refuses to wear required PPE?", options: ["Accept the refusal", "Stop the worker from carrying out the task", "Ignore it, the worker is an adult", "Report to police"], correct: "Stop the worker from carrying out the task", explanation: "Supervisors must enforce PPE rules. Stop the worker from carrying out the task until PPE is worn correctly. This is a legal requirement under PPE Regulations." },
    
    // Risk Assessment & Method Statements (9-15)
    { id: 9, text: "What is the difference between a risk assessment and a method statement?", options: ["No difference", "Risk assessment identifies hazards, method statement describes safe procedure", "Method statement is longer", "Risk assessment is optional"], correct: "Risk assessment identifies hazards, method statement describes safe procedure", explanation: "A risk assessment identifies hazards and evaluates risks. A method statement describes the step-by-step safe procedure to carry out the work." },
    { id: 10, text: "How often should risk assessments be reviewed by a supervisor?", options: ["Never", "Annually or when circumstances change", "Every 5 years", "Only after accidents"], correct: "Annually or when circumstances change", explanation: "Risk assessments should be reviewed at least annually, or when there are changes to work processes, equipment, personnel, or following incidents." },
    { id: 11, text: "What is a 'dynamic risk assessment'?", options: ["Weekly risk review", "Continuous assessment of changing risks", "Annual assessment", "Paperwork exercise"], correct: "Continuous assessment of changing risks", explanation: "Dynamic risk assessment involves continuously observing, assessing, and responding to changing risks in real-time, especially important for lone workers and changing environments." },
    { id: 12, text: "What should a supervisor check in a method statement before work begins?", options: ["Only the date", "All control measures are understood and in place", "Signature only", "The font size"], correct: "All control measures are understood and in place", explanation: "Supervisors must ensure all control measures in the method statement are understood by workers and implemented correctly before work begins." },
    { id: 13, text: "What is the hierarchy of control?", options: ["PPE first", "Elimination, Substitution, Engineering, Administration, PPE", "Training only", "Warning signs only"], correct: "Elimination, Substitution, Engineering, Administration, PPE", explanation: "The hierarchy prioritises elimination first (remove the hazard), then substitution, engineering controls, administrative controls, and finally PPE as the last line of defence." },
    { id: 14, text: "Who is responsible for signing off a permit to work?", options: ["The worker only", "The supervisor after checking controls", "The client", "No one"], correct: "The supervisor after checking controls", explanation: "Supervisors are responsible for checking all controls are in place before signing off a permit to work and authorising the work to begin." },
    { id: 15, text: "What should a supervisor do if a method statement is impractical on site?", options: ["Carry on regardless", "Stop work and seek revised method statement", "Ignore it", "Change it without telling anyone"], correct: "Stop work and seek revised method statement", explanation: "If a method statement is impractical, stop work immediately and seek a revised, safe method statement before continuing." },
    
    // Supervising Work at Height (16-20)
    { id: 16, text: "What is the minimum guardrail height for scaffolding?", options: ["850mm", "950mm", "1050mm", "1150mm"], correct: "950mm", explanation: "Scaffold guardrails must be at least 950mm high (approximately 37 inches) with a mid-rail at 470mm. Toe boards should be at least 150mm high." },
    { id: 17, text: "As a supervisor, what must you check before workers use a ladder?", options: ["Ladder is inspected and suitable for task", "Only check worker's shoes", "Nothing", "Only check the weather"], correct: "Ladder is inspected and suitable for task", explanation: "Supervisors must ensure ladders are inspected before use, are suitable for the task, are on firm ground, and workers are trained in safe ladder use." },
    { id: 18, text: "What is the correct ladder angle for safe use?", options: ["90° (vertical)", "75° (1:4 ratio)", "60°", "45°"], correct: "75° (1:4 ratio)", explanation: "For every 4 units of height, the base should be 1 unit away from the wall - this creates a 75-degree angle, the safest position for a ladder." },
    { id: 19, text: "What is a supervisor's responsibility regarding edge protection?", options: ["No responsibility", "Ensure it is in place before work at height begins", "Only check after accidents", "Leave to workers"], correct: "Ensure it is in place before work at height begins", explanation: "Supervisors must ensure edge protection is in place and properly installed before any work at height begins in that area." },
    { id: 20, text: "What must a supervisor check about a MEWP (mobile elevated work platform) before use?", options: ["Only fuel level", "Daily inspection, harness, and operator training", "Only tyre pressure", "Nothing"], correct: "Daily inspection, harness, and operator training", explanation: "Supervisors must ensure MEWPs have daily inspections, operators are trained and authorised, and harnesses are worn and attached correctly." },
    
    // Supervising Manual Handling (21-24)
    { id: 21, text: "What does TILE stand for in manual handling?", options: ["Task, Individual, Load, Environment", "Training, Instruction, Lifting, Equipment", "Time, Intensity, Location, Effort"], correct: "Task, Individual, Load, Environment", explanation: "TILE is the acronym for assessing manual handling risks: Task (what's involved), Individual (person's capability), Load (weight/characteristics), Environment (workplace conditions)." },
    { id: 22, text: "A worker wants to lift a 30kg box alone. What should the supervisor do?", options: ["Let them try", "Provide mechanical assistance or team lifting", "Ignore it", "Make them lift faster"], correct: "Provide mechanical assistance or team lifting", explanation: "Supervisors must provide mechanical assistance (trolley, hoist) or arrange team lifting for loads exceeding recommended weights (25kg for men, 16kg for women)." },
    { id: 23, text: "What is the maximum recommended weight for lifting at waist height for a man?", options: ["5kg", "10kg", "25kg", "40kg"], correct: "25kg", explanation: "The recommended maximum weight for lifting at waist height is 25kg for men and 16kg for women. These are guidelines - individual capability varies." },
    { id: 24, text: "What should a supervisor check about a worker's manual handling technique?", options: ["Nothing", "Back straight, bend knees, load close to body", "Only speed", "Only grip strength"], correct: "Back straight, bend knees, load close to body", explanation: "Supervisors should observe and correct technique: keep back straight, bend knees, keep load close to body, and lift with leg muscles, not back." },
    
    // Fire Safety (25-28)
    { id: 25, text: "What type of fire extinguisher is used for electrical fires?", options: ["Water (Red)", "Foam (Cream)", "CO2 (Black)", "Wet chemical (Yellow)"], correct: "CO2 (Black)", explanation: "CO2 extinguishers (black label) are safe for electrical fires as they don't conduct electricity and leave no residue that could damage equipment." },
    { id: 26, text: "What colour is a foam fire extinguisher?", options: ["Red", "Blue", "Cream", "Black"], correct: "Cream", explanation: "Foam extinguishers have a cream label and are used for flammable liquid fires (Class B) and solid combustible fires (Class A)." },
    { id: 27, text: "What is a supervisor's role during a fire evacuation?", options: ["Run first", "Account for your team and direct them to assembly point", "Hide", "Call family"], correct: "Account for your team and direct them to assembly point", explanation: "Supervisors must account for all team members, direct them to the assembly point, report missing persons, and follow evacuation procedures." },
    { id: 28, text: "What is the fire triangle?", options: ["Heat, Fuel, Oxygen", "Heat, Smoke, Flames", "Fuel, Air, Water"], correct: "Heat, Fuel, Oxygen", explanation: "The fire triangle consists of three elements: heat, fuel, and oxygen. Remove any one to extinguish the fire." },
    
    // Electrical Safety (29-31)
    { id: 29, text: "What voltage should portable power tools use on construction sites?", options: ["240V", "110V centre-tapped earth (CTE)", "400V", "12V"], correct: "110V centre-tapped earth (CTE)", explanation: "110V CTE (centre-tapped earth) reduces the risk of electric shock and is the standard for portable tools on UK construction sites." },
    { id: 30, text: "What must a supervisor check about electrical equipment on site?", options: ["Only the plug", "PAT testing, cable condition, and RCD protection", "Only the colour", "Nothing"], correct: "PAT testing, cable condition, and RCD protection", explanation: "Supervisors should ensure all electrical equipment is PAT tested, cables are undamaged, and RCD protection is in place." },
    { id: 31, text: "What is the safe distance from overhead power lines for plant and machinery?", options: ["0.5 metres", "6 metres minimum, more for higher voltages", "1 metre", "10 metres always"], correct: "6 metres minimum, more for higher voltages", explanation: "The minimum safe distance from overhead power lines is 6 metres, with greater distances required for higher voltages. Always consult the electricity provider." },
    
    // Site Transport & Excavations (32-36)
    { id: 32, text: "What is a 'banksman' responsible for?", options: ["Safety signs", "Guiding vehicle movements", "First aid", "Fire safety"], correct: "Guiding vehicle movements", explanation: "A banksman guides vehicle drivers when reversing or manoeuvring in confined spaces where visibility is poor, using approved hand signals." },
    { id: 33, text: "What must a supervisor check about vehicle movements on site?", options: ["Nothing", "Segregation, banksmen, speed limits, and reversing aids", "Only speed", "Only noise"], correct: "Segregation, banksmen, speed limits, and reversing aids", explanation: "Supervisors must ensure pedestrian-vehicle segregation, trained banksmen, speed limits, reversing alarms/cameras, and driver training are in place." },
    { id: 34, text: "What is the minimum distance from an open trench edge for materials and spoil?", options: ["0.5 metres", "1 metre", "2 metres", "3 metres"], correct: "2 metres", explanation: "Materials and spoil must be stored at least 2 metres away from trench edges to prevent collapse and reduce load on the excavation sides." },
    { id: 35, text: "What must be in place before workers enter an excavation?", options: ["Nothing", "Shoring or battering, edge protection, and access ladder", "Only a hard hat", "Only gloves"], correct: "Shoring or battering, edge protection, and access ladder", explanation: "Supervisors must ensure excavations are shored or battered, edge protection is in place, and safe access (ladder) is provided before workers enter." },
    { id: 36, text: "How often should excavations be inspected by a competent person?", options: ["Never", "Daily and after any event that could affect stability", "Weekly", "Monthly"], correct: "Daily and after any event that could affect stability", explanation: "Excavations must be inspected daily by a competent person before each shift, and after any event that could affect stability (eg, heavy rain, nearby vibration)." },
    
    // Health, COSHH & Welfare (37-42)
    { id: 37, text: "What does COSHH stand for?", options: ["Control of Substances Hazardous to Health", "Control of Safety Hazards", "Code of Safe Handling"], correct: "Control of Substances Hazardous to Health", explanation: "COSHH is the law requiring employers to control substances that are hazardous to health, including chemicals, dust, fumes, and biological agents." },
    { id: 38, text: "What must a supervisor check about hazardous substances on site?", options: ["Only the label", "COSHH assessments, safety data sheets, and control measures", "Only the colour", "Nothing"], correct: "COSHH assessments, safety data sheets, and control measures", explanation: "Supervisors must ensure COSHH assessments are available, safety data sheets are accessible, and control measures (ventilation, PPE) are in place." },
    { id: 39, text: "What is the main health risk from silica dust?", options: ["Skin cancer", "Silicosis (lung disease)", "Hearing loss", "Eye damage"], correct: "Silicosis (lung disease)", explanation: "Inhalation of respirable crystalline silica dust can cause silicosis, a serious and incurable lung disease. Control with water suppression or LEV." },
    { id: 40, text: "What welfare facilities must a supervisor ensure are available?", options: ["None", "Toilets, washing facilities, drinking water, rest area, drying room", "Only a canteen", "Only toilets"], correct: "Toilets, washing facilities, drinking water, rest area, drying room", explanation: "Under CDM 2015, supervisors must ensure adequate welfare facilities: toilets, washing, drinking water, rest area, and drying facilities for wet weather." },
    { id: 41, text: "What is the lower action value for noise exposure requiring hearing protection to be available?", options: ["70 dB", "80 dB", "85 dB", "90 dB"], correct: "80 dB", explanation: "The lower exposure action value for noise is 80 dB(A), requiring hearing protection to be available. At 85 dB(A) (upper value), hearing protection is mandatory." },
    { id: 42, text: "What does HAVS stand for?", options: ["Health and Vehicle Safety", "Hand-Arm Vibration Syndrome", "Hazard Assessment Verification"], correct: "Hand-Arm Vibration Syndrome", explanation: "HAVS is a condition caused by prolonged use of vibrating tools (e.g., breakers, grinders). Symptoms include tingling, numbness, and white finger." },
    
    // PPE (43-46)
    { id: 43, text: "What should a supervisor check about hard hats on site?", options: ["Only the colour", "Expiry date, condition, and worn at all times in risk areas", "Only the logo", "Nothing"], correct: "Expiry date, condition, and worn at all times in risk areas", explanation: "Supervisors must check hard hats are within expiry date, undamaged, and worn correctly at all times in areas with head injury risk." },
    { id: 44, text: "What type of gloves protect against chemical hazards?", options: ["Leather gloves", "Nitrile rubber gloves", "Cotton gloves", "Wool gloves"], correct: "Nitrile rubber gloves", explanation: "Nitrile rubber gloves provide protection against many chemicals, oils, and solvents. They offer better chemical resistance than latex or vinyl." },
    { id: 45, text: "What does RPE stand for?", options: ["Regular Protective Equipment", "Respiratory Protective Equipment", "Risk Prevention Equipment"], correct: "Respiratory Protective Equipment", explanation: "RPE includes masks and respirators to protect against inhaling hazardous substances. Must be fit-tested and suitable for the specific hazard." },
    { id: 46, text: "What must a supervisor check about RPE (face masks)?", options: ["Only the colour", "Fit testing, condition, and correct filter type", "Only the brand", "Nothing"], correct: "Fit testing, condition, and correct filter type", explanation: "Supervisors must ensure RPE is fit-tested, in good condition, and uses the correct filter type for the hazard (e.g., P3 for silica dust)." },
    
    // Accident Reporting & Emergency (47-50)
    { id: 47, text: "What does RIDDOR stand for?", options: ["Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", "Regular Inspection of Dangerous Duties", "Risk Assessment Document"], correct: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations", explanation: "RIDDOR requires reporting of certain serious workplace accidents, occupational diseases, and dangerous occurrences to the HSE." },
    { id: 48, text: "What incidents must a supervisor report under RIDDOR?", options: ["Only minor cuts", "Fatalities, specified injuries, over-7-day injuries, dangerous occurrences", "Only fire", "Only theft"], correct: "Fatalities, specified injuries, over-7-day injuries, dangerous occurrences", explanation: "RIDDOR requires reporting of fatalities, specified injuries (e.g., fractures, amputations), injuries over 7 days, and dangerous occurrences." },
    { id: 49, text: "What is the first priority in a medical emergency on site?", options: ["Call head office", "Assess the scene and casualty, ensure safety, call emergency services", "Take photos", "Complete paperwork"], correct: "Assess the scene and casualty, ensure safety, call emergency services", explanation: "The first priority is to assess the scene for safety, assess the casualty, and call emergency services (999) immediately." },
    { id: 50, text: "What should a supervisor do immediately after a serious accident?", options: ["Destroy evidence", "Preserve the scene, report to management, notify HSE if required", "Blame someone", "Ignore it"], correct: "Preserve the scene, report to management, notify HSE if required", explanation: "Supervisors must preserve the accident scene, report to senior management immediately, and notify HSE if the accident is RIDDOR-reportable." }
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

  useEffect(() => {
    if (testCompleted) {
      recordTestResult({ testType: 'supervisor', testLabel: 'ECS Supervisor', score, total: questions.length, answers })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCompleted])

  if (!canAccessTest('/ecs-supervisor-test', isPro)) {
    return <LockedTestScreen testName="ECS Supervisor Test" />
  }

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 86
    const viewCertificate = () => {
      navigate('/certificate', {
        state: {
          testLabel: 'ECS Supervisor Mock Test',
          score,
          total: questions.length,
          percentage: Math.round(percentage),
        },
      })
    }
    const correctCount = score
    const incorrectCount = questions.length - score
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className={`p-6 text-center ${passed ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'} text-white`}>
              <div className="flex justify-center mb-4">
                {passed ? <FaTrophy className="text-5xl" /> : <FaTimesCircle className="text-5xl" />}
              </div>
              <h2 className="text-3xl font-bold mb-2">{passed ? 'Congratulations!' : 'Test Completed'}</h2>
              <p className="text-white/90">{passed ? 'You passed the ECS Supervisor Mock Test!' : 'Keep practicing for the Gold Card test'}</p>
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
                  Pass mark: <span className="font-semibold">86% (43/50)</span>
                </div>
              </div>
              {passed && (
                <button
                  onClick={viewCertificate}
                  className="w-full bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition mb-6 flex items-center justify-center gap-2"
                >
                  <FaTrophy /> Get Your Certificate
                </button>
              )}

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
                  ? '🎉 Excellent work! You\'re ready for the real ECS Supervisor test. Book your Gold Card exam with confidence!' 
                  : `📚 You scored ${score}/50. The pass mark is 43/50 (86%). Review your answers below and try again.`}
              </div>

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

              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 mb-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <FaHardHat className="text-slate-500 text-xl" />
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
      <Seo title="ECS Supervisor Mock Test 2026 | Free Practice Questions" description="Free ECS Supervisor mock test with ECS-style HS&E questions covering site supervision, health and safety leadership, and risk management." path="/ecs-supervisor-test" />
      <div className="container mx-auto max-w-4xl">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-3 mb-4 text-center">
          <p className="text-slate-800 text-sm flex items-center justify-center gap-2 flex-wrap">
            <FaHardHat className="text-slate-600" />
            <span className="font-semibold">ECS Supervisor (Gold Card) Mock Test</span>
            <span>• 50 questions • 30 minutes • Pass mark: 86%</span>
          </p>
        </div>

        {/* Header with Timer */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaHardHat className="text-green-600" />
                ECS Supervisor Mock Test 2026 (Gold Card)
              </h1>
              <p className="text-gray-500 text-sm mt-1">50 questions | 30 minutes | Pass mark: 86% (43/50) | Supervisor Level</p>
            </div>
            <div className={`rounded-xl px-5 py-3 text-center ${getTimerBgColor()}`}>
              <div className={`text-3xl font-bold ${getTimerColor()} flex items-center gap-2`}>
                <FaClock className="text-xl" />
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Time Remaining</p>
            </div>
          </div>
          
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
              <span className="inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                Gold Card Question #{currentIndex + 1}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> Supervisor Level
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
                  topic="ECS Supervisor Test"
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

export default SupervisorTest