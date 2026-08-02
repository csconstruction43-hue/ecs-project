// data/calculatorsData.js
// Electrician's Calculator Suite — 70+ tools covering Ohm's law, cable
// sizing, three-phase power, protection, lighting, renewables, unit
// conversion, testing/inspection, business pricing and heating.
//
// Every calculator is data-driven: { id, category, name, desc, inputs,
// compute(values), formula, note }. The CalculatorsPage / CalculatorRunner
// components render inputs generically and call compute() live.
//
// IMPORTANT: these tools give quick, practical estimates for site use and
// study purposes. For final circuit design, always verify against the
// current edition of BS 7671 and manufacturer data.

export const CALC_CATEGORIES = [
  { id: 'basic', name: 'Basic Electrical', icon: 'Zap', desc: "Ohm's law, power & resistance" },
  { id: 'cable', name: 'Cable & Conductor', icon: 'Cable', desc: 'Volt drop, sizing, Zs, adiabatic' },
  { id: 'three-phase', name: 'Three-Phase & Power', icon: 'Activity', desc: 'Power, current, motors, PF correction' },
  { id: 'protection', name: 'Circuit Protection', icon: 'ShieldCheck', desc: 'MCB, RCD, diversity, discrimination' },
  { id: 'lighting', name: 'Lighting', icon: 'Lightbulb', desc: 'Lux levels, luminaires, LED savings' },
  { id: 'renewables', name: 'Solar, EV & Renewables', icon: 'Sun', desc: 'Solar output, EV charging, battery backup' },
  { id: 'conversion', name: 'Unit Conversions', icon: 'ArrowLeftRight', desc: 'Quick unit-to-unit conversions' },
  { id: 'testing', name: 'Testing & Inspection', icon: 'ClipboardCheck', desc: 'IR, RCD trip time, ring final, PFC' },
  { id: 'business', name: 'Business & Pricing', icon: 'Wallet', desc: 'VAT, day rate, job costing, break-even' },
  { id: 'heating', name: 'Heating & Water', icon: 'Flame', desc: 'Immersion heaters, showers, elements' },
]

const n = (v, d = 0) => {
  const x = parseFloat(v)
  return Number.isFinite(x) ? x : d
}
const round = (x, dp = 2) => {
  if (!Number.isFinite(x)) return 0
  const f = Math.pow(10, dp)
  return Math.round(x * f) / f
}
const SQRT3 = Math.sqrt(3)

