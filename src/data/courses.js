// src/data/courses.js
// ECSPrep online course catalogue. ECSPrep is a revision / exam-prep
// platform (not an accredited hands-on training centre), so every course
// here is 100% online: structured video + reading modules, a linked mock
// exam, and a full practice question bank for that qualification.
//
// This mirrors the real City & Guilds / ECS pathway (Level 2 → Level 3 →
// specialisms → cards) so learners can see exactly which online course
// maps to which real-world qualification, then use it purely as revision
// support alongside their official training.

export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced']

// No course is free to book — every course requires an active Pro plan
// (see CourseDetailPage.jsx and the matching guard in server/index.js).
// Booking also does not grant instant access: it sends a request to the
// admin panel (/admin/course-requests) and only unlocks once an admin
// approves it.

// The 25 "Pro" features every booked course unlocks. Every single one of
// these maps to a real, working page/feature already in ECSPrep — booking
// a course sets the same `isPro` flag Stripe checkout grants (see
// server/index.js), so nothing here is a cosmetic list; it's the real
// Pro toolkit, honestly described and linked.
export const coursePerks = [
  { label: 'Unlimited timed mock exams, every card type', path: '/mock-test' },
  { label: 'AI-powered explanation on every question you get wrong', path: '/mock-test' },
  { label: 'AI Quiz Generator — build a custom test on any topic', path: '/ai-quiz-generator' },
  { label: 'Topic-by-topic weak-area analytics', path: '/analytics' },
  { label: 'Personalised study plan generator', path: '/study-plan' },
  { label: 'Downloadable revision notes for this course', path: '/my-library' },
  { label: 'Downloadable syllabus checklist for this course', path: '/my-library' },
  { label: 'Flashcard deck for quick revision', path: '/flashcards' },
  { label: 'Progress tracking dashboard', path: '/dashboard' },
  { label: 'Quick Review — 5-minute daily refresher', path: '/quick-review' },
  { label: 'Wrong Questions Only revision mode', path: '/revision/wrong-questions' },
  { label: 'My Mistakes — auto-tracked from every test you take', path: '/my-mistakes' },
  { label: 'Printable certificate of completion', path: '/certificate' },
  { label: 'Score history & exportable test results', path: '/analytics' },
  { label: 'XP, streaks and unlockable badges', path: '/achievements' },
  { label: 'Leaderboard access', path: '/leaderboard' },
  { label: 'AI tutor chat for doubt-clearing', path: '/dashboard' },
  { label: 'Dark mode & accessibility options', path: '/settings' },
  { label: 'Multi-language interface', path: '/settings' },
  { label: 'Community discussion access', path: '/community' },
  { label: 'Refer a friend rewards', path: '/referral' },
  { label: 'Full ECS card explainer library', path: '/cards' },
  { label: 'Free study guides & safety-sign reference', path: '/study-material' },
  { label: 'Video library — PPE, fire safety, working at height & more', path: '/videos' },
  { label: 'Priority email support', path: '/community' },
  { label: 'Lifetime access & free content updates', path: '/my-courses' },
]

