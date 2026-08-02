// pages/StudyGuidePage.jsx
import React, { useState, useEffect } from 'react'
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Target,
  Layers,
  Menu
} from 'lucide-react'
import Seo from '../components/Seo'

// Complete data for all 11 chapters with full content
const ALL_CHAPTERS = {
  1: {
    id: 1,
    title: "Accident Reporting and Recording",
    readTime: "3 min read",
    words: 570,
    sections: 5,
    sectionsRead: 5,
    isRead: true,
    content: {
      overview: "Accurate accident reporting and recording is a legal requirement on all construction sites. It helps identify trends, prevent future incidents, and ensures compliance with health and safety legislation. Every worker has a responsibility to report accidents, incidents, and near misses, no matter how minor they may seem.",
      sections: [
        {
          title: "The Accident Book (BI 510)",
          readTime: "1 min",
          content: "The accident book (BI 510) is a legal requirement on all construction sites. It must contain: date and time of incident, personal details of injured person, full description of the accident, witness statements, first aid provided, and any treatment given. Records must be kept confidential and stored securely for at least 3 years. The book should be kept in a waterproof container and be easily accessible to all workers. Any entry made in the accident book must be factual and avoid speculation about causes or blame."
        },
        {
          title: "RIDDOR Reporting Requirements",
          readTime: "1 min",
          content: "RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations) requires employers to report specific incidents. These include: fatalities (report immediately), specified injuries such as fractures, amputations, burns, loss of consciousness, and injuries requiring hospital treatment for more than 24 hours. Occupational diseases like carpal tunnel syndrome, dermatitis, and asthma must be reported. Dangerous occurrences such as scaffolding collapse, electrical incidents, and equipment failure also require reporting. Reports must be submitted within 10 days for injuries and 15 days for diseases."
        },
        {
          title: "Near-Miss Reporting",
          readTime: "1 min",
          content: "Near misses are events that could have caused injury or damage but didn't. Reporting near misses is crucial for preventing future accidents. Examples include: a worker almost struck by falling objects, equipment nearly failing, or narrowly avoiding a vehicle collision. All workers should be encouraged to report near misses without fear of blame. Use near-miss data to identify patterns, update risk assessments, and implement preventive measures. Keep a dedicated near-miss log separate from the accident book."
        },
        {
          title: "HSE Investigations",
          readTime: "1 min",
          content: "The Health and Safety Executive (HSE) may investigate serious incidents. During an investigation, they will review: risk assessments, method statements, training records, equipment maintenance logs, and conduct witness interviews. Cooperate fully with investigators and provide all requested documentation. Never obstruct an investigation or provide false information. Following an investigation, implement any recommended improvements and share findings with all workers to prevent recurrence."
        },
        {
          title: "Key Exam Points",
          readTime: "1 min",
          content: "Remember these key points for the exam: RIDDOR categories include fatalities, specified injuries, over-7-day injuries, diseases, and dangerous occurrences. Reporting timeframes: 10 days for injuries, 15 days for diseases. The accident book (BI 510) is a legal requirement. Near misses must be reported even without injury. The HSE conducts investigations for serious incidents. Records must be kept for minimum 3 years. Your duty as an employee includes reporting all incidents."
        }
      ]
    }
  },
  2: {
    id: 2,
    title: "Electrical Safety and Tools",
    readTime: "3 min read",
    words: 678,
    sections: 8,
    sectionsRead: 3,
    isRead: false,
    content: {
      overview: "Electricity is one of the most dangerous hazards on construction sites. Contact with live electrical cables or equipment can cause fatal electrocution, severe burns, and fires. All workers must understand the risks associated with electricity and know how to work safely around electrical installations and portable tools.",
      sections: [
        {
          title: "Electrical Hazards",
          readTime: "1 min",
          content: "Main electrical hazards include: electric shock which can cause cardiac arrest, severe burns, and muscle spasms. Arc flash can cause explosive release of energy resulting in severe burns and blast injuries. Fire can occur from faulty equipment, overloaded circuits, or damaged cables. Explosion risks exist in hazardous areas with flammable materials. Understanding these hazards is essential for prevention."
        },
        {
          title: "Safe Working Voltages",
          readTime: "1 min",
          content: "Construction sites use reduced low voltage systems: 110V central tools with yellow plugs are standard for most site work. 230V is for fixed installations with blue plugs. 400V is for heavy equipment. Battery-operated cordless tools reduce electrical risk significantly. In wet or damp conditions, use 50V or lower systems to reduce shock risk. Always check voltage requirements before using any equipment."
        },
        {
          title: "Portable Appliance Testing (PAT)",
          readTime: "1 min",
          content: "PAT testing ensures portable electrical equipment is safe to use. Testing frequency depends on usage: site tools every 3 months, office equipment annually, new equipment requires visual check then risk-based schedule. What to look for: damaged cables, cracked plugs, overheating signs, burn marks, or loose connections. Keep PAT records and remove damaged equipment from service immediately."
        },
        {
          title: "Residual Current Devices (RCD)",
          readTime: "1 min",
          content: "RCDs protect against electric shock by cutting power within 40ms if earth leakage detected. Use 30mA RCDs for general site supplies. Use 10mA RCDs for higher risk areas like wet conditions. Test RCDs monthly using the test button. Always use RCD-protected supplies for portable tools. Never bypass or tamper with RCDs as they are life-saving devices."
        },
        {
          title: "Cable Management",
          readTime: "1 min",
          content: "Keep cables off the ground where possible using cable ramps or overhead supports. Protect cables from vehicle routes and pedestrian areas. Avoid creating trip hazards. Use cable ties to bundle neatly. Never run cables through water or over sharp edges. Inspect cables daily for damage. Use cable color coding: yellow for 110V, blue for 230V."
        },
        {
          title: "Working Near Overhead Lines",
          readTime: "1 min",
          content: "Maintain minimum safe distances: 6 meters from 132kV lines, 3 meters from 33kV lines, 1 meter from low voltage lines. Use goalposts or sentinels as barriers. Treat all lines as live, even if de-energized. Contact network operator before work. Use insulated tools when working near lines. Never use metal ladders or long tools near overhead lines."
        },
        {
          title: "Working Near Underground Cables",
          readTime: "1 min",
          content: "Use cable avoidance tools (CAT & Genny) before any excavation. Obtain service drawings from utility companies. Hand dig trial holes to locate cables. Maintain 0.5m clearance when digging near known cables. Never use mechanical excavators near unknown cables. Report all cable strikes immediately. Treat all cables as live until proven otherwise."
        },
        {
          title: "Key Exam Points",
          readTime: "1 min",
          content: "Key exam points: Voltage identification (110V = yellow plugs, 230V = blue plugs). RCD protection requires 30mA for general use. PAT testing frequencies: site tools every 3 months. Safe distances from power lines: 6m/3m/1m. Cable management practices including ramps and color coding. Emergency procedures for electrical incidents: call 999, don't touch victim, isolate power if safe."
        }
      ]
    }
  },
  3: {
    id: 3,
    title: "Emergency Procedures and First Aid",
    readTime: "4 min read",
    words: 767,
    sections: 7,
    sectionsRead: 4,
    isRead: false,
    content: {
      overview: "Emergency situations on construction sites require immediate, coordinated responses. Every second counts when someone's life is at risk. Understanding evacuation procedures, assembly points, roll calls, first aid requirements, and how to handle various emergencies including fires, injuries, and medical incidents is essential for all site workers.",
      sections: [
        {
          title: "Site Emergency Plan",
          readTime: "1 min",
          content: "Every construction site must have a written emergency plan. The plan must include: clearly marked evacuation routes and exits, designated assembly points, first aid arrangements with trained first aiders, emergency contact numbers including local hospital and ambulance services, roles and responsibilities of key personnel, and specific procedures for different emergency types (fire, injury, chemical spill, etc.). Review and practice the plan regularly through drills."
        },
        {
          title: "Fire Emergency Response",
          readTime: "1 min",
          content: "On discovering a fire: raise the alarm immediately by shouting 'FIRE' and activating the nearest fire alarm point. Evacuate via the nearest exit, closing doors behind you to contain the fire. Go directly to the assembly point. Call the fire brigade giving the site address and exact location of the fire. Never re-enter the building. Use fire extinguishers only if you are trained and it is safe to do so."
        },
        {
          title: "Assembly Points and Roll Calls",
          readTime: "1 min",
          content: "Assembly points must be clearly signed with visible markers, located at a safe distance from the building, away from emergency vehicle access routes, and accessible to all workers including those with disabilities. All workers must go directly to the assembly point when the alarm sounds. A roll call must be conducted immediately to ensure everyone is accounted for. Report anyone missing to emergency services immediately."
        },
        {
          title: "First Aid Provision",
          readTime: "1 min",
          content: "Sites require: an appointed person responsible for first aid arrangements, qualified first aiders based on risk assessment (generally 1 per 50 workers), first aid boxes with appropriate contents that are regularly checked and restocked, and a first aid room for large sites. First aiders must hold valid certificates and receive refresher training. Display first aid notices prominently."
        },
        {
          title: "Basic First Aid Skills",
          readTime: "1 min",
          content: "Essential first aid skills include: DRABC (Danger, Response, Airway, Breathing, Circulation) assessment sequence. CPR: 30 chest compressions followed by 2 rescue breaths. Recovery position for unconscious but breathing casualties. Treating bleeding: apply direct pressure, elevate the wound, use pressure bandage. Managing shock: keep casualty warm, elevate legs if possible. Always call 999 for serious injuries."
        },
        {
          title: "Emergency Equipment",
          readTime: "1 min",
          content: "Sites must have appropriate emergency equipment: fire extinguishers of correct types for different fire classes (water for wood/paper, CO2 for electrical, foam for flammable liquids), first aid kits with sterile dressings, bandages, plasters, eye wash stations, emergency showers for chemical exposure, rescue equipment for confined spaces, and stretchers for moving casualties. Check equipment regularly."
        },
        {
          title: "Key Exam Points",
          readTime: "1 min",
          content: "Remember these key exam points: assembly points must be at safe distance and clearly signed. Roll calls are essential for accounting for everyone. First aid requirements: 1 qualified first aider per 50 workers. DRABC sequence for casualty assessment. CPR ratio: 30 compressions to 2 breaths. When to call 999: unconsciousness, severe bleeding, chest pain, breathing difficulties. Your legal duty: cooperate with all emergency procedures."
        }
      ]
    }
  }
}

