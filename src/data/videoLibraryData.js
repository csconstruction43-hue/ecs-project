// data/videoLibraryData.js
// Video Library topics. Each entry links out to a curated YouTube search
// for that exact topic rather than embedding a specific hardcoded video —
// this was deliberately changed from an embed-by-ID model. Embedding a
// guessed video ID risks linking the wrong content, low-quality uploads,
// or a video that gets taken down later (all of which would have shown up
// as a "broken feature" to users). A well-targeted search query is honest
// about what it is, always resolves to real results, and never rots.
export const VIDEO_CATEGORIES = ['All', 'PPE', 'Fire Safety', 'Working at Height', 'Manual Handling', 'Site Induction', 'Exam Tips']

export const VIDEOS = [
  { id: 'v1', title: 'How to Wear PPE Correctly on Site', category: 'PPE', duration: '~5 min', level: 'Beginner', description: 'A walkthrough of putting on and checking hard hats, hi-vis, gloves and boots before starting work.', searchQuery: 'construction site PPE how to wear correctly UK safety' },
  { id: 'v2', title: 'Fire Extinguisher Types Explained', category: 'Fire Safety', duration: '~5 min', level: 'Beginner', description: 'Colour codes and correct use for water, foam, CO2, dry powder and wet chemical extinguishers.', searchQuery: 'fire extinguisher types explained UK colour code' },
  { id: 'v3', title: 'Ladder Safety: The 1-in-4 Rule', category: 'Working at Height', duration: '~4 min', level: 'Beginner', description: "Setting up, angling and securing a ladder safely, and when a ladder isn't the right tool for the job.", searchQuery: 'ladder safety 4 to 1 rule HSE' },
  { id: 'v4', title: 'Safe Manual Handling Technique', category: 'Manual Handling', duration: '~6 min', level: 'Beginner', description: 'TILE assessment and correct lifting posture to avoid back injuries on site.', searchQuery: 'manual handling technique TILE assessment safe lifting HSE' },
  { id: 'v5', title: 'What Happens at a Site Induction', category: 'Site Induction', duration: '~7 min', level: 'Beginner', description: 'What to expect on your first day: emergency procedures, welfare facilities, and site rules.', searchQuery: 'construction site induction what to expect UK' },
  { id: 'v6', title: 'ECS Test: How the Exam Is Marked', category: 'Exam Tips', duration: '~5 min', level: 'All levels', description: 'Pass marks, timing, question format and what to expect walking into the test centre.', searchQuery: 'ECS health safety environment test what to expect exam' },
  { id: 'v7', title: 'Scaffolding Inspection Basics', category: 'Working at Height', duration: '~5 min', level: 'Intermediate', description: "What a 7-day scaffold inspection covers and the tags you'll see on a compliant scaffold.", searchQuery: 'scaffold inspection tag 7 day basics UK' },
  { id: 'v8', title: 'COSHH: Reading a Safety Data Sheet', category: 'PPE', duration: '~5 min', level: 'Intermediate', description: 'How to find the hazard, handling and first-aid information on an SDS before using a substance.', searchQuery: 'COSHH safety data sheet how to read explained' },
  { id: 'v9', title: 'Top Mistakes on the ECS Mock Test', category: 'Exam Tips', duration: '~4 min', level: 'All levels', description: 'Common traps in the multiple-choice questions and how to avoid losing easy marks.', searchQuery: 'ECS mock test common mistakes tips pass' },
]

export function getVideosByCategory(category) {
  if (!category || category === 'All') return VIDEOS
  return VIDEOS.filter((v) => v.category === category)
}

export function youtubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}
