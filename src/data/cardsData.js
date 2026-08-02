// data/cardsData.js
// As of 2026, ECS runs exactly 4 assessment types. This list is scoped to
// those four (see extraTests.js for full details and question data).
export const cardsData = [
  { name: 'ECS Health, Safety and Environmental (HSE) Assessment', path: '/ecs-hse-assessment', icon: '🦺', description: 'Mandatory for every ECS card application or renewal, all occupations. Published ECS question bank.', validity: '3-5 years', official: true },
  { name: 'ECS FESS Assessment', path: '/ecs-fess-assessment', icon: '🔥', description: 'For FESS Systems Operative card applicants (Fire, Emergency & Security Systems). Practice questions — no official ECS bank published.', validity: '3 years', official: false },
  { name: 'ECS Network Infrastructure Assessment', path: '/ecs-network-infrastructure-assessment', icon: '🌐', description: 'For Network Infrastructure Installer and related card applicants. Practice questions — no official ECS bank published.', validity: '3 years', official: false },
  { name: 'ECS Electrical Safety Unit Assessment', path: '/ecs-electrical-safety-unit-assessment', icon: '⚡', description: 'For ECS Related Discipline and other defined ECS cards requiring basic electrical safety knowledge. Practice questions — official guide published, but no official question bank.', validity: '3 years', official: false },
]
