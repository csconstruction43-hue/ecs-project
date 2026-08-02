// lib/testAccess.js
// Single source of truth for which mock tests are free vs. locked behind a
// paid plan. To change what's free, just edit FREE_TEST_PATHS below — every
// test page and the mock-tests listing page read from this one file.

// ECS HSE Assessment (mandatory for everyone) plus its 11 official
// topic-practice routes are all free — they're all sourced from the same
// official ECS question bank and this is the single test that applies to
// every ECS card holder, so it stays fully open.
const HSE_TOPIC_PRACTICE_PATHS = Array.from({ length: 11 }, (_, i) => `/ecs-hse-practice-${i + 1}`)

// Each large Extra Practice bank (mega/ultra/electrical/safety) is split
// into fixed 50-question tests in data/extraTests.js (Test 1, Test 2,
// Test 3...). Only the first test in each series is free — the rest sit
// behind Pro, same free/paid split as everything else in the app.
const EXTRA_PRACTICE_CHUNK_FIRST_FREE_PATHS = [
  '/ecs-extra-practice-mega-1',
  '/ecs-extra-practice-ultra-1',
  '/ecs-extra-practice-electrical-1',
  '/ecs-extra-practice-safety-1',
]

export const FREE_TEST_PATHS = [
  '/ecs-hse-assessment',
  ...HSE_TOPIC_PRACTICE_PATHS,
  ...EXTRA_PRACTICE_CHUNK_FIRST_FREE_PATHS,
]

export function isTestFree(path) {
  return FREE_TEST_PATHS.includes(path)
}

// A user can access a test if it's one of the free ones, OR they have Pro.
export function canAccessTest(path, isPro) {
  return isPro || isTestFree(path)
}