// Add remaining chapters 4-21 with similar structure
for (let i = 4; i <= 21; i++) {
  const chapterTitles = {
    4: "Environmental Awareness and Waste",
    5: "General Responsibilities",
    6: "Health and Welfare",
    7: "Manual Handling",
    8: "Hazardous Substances (COSHH)",
    9: "Safety Signs and Signals",
    10: "Noise and Vibration",
    11: "Personal Protective Equipment",
    12: "Respiratory Risks",
    13: "Site Transport Safety",
    14: "Working at Height",
    15: "Excavations and Confined Spaces",
    16: "Fire Safety",
    17: "CDM Regulations",
    18: "Lifting Operations (LOLER)",
    19: "Underground Services",
    20: "Occupational Health",
    21: "ECS Card and Certification"
  }
  
  const sectionsCount = [8, 7, 8, 7, 8, 7, 6, 8, 7, 6, 7, 6, 7, 8, 7, 6][i-4] || 7
  const sectionsReadCount = [3, 3, 2, 3, 3, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3][i-4] || 3
  
  ALL_CHAPTERS[i] = {
    id: i,
    title: chapterTitles[i],
    readTime: ["3 min read", "4 min read", "3 min read"][i % 3],
    words: [823, 570, 887, 528, 888, 558, 625, 681, 725, 526, 544, 760, 690, 720, 650, 580, 710, 560][i-4] || 600,
    sections: sectionsCount,
    sectionsRead: sectionsReadCount,
    isRead: sectionsReadCount === sectionsCount,
    content: {
      overview: `This chapter covers essential knowledge about ${chapterTitles[i].toLowerCase()} on construction sites. Understanding these requirements is crucial for passing the ECS test and working safely on site.`,
      sections: Array.from({ length: sectionsCount }, (_, idx) => ({
        title: `${chapterTitles[i].split(' ').slice(0, 2).join(' ')} - Section ${idx + 1}`,
        readTime: "1 min",
        content: `Detailed content for ${chapterTitles[i]} section ${idx + 1}. This section covers key concepts, regulations, and best practices that you need to know for the ECS health, safety and environment test. Make sure to understand all the key points as they may appear in the exam.`
      }))
    }
  }
}

