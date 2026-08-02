// data/occupationalCards.js
// The 13 cards on the main Cards page cover the core colour/level system.
// This file covers the wider set of *occupational* ECS card routes —
// specific job titles within that system (e.g. "Installation Electrician",
// "FESS Technician"). Each one is mapped to whichever real mock test on
// this site best matches its occupation, so every card links to a working
// practice test instead of a dead end, and each one now gets its own
// dedicated detail page at /ecs-cards/:slug (see OccupationalCardPage.jsx).

export const occupationalCategories = [
  { id: 'entry', name: 'Entry & General Routes', icon: '🚪', desc: 'Starting points on site before you specialise into a trade.' },
  { id: 'electrical', name: 'Electrical Trades', icon: '⚡', desc: 'Installation, maintenance and specialist electrical occupations.' },
  { id: 'fess', name: 'Fire, Emergency & Security Systems (FESS)', icon: '🔥', desc: 'Fire alarm, emergency lighting and security system installers and engineers.' },
  { id: 'network', name: 'Network & Telecoms', icon: '📡', desc: 'Structured cabling, telecoms and mobile network infrastructure roles.' },
  { id: 'av', name: 'AV, Broadcast & Creative Production', icon: '🎤', desc: 'Audio-visual, broadcast and live event technical roles.' },
  { id: 'management', name: 'Site Management', icon: '📊', desc: 'Supervisory and management routes for running sites and contracts.' },
  { id: 'other', name: 'Other Specialist Routes', icon: '📄', desc: 'Vehicle, lighting and other specialist installer occupations.' },
]

// Metadata for the underlying colour-card test each occupation route maps
// to. Keyed by the mock-test path so the detail page can show validity,
// cost and the right test name without repeating it on every card.
export const testMeta = {
  '/ecs-green-card-mock-test': {
    cardName: 'Green Card (Operative)',
    color: 'green',
    testLabel: 'Operatives HS&E test',
    validity: '2 years first-time, 5 years on renewal',
    cost: '£57 (Apprentice route is free)',
  },
  '/ecs-skilled-worker-test': {
    cardName: 'Blue / Gold Card (Skilled Worker)',
    color: 'blue',
    testLabel: 'Operatives or Specialist HS&E test',
    validity: '5 years (1 year on the temporary Experienced Worker route)',
    cost: '£57',
  },
  '/ecs-supervisor-test': {
    cardName: 'Gold Card (Supervisor)',
    color: 'gold',
    testLabel: 'Supervisors HS&E test',
    validity: '5 years',
    cost: '£57',
  },
  '/ecs-black-card-mock-test': {
    cardName: 'Black / White Card (Manager)',
    color: 'black',
    testLabel: 'MAP HS&E test',
    validity: '5 years',
    cost: '£57',
  },
}

