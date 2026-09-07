// pages/TestCentreFinderPage.jsx
// New feature: "Find my nearest ECS test centre" — lets a UK candidate
// search/filter the regional venue guide by city, county or region, then
// jump straight into the booking form with their chosen area pre-filled.
import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Search, Phone, ArrowRight, Info, ClipboardCheck, Navigation, Loader2, AlertCircle } from 'lucide-react'
import Seo from '../components/Seo'
import { flatTestCentres, ECS_BOOKING_PHONE, ECS_FAST_TRACK_PHONE, geocodeUkPostcode, distanceMiles } from '../data/ukTestCentres'

function TestCentreFinderPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [postcode, setPostcode] = useState('')
  const [postcodeStatus, setPostcodeStatus] = useState('idle') // idle | loading | error
  const [postcodeError, setPostcodeError] = useState('')
  const [nearest, setNearest] = useState(null) // sorted array with distanceMiles, or null

  const findNearest = async (e) => {
    e.preventDefault()
    if (!postcode.trim()) return
    setPostcodeStatus('loading')
    setPostcodeError('')
    try {
      const { lat, lng } = await geocodeUkPostcode(postcode)
      const withDistance = flatTestCentres
        .filter((c) => typeof c.lat === 'number')
        .map((c) => ({ ...c, distance: distanceMiles(lat, lng, c.lat, c.lng) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
      setNearest(withDistance)
      setPostcodeStatus('idle')
    } catch (err) {
      setPostcodeStatus('error')
      setPostcodeError(err.message || 'Could not find that postcode — double-check it and try again.')
      setNearest(null)
    }
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return flatTestCentres
    return flatTestCentres.filter(
      (c) =>
        c.city.toLowerCase().includes(q) ||
        c.county.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
    )
  }, [query])

  const grouped = useMemo(() => {
    const map = new Map()
    results.forEach((c) => {
      if (!map.has(c.region)) map.set(c.region, [])
      map.get(c.region).push(c)
    })
    return Array.from(map.entries())
  }, [results])

  const requestCentre = (city) => {
    navigate(`/ecstestbooking?centre=${encodeURIComponent(city)}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Seo
        title="Find Your Nearest ECS Test Centre | ECSPrep"
        description="Search UK regions and cities where the ECS Health & Safety assessment is held, then request your nearest slot."
        path="/test-centre-finder"
      />

      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-blue-600" size={28} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Find Your Nearest ECS Test Centre</h1>
        <p className="text-slate-500 mt-2 max-w-xl mx-auto">
          Search by city, county or region to see where the ECS Health & Safety assessment is
          held near you, then request that centre when you book.
        </p>
      </div>

      {/* Postcode-based distance finder */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
        <h2 className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
          <Navigation size={16} className="text-blue-600" /> Find your nearest by postcode
        </h2>
        <form onSubmit={findNearest} className="flex flex-col sm:flex-row gap-2">
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            type="text"
            placeholder="Enter your UK postcode — e.g. SW1A 1AA"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 text-sm"
          />
          <button
            type="submit"
            disabled={postcodeStatus === 'loading'}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition"
          >
            {postcodeStatus === 'loading' ? <Loader2 size={15} className="animate-spin" /> : <Navigation size={15} />}
            {postcodeStatus === 'loading' ? 'Searching…' : 'Find nearest'}
          </button>
        </form>

        {postcodeStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-xs mt-3">
            <AlertCircle size={14} /> {postcodeError}
          </div>
        )}

        {nearest && (
          <div className="mt-4 space-y-2">
            {nearest.map((c, i) => (
              <div key={`${c.city}-${i}`} className="flex items-center justify-between gap-3 border border-slate-100 rounded-xl px-4 py-2.5">
                <div>
                  <div className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                    <MapPin size={13} className="text-blue-500 shrink-0" /> {c.city}
                    <span className="text-xs font-normal text-slate-400">{c.county}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    ~{c.distance.toFixed(1)} miles away{c.lessFrequent && <span className="ml-1 text-amber-600">· less frequent sittings</span>}
                  </div>
                </div>
                <button
                  onClick={() => requestCentre(c.city)}
                  className="shrink-0 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Request <ArrowRight size={12} />
                </button>
              </div>
            ))}
            <p className="text-xs text-slate-400 pt-1">Straight-line distance from your postcode — not driving distance.</p>
          </div>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Or browse by city, county or region — e.g. Manchester, Kent, London"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl px-4 py-3 text-sm flex items-start gap-2 mb-8">
        <Info size={18} className="mt-0.5 shrink-0" />
        <span>
          ECS books its Health &amp; Safety assessments by region rather than fixed venue
          addresses — call the ECS Assessment Administration team on{' '}
          <a href={`tel:${ECS_BOOKING_PHONE.replace(/\s/g, '')}`} className="font-semibold underline">
            {ECS_BOOKING_PHONE}
          </a>{' '}
          to confirm your exact venue, date and time once you know your nearest area below.
          There's also a Fast Track card + assessment option at Swanley, Kent — call{' '}
          <a href={`tel:${ECS_FAST_TRACK_PHONE.replace(/\s/g, '')}`} className="font-semibold underline">
            {ECS_FAST_TRACK_PHONE}
          </a>
          .
        </span>
      </div>

      {grouped.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          No matches for "{query}". Try a nearby city, county or region instead.
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([region, cities]) => (
            <div key={region} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h2 className="font-bold text-slate-900 mb-3">{region}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {cities.map((c) => (
                  <div
                    key={`${c.region}-${c.city}`}
                    className="flex items-center justify-between gap-3 border border-slate-100 rounded-xl px-4 py-3"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                        <MapPin size={14} className="text-blue-500 shrink-0" /> {c.city}
                      </div>
                      <div className="text-xs text-slate-400">
                        {c.county}
                        {c.lessFrequent && <span className="ml-1 text-amber-600">· less frequent sittings</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => requestCentre(c.city)}
                      className="shrink-0 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Request <ArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/ecstestbooking"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          <ClipboardCheck size={18} /> Book Your ECS Test
        </Link>
        <a
          href={`tel:${ECS_BOOKING_PHONE.replace(/\s/g, '')}`}
          className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition"
        >
          <Phone size={18} /> Call ECS Assessment Admin
        </a>
      </div>
    </div>
  )
}

export default TestCentreFinderPage
