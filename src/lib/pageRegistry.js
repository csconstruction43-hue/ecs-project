// lib/pageRegistry.js
// Built-in content/marketing pages an admin can hide or show from
// Admin -> Pages, using the generic `pageVisibility` setting. This is
// separate from the Blog and "Types of ECS Cards" pages, which already had
// their own dedicated toggles (blogPageEnabled / ecsCardsPageEnabled)
// before this system existed, and from the core logged-in/test-taking
// flows and auth pages, which are left out here because hiding them would
// break the site rather than just hide marketing content.
const PAGE_REGISTRY = [
  { key: 'courses', title: 'Courses', path: '/courses' },
  { key: 'pricing', title: 'Pricing', path: '/pricing' },
  { key: 'plans', title: 'Pricing Plans', path: '/plans' },
  { key: 'leaderboard', title: 'Leaderboard', path: '/leaderboard' },
  { key: 'certificate', title: 'Certificate', path: '/certificate' },
  { key: 'book', title: 'Book', path: '/book' },
  { key: 'ecs-card-info', title: 'ECS Card Info', path: '/ecs-card-info' },
  { key: 'which-ecs-card', title: 'Which ECS Card Do I Need? (Wizard)', path: '/which-ecs-card' },
  { key: 'exam-day-checklist', title: 'Exam Day Checklist', path: '/exam-day-checklist' },
  { key: 'safety-signs', title: 'Safety Signs', path: '/safety-signs' },
  { key: 'calculators', title: 'Calculators', path: '/calculators' },
  { key: 'am2-simulator', title: 'AM2 Simulator', path: '/am2-simulator' },
  { key: 'study-material', title: 'Study Material', path: '/study-material' },
  { key: 'videos', title: 'Video Library', path: '/videos' },
  { key: 'community', title: 'Community', path: '/community' },
  { key: 'affiliate', title: 'Affiliate / Refer', path: '/affiliate' },
  { key: 'about', title: 'About', path: '/about' },
  { key: 'contact', title: 'Contact', path: '/contact' },
  { key: 'terms', title: 'Terms', path: '/terms' },
  { key: 'privacy', title: 'Privacy', path: '/privacy' },
  { key: 'cookies', title: 'Cookies', path: '/cookies' },
]

export default PAGE_REGISTRY
