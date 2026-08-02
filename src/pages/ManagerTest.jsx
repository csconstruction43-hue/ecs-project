import React, { useState, useEffect } from 'react'
import { recordTestResult } from '../lib/testResults'
import AIExplainButton from '../components/AIExplainButton'
import QuestionAudio from '../components/QuestionAudio'
import LockedTestScreen from '../components/LockedTestScreen'
import { useAuth } from '../context/AuthContext'
import { canAccessTest } from '../lib/testAccess'
import Seo from '../components/Seo'
import { Link, useNavigate } from 'react-router-dom'
import { FaClock, FaCheckCircle, FaTimesCircle, FaLightbulb, FaArrowRight, FaRedoAlt, FaTrophy, FaChartLine, FaUserTie } from 'react-icons/fa'

function ManagerTest() {
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

  // 50 Real MAP Exam-Style Questions for Managers & Professionals
  const questions = [
    // CDM 2015 & Legal (1-10)
    { id: 1, text: "Under CDM 2015, who must produce the Construction Phase Plan before construction starts?", options: ["Principal Designer", "Principal Contractor", "Client", "HSE"], correct: "Principal Contractor", explanation: "The Client must ensure one exists, but the legal duty to draw it up rests with the Principal Contractor. On smaller single-contractor projects the sole contractor takes on that duty." },
    { id: 2, text: "A project lasts more than 30 working days with more than 20 workers on site simultaneously, or exceeds 500 person-days. What administrative action is required?", options: ["Submit F10 notification to HSE", "Appoint a CDM coordinator", "Conduct additional risk assessment", "Notify local council"], correct: "Submit F10 notification to HSE", explanation: "These are the thresholds in CDM 2015 that trigger the notification requirement. The Client must submit an F10 notification to the HSE before construction begins." },
    { id: 3, text: "What is the Principal Designer's primary duty under CDM 2015?", options: ["Manage health and safety during construction", "Plan and manage pre-construction phase", "Supervise workers on site", "Provide first aid facilities"], correct: "Plan and manage pre-construction phase", explanation: "The Principal Designer is responsible for planning, managing, and coordinating health and safety during the pre-construction phase, including identifying and eliminating hazards early." },
    { id: 4, text: "Under CDM 2015, what is the client's duty regarding competence?", options: ["Assume all contractors are competent", "Take reasonable steps to ensure duty holders are competent", "Only check competence of principal contractor", "No duty regarding competence"], correct: "Take reasonable steps to ensure duty holders are competent", explanation: "Clients must take reasonable steps to ensure appointed duty holders (designers, principal contractors, etc.) have the skills, knowledge, and experience for their roles." },
    { id: 5, text: "What does the 'F10 notification' contain under CDM 2015?", options: ["Project details and duty holder information", "Safety data sheets", "Risk assessment forms", "Insurance certificates"], correct: "Project details and duty holder information", explanation: "The F10 notifiable project form includes project address, description, start/end dates, and contact details for duty holders including the client, principal designer, and principal contractor." },
    { id: 6, text: "What is a 'competent person' under health and safety law?", options: ["Someone with a degree", "Someone with sufficient training, experience and knowledge", "The site manager", "Any worker on site"], correct: "Someone with sufficient training, experience and knowledge", explanation: "A competent person has the necessary skills, knowledge and experience to identify hazards and control risks. They understand relevant health and safety legislation." },
    { id: 7, text: "Under CDM 2015, who is responsible for ensuring a Construction Phase Plan is developed and implemented?", options: ["Principal Designer", "Principal Contractor", "Client", "HSE"], correct: "Principal Contractor", explanation: "The Principal Contractor is responsible for developing, implementing, and maintaining the Construction Phase Plan for the duration of the project." },
    { id: 8, text: "What is the penalty for non-compliance with CDM 2015 regulations?", options: ["Verbal warning only", "Fines and possible imprisonment", "Only financial penalty", "No penalty"], correct: "Fines and possible imprisonment", explanation: "Serious breaches of CDM 2015 can result in unlimited fines and up to two years imprisonment for individuals found guilty of offences." },
    { id: 9, text: "Under the Health and Safety at Work Act 1974, what is an employer's primary duty?", options: ["Ensure health and safety of employees so far as reasonably practicable", "Maximise productivity", "Minimise insurance costs", "Reduce paperwork"], correct: "Ensure health and safety of employees so far as reasonably practicable", explanation: "Section 2 of HSWA requires employers to ensure, so far as is reasonably practicable, the health, safety and welfare of all employees." },
    { id: 10, text: "What does 'so far as is reasonably practicable' mean in health and safety law?", options: ["Whatever is technically possible", "Balancing risk against cost and effort", "Minimum legal requirement only", "Absolute safety regardless of cost"], correct: "Balancing risk against cost and effort", explanation: "It means the level of risk must be balanced against the time, trouble, cost and physical difficulty of taking measures to avoid it." },
    
    // Leadership & Culture (11-16)
    { id: 11, text: "What is 'visible felt leadership' in health and safety?", options: ["Managers wearing PPE", "Senior staff actively engaging with safety on site", "Safety posters on walls", "Safety committee meetings"], correct: "Senior staff actively engaging with safety on site", explanation: "Visible felt leadership means senior managers are seen on site, talking to workers about safety, demonstrating commitment, and acting on concerns." },
    { id: 12, text: "What is a leading indicator in safety performance?", options: ["Number of accidents", "Near-miss reports and safety observations", "Lost time injury frequency", "Insurance claims"], correct: "Near-miss reports and safety observations", explanation: "Leading indicators are proactive measures that predict future safety performance, such as near-miss reporting, safety tours, and toolbox talk attendance." },
    { id: 13, text: "What is a lagging indicator in safety performance?", options: ["Safety training hours", "Number of reported accidents and incidents", "Risk assessment completion", "Safety inspections conducted"], correct: "Number of reported accidents and incidents", explanation: "Lagging indicators measure past performance, including accident rates, lost time injuries, and property damage incidents." },
    { id: 14, text: "How should a manager respond to a reported near miss?", options: ["Ignore it if no injury occurred", "Investigate, learn, and share findings", "Only investigate serious incidents", "Blame the reporter"], correct: "Investigate, learn, and share findings", explanation: "Near misses should be investigated thoroughly to identify root causes and prevent future incidents. Sharing learning across the organisation is essential." },
    { id: 15, text: "What is behavioural safety?", options: ["Observing and improving worker behaviours", "Buying more PPE", "Increasing insurance cover", "Hiring more safety officers"], correct: "Observing and improving worker behaviours", explanation: "Behavioural safety focuses on observing workplace behaviours, providing feedback, and reinforcing safe practices to create lasting safety habits." },
    { id: 16, text: "What is the 'safety culture' of an organisation?", options: ["Number of safety rules", "Shared values and attitudes toward safety", "Quality of safety equipment", "Frequency of safety meetings"], correct: "Shared values and attitudes toward safety", explanation: "Safety culture is the product of individual and group values, attitudes, perceptions, competencies, and patterns of behaviour that determine commitment to health and safety." },
    
    // High-Risk Activities (17-22)
    { id: 17, text: "You have been appointed Principal Designer on a refurbishment of a 1970s office. What survey must you ensure is in place before any intrusive work begins?", options: ["Management survey", "Refurbishment and Demolition (R&D) survey", "Visual inspection only", "Structural survey"], correct: "Refurbishment and Demolition (R&D) survey", explanation: "Pre-2000 buildings carry a high probability of asbestos-containing materials and the R&D survey is mandatory before intrusive work." },
    { id: 18, text: "Under LOLER, how often must lifting equipment be thoroughly examined?", options: ["Every day", "Every week", "Every 6-12 months depending on equipment type", "Every year"], correct: "Every 6-12 months depending on equipment type", explanation: "LOLER requires thorough examination of lifting equipment every 6 months for accessories and 12 months for other equipment, or as specified by the competent person." },
    { id: 19, text: "What is the primary duty of an 'Appointed Person' for lifting operations?", options: ["Operate the crane", "Plan the lifting operation", "Inspect the lifting gear", "Supervise the crane driver"], correct: "Plan the lifting operation", explanation: "The Appointed Person is responsible for planning the lifting operation, selecting suitable equipment, and ensuring all safety requirements are met before lifting begins." },
    { id: 20, text: "What is a 'confined space' under the Confined Spaces Regulations?", options: ["Small room", "Space with limited access and risk of serious injury", "Underground area only", "Any enclosed space"], correct: "Space with limited access and risk of serious injury", explanation: "A confined space has limited means of entry/exit and is not designed for continuous occupancy, presenting risks such as hazardous atmospheres, engulfment, or oxygen deficiency." },
    { id: 21, text: "What is required before entry into a confined space?", options: ["Verbal permission only", "Risk assessment, permit to work, and rescue plan", "Hard hat and gloves", "Supervisor visual check"], correct: "Risk assessment, permit to work, and rescue plan", explanation: "Confined space entry requires a suitable risk assessment, a permit to work specifying controls, atmospheric testing, and a documented rescue plan with trained personnel." },
    { id: 22, text: "What is the purpose of a 'pre-demolition survey'?", options: ["Estimate demolition cost", "Identify hazardous materials like asbestos", "Plan waste disposal", "Schedule demolition date"], correct: "Identify hazardous materials like asbestos", explanation: "A pre-demolition survey identifies hazardous materials (asbestos, lead, mercury, etc.) that must be removed before demolition begins to protect workers and the public." },
    
    // Demolition & Complex Works (23-26)
    { id: 23, text: "Under the Control of Asbestos Regulations 2012, who has the duty to manage asbestos in non-domestic premises?", options: ["The HSE", "The duty holder (building owner/manager)", "The local council", "The tenants"], correct: "The duty holder (building owner/manager)", explanation: "The duty holder, typically the building owner, landlord, or facilities manager, has a legal duty to identify, assess, and manage asbestos-containing materials in the premises." },
    { id: 24, text: "What is the difference between a 'management survey' and an 'R&D survey' for asbestos?", options: ["No difference", "Management survey is less intrusive, R&D survey is destructive", "R&D survey is cheaper", "Management survey requires more training"], correct: "Management survey is less intrusive, R&D survey is destructive", explanation: "Management surveys locate ACMs that could be damaged during normal occupancy; R&D (Refurbishment/Demolition) surveys are destructive and required before major refurbishment or demolition." },
    { id: 25, text: "What is a 'demolition method statement'?", options: ["Safety data sheet", "Detailed plan of demolition sequence and controls", "Insurance document", "Training record"], correct: "Detailed plan of demolition sequence and controls", explanation: "A demolition method statement details the sequence of demolition, methods to be used, safety controls, and emergency procedures to ensure safe demolition operations." },
    { id: 26, text: "What should you do if you encounter suspected asbestos during demolition?", options: ["Stop work immediately and report to supervisor", "Continue working carefully", "Spray with water only", "Cover and ignore"], correct: "Stop work immediately and report to supervisor", explanation: "Any suspected ACMs must be treated as asbestos until proven otherwise. Stop work immediately, isolate the area, and report to the responsible person." },
    
    // Supervising Safety at Scale (27-30)
    { id: 27, text: "How should you manage safety when multiple subcontractors are working on the same site?", options: ["Each contractor manages their own safety separately", "Coordinate through regular meetings and shared inductions", "Only communicate by email", "Leave it to the HSE"], correct: "Coordinate through regular meetings and shared inductions", explanation: "Effective management requires coordination through regular safety meetings, shared inductions, communication protocols, and a designated coordinator for overlapping activities." },
    { id: 28, text: "What is a 'safety audit'?", options: ["Financial check", "Systematic examination of safety management systems", "Inspection of PPE only", "Review of insurance documents"], correct: "Systematic examination of safety management systems", explanation: "A safety audit is a systematic, independent examination of an organisation's safety management systems, policies, procedures, and practices to verify compliance." },
    { id: 29, text: "How often should safety inspections be conducted on a large construction site?", options: ["Only when an accident occurs", "At regular intervals based on risk assessment", "Annually only", "Never"], correct: "At regular intervals based on risk assessment", explanation: "The frequency of safety inspections should be determined by risk assessment, but typically weekly or monthly, with daily checks by supervisors and periodic audits." },
    { id: 30, text: "A subcontractor's competence evidence is missing. They have arrived on site with their gang. What is your obligation as project manager?", options: ["Let them start to avoid delay", "Refuse the work until competence evidence is provided", "Accept verbal assurance", "Ask them to provide evidence later"], correct: "Refuse the work until competence evidence is provided", explanation: "Under CDM 2015 the Principal Contractor must ensure every operative is competent and inducted. Cost or schedule pressure is not a defence if an accident follows." },
    
    // Environmental & Waste (31-35)
    { id: 31, text: "What is the waste hierarchy under environmental regulations?", options: ["Prevention, Reuse, Recycling, Recovery, Disposal", "Disposal, Recycling, Prevention", "Reuse only", "Incineration first"], correct: "Prevention, Reuse, Recycling, Recovery, Disposal", explanation: "The waste hierarchy prioritises: 1) Prevention, 2) Preparing for Reuse, 3) Recycling, 4) Other Recovery (e.g., energy), 5) Disposal." },
    { id: 32, text: "What is a 'waste transfer note'?", options: ["Note to say waste is valuable", "Document recording waste movement and description", "Invoice for waste disposal", "Environmental permit"], correct: "Document recording waste movement and description", explanation: "A waste transfer note is a legal document that records the transfer of waste from one party to another, describing the waste, quantity, and destination." },
    { id: 33, text: "What is your duty under the Environmental Protection Act 1990 as a waste producer?", options: ["Only recycle", "Duty of Care to ensure waste is handled properly", "Dispose of waste anywhere", "No duty"], correct: "Duty of Care to ensure waste is handled properly", explanation: "The Duty of Care requires waste producers to take reasonable steps to ensure waste is stored, transported, and disposed of properly without harming the environment." },
    { id: 34, text: "What is 'embodied carbon' in construction?", options: ["Carbon from operational energy use", "Carbon emitted during material production and construction", "Carbon from transport only", "Carbon from waste"], correct: "Carbon emitted during material production and construction", explanation: "Embodied carbon refers to greenhouse gas emissions associated with the extraction, manufacture, transport, and construction of building materials." },
    { id: 35, text: "What is the BREEAM environmental assessment method?", options: ["Building Research Establishment Environmental Assessment Method", "British Renewable Energy Assessment", "Building Risk Evaluation", "Carbon calculation tool"], correct: "Building Research Establishment Environmental Assessment Method", explanation: "BREEAM is the world's leading sustainability assessment method for master planning projects, infrastructure and buildings, rating environmental performance." },
    
    // Mental Health & Wellbeing (36-38)
    { id: 36, text: "What is the manager's role in supporting workforce mental health?", options: ["Only refer to GP", "Create open culture, recognise signs, signpost support", "Ignore mental health issues", "Provide medication"], correct: "Create open culture, recognise signs, signpost support", explanation: "Managers should create a supportive environment where mental health can be discussed openly, recognise warning signs, and signpost to appropriate support services." },
    { id: 37, text: "What is 'Mates in Mind' in construction?", options: ["Construction charity", "Mental health support programme for construction", "Safety training course", "Insurance scheme"], correct: "Mental health support programme for construction", explanation: "Mates in Mind is a leading mental health charity for the UK construction industry, providing guidance, training, and support to improve mental health awareness." },
    { id: 38, text: "What are common signs of stress in construction workers?", options: ["Increased productivity", "Absenteeism, irritability, fatigue", "Better communication", "Increased appetite"], correct: "Absenteeism, irritability, fatigue", explanation: "Common stress indicators include increased absenteeism, irritability, fatigue, difficulty concentrating, reduced performance, and changes in behaviour." },
    
    // Risk Assessment & Management (39-42)
    { id: 39, text: "What is a 'dynamic risk assessment'?", options: ["Weekly review", "Continuous assessment of changing risks", "Annual risk review", "Insurance requirement"], correct: "Continuous assessment of changing risks", explanation: "Dynamic risk assessment involves continuously observing, assessing, and responding to changing risks in real-time, particularly important for lone workers and changing environments." },
    { id: 40, text: "What is the 'hierarchy of control' under health and safety law?", options: ["Elimination, Substitution, Engineering, Administration, PPE", "PPE first", "Training only", "Warning signs only"], correct: "Elimination, Substitution, Engineering, Administration, PPE", explanation: "The hierarchy prioritises elimination first (remove the hazard), then substitution, engineering controls, administrative controls, and finally PPE as the last line of defence." },
    { id: 41, text: "What is a 'method statement'?", options: ["Company policy", "Step-by-step description of safe work procedures", "Training record", "Insurance document"], correct: "Step-by-step description of safe work procedures", explanation: "A method statement describes the sequence of work activities, hazards identified, and control measures to be implemented to complete the task safely." },
    { id: 42, text: "How often should risk assessments be reviewed?", options: ["Never after writing", "Annually or when circumstances change", "Every 5 years", "Only after accidents"], correct: "Annually or when circumstances change", explanation: "Risk assessments should be reviewed at least annually, or more frequently if there are significant changes to work processes, equipment, personnel, or following incidents." },
    
    // Site Transport & Plant (43-45)
    { id: 43, text: "What is required for safe vehicle movements on construction sites?", options: ["Only reversing alarms", "Segregation, banksmen, speed limits, and training", "No requirements", "Only mirrors"], correct: "Segregation, banksmen, speed limits, and training", explanation: "Safe vehicle movement requires pedestrian-vehicle segregation, trained banksmen, speed limits, reversing aids (alarms/cameras), and driver/operator training." },
    { id: 44, text: "What is a 'banksman' responsible for?", options: ["Safety signs", "Guiding vehicle movements", "First aid", "Fire safety"], correct: "Guiding vehicle movements", explanation: "A banksman guides vehicle drivers when reversing or manoeuvring in confined spaces where visibility is poor, using approved hand signals." },
    { id: 45, text: "What is the minimum distance from an open trench edge for materials?", options: ["0.5 metres", "1 metre", "2 metres", "3 metres"], correct: "2 metres", explanation: "Materials and spoil must be stored at least 2 metres away from trench edges to prevent collapse and reduce load on the excavation sides." },
    
    // Emergency & Fire (46-48)
    { id: 46, text: "What is the responsible person's duty under the Regulatory Reform (Fire Safety) Order 2005?", options: ["Only provide extinguishers", "Conduct fire risk assessment and maintain fire safety measures", "Insure the building", "Train fire wardens only"], correct: "Conduct fire risk assessment and maintain fire safety measures", explanation: "The responsible person must carry out a fire risk assessment, implement appropriate fire safety measures, maintain equipment, and provide training to employees." },
    { id: 47, text: "What type of fire extinguisher is used for electrical fires?", options: ["Water (Red)", "Foam (Cream)", "CO2 (Black)", "Wet chemical (Yellow)"], correct: "CO2 (Black)", explanation: "CO2 extinguishers (black label) are safe for electrical fires as they don't conduct electricity and leave no residue that could damage equipment." },
    { id: 48, text: "How often should fire drills be conducted on large construction sites?", options: ["Weekly", "Monthly", "Every 3 months as determined by risk assessment", "Annually"], correct: "Every 3 months as determined by risk assessment", explanation: "Fire drills should be conducted regularly based on risk assessment, typically every 3 months on large sites, with new workers receiving induction training including fire procedures." },
    
    // Health & PPE (49-50)
    { id: 49, text: "What does RPE stand for in health and safety?", options: ["Regular Protective Equipment", "Respiratory Protective Equipment", "Risk Prevention Equipment", "Rapid Protection Equipment"], correct: "Respiratory Protective Equipment", explanation: "RPE includes masks and respirators to protect against inhaling hazardous substances. Must be fit-tested and suitable for the specific hazard." },
    { id: 50, text: "What is the lower action value for noise exposure requiring hearing protection to be available?", options: ["70 dB", "80 dB", "85 dB", "90 dB"], correct: "80 dB", explanation: "The lower exposure action value for noise is 80 dB(A), requiring hearing protection to be available. At 85 dB(A) (upper value), hearing protection is mandatory." }
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
      recordTestResult({ testType: 'manager', testLabel: 'ECS Managers & Professionals', score, total: questions.length, answers })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCompleted])

  if (!canAccessTest('/ecs-managers-and-professionals-test', isPro)) {
    return <LockedTestScreen testName="ECS Managers & Professionals Test" />
  }

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 86
    const viewCertificate = () => {
      navigate('/certificate', {
        state: {
          testLabel: 'ECS Managers & Professionals Mock Test',
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
              <p className="text-white/90">{passed ? 'You passed the ECS MAP Mock Test!' : 'Keep practicing for the Managers & Professionals test'}</p>
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
                  ? '🎉 Excellent work! You\'re ready for the real ECS MAP test. Book your exam with confidence!' 
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
                  <FaUserTie className="text-slate-500 text-xl" />
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
      <Seo title="ECS Managers & Professionals Mock Test 2026 | Free Practice" description="Free ECS Managers and Professionals mock test covering the full ECS HS&E syllabus plus management-level topics. Practice online with instant results." path="/ecs-managers-and-professionals-test" />
      <div className="container mx-auto max-w-4xl">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-secondary border border-blue-200 rounded-xl p-3 mb-4 text-center">
          <p className="text-blue-800 text-sm flex items-center justify-center gap-2 flex-wrap">
            <FaUserTie className="text-blue-600" />
            <span className="font-semibold">ECS Managers & Professionals (MAP) Mock Test</span>
            <span>• 50 questions • 30 minutes • Pass mark: 86%</span>
          </p>
        </div>

        {/* Header with Timer */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserTie className="text-green-600" />
                ECS Managers & Professionals Mock Test
              </h1>
              <p className="text-gray-500 text-sm mt-1">50 questions | 30 minutes | Pass mark: 86% (43/50) | MAP Test</p>
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
              <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                MAP Question #{currentIndex + 1}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> Managers & Professionals Level
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
                  topic="ECS Managers & Professionals Test"
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

export default ManagerTest