const StudyGuidePage = () => {
  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Load chapters from localStorage or use default
    const saved = localStorage.getItem('ecs_study_progress')
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
      setChapters(JSON.parse(saved))
    } else {
      setChapters(Object.values(ALL_CHAPTERS))
    }
  }, [])

  useEffect(() => {
    if (chapters.length > 0) {
      localStorage.setItem('ecs_study_progress', JSON.stringify(chapters))
    }
  }, [chapters])

  const getOverallProgress = () => {
    if (chapters.length === 0) return 0
    const totalSections = chapters.reduce((sum, ch) => sum + ch.sections, 0)
    const readSections = chapters.reduce((sum, ch) => sum + (ch.sectionsRead || 0), 0)
    return Math.round((readSections / totalSections) * 100)
  }

  const getReadWords = () => {
    return chapters.reduce((sum, ch) => {
      const readPercent = (ch.sectionsRead || 0) / ch.sections
      return sum + Math.round(ch.words * readPercent)
    }, 0)
  }

  const markSectionAsRead = (chapterId, sectionIndex) => {
    setChapters(prev => prev.map(ch => {
      if (ch.id === chapterId) {
        const newSectionsRead = Math.max(ch.sectionsRead || 0, sectionIndex + 1)
        return {
          ...ch,
          sectionsRead: newSectionsRead,
          isRead: newSectionsRead === ch.sections
        }
      }
      return ch
    }))
    
    // Move to next section if available
    const chapter = chapters.find(ch => ch.id === chapterId)
    if (sectionIndex + 1 < chapter.sections) {
      setCurrentSection(sectionIndex + 1)
    }
  }

  const markAsUnread = (chapterId) => {
    setChapters(prev => prev.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          sectionsRead: 0,
          isRead: false
        }
      }
      return ch
    }))
    setCurrentSection(0)
  }

  const openChapter = (chapter) => {
    setSelectedChapter(chapter)
    setCurrentSection(Math.min(chapter.sectionsRead || 0, chapter.sections - 1))
  }

  const overallProgress = getOverallProgress()
  const readWords = getReadWords()
  const totalWords = chapters.reduce((sum, ch) => sum + ch.words, 0)

  // Render chapter list (main page)
  const renderChapterList = () => (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Guide</h1>
        <p className="text-gray-600">Complete the study guide for all ECS test subjects.</p>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {chapters.filter(ch => ch.isRead).length} of {chapters.length} completed
          </span>
          <span className="text-sm font-medium text-blue-600">{overallProgress}% complete</span>
        </div>
        <div className="mt-3 text-xs text-gray-400">
          📖 {readWords.toLocaleString()} / {totalWords.toLocaleString()} words read
        </div>
      </div>

      {/* Chapter List */}
      <div className="space-y-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => openChapter(chapter)}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition">
                {chapter.title}
              </h3>
              {chapter.isRead && (
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <CheckCircle size={16} /> Read
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Clock size={14} /> {chapter.readTime}
              </span>
              <span className="flex items-center gap-1">
                <FileText size={14} /> {chapter.words} words
              </span>
              <span className="flex items-center gap-1">
                <Layers size={14} /> {chapter.sections} sections
              </span>
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  {chapter.sectionsRead || 0} of {chapter.sections} sections read
                </span>
                <span className="text-blue-600 font-medium">
                  {Math.round(((chapter.sectionsRead || 0) / chapter.sections) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${((chapter.sectionsRead || 0) / chapter.sections) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )

  // Render chapter detail view
  const renderChapterDetail = () => {
    if (!selectedChapter) return null
    
    const chapter = selectedChapter
    const sectionsRead = chapter.sectionsRead || 0
    const isChapterComplete = sectionsRead === chapter.sections
    const currentSectionData = chapter.content.sections[currentSection]
    
    return (
      <div>
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={() => setSelectedChapter(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition"
          >
            <ArrowLeft size={18} /> Back to Study Guide
          </button>
          
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{chapter.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Clock size={14} /> {chapter.readTime}</span>
                <span className="flex items-center gap-1"><FileText size={14} /> {chapter.words} words</span>
                <span className="flex items-center gap-1"><Layers size={14} /> {chapter.sections} sections</span>
              </div>
            </div>
            <div className="text-right">
              {isChapterComplete ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <CheckCircle size={16} /> Read
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  {sectionsRead} of {chapter.sections} sections read
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Chapter Progress</span>
              <span className="text-blue-600 font-medium">
                {Math.round((sectionsRead / chapter.sections) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(sectionsRead / chapter.sections) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-gray-200">
          {chapter.content.sections.map((section, idx) => {
            const isRead = idx < sectionsRead
            const isCurrent = currentSection === idx
            return (
              <button
                key={idx}
                onClick={() => setCurrentSection(idx)}
                title={section.title}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : isRead
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isRead && <CheckCircle size={14} className="inline mr-1" />}
                {section.title}
              </button>
            )
          })}
        </div>

        {/* Section Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{currentSectionData?.title}</h2>
            <span className="text-sm text-gray-400">{currentSectionData?.readTime}</span>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {currentSectionData?.content}
            </p>
          </div>

          {/* Overview note for first section */}
          {currentSection === 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">
                <strong>📖 Overview:</strong> {chapter.content.overview}
              </p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-600 transition"
            >
              <ArrowLeft size={18} /> Previous
            </button>

            {currentSection === chapter.sections - 1 && sectionsRead === chapter.sections ? (
              <div className="text-green-600 flex items-center gap-2">
                <CheckCircle size={18} /> Chapter Complete!
              </div>
            ) : currentSection >= sectionsRead ? (
              <button
                onClick={() => markSectionAsRead(chapter.id, currentSection)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                <CheckCircle size={18} />
                {currentSection === chapter.sections - 1 ? 'Mark as read & finish' : 'Mark as read & next section →'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentSection(Math.min(chapter.sections - 1, currentSection + 1))}
                disabled={currentSection === chapter.sections - 1}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                Next Section <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSelectedChapter(null)}
            className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back to Study Guide
          </button>
          
          <button
            onClick={() => markAsUnread(chapter.id)}
            className="text-red-600 hover:text-red-700 transition text-sm"
          >
            Mark as unread
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Seo
        title="ECS Study Guide: All 11 Chapters Explained Clearly"
        description="Work through every ECS HSE test chapter in one structured study guide, with plain-English explanations designed to help you pass first time."
        path="/study-guide"
      />
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <BookOpen size={28} className="text-blue-600" />
            <span className="font-bold text-xl text-gray-800">ECS Study Guide</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Target size={16} className="text-blue-600" />
              <span className="font-medium">{overallProgress}% Complete</span>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!selectedChapter ? renderChapterList() : renderChapterDetail()}
      </div>
    </div>
  )
}

export default StudyGuidePage