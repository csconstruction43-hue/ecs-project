// data/dashboardTopics.js
// Canonical list of ECS H&S topics shown in the "Topic Performance" panel
// on the dashboard and used to match against saved test history entries.
export const dashboardTopics = [
  { id: 'accident-reporting', name: 'Accident Reporting', icon: '📋' },
  { id: 'electrical-safety', name: 'Electrical Safety', icon: '⚡' },
  { id: 'emergency-procedures', name: 'Emergency Procedures', icon: '🚨' },
  { id: 'environmental-awareness', name: 'Environmental Awareness', icon: '🌱' },
  { id: 'general-responsibilities', name: 'General Responsibilities', icon: '📄' },
  { id: 'health-welfare', name: 'Health & Welfare', icon: '🏥' },
  { id: 'manual-handling', name: 'Manual Handling', icon: '📦' },
  { id: 'hazardous-substances', name: 'Hazardous Substances', icon: '☣️' },
  { id: 'safety-signs', name: 'Safety Signs', icon: '🚧' },
  { id: 'noise-vibration', name: 'Noise & Vibration', icon: '🔊' },
  { id: 'ppe', name: 'PPE', icon: '🦺' },
  { id: 'respiratory-risks', name: 'Respiratory Risks', icon: '😷' },
  { id: 'site-transport', name: 'Site Transport', icon: '🚚' },
  { id: 'working-at-height', name: 'Working at Height', icon: '🪜' },
  { id: 'excavations', name: 'Excavations', icon: '⛏️' },
  { id: 'fire-prevention', name: 'Fire Prevention', icon: '🔥' },
  { id: 'cosh-regulations', name: 'COSHH Regulations', icon: '🧪' },
  { id: 'mental-health', name: 'Mental Health', icon: '🧠' },
  { id: 'leadership', name: 'Leadership', icon: '👥' },
  { id: 'demolition', name: 'Demolition', icon: '🏚️' },
  { id: 'highway-works', name: 'Highway Works', icon: '🛣️' },
]

// Loosely matches a saved test's testType/testLabel string against one of
// the canonical topic names above (case-insensitive, substring match both
// ways so "Working at Height Mock Test" still matches "Working at Height").
export function matchTopic(label = '') {
  const clean = label.toLowerCase()
  return dashboardTopics.find(
    (t) => clean.includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(clean)
  )
}
