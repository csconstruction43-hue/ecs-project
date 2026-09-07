// data/ukTestCentres.js
// Regional guide to where ECS Health & Safety assessments are sat around
// the UK. ECS doesn't publish exact street addresses for its assessment
// venues (they're arranged through the ECS Assessment Administration team
// and partner training providers), so this is a region/city-level guide to
// help candidates work out their nearest option before booking — not a
// substitute for confirming the exact venue when you book.
//
// Source: regions and host cities as published by ECS-approved guidance
// (sparkyfacts.co.uk/ECS-The-Test.php) and the ECS HS Booking Information
// booklet. Venues and frequency can change, so always confirm with ECS
// Assessment Administration or your chosen training provider when booking.

export const ECS_BOOKING_PHONE = '01582 531047'
export const ECS_FAST_TRACK_PHONE = '01322 661633' // Fast Track card + assessment, Swanley, Kent

// lat/lng are approximate city-centre coordinates (public geographic
// data), used only to sort by straight-line distance from a candidate's
// postcode — not a claim about the exact venue address.
export const ukTestCentres = [
  {
    id: 'north-east',
    region: 'North East',
    cities: [
      { city: 'Newcastle upon Tyne', county: 'Tyne & Wear', lat: 54.9783, lng: -1.6178 },
      { city: 'York', county: 'North Yorkshire', lat: 53.9600, lng: -1.0873 },
    ],
  },
  {
    id: 'north-west',
    region: 'North West',
    cities: [
      { city: 'Liverpool', county: 'Merseyside', lat: 53.4084, lng: -2.9916 },
      { city: 'Manchester', county: 'Greater Manchester', lat: 53.4808, lng: -2.2426 },
      { city: 'Barrow-in-Furness', county: 'Cumbria', lessFrequent: true, lat: 54.1099, lng: -3.2266 },
    ],
  },
  {
    id: 'central',
    region: 'Central',
    cities: [
      { city: 'Chesterfield', county: 'Derbyshire', lat: 53.2350, lng: -1.4210 },
    ],
  },
  {
    id: 'east-midlands',
    region: 'East Midlands',
    cities: [
      { city: 'Leicester', county: 'Leicestershire', lat: 52.6369, lng: -1.1398 },
    ],
  },
  {
    id: 'west-midlands',
    region: 'West Midlands',
    cities: [
      { city: 'Birmingham', county: 'West Midlands', lat: 52.4862, lng: -1.8904 },
    ],
  },
  {
    id: 'east',
    region: 'East of England',
    cities: [
      { city: 'Ipswich', county: 'Suffolk', lat: 52.0567, lng: 1.1482 },
      { city: 'Dunstable', county: 'Bedfordshire', lat: 51.8860, lng: -0.5205 },
      { city: 'Cambridge', county: 'Cambridgeshire', lat: 52.2053, lng: 0.1218 },
    ],
  },
  {
    id: 'london',
    region: 'Greater London',
    cities: [
      { city: 'Blackfriars', county: 'London', lat: 51.5116, lng: -0.1036 },
      { city: 'Ilford', county: 'London', lat: 51.5590, lng: 0.0741 },
      { city: 'Croydon', county: 'London', lat: 51.3762, lng: -0.0982 },
      { city: 'Slough', county: 'Berkshire', lat: 51.5105, lng: -0.5950 },
    ],
  },
  {
    id: 'central-south',
    region: 'Central South',
    cities: [
      { city: 'Oxford', county: 'Oxfordshire', lessFrequent: true, lat: 51.7520, lng: -1.2577 },
      { city: 'Bournemouth', county: 'Dorset', lat: 50.7192, lng: -1.8808 },
      { city: 'Porchester', county: 'Hampshire', lat: 50.8480, lng: -1.1150 },
    ],
  },
  {
    id: 'south-east',
    region: 'South East',
    cities: [
      { city: 'Burgess Hill', county: 'West Sussex', lat: 50.9556, lng: -0.1301 },
    ],
  },
  {
    id: 'west-sw',
    region: 'West & South West',
    cities: [
      { city: 'Bristol', county: 'Bristol', lat: 51.4545, lng: -2.5879 },
      { city: 'Plymouth', county: 'Devon', lessFrequent: true, lat: 50.3755, lng: -4.1427 },
      { city: 'Exeter', county: 'Devon', lessFrequent: true, lat: 50.7184, lng: -3.5339 },
      { city: 'Redruth', county: 'Cornwall', lessFrequent: true, lat: 50.2333, lng: -5.2247 },
      { city: 'Yeovil', county: 'Somerset', lat: 50.9425, lng: -2.6317 },
    ],
  },
  {
    id: 'south-wales',
    region: 'South Wales',
    cities: [
      { city: 'Bridgend', county: 'Wales', lat: 51.5057, lng: -3.5766 },
    ],
  },
  {
    id: 'northern-ireland',
    region: 'Northern Ireland',
    cities: [
      { city: 'Lisburn', county: 'County Antrim', lessFrequent: true, lat: 54.5162, lng: -6.0581 },
    ],
  },
]

// Haversine distance in miles between two lat/lng points.
export function distanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8 // Earth radius in miles
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

// Looks up a UK postcode's coordinates via postcodes.io — the free, no-key
// government-adjacent postcode API (backed by ONS/OS OpenData). Returns
// { lat, lng } or throws if the postcode can't be found.
export async function geocodeUkPostcode(postcode) {
  const clean = postcode.trim().replace(/\s+/g, '')
  if (!clean) throw new Error('Enter a postcode')
  const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`)
  if (!res.ok) throw new Error('Postcode not found')
  const data = await res.json()
  if (!data?.result?.latitude) throw new Error('Postcode not found')
  return { lat: data.result.latitude, lng: data.result.longitude }
}

// Flattened list — one row per city — for easy search/filter in the UI.
export const flatTestCentres = ukTestCentres.flatMap((r) =>
  r.cities.map((c) => ({
    region: r.region,
    regionId: r.id,
    city: c.city,
    county: c.county,
    lessFrequent: !!c.lessFrequent,
    lat: c.lat,
    lng: c.lng,
  }))
)
