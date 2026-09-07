// data/extraTestsRoutes.js
//
// App.jsx needs to know every route path that GenericMockTest should
// handle (e.g. '/ecs-extra-practice-mega-7') so it can register a <Route>
// for each one — but it only ever needs the *paths*, never the actual
// question data.
//
// Importing `extraTests` from './extraTests' for this would also pull in
// every question bank it depends on (officialEcsHse, officialEcsFess,
// officialEcsNetwork, officialEcsElectricalSafety, extraPracticeElectrical,
// extraPracticeSafety, extraPracticeMega, extraPracticeUltraBank — together
// 30,000+ lines / 3,000+ questions) into whatever chunk imports it. App.jsx
// is the app's root component, so that import previously landed in the
// main entry bundle and was downloaded on every single page view (even the
// homepage or a blog post), long before any test was ever opened.
//
// This file lists the same path keys as a plain array of strings, kept in
// sync by hand with `Object.keys(extraTests)` in extraTests.js. The actual
// question data is only loaded lazily, inside GenericMockTest.jsx, when a
// visitor actually opens one of these test routes.
//
// If you add/remove/rename a test route in extraTests.js, mirror the same
// key here.
export const extraTestRoutePaths = [
  '/ecs-hse-assessment',
  '/ecs-fess-assessment',
  '/ecs-network-infrastructure-assessment',
  '/ecs-electrical-safety-unit-assessment',
  '/ecs-extra-practice-electrical',
  '/ecs-extra-practice-safety',
  '/ecs-extra-practice-mega',
  '/ecs-extra-practice-ultra',
  ...Array.from({ length: 25 }, (_, i) => `/ecs-extra-practice-mega-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `/ecs-extra-practice-ultra-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `/ecs-extra-practice-electrical-${i + 1}`),
  ...Array.from({ length: 7 }, (_, i) => `/ecs-extra-practice-safety-${i + 1}`),
  ...Array.from({ length: 11 }, (_, i) => `/ecs-hse-practice-${i + 1}`),
]
