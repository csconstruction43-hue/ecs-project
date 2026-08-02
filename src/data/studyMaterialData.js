// data/studyMaterialData.js
// Phase 2: free, always-open Study Material guides — quick-reference topic
// summaries (PPE, Fire Safety, COSHH, etc.), distinct from the full 21-
// chapter Pro Study Guide. Each guide has a short summary plus a set of
// key-point cards for fast revision.
export const STUDY_MATERIALS = [
  {
    id: 'ppe',
    title: 'PPE — Personal Protective Equipment',
    icon: 'HardHat',
    color: '#2563EB',
    summary: 'The last line of defence against workplace hazards, when the risk cannot be removed or controlled another way.',
    points: [
      { title: 'Head Protection', body: 'Hard hats must be worn at all times on site and replaced immediately if cracked, dropped from height, or older than the manufacturer\'s recommended life (usually 2-5 years).' },
      { title: 'Eye Protection', body: 'Safety glasses or goggles are required for cutting, grinding, drilling and any task producing dust, chips or splashes.' },
      { title: 'Hearing Protection', body: 'Required above 85dB (the second action level). Ear defenders or plugs must be worn continuously — even brief unprotected exposure adds up.' },
      { title: 'Hand Protection', body: 'Gloves are selected for the specific hazard: cut-resistant for sharp materials, chemical-resistant for COSHH substances, insulated for electrical work.' },
      { title: 'Foot Protection', body: 'Steel or composite toe-cap boots with midsole protection are standard on all construction sites, protecting against falling objects and punctures.' },
      { title: 'Respiratory Protection', body: 'Dust masks (FFP2/FFP3) or full respirators are needed when working with silica dust, asbestos, or other hazardous airborne substances.' },
      { title: 'High-Visibility Clothing', body: 'Must meet the site\'s required class (usually EN ISO 20471 Class 2 or 3) and be kept clean — dirty hi-vis loses its reflectivity.' },
      { title: 'Employer & Worker Duties', body: 'Employers must provide suitable PPE free of charge and train workers to use it. Workers must use PPE as instructed, look after it, and report damage or loss.' },
    ],
  },
  {
    id: 'fire-safety',
    title: 'Fire Safety',
    icon: 'Flame',
    color: '#DC2626',
    summary: 'Understanding the fire triangle, extinguisher types, and emergency procedures is essential for every construction worker.',
    points: [
      { title: 'The Fire Triangle', body: 'Fire needs three things to start and continue: heat, fuel, and oxygen. Removing any one of the three will extinguish or prevent a fire.' },
      { title: 'Extinguisher Colour Coding', body: 'Water (red) — wood/paper/fabric. Foam (cream) — flammable liquids. CO2 (black) — electrical fires. Dry powder (blue) — multi-purpose. Wet chemical (yellow) — cooking oil fires.' },
      { title: 'Never Use Water On...', body: 'Never use a water extinguisher on an electrical fire (risk of electric shock) or a burning-liquid fire (can spread the fire by splashing).' },
      { title: 'On Discovering a Fire', body: 'Raise the alarm immediately, evacuate via the nearest safe route, close doors behind you to slow the spread, and go directly to the assembly point.' },
      { title: 'Fire Risk Assessments', body: 'Sites must identify ignition sources, fuel sources, and people at risk, then put controls in place — e.g. safe storage of flammable materials away from hot works.' },
      { title: 'Hot Works Permits', body: 'Welding, cutting and grinding require a hot works permit, a fire watch during and after the work, and nearby extinguishers on hand.' },
    ],
  },
  {
    id: 'coshh',
    title: 'COSHH — Control of Substances Hazardous to Health',
    icon: 'FlaskConical',
    color: '#7C3AED',
    summary: 'The law requiring employers to control exposure to hazardous substances like dust, fumes, chemicals and biological agents.',
    points: [
      { title: 'What Counts as Hazardous', body: 'Dusts (e.g. silica, wood), fumes, chemicals, cement, solvents, biological agents (e.g. Weil\'s disease from contaminated water), and gases.' },
      { title: 'The Hierarchy of Control', body: 'Eliminate the substance, substitute for something safer, engineering controls (e.g. extraction), then PPE as the last resort.' },
      { title: 'Safety Data Sheets (SDS)', body: 'Every hazardous substance on site must have an SDS detailing its hazards, safe handling, storage and first aid measures — read it before use.' },
      { title: 'Silica Dust', body: 'Cutting concrete, brick or stone releases respirable crystalline silica (RCS), which causes silicosis and lung cancer. Use water suppression, on-tool extraction and RPE.' },
      { title: 'Storage & Labelling', body: 'Hazardous substances must be stored in original, correctly labelled containers, away from incompatible materials, with spill kits available.' },
      { title: 'Health Surveillance', body: 'Workers regularly exposed to substances like silica or asbestos may need health checks (e.g. lung function tests) as part of the employer\'s duty of care.' },
    ],
  },
  {
    id: 'manual-handling',
    title: 'Manual Handling',
    icon: 'PersonStanding',
    color: '#EA580C',
    summary: 'Poor lifting technique is one of the leading causes of injury on construction sites — most of it preventable.',
    points: [
      { title: 'TILE Assessment', body: 'Task, Individual, Load, Environment — assess all four before lifting anything heavy or awkward.' },
      { title: 'Safe Lifting Technique', body: 'Keep the load close to your body, bend your knees not your back, keep your back straight, and avoid twisting while carrying.' },
      { title: 'Weight Guidelines', body: 'HSE guidance suggests around 25kg for men and 16kg for women at waist height when lifting close to the body — lower if held away from the body or above shoulder height.' },
      { title: 'When to Get Help', body: 'Use mechanical aids (trolleys, hoists) or a team lift for loads that are too heavy, too large, or an awkward shape for one person.' },
      { title: 'Common Injuries', body: 'Back injuries, hernias, and musculoskeletal disorders (MSDs) are the most common consequence of poor manual handling practice.' },
    ],
  },
  {
    id: 'working-at-height',
    title: 'Working at Height',
    icon: 'ArrowUpFromLine',
    color: '#0891B2',
    summary: 'Falls from height remain one of the biggest causes of fatalities in UK construction — strict controls apply.',
    points: [
      { title: 'Work at Height Regulations 2005', body: 'Requires employers to avoid work at height where possible, use equipment to prevent falls, and minimise the distance/consequences of a fall if it can\'t be avoided.' },
      { title: 'Ladder Safety', body: 'Use the 1-in-4 rule (75°) for angle, secure the ladder top and bottom, never overreach, and maintain 3 points of contact.' },
      { title: 'Scaffolding', body: 'Must only be erected, altered or dismantled by trained/competent people, and inspected every 7 days and after bad weather.' },
      { title: 'Edge Protection', body: 'Guard rails, toe boards and barriers are required around any open edge or floor void with a fall risk.' },
      { title: 'MEWPs (Mobile Elevating Work Platforms)', body: 'Operators must be trained and certified (e.g. IPAF); harnesses may be required in scissor lifts/boom lifts per manufacturer guidance.' },
      { title: 'Fragile Roofs', body: 'Never assume a roof surface can bear your weight — use crawling boards, staging, and edge protection, and treat all roof lights as fragile.' },
    ],
  },
  {
    id: 'electrical-safety',
    title: 'Electrical Safety',
    icon: 'Zap',
    color: '#CA8A04',
    summary: 'Electricity is invisible and can kill instantly — understanding safe voltages and cable safety is essential.',
    points: [
      { title: 'Site Voltages', body: '110V (yellow plugs) is standard for portable tools on site — far safer than 230V mains if a fault occurs.' },
      { title: 'PAT Testing', body: 'Portable Appliance Testing checks tools and leads for damage on a regular schedule — commonly every 3 months for site tools.' },
      { title: 'RCDs (Residual Current Devices)', body: 'Cut the power within milliseconds if a fault is detected, dramatically reducing the risk of fatal shock. Test the button monthly.' },
      { title: 'Overhead & Underground Cables', body: 'Always assume cables are live. Use a Cable Avoidance Tool (CAT scanner) before digging, and maintain safe distances from overhead lines.' },
      { title: 'Daily Checks', body: 'Visually inspect cables and plugs before use for cuts, exposed wires or damaged casings — never use damaged equipment.' },
    ],
  },
  {
    id: 'noise-vibration',
    title: 'Noise & Vibration',
    icon: 'Volume2',
    color: '#0D9488',
    summary: 'Long-term exposure to noise and vibration causes permanent, irreversible health conditions.',
    points: [
      { title: 'Noise Action Levels', body: 'Lower (80dB) — employer must assess and provide hearing protection on request. Upper (85dB) — hearing protection is mandatory and zones must be marked.' },
      { title: 'HAVS (Hand-Arm Vibration Syndrome)', body: 'Caused by prolonged use of vibrating tools (drills, breakers). Symptoms include tingling, numbness and loss of grip — it is irreversible once it develops.' },
      { title: 'Reducing Exposure', body: 'Use lower-vibration tools, limit trigger time, take regular breaks, and keep hands warm to maintain circulation.' },
      { title: 'Whole Body Vibration (WBV)', body: 'Affects operators of heavy plant over long periods and can contribute to back injury — seat suspension and route planning help reduce it.' },
    ],
  },
  {
    id: 'emergency-procedures',
    title: 'Emergency Procedures & First Aid',
    icon: 'Siren',
    color: '#B91C1C',
    summary: 'Knowing exactly what to do in the first few minutes of an emergency saves lives.',
    points: [
      { title: 'The Site Emergency Plan', body: 'Every site must have marked evacuation routes, an assembly point, and clear roles for who does what in an emergency.' },
      { title: 'DRABC', body: 'Danger, Response, Airway, Breathing, Circulation — the sequence for assessing a casualty before giving first aid.' },
      { title: 'CPR Ratio', body: '30 chest compressions to 2 rescue breaths, repeated until help arrives or the casualty recovers.' },
      { title: 'RIDDOR Reporting', body: 'Serious injuries, dangerous occurrences and certain diseases must be reported to the HSE — fatalities and specified injuries within statutory timescales.' },
      { title: 'First Aiders', body: 'Sites need an appointed person or qualified first aider based on a risk assessment of site size and hazard level.' },
    ],
  },
]

export function getStudyMaterial(id) {
  return STUDY_MATERIALS.find((m) => m.id === id) || null
}
