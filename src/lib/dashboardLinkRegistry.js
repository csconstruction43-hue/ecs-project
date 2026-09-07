// lib/dashboardLinkRegistry.js
// Every link in the signed-in user's dashboard sidebar (AppShell) that an
// admin can individually hide/show, via the generic `dashboardLinkVisibility`
// setting. Keyed by a stable `key` (independent of the route, in case a path
// ever changes) — a key missing from dashboardLinkVisibility means "visible"
// (the default).
//
// Left out on purpose:
// - Dashboard, Settings, Sign out — core nav, hiding them would strand users.
// - "My Card Application" and the "ECS Card" / "ECS Test" booking links —
//   these already have their own dedicated toggles (myCardApplicationLinkEnabled,
//   dashboardEcsBookingLinksEnabled) from before this generic system existed.
const DASHBOARD_LINK_REGISTRY = [
  { key: 'study-guide', title: 'Study Guide', path: '/study-guide', section: 'Study' },
  { key: 'mock-test', title: 'Mock Test', path: '/mock-test', section: 'Study' },
  { key: 'practice', title: 'Practice by Topic', path: '/practice', section: 'Study' },
  { key: 'my-mistakes', title: 'My Mistakes', path: '/my-mistakes', section: 'Study' },
  { key: 'my-library', title: 'My Library', path: '/my-library', section: 'Study' },
  { key: 'quick-review', title: 'Quick Review', path: '/quick-review', section: 'Study' },

  { key: 'flashcards', title: 'Flashcards', path: '/flashcards', section: 'Revision' },
  { key: 'wrong-questions', title: 'Wrong Questions Only', path: '/revision/wrong-questions', section: 'Revision' },
  { key: 'smart-practice', title: 'Smart Practice', path: '/smart-practice', section: 'Revision' },
  { key: 'achievements', title: 'Achievements', path: '/achievements', section: 'Revision' },
  { key: 'safety-signs', title: 'Safety Signs', path: '/safety-signs', section: 'Revision' },
  { key: 'study-material', title: 'Study Material', path: '/study-material', section: 'Revision' },
  { key: 'videos', title: 'Video Library', path: '/videos', section: 'Revision' },
  { key: 'community', title: 'Community', path: '/community', section: 'Revision' },

  { key: 'study-plan', title: 'Study Plan', path: '/study-plan', section: 'AI Tools' },
  { key: 'ai-quiz-generator', title: 'AI Quiz Generator', path: '/ai-quiz-generator', section: 'AI Tools' },

  { key: 'which-ecs-card', title: 'Which ECS Card?', path: '/which-ecs-card', section: 'UK Tools' },
  { key: 'exam-day-checklist', title: 'Exam Day Checklist', path: '/exam-day-checklist', section: 'UK Tools' },

  { key: 'analytics', title: 'Analytics', path: '/analytics', section: 'More' },
  { key: 'pricing', title: 'Pricing', path: '/pricing', section: 'More' },
  { key: 'affiliate', title: 'Affiliate', path: '/affiliate', section: 'More' },
]

export default DASHBOARD_LINK_REGISTRY