export const courses = [
  {
    id: 'ecs-health-safety',
    code: 'HS&E',
    title: 'ECS Health, Safety & Environment Test',
    shortTitle: 'ECS Health & Safety',
    tag: 'MOST POPULAR',
    level: 'Beginner',
    format: 'Online',
    duration: '2–4 weeks self-paced',
    price: 24.99,
    summary:
      'The mandatory test everyone needs before any ECS card is issued. Covers all 16 core H&S topics with a full 50-question mock exam.',
    modules: [
      { title: 'Accident & incident reporting', points: ['RIDDOR basics', 'Near-miss reporting', 'First aid & emergency procedures'] },
      { title: 'Electrical safety on site', points: ['Safe isolation', 'Working near live equipment', 'PPE for electrical work'] },
      { title: 'Working at height & manual handling', points: ['Ladders & access equipment', 'Lifting technique', 'Risk assessments'] },
      { title: 'Hazardous substances & fire', points: ['COSHH basics', 'Fire extinguisher types', 'Site fire procedures'] },
      { title: 'Full 50-question mock exam', points: ['Pearson VUE-style timed test', 'Instant marking', 'Topic-by-topic score breakdown'] },
    ],
    outcomes: [
      'Confident on all 11 ECS syllabus topics',
      'Comfortable with the real 30-minute exam format',
      'Know your weak topics before you book the real test',
    ],
  },
  {
    id: 'level-2-electrical',
    code: '2365-02',
    title: 'Level 2 Electrical Installations — Theory Course',
    shortTitle: 'Level 2 Diploma',
    tag: 'BEGINNER',
    level: 'Beginner',
    format: 'Online',
    duration: '6–10 weeks self-paced',
    price: 34.99,
    summary:
      'Online theory companion for the City & Guilds 2365 Level 2 Diploma — the UK\'s standard entry-level electrician qualification.',
    modules: [
      { title: 'Health & safety in building services', points: ['Legislation overview', 'Safe working practices', 'Risk assessment basics'] },
      { title: 'Electrical science principles', points: ['Ohm\'s law', 'AC/DC theory', 'Circuits & resistance'] },
      { title: 'Installation methods', points: ['Cable types & selection', 'Containment systems', 'Wiring systems'] },
      { title: 'Inspection, testing & fault diagnosis basics', points: ['Visual inspection', 'Continuity testing', 'Common fault patterns'] },
      { title: 'End-of-unit mock exams', points: ['Unit-by-unit quizzes', 'Full theory mock paper', 'Progress tracking'] },
    ],
    outcomes: [
      'Solid grasp of core electrical science before your practical days',
      'Ready for your 2365-02 knowledge assessments',
      'A revision library you can return to throughout the diploma',
    ],
  },
  {
    id: 'level-3-electrical',
    code: '2365-03',
    title: 'Level 3 Electrical Installations — Theory Course',
    shortTitle: 'Level 3 Diploma',
    tag: 'INTERMEDIATE',
    level: 'Intermediate',
    format: 'Online',
    duration: '8–12 weeks self-paced',
    price: 39.99,
    summary:
      'Advanced online theory course covering three-phase systems, fault diagnosis, inspection & testing, and electrical design for the 2365-03 diploma.',
    modules: [
      { title: 'Three-phase systems', points: ['Star & delta connections', 'Three-phase power calculations', 'Balancing loads'] },
      { title: 'Advanced fault diagnosis', points: ['Systematic fault-finding', 'Insulation resistance testing', 'Earth fault loop impedance'] },
      { title: 'Inspection & testing fundamentals', points: ['Initial verification sequence', 'Test instrument use', 'Certification basics'] },
      { title: 'Electrical design principles', points: ['Cable sizing calculations', 'Voltage drop', 'Diversity & maximum demand'] },
      { title: 'Full Level 3 mock exam bank', points: ['Timed mock papers', 'Worked calculation walkthroughs', 'Weak-topic analytics'] },
    ],
    outcomes: [
      'Confident with three-phase and fault-diagnosis theory',
      'Comfortable with the calculations examiners ask most',
      'Exam-ready for your 2365-03 knowledge tests',
    ],
  },
  {
    id: '18th-edition',
    code: '2382-26',
    title: '18th Edition Wiring Regulations — Exam Prep',
    shortTitle: '18th Edition',
    tag: 'BEGINNER',
    level: 'Beginner',
    format: 'Online',
    duration: '1–2 weeks self-paced',
    price: 29.99,
    summary:
      'Focused online prep for the BS 7671 18th Edition exam (Amendment 4) — the qualification every electrician needs to keep current.',
    modules: [
      { title: 'Navigating the Wiring Regulations', points: ['Book structure & layout', 'Finding regulations fast', 'Open-book exam technique'] },
      { title: 'Protection & earthing', points: ['ADS requirements', 'Earthing arrangements', 'RCD protection rules'] },
      { title: 'Special locations', points: ['Bathrooms & swimming pools', 'Agricultural installations', 'Caravan & marine sites'] },
      { title: 'Amendment 4 changes', points: ['What changed vs. the previous amendment', 'New requirements to remember'] },
      { title: 'Timed exam simulator', points: ['Open-book style mock exam', 'Regulation-reference practice', 'Instant scoring'] },
    ],
    outcomes: [
      'Fast and confident at locating regulations under time pressure',
      'Clear on every Amendment 4 change',
      'Practice-exam ready before booking the real 2382-26 exam',
    ],
  },
  {
    id: '2391-inspection-testing',
    code: '2391-52',
    title: 'Inspection & Testing — Exam Prep Course',
    shortTitle: '2391 Inspection & Testing',
    tag: 'POPULAR',
    level: 'Advanced',
    format: 'Online',
    duration: '3–5 weeks self-paced',
    price: 39.99,
    summary:
      'Covers Initial Verification and Periodic Inspection theory for the 2391-52 exam, including EICR completion and test-instrument use.',
    modules: [
      { title: 'Initial verification', points: ['Inspection sequence', 'Dead & live testing order', 'Recording results correctly'] },
      { title: 'Periodic inspection & EICRs', points: ['Condition codes (C1/C2/C3)', 'Observations & recommendations', 'Report writing practice'] },
      { title: 'Test instruments', points: ['Loop impedance testers', 'Insulation resistance testers', 'RCD test timers'] },
      { title: 'Case-study fault scenarios', points: ['Interpreting readings', 'Deciding pass/fail', 'Common exam scenario types'] },
      { title: 'Full mock exam bank', points: ['Multiple-choice mock papers', 'Scenario-based questions', 'Pass-probability tracking'] },
    ],
    outcomes: [
      'Confident completing EICRs and assigning condition codes',
      'Sharp on test-instrument theory and result interpretation',
      'Ready for the 2391-52 written exam',
    ],
  },
  {
    id: 'ev-charging',
    code: '2921-34',
    title: 'EV Charging Installation — Theory Course',
    shortTitle: 'EV Charging',
    tag: 'HOT',
    level: 'Intermediate',
    format: 'Online',
    duration: '1–2 weeks self-paced',
    price: 29.99,
    summary:
      'Online theory prep for the 2921-34 EV charge point installation exam, covering IET Code of Practice and BS 7671 requirements.',
    modules: [
      { title: 'EV charging fundamentals', points: ['Charge point types', 'Modes of charging', 'Vehicle-to-grid basics'] },
      { title: 'IET Code of Practice', points: ['Earthing arrangements for EV', 'PME restrictions', 'Protective device selection'] },
      { title: 'Installation & commissioning', points: ['Cable sizing for EV circuits', 'RCD requirements', 'Commissioning checks'] },
      { title: 'Smart Charge Point Regulations', points: ['Randomised delay function', 'Off-peak default settings'] },
      { title: 'Exam-style mock test', points: ['Online multiple-choice format', '75% pass-mark practice', 'Instant feedback'] },
    ],
    outcomes: [
      'Clear on EV-specific earthing and protection rules',
      'Comfortable with Smart Charge Point Regulations',
      'Ready for the 2921-34 assessment',
    ],
  },
  {
    id: 'solar-pv-battery',
    code: '2922/2923',
    title: 'Solar PV & Battery Storage — Theory Course',
    shortTitle: 'Solar PV & Battery',
    tag: 'GROWING',
    level: 'Intermediate',
    format: 'Online',
    duration: '2–3 weeks self-paced',
    price: 34.99,
    summary:
      'Covers Solar PV (2922-34) and Battery Storage (2923-34) theory — the fastest-growing specialism in the UK electrical trade.',
    modules: [
      { title: 'Solar PV system design', points: ['Panel types & efficiency', 'String sizing basics', 'Inverter selection'] },
      { title: 'PV installation & safety', points: ['DC isolation requirements', 'Roof mounting considerations', 'Labelling & signage'] },
      { title: 'Battery storage systems', points: ['Battery chemistries', 'Charge/discharge management', 'Fire safety for storage'] },
      { title: 'MCS pathway basics', points: ['What MCS certification requires', 'Documentation standards'] },
      { title: 'Combined mock exam', points: ['PV + storage question bank', 'Timed practice papers'] },
    ],
    outcomes: [
      'Confident with PV and battery storage terminology and rules',
      'Understand the MCS-aligned documentation expectations',
      'Ready for your 2922-34 / 2923-34 assessments',
    ],
  },
  {
    id: 'pat-testing',
    code: '2377-77',
    title: 'PAT Testing — Exam Prep Course',
    shortTitle: 'PAT Testing',
    tag: 'BEGINNER',
    level: 'Beginner',
    format: 'Online',
    duration: '1 week self-paced',
    price: 19.99,
    summary:
      'Short, focused course covering in-service inspection and testing of electrical equipment for the 2377-77 qualification.',
    modules: [
      { title: 'In-service inspection basics', points: ['Visual inspection checklist', 'Equipment classification (Class I/II)', 'Risk-based test frequency'] },
      { title: 'PAT test procedures', points: ['Earth continuity testing', 'Insulation resistance testing', 'Recording & labelling'] },
      { title: 'Common faults', points: ['Damaged cables & plugs', 'Overheating signs', 'Fail criteria'] },
      { title: 'Exam-style quiz bank', points: ['Multiple-choice practice', 'Instant explanations'] },
    ],
    outcomes: [
      'Confident carrying out a compliant PAT test sequence',
      'Clear on pass/fail criteria and record-keeping',
      'Ready for the 2377-77 assessment',
    ],
  },
  {
    id: 'am2-assessment',
    code: 'AM2',
    title: 'AM2 Practical Assessment — Revision Course',
    shortTitle: 'AM2 Assessment',
    tag: 'ADVANCED',
    level: 'Advanced',
    format: 'Online',
    duration: '2–4 weeks self-paced',
    price: 39.99,
    summary:
      'Theory revision and scenario walk-throughs to prepare for the AM2 — the final practical assessment on the road to your Gold Card.',
    modules: [
      { title: 'AM2 structure overview', points: ['What each task assesses', 'Time management on the day', 'Common mistakes to avoid'] },
      { title: 'Safe isolation & inspection', points: ['Safe isolation procedure', 'Pre-installation checks'] },
      { title: 'Installation task theory', points: ['Reading the task brief', 'Planning your approach'] },
      { title: 'Fault diagnosis task', points: ['Systematic fault-finding method', 'Common AM2 fault scenarios'] },
      { title: 'Inspection & testing task', points: ['Test sequence recap', 'Certification paperwork'] },
    ],
    outcomes: [
      'A clear mental checklist for each AM2 task',
      'Familiar with the fault-diagnosis scenarios examiners use',
      'Walking in prepared, not guessing what to expect',
    ],
  },
  {
    id: 'nvq-level-3',
    code: '2357',
    title: 'NVQ Level 3 Portfolio Guidance Course',
    shortTitle: 'NVQ Level 3',
    tag: 'ON-SITE',
    level: 'Intermediate',
    format: 'Online',
    duration: 'Self-paced, ongoing',
    price: 29.99,
    summary:
      'Online guidance course on building a compliant NVQ Level 3 (2357) portfolio of on-site competence evidence.',
    modules: [
      { title: 'Portfolio structure', points: ['What assessors look for', 'Evidence types accepted', 'Organising your units'] },
      { title: 'Site evidence collection', points: ['Photos & witness testimonies', 'Work diaries', 'Log book best practice'] },
      { title: 'Professional discussion prep', points: ['Common assessor questions', 'How to structure your answers'] },
      { title: 'Progress checklist quizzes', points: ['Unit-by-unit self-check quizzes'] },
    ],
    outcomes: [
      'A clear evidence-collection routine for every site visit',
      'Confidence going into your professional discussion',
      'A portfolio structured the way assessors expect',
    ],
  },
  {
    id: 'green-card',
    code: 'ECS Green',
    title: 'ECS Green Card — Operative Exam Prep',
    shortTitle: 'Green Card',
    tag: 'ENTRY LEVEL',
    level: 'Beginner',
    format: 'Online',
    duration: '1–2 weeks self-paced',
    price: 19.99,
    summary:
      'Focused exam prep for construction operatives applying for the ECS Green Card — the entry-level site card.',
    modules: [
      { title: 'Site health & safety basics', points: ['PPE requirements', 'Site induction essentials', 'Common site hazards'] },
      { title: 'Reporting & communication', points: ['Who to report hazards to', 'Toolbox talk basics'] },
      { title: 'Green Card mock exam', points: ['Full-length practice test', 'Instant scoring & explanations'] },
    ],
    outcomes: ['Confident on all Green Card syllabus areas', 'Exam-ready before booking your Pearson VUE test'],
  },
  {
    id: 'gold-card-supervisor',
    code: 'ECS Gold',
    title: 'ECS Gold Card — Supervisor Exam Prep',
    shortTitle: 'Gold Card',
    tag: 'SUPERVISOR',
    level: 'Intermediate',
    format: 'Online',
    duration: '2–3 weeks self-paced',
    price: 24.99,
    summary:
      'Exam prep for site supervisors and foremen working towards the ECS Gold Card, covering supervisory H&S responsibilities.',
    modules: [
      { title: 'Supervisory responsibilities', points: ['Legal duties of a supervisor', 'Managing subcontractors safely'] },
      { title: 'Risk assessment & method statements', points: ['Writing a RAMS document', 'Reviewing site-specific risks'] },
      { title: 'Supervisor-level mock exam', points: ['Extended question set', 'Scenario-based questions'] },
    ],
    outcomes: ['Comfortable with supervisory H&S duties', 'Ready for the supervisor-level assessment'],
  },
  {
    id: 'black-card-managers',
    code: 'ECS Black',
    title: 'ECS Black Card — Managers & Professionals Prep',
    shortTitle: 'Black Card',
    tag: 'MANAGEMENT',
    level: 'Advanced',
    format: 'Online',
    duration: '2–3 weeks self-paced',
    price: 29.99,
    summary:
      'Exam prep for site managers and construction professionals working towards the highest-level ECS Black Card.',
    modules: [
      { title: 'Management-level H&S law', points: ['CDM regulations overview', 'Duty holder responsibilities'] },
      { title: 'Managing site-wide risk', points: ['Multi-trade coordination', 'Incident investigation basics'] },
      { title: 'Manager-level mock exam', points: ['Extended 5-topic question set', 'Full explanations'] },
    ],
    outcomes: ['Confident with CDM and management-level duties', 'Exam-ready for the Black Card assessment'],
  },
  {
    id: 'blue-card-skilled',
    code: 'ECS Blue',
    title: 'ECS Skilled Worker (Blue Card) — Exam Prep',
    shortTitle: 'Blue Card',
    tag: 'SKILLED TRADE',
    level: 'Beginner',
    format: 'Online',
    duration: '1–2 weeks self-paced',
    price: 19.99,
    summary:
      'Exam prep tailored to skilled construction workers in specialised trades applying for the ECS Blue Card.',
    modules: [
      { title: 'Trade-specific safety', points: ['Tool & equipment safety', 'Task-specific hazards'] },
      { title: 'Working safely with others', points: ['Coordinating with other trades', 'Reporting concerns correctly'] },
      { title: 'Blue Card mock exam', points: ['Full-length practice test', 'Weak-topic breakdown'] },
    ],
    outcomes: ['Confident on all Blue Card syllabus areas', 'Ready to book your Pearson VUE test'],
  },
]

export function getCourseById(id) {
  return courses.find((c) => c.id === id) || null
}
