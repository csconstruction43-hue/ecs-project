// data/safetySignsData.js
// UK construction safety-sign reference data for the Safety Signs module
// (quiz + flashcards). Signs are rendered as simple SVG shapes at render
// time (see SafetySignsPage.jsx) rather than using photographed/branded
// artwork, since the shape + colour + symbol combination is what the ECS
// test actually examines.
//
// category drives the shape + colour used to draw the sign:
//   prohibition   -> red circle, white background, red diagonal bar
//   mandatory     -> blue circle, white symbol
//   warning       -> yellow triangle, black border/symbol
//   fire          -> red rectangle, white symbol
//   safe-condition-> green rectangle, white symbol

export const SIGN_CATEGORIES = [
  { id: 'prohibition', name: 'Prohibition', color: '#DC2626', desc: 'Round, red border, white background, red diagonal line — tells you what you MUST NOT do.' },
  { id: 'mandatory', name: 'Mandatory', color: '#2563EB', desc: 'Round, solid blue background — tells you what you MUST do.' },
  { id: 'warning', name: 'Warning', color: '#F59E0B', desc: 'Triangular, yellow background, black border — warns of a hazard.' },
  { id: 'fire', name: 'Fire Equipment', color: '#DC2626', desc: 'Rectangular/square, solid red background — shows location of fire equipment.' },
  { id: 'safe-condition', name: 'Safe Condition', color: '#16A34A', desc: 'Rectangular/square, solid green background — shows escape routes, first aid, safety equipment.' },
]

export const SAFETY_SIGNS = [
  // Prohibition
  { id: 'p1', category: 'prohibition', symbol: '🚭', name: 'No Smoking', meaning: 'Smoking is not permitted in this area.' },
  { id: 'p2', category: 'prohibition', symbol: '🔥', name: 'No Naked Flames', meaning: 'Open flames or fire sources are forbidden — often near flammable materials.' },
  { id: 'p3', category: 'prohibition', symbol: '🚶', name: 'No Pedestrian Access', meaning: 'Pedestrians must not enter this area — usually due to vehicle movement or hazards.' },
  { id: 'p4', category: 'prohibition', symbol: '🚫', name: 'No Unauthorised Access', meaning: 'Only authorised personnel may enter this area.' },
  { id: 'p5', category: 'prohibition', symbol: '📵', name: 'No Mobile Phones', meaning: 'Mobile phone use is banned here, often near explosive atmospheres or plant.' },
  { id: 'p6', category: 'prohibition', symbol: '💧', name: 'Not Drinking Water', meaning: 'This water supply is not safe to drink.' },

  // Mandatory
  { id: 'm1', category: 'mandatory', symbol: '⛑️', name: 'Hard Hat Must Be Worn', meaning: 'Head protection is compulsory in this area at all times.' },
  { id: 'm2', category: 'mandatory', symbol: '🥽', name: 'Eye Protection Must Be Worn', meaning: 'Safety goggles/glasses are required — commonly near cutting, grinding or chemicals.' },
  { id: 'm3', category: 'mandatory', symbol: '🦺', name: 'High-Vis Clothing Must Be Worn', meaning: 'High-visibility clothing must be worn so you can be seen by plant/vehicles.' },
  { id: 'm4', category: 'mandatory', symbol: '🧤', name: 'Hand Protection Must Be Worn', meaning: 'Gloves are required to protect against cuts, chemicals or abrasion.' },
  { id: 'm5', category: 'mandatory', symbol: '👂', name: 'Ear Protection Must Be Worn', meaning: 'Hearing protection is compulsory — you are in a high-noise area.' },
  { id: 'm6', category: 'mandatory', symbol: '🥾', name: 'Safety Footwear Must Be Worn', meaning: 'Protective boots with steel toe caps are required in this area.' },
  { id: 'm7', category: 'mandatory', symbol: '😷', name: 'Respiratory Protection Must Be Worn', meaning: 'A dust mask or respirator is required — dust, fumes or hazardous substances present.' },
  { id: 'm8', category: 'mandatory', symbol: '🔒', name: 'Report to Site Office', meaning: 'You must sign in/report to the site office before proceeding.' },

  // Warning
  { id: 'w1', category: 'warning', symbol: '⚡', name: 'Danger: Electricity', meaning: 'Risk of electric shock — live equipment or overhead/underground cables nearby.' },
  { id: 'w2', category: 'warning', symbol: '⚠️', name: 'General Warning', meaning: 'A general hazard is present — take extra care and check local signage.' },
  { id: 'w3', category: 'warning', symbol: '🏗️', name: 'Overhead Load', meaning: 'Risk from cranes or materials being lifted overhead.' },
  { id: 'w4', category: 'warning', symbol: '🚧', name: 'Excavation / Trench', meaning: 'Deep excavation nearby — risk of falling in.' },
  { id: 'w5', category: 'warning', symbol: '🧪', name: 'Corrosive Substance', meaning: 'Chemicals present that can burn skin or damage materials on contact.' },
  { id: 'w6', category: 'warning', symbol: '🔊', name: 'High Noise Area', meaning: 'Noise levels are high enough to cause hearing damage without protection.' },
  { id: 'w7', category: 'warning', symbol: '🚜', name: 'Vehicle Movement', meaning: 'Site vehicles and plant are operating in this area.' },
  { id: 'w8', category: 'warning', symbol: '🪜', name: 'Fall From Height', meaning: 'Risk of falling from an unprotected edge or open floor void.' },

  // Fire equipment
  { id: 'f1', category: 'fire', symbol: '🧯', name: 'Fire Extinguisher', meaning: 'Indicates the location of a fire extinguisher.' },
  { id: 'f2', category: 'fire', symbol: '🔔', name: 'Fire Alarm Call Point', meaning: 'Indicates the location of a manual fire alarm call point.' },
  { id: 'f3', category: 'fire', symbol: '🚿', name: 'Fire Hose Reel', meaning: 'Indicates the location of a fire hose reel.' },
  { id: 'f4', category: 'fire', symbol: '☎️', name: 'Fire Telephone', meaning: 'Indicates the location of a telephone for reporting a fire.' },

  // Safe condition
  { id: 's1', category: 'safe-condition', symbol: '🏃', name: 'Emergency Exit / Escape Route', meaning: 'Shows the direction to the nearest emergency exit.' },
  { id: 's2', category: 'safe-condition', symbol: '➕', name: 'First Aid Point', meaning: 'Indicates the location of first aid equipment or a first aider.' },
  { id: 's3', category: 'safe-condition', symbol: '🚿', name: 'Emergency Shower / Eye Wash', meaning: 'Shows the location of emergency washing facilities, e.g. for chemical splashes.' },
  { id: 's4', category: 'safe-condition', symbol: '📍', name: 'Assembly Point', meaning: 'Shows where to gather in the event of an evacuation.' },
]

export function getSignsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return SAFETY_SIGNS
  return SAFETY_SIGNS.filter((s) => s.category === categoryId)
}