export const CALCULATORS = [
  // ───────────────────────── BASIC ELECTRICAL ─────────────────────────
  {
    id: 'ohms-voltage', category: 'basic', name: "Ohm's Law – Voltage", formula: 'V = I × R',
    desc: 'Find voltage from current and resistance',
    inputs: [{ key: 'i', label: 'Current', unit: 'A', type: 'number', default: 10 }, { key: 'r', label: 'Resistance', unit: 'Ω', type: 'number', default: 5 }],
    compute: (v) => [{ label: 'Voltage', value: round(n(v.i) * n(v.r)), unit: 'V', primary: true }],
  },
  {
    id: 'ohms-current', category: 'basic', name: "Ohm's Law – Current", formula: 'I = V ÷ R',
    desc: 'Find current from voltage and resistance',
    inputs: [{ key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }, { key: 'r', label: 'Resistance', unit: 'Ω', type: 'number', default: 23 }],
    compute: (v) => [{ label: 'Current', value: round(n(v.r) ? n(v.volt) / n(v.r) : 0), unit: 'A', primary: true }],
  },
  {
    id: 'ohms-resistance', category: 'basic', name: "Ohm's Law – Resistance", formula: 'R = V ÷ I',
    desc: 'Find resistance from voltage and current',
    inputs: [{ key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }, { key: 'i', label: 'Current', unit: 'A', type: 'number', default: 10 }],
    compute: (v) => [{ label: 'Resistance', value: round(n(v.i) ? n(v.volt) / n(v.i) : 0), unit: 'Ω', primary: true }],
  },
  {
    id: 'power-watts', category: 'basic', name: 'Power Calculator (P = V × I)', formula: 'P = V × I',
    desc: 'Find power from voltage and current',
    inputs: [{ key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }, { key: 'i', label: 'Current', unit: 'A', type: 'number', default: 10 }],
    compute: (v) => [{ label: 'Power', value: round(n(v.volt) * n(v.i)), unit: 'W', primary: true }],
  },
  {
    id: 'power-current', category: 'basic', name: 'Current from Power', formula: 'I = P ÷ V',
    desc: 'Find current draw from power and voltage',
    inputs: [{ key: 'p', label: 'Power', unit: 'W', type: 'number', default: 2300 }, { key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }],
    compute: (v) => [{ label: 'Current', value: round(n(v.volt) ? n(v.p) / n(v.volt) : 0), unit: 'A', primary: true }],
  },
  {
    id: 'power-voltage', category: 'basic', name: 'Voltage from Power', formula: 'V = P ÷ I',
    desc: 'Find required voltage from power and current',
    inputs: [{ key: 'p', label: 'Power', unit: 'W', type: 'number', default: 2300 }, { key: 'i', label: 'Current', unit: 'A', type: 'number', default: 10 }],
    compute: (v) => [{ label: 'Voltage', value: round(n(v.i) ? n(v.p) / n(v.i) : 0), unit: 'V', primary: true }],
  },
  {
    id: 'series-resistance', category: 'basic', name: 'Series Resistance', formula: 'RT = R1 + R2 + R3 + R4',
    desc: 'Total resistance of up to 4 resistors in series',
    inputs: [
      { key: 'r1', label: 'R1', unit: 'Ω', type: 'number', default: 10 }, { key: 'r2', label: 'R2', unit: 'Ω', type: 'number', default: 10 },
      { key: 'r3', label: 'R3 (optional)', unit: 'Ω', type: 'number', default: 0 }, { key: 'r4', label: 'R4 (optional)', unit: 'Ω', type: 'number', default: 0 },
    ],
    compute: (v) => [{ label: 'Total Resistance', value: round(n(v.r1) + n(v.r2) + n(v.r3) + n(v.r4)), unit: 'Ω', primary: true }],
  },
  {
    id: 'parallel-resistance-2', category: 'basic', name: 'Parallel Resistance (2 resistors)', formula: 'RT = (R1×R2) ÷ (R1+R2)',
    desc: 'Total resistance of two resistors in parallel',
    inputs: [{ key: 'r1', label: 'R1', unit: 'Ω', type: 'number', default: 10 }, { key: 'r2', label: 'R2', unit: 'Ω', type: 'number', default: 20 }],
    compute: (v) => { const s = n(v.r1) + n(v.r2); return [{ label: 'Total Resistance', value: round(s ? (n(v.r1) * n(v.r2)) / s : 0), unit: 'Ω', primary: true }] },
  },
  {
    id: 'parallel-resistance-multi', category: 'basic', name: 'Parallel Resistance (up to 4)', formula: '1/RT = 1/R1 + 1/R2 + 1/R3 + 1/R4',
    desc: 'Total resistance of up to 4 resistors in parallel',
    inputs: [
      { key: 'r1', label: 'R1', unit: 'Ω', type: 'number', default: 10 }, { key: 'r2', label: 'R2', unit: 'Ω', type: 'number', default: 20 },
      { key: 'r3', label: 'R3 (optional)', unit: 'Ω', type: 'number', default: 0 }, { key: 'r4', label: 'R4 (optional)', unit: 'Ω', type: 'number', default: 0 },
    ],
    compute: (v) => {
      const rs = [n(v.r1), n(v.r2), n(v.r3), n(v.r4)].filter((r) => r > 0)
      const sum = rs.reduce((a, r) => a + 1 / r, 0)
      return [{ label: 'Total Resistance', value: round(sum ? 1 / sum : 0), unit: 'Ω', primary: true }]
    },
  },
  {
    id: 'energy-cost', category: 'basic', name: 'Energy Cost Calculator', formula: 'Cost = kW × hours × rate',
    desc: 'Running cost of an appliance or load',
    inputs: [
      { key: 'kw', label: 'Load', unit: 'kW', type: 'number', default: 3 },
      { key: 'hours', label: 'Hours used', unit: 'hrs', type: 'number', default: 4 },
      { key: 'rate', label: 'Rate', unit: 'p/kWh', type: 'number', default: 27 },
    ],
    compute: (v) => {
      const kwh = n(v.kw) * n(v.hours)
      return [
        { label: 'Energy used', value: round(kwh), unit: 'kWh' },
        { label: 'Cost', value: round((kwh * n(v.rate)) / 100), unit: '£', primary: true },
      ]
    },
  },

  // ───────────────────────── CABLE & CONDUCTOR ─────────────────────────
  {
    id: 'voltage-drop-single', category: 'cable', name: 'Voltage Drop (Single-Phase)', formula: 'Vd = (mV/A/m × I × L) ÷ 1000',
    desc: 'Volt drop for a single-phase circuit from cable tables (mV/A/m)',
    inputs: [
      { key: 'mvam', label: 'Cable mV/A/m', unit: 'mV/A/m', type: 'number', default: 18, hint: 'From BS 7671 Appx 4 cable tables' },
      { key: 'i', label: 'Design Current', unit: 'A', type: 'number', default: 20 },
      { key: 'l', label: 'Cable Length', unit: 'm', type: 'number', default: 15 },
      { key: 'volt', label: 'Supply Voltage', unit: 'V', type: 'number', default: 230 },
    ],
    compute: (v) => {
      const vd = (n(v.mvam) * n(v.i) * n(v.l)) / 1000
      return [
        { label: 'Voltage Drop', value: round(vd), unit: 'V', primary: true },
        { label: '% of Supply', value: round((vd / n(v.volt || 230)) * 100), unit: '%' },
      ]
    },
    note: 'BS 7671 max is 3% for lighting, 5% for other uses (typical UK single-phase supply).',
  },
  {
    id: 'voltage-drop-three', category: 'cable', name: 'Voltage Drop (Three-Phase)', formula: 'Vd = (mV/A/m × I × L) ÷ 1000',
    desc: 'Volt drop for a three-phase circuit (uses 3-phase mV/A/m table value)',
    inputs: [
      { key: 'mvam', label: 'Cable mV/A/m (3ph)', unit: 'mV/A/m', type: 'number', default: 8 },
      { key: 'i', label: 'Design Current', unit: 'A', type: 'number', default: 32 },
      { key: 'l', label: 'Cable Length', unit: 'm', type: 'number', default: 25 },
      { key: 'volt', label: 'Line Voltage', unit: 'V', type: 'number', default: 400 },
    ],
    compute: (v) => {
      const vd = (n(v.mvam) * n(v.i) * n(v.l)) / 1000
      return [
        { label: 'Voltage Drop', value: round(vd), unit: 'V', primary: true },
        { label: '% of Supply', value: round((vd / n(v.volt || 400)) * 100), unit: '%' },
      ]
    },
  },
  {
    id: 'max-cable-length', category: 'cable', name: 'Maximum Cable Length (for Vd limit)', formula: 'L = (Vd_max × 1000) ÷ (mV/A/m × I)',
    desc: 'Longest run allowed before exceeding a target volt drop %',
    inputs: [
      { key: 'volt', label: 'Supply Voltage', unit: 'V', type: 'number', default: 230 },
      { key: 'pct', label: 'Max Allowed Drop', unit: '%', type: 'number', default: 3 },
      { key: 'mvam', label: 'Cable mV/A/m', unit: 'mV/A/m', type: 'number', default: 18 },
      { key: 'i', label: 'Design Current', unit: 'A', type: 'number', default: 20 },
    ],
    compute: (v) => {
      const vdMax = (n(v.volt) * n(v.pct)) / 100
      const denom = n(v.mvam) * n(v.i)
      return [{ label: 'Maximum Length', value: round(denom ? (vdMax * 1000) / denom : 0), unit: 'm', primary: true }]
    },
  },
  {
    id: 'cable-resistance', category: 'cable', name: 'Cable Resistance', formula: 'R = (ρ × L) ÷ CSA',
    desc: 'Resistance of a single conductor run',
    inputs: [
      { key: 'rho', label: 'Resistivity', unit: 'Ω·mm²/m', type: 'select', default: '0.0175', options: [{ value: '0.0175', label: 'Copper (0.0175)' }, { value: '0.0282', label: 'Aluminium (0.0282)' }] },
      { key: 'l', label: 'Length', unit: 'm', type: 'number', default: 20 },
      { key: 'csa', label: 'Conductor CSA', unit: 'mm²', type: 'number', default: 2.5 },
    ],
    compute: (v) => [{ label: 'Resistance', value: round(n(v.csa) ? (n(v.rho) * n(v.l)) / n(v.csa) : 0, 4), unit: 'Ω', primary: true }],
  },
  {
    id: 'r1-r2-total', category: 'cable', name: 'R1 + R2 Loop Resistance', formula: '(R1 + R2) total',
    desc: 'Add line and cpc conductor resistances for loop calculations',
    inputs: [{ key: 'r1', label: 'R1 (line)', unit: 'Ω', type: 'number', default: 0.3 }, { key: 'r2', label: 'R2 (cpc)', unit: 'Ω', type: 'number', default: 0.5 }],
    compute: (v) => [{ label: 'R1 + R2', value: round(n(v.r1) + n(v.r2), 3), unit: 'Ω', primary: true }],
  },
  {
    id: 'zs-calculator', category: 'cable', name: 'Earth Fault Loop Impedance (Zs)', formula: 'Zs = Ze + (R1 + R2)',
    desc: 'Calculate Zs and optionally check it against a max tabulated value',
    inputs: [
      { key: 'ze', label: 'Ze', unit: 'Ω', type: 'number', default: 0.35 },
      { key: 'r1r2', label: 'R1 + R2', unit: 'Ω', type: 'number', default: 0.8 },
      { key: 'zsmax', label: 'Max Zs allowed (optional)', unit: 'Ω', type: 'number', default: 0 },
    ],
    compute: (v) => {
      const zs = n(v.ze) + n(v.r1r2)
      const rows = [{ label: 'Zs', value: round(zs, 3), unit: 'Ω', primary: true }]
      if (n(v.zsmax) > 0) rows.push({ label: 'Compliance', value: zs <= n(v.zsmax) ? 'PASS' : 'FAIL', unit: '' })
      return rows
    },
  },
  {
    id: 'adiabatic-csa', category: 'cable', name: 'Adiabatic Equation (Min CSA)', formula: 'S = √(I² × t) ÷ k',
    desc: 'Minimum protective conductor CSA for a fault',
    inputs: [
      { key: 'i', label: 'Fault Current', unit: 'A', type: 'number', default: 500 },
      { key: 't', label: 'Disconnection Time', unit: 's', type: 'number', default: 0.4 },
      { key: 'k', label: 'k factor', unit: '', type: 'select', default: '115', options: [{ value: '115', label: 'Copper, 70°C thermoplastic (115)' }, { value: '143', label: 'Copper, 90°C thermosetting (143)' }, { value: '76', label: 'Aluminium, 70°C (76)' }] },
    ],
    compute: (v) => [{ label: 'Minimum CSA', value: round(n(v.k) ? Math.sqrt(n(v.i) * n(v.i) * n(v.t)) / n(v.k) : 0, 3), unit: 'mm²', primary: true }],
  },
  {
    id: 'conduit-fill', category: 'cable', name: 'Conduit Fill Calculator', formula: 'Fill % = (ΣCable CSA ÷ Conduit Area) × 100',
    desc: 'Check conduit isn\u2019t overfilled (guide: keep under ~40%)',
    inputs: [{ key: 'conduit', label: 'Conduit Internal Area', unit: 'mm²', type: 'number', default: 385 }, { key: 'cables', label: 'Total Cable CSA', unit: 'mm²', type: 'number', default: 120 }],
    compute: (v) => {
      const pct = n(v.conduit) ? (n(v.cables) / n(v.conduit)) * 100 : 0
      return [{ label: 'Fill', value: round(pct), unit: '%', primary: true }, { label: 'Guide', value: pct <= 40 ? 'OK (≤40%)' : 'Over guide — resize', unit: '' }]
    },
  },
  {
    id: 'trunking-fill', category: 'cable', name: 'Trunking Fill Calculator', formula: 'Fill % = (ΣCable CSA ÷ Trunking Area) × 100',
    desc: 'Check trunking space factor (guide: keep under ~45%)',
    inputs: [{ key: 'trunking', label: 'Trunking Internal Area', unit: 'mm²', type: 'number', default: 1000 }, { key: 'cables', label: 'Total Cable CSA', unit: 'mm²', type: 'number', default: 350 }],
    compute: (v) => {
      const pct = n(v.trunking) ? (n(v.cables) / n(v.trunking)) * 100 : 0
      return [{ label: 'Fill', value: round(pct), unit: '%', primary: true }, { label: 'Guide', value: pct <= 45 ? 'OK (≤45%)' : 'Over guide — resize', unit: '' }]
    },
  },
  {
    id: 'derating-factor', category: 'cable', name: 'Cable Derating (Ct × Cg × Ci)', formula: 'It = In ÷ (Cg × Ct × Ci)',
    desc: 'Required tabulated current-carrying capacity after correction factors',
    inputs: [
      { key: 'in', label: 'Design Current (In)', unit: 'A', type: 'number', default: 32 },
      { key: 'cg', label: 'Grouping factor Cg', unit: '', type: 'number', default: 0.8 },
      { key: 'ct', label: 'Ambient temp factor Ct', unit: '', type: 'number', default: 1.0 },
      { key: 'ci', label: 'Insulation factor Ci', unit: '', type: 'number', default: 1.0 },
    ],
    compute: (v) => { const prod = n(v.cg) * n(v.ct) * n(v.ci); return [{ label: 'Required It (tabulated)', value: round(prod ? n(v.in) / prod : 0), unit: 'A', primary: true }] },
  },
  {
    id: 'pfc-calculator', category: 'cable', name: 'Prospective Fault Current (PFC)', formula: 'PFC = V ÷ Zs',
    desc: 'Estimate prospective fault current from Zs',
    inputs: [{ key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }, { key: 'zs', label: 'Zs', unit: 'Ω', type: 'number', default: 0.8 }],
    compute: (v) => [{ label: 'PFC', value: round(n(v.zs) ? n(v.volt) / n(v.zs) : 0), unit: 'A', primary: true }],
  },
  {
    id: 'disconnection-time-check', category: 'cable', name: 'Zs Compliance Check', formula: 'Zs measured ≤ Zs max (tabulated)',
    desc: 'Quick pass/fail against the max Zs for the protective device',
    inputs: [{ key: 'measured', label: 'Measured Zs', unit: 'Ω', type: 'number', default: 0.9 }, { key: 'tabulated', label: 'Tabulated Max Zs', unit: 'Ω', type: 'number', default: 1.09 }],
    compute: (v) => [{ label: 'Result', value: n(v.measured) <= n(v.tabulated) ? 'PASS' : 'FAIL', unit: '', primary: true }, { label: 'Margin', value: round(n(v.tabulated) - n(v.measured), 3), unit: 'Ω' }],
  },

  // ───────────────────────── THREE-PHASE & POWER ─────────────────────────
  {
    id: 'three-phase-power', category: 'three-phase', name: 'Three-Phase Power', formula: 'P = √3 × V × I × PF',
    desc: 'Real power of a balanced three-phase load',
    inputs: [{ key: 'volt', label: 'Line Voltage', unit: 'V', type: 'number', default: 400 }, { key: 'i', label: 'Line Current', unit: 'A', type: 'number', default: 20 }, { key: 'pf', label: 'Power Factor', unit: '', type: 'number', default: 0.9 }],
    compute: (v) => [{ label: 'Power', value: round((SQRT3 * n(v.volt) * n(v.i) * n(v.pf)) / 1000), unit: 'kW', primary: true }],
  },
  {
    id: 'three-phase-current', category: 'three-phase', name: 'Three-Phase Current', formula: 'I = P ÷ (√3 × V × PF)',
    desc: 'Line current drawn by a balanced three-phase load',
    inputs: [{ key: 'p', label: 'Power', unit: 'kW', type: 'number', default: 15 }, { key: 'volt', label: 'Line Voltage', unit: 'V', type: 'number', default: 400 }, { key: 'pf', label: 'Power Factor', unit: '', type: 'number', default: 0.9 }],
    compute: (v) => { const d = SQRT3 * n(v.volt) * n(v.pf); return [{ label: 'Current', value: round(d ? (n(v.p) * 1000) / d : 0), unit: 'A', primary: true }] },
  },
  {
    id: 'kva-kw', category: 'three-phase', name: 'kVA → kW', formula: 'kW = kVA × PF',
    desc: 'Convert apparent power to real power',
    inputs: [{ key: 'kva', label: 'Apparent Power', unit: 'kVA', type: 'number', default: 10 }, { key: 'pf', label: 'Power Factor', unit: '', type: 'number', default: 0.9 }],
    compute: (v) => [{ label: 'Real Power', value: round(n(v.kva) * n(v.pf)), unit: 'kW', primary: true }],
  },
  {
    id: 'kw-kva', category: 'three-phase', name: 'kW → kVA', formula: 'kVA = kW ÷ PF',
    desc: 'Convert real power to apparent power',
    inputs: [{ key: 'kw', label: 'Real Power', unit: 'kW', type: 'number', default: 9 }, { key: 'pf', label: 'Power Factor', unit: '', type: 'number', default: 0.9 }],
    compute: (v) => [{ label: 'Apparent Power', value: round(n(v.pf) ? n(v.kw) / n(v.pf) : 0), unit: 'kVA', primary: true }],
  },
  {
    id: 'line-to-phase', category: 'three-phase', name: 'Line → Phase Voltage', formula: 'Vphase = Vline ÷ √3',
    desc: 'Convert line (line-to-line) voltage to phase voltage',
    inputs: [{ key: 'vline', label: 'Line Voltage', unit: 'V', type: 'number', default: 400 }],
    compute: (v) => [{ label: 'Phase Voltage', value: round(n(v.vline) / SQRT3), unit: 'V', primary: true }],
  },
  {
    id: 'phase-to-line', category: 'three-phase', name: 'Phase → Line Voltage', formula: 'Vline = Vphase × √3',
    desc: 'Convert phase voltage to line (line-to-line) voltage',
    inputs: [{ key: 'vphase', label: 'Phase Voltage', unit: 'V', type: 'number', default: 230 }],
    compute: (v) => [{ label: 'Line Voltage', value: round(n(v.vphase) * SQRT3), unit: 'V', primary: true }],
  },
  {
    id: 'motor-fla', category: 'three-phase', name: 'Motor Full-Load Current', formula: 'FLC = (P × 1000) ÷ (√3 × V × PF × η)',
    desc: 'Estimate full-load current of a three-phase motor',
    inputs: [
      { key: 'p', label: 'Motor Power', unit: 'kW', type: 'number', default: 7.5 },
      { key: 'volt', label: 'Line Voltage', unit: 'V', type: 'number', default: 400 },
      { key: 'pf', label: 'Power Factor', unit: '', type: 'number', default: 0.85 },
      { key: 'eff', label: 'Efficiency', unit: '%', type: 'number', default: 90 },
    ],
    compute: (v) => { const d = SQRT3 * n(v.volt) * n(v.pf) * (n(v.eff) / 100); return [{ label: 'Full-Load Current', value: round(d ? (n(v.p) * 1000) / d : 0), unit: 'A', primary: true }] },
  },
  {
    id: 'motor-starting-current', category: 'three-phase', name: 'Motor Starting Current', formula: 'Istart = FLC × multiplier',
    desc: 'Estimate starting current for DOL / star-delta starting',
    inputs: [
      { key: 'flc', label: 'Full-Load Current', unit: 'A', type: 'number', default: 15 },
      { key: 'method', label: 'Starting Method', unit: '', type: 'select', default: '7', options: [{ value: '7', label: 'DOL (~7×)' }, { value: '2.5', label: 'Star-Delta (~2.5×)' }, { value: '4', label: 'Soft Starter (~4×)' }] },
    ],
    compute: (v) => [{ label: 'Starting Current', value: round(n(v.flc) * n(v.method)), unit: 'A', primary: true }],
  },
  {
    id: 'pf-correction-capacitor', category: 'three-phase', name: 'Power Factor Correction', formula: 'kVAR = kW × (tanφ1 − tanφ2)',
    desc: 'Reactive power (kVAR) needed to correct power factor',
    inputs: [
      { key: 'kw', label: 'Load', unit: 'kW', type: 'number', default: 20 },
      { key: 'pf1', label: 'Current PF', unit: '', type: 'number', default: 0.75 },
      { key: 'pf2', label: 'Target PF', unit: '', type: 'number', default: 0.95 },
    ],
    compute: (v) => {
      const tan1 = Math.tan(Math.acos(n(v.pf1)))
      const tan2 = Math.tan(Math.acos(n(v.pf2)))
      return [{ label: 'Capacitor Rating Needed', value: round(n(v.kw) * (tan1 - tan2)), unit: 'kVAR', primary: true }]
    },
  },
  {
    id: 'unbalanced-load-check', category: 'three-phase', name: 'Phase Load Balance Check', formula: 'Imbalance % = (max − min) ÷ average × 100',
    desc: 'Check how balanced three-phase loading is across L1/L2/L3',
    inputs: [{ key: 'l1', label: 'L1 Current', unit: 'A', type: 'number', default: 18 }, { key: 'l2', label: 'L2 Current', unit: 'A', type: 'number', default: 22 }, { key: 'l3', label: 'L3 Current', unit: 'A', type: 'number', default: 20 }],
    compute: (v) => {
      const arr = [n(v.l1), n(v.l2), n(v.l3)]
      const avg = arr.reduce((a, b) => a + b, 0) / 3
      const pct = avg ? ((Math.max(...arr) - Math.min(...arr)) / avg) * 100 : 0
      return [{ label: 'Imbalance', value: round(pct), unit: '%', primary: true }, { label: 'Guide', value: pct <= 10 ? 'OK (≤10%)' : 'Rebalance recommended', unit: '' }]
    },
  },

  // ───────────────────────── CIRCUIT PROTECTION ─────────────────────────
  {
    id: 'mcb-selector', category: 'protection', name: 'MCB Rating Selector', formula: 'In ≥ Ib, next standard size',
    desc: 'Suggest the smallest standard MCB rating above the design current',
    inputs: [{ key: 'ib', label: 'Design Current (Ib)', unit: 'A', type: 'number', default: 27 }],
    compute: (v) => {
      const std = [6, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100]
      const pick = std.find((s) => s >= n(v.ib)) || std[std.length - 1]
      return [{ label: 'Recommended MCB', value: pick, unit: 'A', primary: true }]
    },
  },
  {
    id: 'rcd-selector', category: 'protection', name: 'RCD Rating Guide', formula: 'By circuit type (BS 7671 guidance)',
    desc: 'Typical RCD sensitivity for common circuit types',
    inputs: [{ key: 'type', label: 'Circuit Type', unit: '', type: 'select', default: 'socket', options: [{ value: 'socket', label: 'General socket outlets ≤32A' }, { value: 'bathroom', label: 'Bathroom / special locations' }, { value: 'outdoor', label: 'Outdoor equipment / garden' }, { value: 'fire', label: 'Fire alarm / life safety' }] },
    ],
    compute: (v) => {
      const map = { socket: '30 mA', bathroom: '30 mA', outdoor: '30 mA', fire: '100–300 mA (time-delayed, per design)' }
      return [{ label: 'Typical RCD Rating', value: map[v.type] || '30 mA', unit: '', primary: true }]
    },
  },
  {
    id: 'diversity-domestic', category: 'protection', name: 'Domestic Diversity (simplified)', formula: 'IET On-Site Guide simplified allowances',
    desc: 'Rough assessed max demand for a domestic installation',
    inputs: [
      { key: 'lighting', label: 'Lighting Load', unit: 'W', type: 'number', default: 1000 },
      { key: 'sockets', label: 'Socket Circuits Load', unit: 'W', type: 'number', default: 6000 },
      { key: 'cooker', label: 'Cooker Rating', unit: 'W', type: 'number', default: 8000 },
      { key: 'shower', label: 'Shower Rating', unit: 'W', type: 'number', default: 8500 },
    ],
    compute: (v) => {
      const light = n(v.lighting) * 0.66
      const sock = 10000 + (n(v.sockets) > 10000 ? (n(v.sockets) - 10000) * 0.4 : n(v.sockets))
      const cooker = 10000 * 0.1 + n(v.cooker) * 0 + Math.min(n(v.cooker), 10000) * 0.1 + 5000 // simplified: 10A + 30% of remainder + 5A, approximated in W
      const shower = n(v.shower)
      const totalW = light + Math.min(sock, n(v.sockets)) + Math.min(cooker, n(v.cooker) + 5000) + shower
      return [
        { label: 'Assessed Max Demand (approx)', value: round(totalW / 1000, 2), unit: 'kW', primary: true },
        { label: 'Approx Current @230V', value: round(totalW / 230), unit: 'A' },
      ]
    },
    note: 'Simplified guide only — use IET On-Site Guide Table H1 for a proper diversity assessment.',
  },
  {
    id: 'max-demand-simple', category: 'protection', name: 'Max Demand (Connected × Diversity)', formula: 'Max Demand = Connected Load × Diversity Factor',
    desc: 'Quick max demand from total connected load and a diversity factor',
    inputs: [{ key: 'connected', label: 'Connected Load', unit: 'kW', type: 'number', default: 25 }, { key: 'df', label: 'Diversity Factor', unit: '', type: 'number', default: 0.6 }, { key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }],
    compute: (v) => {
      const kw = n(v.connected) * n(v.df)
      return [{ label: 'Max Demand', value: round(kw), unit: 'kW', primary: true }, { label: 'Approx Current', value: round((kw * 1000) / n(v.volt || 230)), unit: 'A' }]
    },
  },
  {
    id: 'discrimination-check', category: 'protection', name: 'Discrimination (Selectivity) Check', formula: 'Guide: upstream ÷ downstream ≥ 1.6',
    desc: 'Quick check whether two series devices are likely to discriminate',
    inputs: [{ key: 'up', label: 'Upstream Device Rating', unit: 'A', type: 'number', default: 100 }, { key: 'down', label: 'Downstream Device Rating', unit: 'A', type: 'number', default: 32 }],
    compute: (v) => {
      const ratio = n(v.down) ? n(v.up) / n(v.down) : 0
      return [{ label: 'Ratio', value: round(ratio), unit: '×', primary: true }, { label: 'Guide', value: ratio >= 1.6 ? 'Likely discriminates (≥1.6)' : 'Check manufacturer curves', unit: '' }]
    },
    note: 'A rule-of-thumb only — always confirm with manufacturer discrimination tables.',
  },
  {
    id: 'trip-time-estimate', category: 'protection', name: 'MCB Trip Time Guide (curve type)', formula: 'BS EN 60898 curve multiples',
    desc: 'Typical instantaneous trip multiple for B/C/D curve MCBs',
    inputs: [{ key: 'curve', label: 'MCB Curve', unit: '', type: 'select', default: 'B', options: [{ value: 'B', label: 'Type B (3–5×In)' }, { value: 'C', label: 'Type C (5–10×In)' }, { value: 'D', label: 'Type D (10–20×In)' }] }],
    compute: (v) => {
      const map = { B: '3–5 × In', C: '5–10 × In', D: '10–20 × In' }
      return [{ label: 'Instantaneous Trip Range', value: map[v.curve], unit: '', primary: true }]
    },
  },

  // ───────────────────────── LIGHTING ─────────────────────────
  {
    id: 'lumen-method', category: 'lighting', name: 'Number of Luminaires Needed', formula: 'N = (Lux × Area) ÷ (Lumens × UF × MF)',
    desc: 'Lumen method — how many fittings to reach a target lux level',
    inputs: [
      { key: 'lux', label: 'Target Illuminance', unit: 'lux', type: 'number', default: 300 },
      { key: 'area', label: 'Room Area', unit: 'm²', type: 'number', default: 20 },
      { key: 'lumens', label: 'Lumens per Fitting', unit: 'lm', type: 'number', default: 3400 },
      { key: 'uf', label: 'Utilisation Factor', unit: '', type: 'number', default: 0.6 },
      { key: 'mf', label: 'Maintenance Factor', unit: '', type: 'number', default: 0.8 },
    ],
    compute: (v) => {
      const denom = n(v.lumens) * n(v.uf) * n(v.mf)
      return [{ label: 'Luminaires Needed', value: Math.ceil(denom ? (n(v.lux) * n(v.area)) / denom : 0), unit: 'fittings', primary: true }]
    },
  },
  {
    id: 'resulting-lux', category: 'lighting', name: 'Resulting Lux Level', formula: 'Lux = (N × Lumens × UF × MF) ÷ Area',
    desc: 'Check the lux level a given number of fittings will achieve',
    inputs: [
      { key: 'count', label: 'Number of Fittings', unit: '', type: 'number', default: 12 },
      { key: 'lumens', label: 'Lumens per Fitting', unit: 'lm', type: 'number', default: 3400 },
      { key: 'uf', label: 'Utilisation Factor', unit: '', type: 'number', default: 0.6 },
      { key: 'mf', label: 'Maintenance Factor', unit: '', type: 'number', default: 0.8 },
      { key: 'area', label: 'Room Area', unit: 'm²', type: 'number', default: 20 },
    ],
    compute: (v) => [{ label: 'Resulting Lux', value: round(n(v.area) ? (n(v.count) * n(v.lumens) * n(v.uf) * n(v.mf)) / n(v.area) : 0), unit: 'lux', primary: true }],
  },
  {
    id: 'led-equivalent', category: 'lighting', name: 'LED Wattage Equivalent', formula: 'Approx conversion vs incandescent',
    desc: 'Roughly convert an old incandescent/halogen wattage to LED wattage',
    inputs: [{ key: 'watts', label: 'Incandescent/Halogen Power', unit: 'W', type: 'number', default: 60 }],
    compute: (v) => [{ label: 'Approx LED Equivalent', value: round(n(v.watts) / 7.5), unit: 'W', primary: true }],
    note: 'Rule of thumb: LED uses roughly 1/7–1/8th the wattage for the same light output.',
  },
  {
    id: 'lighting-circuit-load', category: 'lighting', name: 'Lighting Circuit Design Current', formula: 'Ib = (ΣWatts ÷ V) × 0.66 (diversity)',
    desc: 'Design current for a lighting circuit with typical 66% diversity',
    inputs: [{ key: 'watts', label: 'Total Connected Lighting Load', unit: 'W', type: 'number', default: 1500 }, { key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }],
    compute: (v) => [{ label: 'Design Current', value: round(n(v.volt) ? (n(v.watts) / n(v.volt)) * 0.66 : 0), unit: 'A', primary: true }],
  },
  {
    id: 'led-savings', category: 'lighting', name: 'LED Upgrade Savings', formula: 'Saving = (Wold − Wnew) × hrs/day × 365 × rate',
    desc: 'Annual saving from switching a fitting to LED',
    inputs: [
      { key: 'wold', label: 'Old Fitting Power', unit: 'W', type: 'number', default: 60 },
      { key: 'wnew', label: 'New LED Power', unit: 'W', type: 'number', default: 8 },
      { key: 'hours', label: 'Hours per Day', unit: 'hrs', type: 'number', default: 5 },
      { key: 'rate', label: 'Rate', unit: 'p/kWh', type: 'number', default: 27 },
    ],
    compute: (v) => {
      const savingKwhYear = ((n(v.wold) - n(v.wnew)) / 1000) * n(v.hours) * 365
      return [{ label: 'Annual Saving', value: round((savingKwhYear * n(v.rate)) / 100), unit: '£', primary: true }, { label: 'Energy Saved / yr', value: round(savingKwhYear), unit: 'kWh' }]
    },
  },

  // ───────────────────────── SOLAR, EV & RENEWABLES ─────────────────────────
  {
    id: 'solar-output', category: 'renewables', name: 'Solar Panel Daily Output', formula: 'kWh = kWp × sun hours × efficiency',
    desc: 'Estimate daily/annual output of a solar PV array',
    inputs: [{ key: 'kwp', label: 'Array Size', unit: 'kWp', type: 'number', default: 4 }, { key: 'hours', label: 'Peak Sun Hours', unit: 'hrs/day', type: 'number', default: 3.2 }, { key: 'eff', label: 'System Efficiency', unit: '%', type: 'number', default: 85 }],
    compute: (v) => {
      const daily = n(v.kwp) * n(v.hours) * (n(v.eff) / 100)
      return [{ label: 'Daily Output', value: round(daily), unit: 'kWh', primary: true }, { label: 'Annual Output (approx)', value: round(daily * 365), unit: 'kWh' }]
    },
  },
  {
    id: 'solar-cable-size', category: 'renewables', name: 'Solar DC Cable Volt Drop', formula: 'Vd = (mV/A/m × I × L) ÷ 1000 (target ≤1%)',
    desc: 'Check DC string cable volt drop against the ~1% MCS guide',
    inputs: [{ key: 'mvam', label: 'Cable mV/A/m', unit: 'mV/A/m', type: 'number', default: 15 }, { key: 'i', label: 'String Current', unit: 'A', type: 'number', default: 10 }, { key: 'l', label: 'One-Way Length', unit: 'm', type: 'number', default: 15 }, { key: 'volt', label: 'System Voltage', unit: 'V', type: 'number', default: 400 }],
    compute: (v) => {
      const vd = (n(v.mvam) * n(v.i) * (n(v.l) * 2)) / 1000
      const pct = n(v.volt) ? (vd / n(v.volt)) * 100 : 0
      return [{ label: 'Volt Drop', value: round(vd), unit: 'V', primary: true }, { label: '% of System Voltage', value: round(pct), unit: '%' }, { label: 'MCS Guide', value: pct <= 1 ? 'OK (≤1%)' : 'Consider larger CSA', unit: '' }]
    },
  },
  {
    id: 'battery-backup-time', category: 'renewables', name: 'Battery Backup Time', formula: 'Hours = Usable Capacity ÷ Load',
    desc: 'Estimate how long a battery will run a load',
    inputs: [{ key: 'kwh', label: 'Usable Battery Capacity', unit: 'kWh', type: 'number', default: 5 }, { key: 'load', label: 'Load', unit: 'kW', type: 'number', default: 1 }],
    compute: (v) => [{ label: 'Backup Time', value: round(n(v.load) ? n(v.kwh) / n(v.load) : 0), unit: 'hrs', primary: true }],
  },
  {
    id: 'ev-cable-size', category: 'renewables', name: 'EV Charger Circuit Current', formula: 'I = P ÷ V (single) or P ÷ (√3×V) (3ph)',
    desc: 'Design current for an EV charger circuit',
    inputs: [{ key: 'p', label: 'Charger Power', unit: 'kW', type: 'number', default: 7.4 }, { key: 'phase', label: 'Supply', unit: '', type: 'select', default: '1', options: [{ value: '1', label: 'Single-Phase 230V' }, { value: '3', label: 'Three-Phase 400V' }] }],
    compute: (v) => {
      const i = v.phase === '3' ? (n(v.p) * 1000) / (SQRT3 * 400) : (n(v.p) * 1000) / 230
      return [{ label: 'Design Current', value: round(i), unit: 'A', primary: true }]
    },
  },
  {
    id: 'ev-charge-time', category: 'renewables', name: 'EV Charge Time', formula: 'Time = Capacity ÷ Charger Power',
    desc: 'Estimate charge time from empty to full',
    inputs: [{ key: 'battery', label: 'Battery Capacity', unit: 'kWh', type: 'number', default: 60 }, { key: 'charger', label: 'Charger Power', unit: 'kW', type: 'number', default: 7.4 }, { key: 'from', label: 'Starting Charge', unit: '%', type: 'number', default: 20 }],
    compute: (v) => {
      const need = n(v.battery) * (1 - n(v.from) / 100)
      return [{ label: 'Charge Time', value: round(n(v.charger) ? need / n(v.charger) : 0), unit: 'hrs', primary: true }]
    },
  },
  {
    id: 'inverter-sizing', category: 'renewables', name: 'Inverter Sizing', formula: 'VA = Connected Load × Surge Factor',
    desc: 'Rough inverter VA rating for a set of loads',
    inputs: [{ key: 'watts', label: 'Total Connected Load', unit: 'W', type: 'number', default: 1500 }, { key: 'surge', label: 'Surge/Safety Factor', unit: '×', type: 'number', default: 1.25 }],
    compute: (v) => [{ label: 'Recommended Inverter Size', value: round(n(v.watts) * n(v.surge)), unit: 'VA', primary: true }],
  },

  // ───────────────────────── UNIT CONVERSIONS ─────────────────────────
  {
    id: 'kw-hp', category: 'conversion', name: 'kW → HP', formula: 'HP = kW × 1.341',
    desc: 'Convert kilowatts to horsepower',
    inputs: [{ key: 'kw', label: 'Power', unit: 'kW', type: 'number', default: 5 }],
    compute: (v) => [{ label: 'Horsepower', value: round(n(v.kw) * 1.341), unit: 'HP', primary: true }],
  },
  {
    id: 'hp-kw', category: 'conversion', name: 'HP → kW', formula: 'kW = HP ÷ 1.341',
    desc: 'Convert horsepower to kilowatts',
    inputs: [{ key: 'hp', label: 'Horsepower', unit: 'HP', type: 'number', default: 5 }],
    compute: (v) => [{ label: 'Power', value: round(n(v.hp) / 1.341), unit: 'kW', primary: true }],
  },
  {
    id: 'amps-to-kw', category: 'conversion', name: 'Amps → kW', formula: 'kW = (V × I × PF) ÷ 1000',
    desc: 'Quick convert current draw to power',
    inputs: [{ key: 'i', label: 'Current', unit: 'A', type: 'number', default: 13 }, { key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }, { key: 'pf', label: 'Power Factor', unit: '', type: 'number', default: 1 }],
    compute: (v) => [{ label: 'Power', value: round((n(v.i) * n(v.volt) * n(v.pf)) / 1000), unit: 'kW', primary: true }],
  },
  {
    id: 'celsius-fahrenheit', category: 'conversion', name: 'Celsius → Fahrenheit', formula: 'F = C × 9/5 + 32',
    desc: 'Temperature conversion',
    inputs: [{ key: 'c', label: 'Celsius', unit: '°C', type: 'number', default: 20 }],
    compute: (v) => [{ label: 'Fahrenheit', value: round(n(v.c) * (9 / 5) + 32), unit: '°F', primary: true }],
  },
  {
    id: 'fahrenheit-celsius', category: 'conversion', name: 'Fahrenheit → Celsius', formula: 'C = (F − 32) × 5/9',
    desc: 'Temperature conversion',
    inputs: [{ key: 'f', label: 'Fahrenheit', unit: '°F', type: 'number', default: 68 }],
    compute: (v) => [{ label: 'Celsius', value: round((n(v.f) - 32) * (5 / 9)), unit: '°C', primary: true }],
  },
  {
    id: 'mm2-awg', category: 'conversion', name: 'mm² → Nearest AWG', formula: 'Lookup table',
    desc: 'Find the nearest American Wire Gauge for a metric conductor size',
    inputs: [{ key: 'mm2', label: 'Cable CSA', unit: 'mm²', type: 'select', default: '2.5', options: [
      { value: '0.5', label: '0.5 mm²' }, { value: '1', label: '1.0 mm²' }, { value: '1.5', label: '1.5 mm²' }, { value: '2.5', label: '2.5 mm²' },
      { value: '4', label: '4 mm²' }, { value: '6', label: '6 mm²' }, { value: '10', label: '10 mm²' }, { value: '16', label: '16 mm²' }, { value: '25', label: '25 mm²' }, { value: '35', label: '35 mm²' },
    ] }],
    compute: (v) => {
      const map = { '0.5': '20 AWG', '1': '17 AWG', '1.5': '16 AWG', '2.5': '14 AWG', '4': '12 AWG', '6': '10 AWG', '10': '8 AWG', '16': '6 AWG', '25': '4 AWG', '35': '2 AWG' }
      return [{ label: 'Nearest AWG', value: map[v.mm2] || '—', unit: '', primary: true }]
    },
  },
  {
    id: 'joules-kwh', category: 'conversion', name: 'Joules → kWh', formula: 'kWh = J ÷ 3,600,000',
    desc: 'Convert joules to kilowatt-hours',
    inputs: [{ key: 'j', label: 'Energy', unit: 'J', type: 'number', default: 3600000 }],
    compute: (v) => [{ label: 'Energy', value: round(n(v.j) / 3600000, 4), unit: 'kWh', primary: true }],
  },

  // ───────────────────────── TESTING & INSPECTION ─────────────────────────
  {
    id: 'insulation-resistance-check', category: 'testing', name: 'Insulation Resistance Pass/Fail', formula: 'BS 7671 Table 61 minimum values',
    desc: 'Check a measured IR value against the BS 7671 minimum',
    inputs: [
      { key: 'circuit', label: 'Circuit Voltage', unit: '', type: 'select', default: 'lv', options: [{ value: 'elv', label: 'SELV/PELV (min 0.5 MΩ @250V)' }, { value: 'lv', label: 'Up to 500V incl. 230/400V (min 1.0 MΩ @500V)' }, { value: 'hv', label: 'Above 500V (min 1.0 MΩ @1000V)' }] },
      { key: 'measured', label: 'Measured Value', unit: 'MΩ', type: 'number', default: 200 },
    ],
    compute: (v) => {
      const min = { elv: 0.5, lv: 1.0, hv: 1.0 }[v.circuit] ?? 1.0
      return [{ label: 'Minimum Required', value: min, unit: 'MΩ' }, { label: 'Result', value: n(v.measured) >= min ? 'PASS' : 'FAIL', unit: '', primary: true }]
    },
  },
  {
    id: 'ring-final-r1-r2', category: 'testing', name: 'Ring Final Circuit — r1+r2 at Midpoint', formula: '(r1 + rn) ÷ 4',
    desc: 'Expected r1+r2 reading at the midpoint of a ring final circuit',
    inputs: [{ key: 'r1', label: 'End-to-End r1', unit: 'Ω', type: 'number', default: 0.4 }, { key: 'rn', label: 'End-to-End rn (cpc)', unit: 'Ω', type: 'number', default: 0.66 }],
    compute: (v) => [{ label: 'Expected r1+r2 at Midpoint', value: round((n(v.r1) + n(v.rn)) / 4, 3), unit: 'Ω', primary: true }],
  },
  {
    id: 'earth-electrode-resistance', category: 'testing', name: 'Earth Electrode Resistance Check', formula: 'Compare against target (e.g. TT system)',
    desc: 'Check a measured earth electrode resistance against a target value',
    inputs: [{ key: 'measured', label: 'Measured Resistance', unit: 'Ω', type: 'number', default: 85 }, { key: 'target', label: 'Target Max', unit: 'Ω', type: 'number', default: 200 }],
    compute: (v) => [{ label: 'Result', value: n(v.measured) <= n(v.target) ? 'PASS' : 'FAIL', unit: '', primary: true }],
    note: 'For TT systems, RA × IΔn ≤ 50V is the real design check — this is a quick reference-value comparison only.',
  },
  {
    id: 'rcd-trip-time-check', category: 'testing', name: 'RCD Trip Time Compliance', formula: 'vs BS 7671 max disconnection times',
    desc: 'Check a measured RCD trip time against BS 7671 maximums',
    inputs: [
      { key: 'test', label: 'Test Multiple', unit: '', type: 'select', default: 'x1', options: [{ value: 'x1', label: '×1 IΔn (max 300ms general / 200ms sockets)' }, { value: 'x5', label: '×5 IΔn (max 40ms)' }] },
      { key: 'measured', label: 'Measured Trip Time', unit: 'ms', type: 'number', default: 25 },
    ],
    compute: (v) => {
      const max = v.test === 'x5' ? 40 : 300
      return [{ label: 'Max Allowed', value: max, unit: 'ms' }, { label: 'Result', value: n(v.measured) <= max ? 'PASS' : 'FAIL', unit: '', primary: true }]
    },
  },
  {
    id: 'pfc-pass-check', category: 'testing', name: 'PFC vs Device Breaking Capacity', formula: 'Device kA rating ≥ PFC',
    desc: 'Confirm the protective device can safely break the prospective fault current',
    inputs: [{ key: 'pfc', label: 'Measured/Calculated PFC', unit: 'A', type: 'number', default: 1800 }, { key: 'device', label: 'Device Breaking Capacity', unit: 'kA', type: 'number', default: 6 }],
    compute: (v) => [{ label: 'Result', value: n(v.device) * 1000 >= n(v.pfc) ? 'PASS' : 'FAIL', unit: '', primary: true }],
  },

  // ───────────────────────── BUSINESS & PRICING ─────────────────────────
  {
    id: 'vat-calculator', category: 'business', name: 'VAT Calculator (UK)', formula: 'VAT = Net × rate; Gross = Net + VAT',
    desc: 'Add or check VAT on a job price',
    inputs: [{ key: 'net', label: 'Net Amount', unit: '£', type: 'number', default: 500 }, { key: 'rate', label: 'VAT Rate', unit: '%', type: 'number', default: 20 }],
    compute: (v) => { const vat = (n(v.net) * n(v.rate)) / 100; return [{ label: 'VAT', value: round(vat), unit: '£' }, { label: 'Gross Total', value: round(n(v.net) + vat), unit: '£', primary: true }] },
  },
  {
    id: 'day-rate-calculator', category: 'business', name: 'Day Rate Calculator', formula: 'Day Rate = Annual Target ÷ Working Days',
    desc: 'Work out the day rate needed to hit an income target',
    inputs: [{ key: 'target', label: 'Annual Income Target', unit: '£', type: 'number', default: 45000 }, { key: 'days', label: 'Billable Days / Year', unit: 'days', type: 'number', default: 210 }],
    compute: (v) => [{ label: 'Required Day Rate', value: round(n(v.days) ? n(v.target) / n(v.days) : 0), unit: '£', primary: true }],
  },
  {
    id: 'markup-margin', category: 'business', name: 'Markup vs Margin', formula: 'Sell = Cost × (1 + markup%); Margin% = Profit ÷ Sell',
    desc: 'Work out selling price from cost + markup, and see the resulting margin',
    inputs: [{ key: 'cost', label: 'Cost Price', unit: '£', type: 'number', default: 100 }, { key: 'markup', label: 'Markup', unit: '%', type: 'number', default: 25 }],
    compute: (v) => {
      const sell = n(v.cost) * (1 + n(v.markup) / 100)
      const margin = sell ? ((sell - n(v.cost)) / sell) * 100 : 0
      return [{ label: 'Selling Price', value: round(sell), unit: '£', primary: true }, { label: 'Resulting Margin', value: round(margin), unit: '%' }]
    },
  },
  {
    id: 'job-costing', category: 'business', name: 'Job Costing / Quote Builder', formula: 'Total = (Materials + Labour) × (1 + overhead%) × (1 + profit%)',
    desc: 'Build a job price from materials, labour, overhead and profit margin',
    inputs: [
      { key: 'materials', label: 'Materials Cost', unit: '£', type: 'number', default: 200 },
      { key: 'hours', label: 'Labour Hours', unit: 'hrs', type: 'number', default: 8 },
      { key: 'rate', label: 'Labour Rate', unit: '£/hr', type: 'number', default: 35 },
      { key: 'overhead', label: 'Overhead %', unit: '%', type: 'number', default: 10 },
      { key: 'profit', label: 'Profit Margin %', unit: '%', type: 'number', default: 20 },
    ],
    compute: (v) => {
      const labour = n(v.hours) * n(v.rate)
      const base = n(v.materials) + labour
      const withOverhead = base * (1 + n(v.overhead) / 100)
      const total = withOverhead * (1 + n(v.profit) / 100)
      return [
        { label: 'Labour Cost', value: round(labour), unit: '£' },
        { label: 'Subtotal (base)', value: round(base), unit: '£' },
        { label: 'Recommended Quote', value: round(total), unit: '£', primary: true },
      ]
    },
  },
  {
    id: 'hourly-rate-calculator', category: 'business', name: 'Hourly Rate Calculator', formula: 'Rate = Annual Target ÷ (Billable hrs/wk × wks/yr)',
    desc: 'Work out the hourly rate needed to hit an income target',
    inputs: [{ key: 'target', label: 'Annual Income Target', unit: '£', type: 'number', default: 45000 }, { key: 'hours', label: 'Billable Hours / Week', unit: 'hrs', type: 'number', default: 30 }, { key: 'weeks', label: 'Working Weeks / Year', unit: 'wks', type: 'number', default: 46 }],
    compute: (v) => { const d = n(v.hours) * n(v.weeks); return [{ label: 'Required Hourly Rate', value: round(d ? n(v.target) / d : 0), unit: '£', primary: true }] },
  },
  {
    id: 'overtime-pay', category: 'business', name: 'Overtime Pay Calculator', formula: 'OT Pay = Rate × Multiplier × Hours',
    desc: 'Calculate overtime pay for a given multiplier',
    inputs: [{ key: 'rate', label: 'Normal Hourly Rate', unit: '£/hr', type: 'number', default: 20 }, { key: 'mult', label: 'Overtime Multiplier', unit: '', type: 'select', default: '1.5', options: [{ value: '1.5', label: 'Time and a half (1.5×)' }, { value: '2', label: 'Double time (2×)' }] }, { key: 'hours', label: 'Overtime Hours', unit: 'hrs', type: 'number', default: 5 }],
    compute: (v) => [{ label: 'Overtime Pay', value: round(n(v.rate) * n(v.mult) * n(v.hours)), unit: '£', primary: true }],
  },
  {
    id: 'fuel-cost-per-job', category: 'business', name: 'Fuel Cost per Job', formula: 'Cost = (Miles ÷ MPG) × Litres/gal × Price',
    desc: 'Estimate fuel cost for a job based on distance travelled',
    inputs: [{ key: 'miles', label: 'Round-Trip Distance', unit: 'miles', type: 'number', default: 20 }, { key: 'mpg', label: 'Vehicle MPG', unit: 'mpg', type: 'number', default: 35 }, { key: 'price', label: 'Fuel Price', unit: '£/litre', type: 'number', default: 1.5 }],
    compute: (v) => {
      const gallons = n(v.mpg) ? n(v.miles) / n(v.mpg) : 0
      const litres = gallons * 4.546
      return [{ label: 'Fuel Cost', value: round(litres * n(v.price)), unit: '£', primary: true }]
    },
  },
  {
    id: 'break-even', category: 'business', name: 'Break-Even Calculator', formula: 'Jobs = Fixed Costs ÷ (Price − Variable Cost)',
    desc: 'How many jobs per month needed to break even',
    inputs: [{ key: 'fixed', label: 'Fixed Costs / Month', unit: '£', type: 'number', default: 1500 }, { key: 'price', label: 'Avg Price per Job', unit: '£', type: 'number', default: 250 }, { key: 'variable', label: 'Avg Variable Cost per Job', unit: '£', type: 'number', default: 80 }],
    compute: (v) => {
      const margin = n(v.price) - n(v.variable)
      return [{ label: 'Break-Even Jobs / Month', value: margin > 0 ? Math.ceil(n(v.fixed) / margin) : '—', unit: 'jobs', primary: true }]
    },
  },

  // ───────────────────────── HEATING & WATER ─────────────────────────
  {
    id: 'immersion-heater-sizing', category: 'heating', name: 'Immersion Heater Sizing', formula: 'kW = (L × 4.2 × ΔT) ÷ (3600 × t)',
    desc: 'Power needed to heat a tank of water in a target time',
    inputs: [{ key: 'litres', label: 'Tank Volume', unit: 'L', type: 'number', default: 150 }, { key: 'dt', label: 'Temperature Rise', unit: '°C', type: 'number', default: 40 }, { key: 't', label: 'Heat-Up Time', unit: 'hrs', type: 'number', default: 1.5 }],
    compute: (v) => {
      const kwh = (n(v.litres) * 4.2 * n(v.dt)) / 3600
      return [{ label: 'Energy Required', value: round(kwh), unit: 'kWh' }, { label: 'Required Element Power', value: round(n(v.t) ? kwh / n(v.t) : 0), unit: 'kW', primary: true }]
    },
  },
  {
    id: 'shower-circuit-sizing', category: 'heating', name: 'Electric Shower Circuit Current', formula: 'I = P ÷ V',
    desc: 'Design current for an electric shower — cross-check against MCB selector',
    inputs: [{ key: 'kw', label: 'Shower Rating', unit: 'kW', type: 'number', default: 9.5 }, { key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }],
    compute: (v) => {
      const i = n(v.volt) ? (n(v.kw) * 1000) / n(v.volt) : 0
      const std = [32, 40, 45, 50]
      const mcb = std.find((s) => s >= i) || 50
      return [{ label: 'Design Current', value: round(i), unit: 'A', primary: true }, { label: 'Typical MCB/RCBO', value: mcb, unit: 'A' }]
    },
  },
  {
    id: 'immersion-element-current', category: 'heating', name: 'Immersion Element Current', formula: 'I = P ÷ V',
    desc: 'Current drawn by an immersion heater element',
    inputs: [{ key: 'kw', label: 'Element Rating', unit: 'kW', type: 'number', default: 3 }, { key: 'volt', label: 'Voltage', unit: 'V', type: 'number', default: 230 }],
    compute: (v) => [{ label: 'Current', value: round(n(v.volt) ? (n(v.kw) * 1000) / n(v.volt) : 0), unit: 'A', primary: true }],
  },
]

export function getCalculatorsByCategory(catId) {
  return CALCULATORS.filter((c) => c.category === catId)
}

export function searchCalculators(query) {
  const q = query.trim().toLowerCase()
  if (!q) return CALCULATORS
  return CALCULATORS.filter((c) => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
}