// slugify: "Installation Electrician (Gold)" -> "installation-electrician-gold"
export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const occupationalCards = [
  // Entry & general
  { name: 'Labourer', category: 'entry', desc: 'Entry-level route for general site support and basic labouring duties.', path: '/ecs-green-card-mock-test' },
  { name: 'Electrical Labourer', category: 'entry', desc: 'For workers assisting qualified electricians on electrical sites.', path: '/ecs-green-card-mock-test' },
  { name: 'Apprentice', category: 'entry', desc: 'For anyone on a recognised electrical apprenticeship framework.', path: '/ecs-green-card-mock-test' },
  { name: 'Trainee Electrician', category: 'electrical', desc: 'For trainees working towards a full electrician qualification.', path: '/ecs-green-card-mock-test' },
  { name: 'Industry Placement (T-Level)', category: 'entry', desc: 'For T-Level students completing a supervised industry placement.', path: '/ecs-green-card-mock-test' },
  { name: 'Experienced Worker (Gold Stripe – Temp)', category: 'entry', desc: 'Temporary route for experienced workers progressing towards a full card.', path: '/ecs-skilled-worker-test' },
  { name: 'Site Support Occupations', category: 'entry', desc: 'For non-electrical site roles that still need ECS recognition.', path: '/ecs-green-card-mock-test' },

  // Electrical trades
  { name: 'Provisional Installation Electrician', category: 'electrical', desc: 'Provisional card while final evidence for the full installation route is completed.', path: '/ecs-green-card-mock-test' },
  { name: 'Installation Electrician (Gold)', category: 'electrical', desc: 'Skilled-worker gold card for fully qualified installation electricians.', path: '/ecs-skilled-worker-test' },
  { name: 'Approved Electrician (Gold)', category: 'electrical', desc: 'Gold card for electricians assessed to Approved Electrician level.', path: '/ecs-skilled-worker-test' },
  { name: 'Registered Electrician (Gold)', category: 'electrical', desc: 'Gold card confirming Registered Electrician status against current standards.', path: '/ecs-skilled-worker-test' },
  { name: 'Technician (Gold)', category: 'electrical', desc: 'Advanced technical-level card for experienced technicians and specialists.', path: '/ecs-skilled-worker-test' },
  { name: 'Maintenance Electrician', category: 'electrical', desc: 'Gold card for electricians focused on planned and reactive maintenance.', path: '/ecs-skilled-worker-test' },
  { name: 'Electrical Fitter', category: 'electrical', desc: 'Gold card route for electrical fitting and panel-based installation work.', path: '/ecs-skilled-worker-test' },
  { name: 'Engineering Maintenance Electrician', category: 'electrical', desc: 'Gold card for engineering-focused electrical maintenance roles.', path: '/ecs-skilled-worker-test' },
  { name: 'Wireman & Panel Builder', category: 'electrical', desc: 'For workers assembling, wiring and testing electrical control panels.', path: '/ecs-skilled-worker-test' },
  { name: 'Marine Electrician', category: 'electrical', desc: 'Gold card route for electrical work aboard ships and marine installations.', path: '/ecs-skilled-worker-test' },
  { name: 'Auto Electrician', category: 'electrical', desc: 'For automotive electrical installation and diagnostic work.', path: '/ecs-skilled-worker-test' },
  { name: 'Electrical Product Service Engineer', category: 'electrical', desc: 'Service and repair specialist for electrical equipment and products.', path: '/ecs-skilled-worker-test' },
  { name: 'Electrical Winder', category: 'electrical', desc: 'Specialist in winding and refurbishing motors and electrical machines.', path: '/ecs-skilled-worker-test' },
  { name: 'Distribution Networks Electrician', category: 'electrical', desc: 'Electrician focused on electricity distribution network systems.', path: '/ecs-skilled-worker-test' },
  { name: 'Instruments Mechanic', category: 'electrical', desc: 'For roles working with instrumentation and control systems.', path: '/ecs-skilled-worker-test' },

  // FESS
  { name: 'FESS Apprentice', category: 'fess', desc: 'For apprentices training in Fire, Emergency & Security Systems.', path: '/ecs-green-card-mock-test' },
  { name: 'FESS Labourer', category: 'fess', desc: 'Entry-level labouring card within the FESS occupational structure.', path: '/ecs-green-card-mock-test' },
  { name: 'FESS Systems Operative', category: 'fess', desc: 'Technical operative card for FESS installation and servicing work.', path: '/ecs-skilled-worker-test' },
  { name: 'FESS Systems Technician / Engineer', category: 'fess', desc: 'Higher-level FESS card for technicians and engineers.', path: '/ecs-skilled-worker-test' },
  { name: 'Building Controls Installer / Engineer', category: 'fess', desc: 'For specialists installing building controls and automation systems.', path: '/ecs-skilled-worker-test' },

  // Network & telecoms
  { name: 'Network Infrastructure Assistant', category: 'network', desc: 'Assistant-level card for network and structured cabling work.', path: '/ecs-green-card-mock-test' },
  { name: 'Network Infrastructure Installer', category: 'network', desc: 'Installer and technician levels for network infrastructure routes.', path: '/ecs-skilled-worker-test' },
  { name: 'LV Jointer', category: 'network', desc: 'Low-voltage jointer working on LV distribution networks.', path: '/ecs-skilled-worker-test' },
  { name: 'Telecommunications Fitter', category: 'network', desc: 'Installer and maintenance card for telecoms fitting work.', path: '/ecs-skilled-worker-test' },
  { name: 'Cellular Network Field Engineer', category: 'network', desc: 'Field engineer card for mobile and cellular network work.', path: '/ecs-skilled-worker-test' },
  { name: 'Signal Distribution Specialist', category: 'network', desc: 'Specialist in distribution of broadcast and signal systems.', path: '/ecs-skilled-worker-test' },
  { name: 'Telecoms Operative', category: 'network', desc: 'Operative-level card for general telecoms field work.', path: '/ecs-green-card-mock-test' },

  // AV / broadcast / creative
  { name: 'AV Operative / AV Technician', category: 'av', desc: 'Audio-visual technician and operative roles across venues and events.', path: '/ecs-green-card-mock-test' },
  { name: 'Broadcast & Media Supervisor', category: 'av', desc: 'Supervisory card for broadcast and media technical operations.', path: '/ecs-supervisor-test' },
  { name: 'Creative Production Operative', category: 'av', desc: 'Supporting technical work in stage, theatre and live events.', path: '/ecs-green-card-mock-test' },
  { name: 'Creative Production Technician', category: 'av', desc: 'Technical role supporting creative and live event production.', path: '/ecs-skilled-worker-test' },
  { name: 'Creative Production Manager', category: 'av', desc: 'Management-level card for leading creative and live event teams.', path: '/ecs-black-card-mock-test' },
  { name: 'ISCVE AV Engineer', category: 'av', desc: 'AV engineer route recognised through ISCVE membership.', path: '/ecs-skilled-worker-test' },
  { name: 'ISCVE Sound Engineer', category: 'av', desc: 'Sound engineer card for permanent and installed sound systems.', path: '/ecs-skilled-worker-test' },
  { name: 'AVIXA Commercial AV Integrator', category: 'av', desc: 'AV integration specialist route recognised via AVIXA pathways.', path: '/ecs-skilled-worker-test' },
  { name: 'Radio & Television Electrician', category: 'av', desc: 'Electrical and signal work for broadcast and media environments.', path: '/ecs-skilled-worker-test' },

  // Site management
  { name: 'Site Supervisor', category: 'management', desc: 'Supervisory-level card for overseeing electrotechnical work on site.', path: '/ecs-supervisor-test' },
  { name: 'Site Manager', category: 'management', desc: 'Site management card for leading projects and delivery on site.', path: '/ecs-black-card-mock-test' },
  { name: 'Contracts Manager', category: 'management', desc: 'Senior card route for managing contracts and commercial delivery.', path: '/ecs-black-card-mock-test' },
  { name: 'Project Manager', category: 'management', desc: 'Management-level route for project planning and coordination.', path: '/ecs-black-card-mock-test' },
  { name: 'Academically Qualified Person (AQP)', category: 'management', desc: 'For holders of a suitable academic qualification in a related discipline.', path: '/ecs-black-card-mock-test' },
  { name: 'Professionally Qualified Person (PQP)', category: 'management', desc: 'For members of approved professional institutions and bodies.', path: '/ecs-black-card-mock-test' },

  // Other specialist
  { name: 'Vehicle Installer', category: 'other', desc: 'For workers installing electrical and electronic systems in vehicles.', path: '/ecs-green-card-mock-test' },
  { name: 'Gate Safe Installer', category: 'other', desc: 'Automatic gate and barrier installation specialist route.', path: '/ecs-green-card-mock-test' },
  { name: 'SLL Lighting Professional', category: 'other', desc: 'Lighting design and consultancy route recognised by the SLL.', path: '/ecs-skilled-worker-test' },
].map((card) => ({ ...card, slug: slugify(card.name) }))

export function getCardBySlug(slug) {
  return occupationalCards.find((c) => c.slug === slug)
}

export function getRelatedCards(card, limit = 3) {
  return occupationalCards
    .filter((c) => c.category === card.category && c.slug !== card.slug)
    .slice(0, limit)
}
