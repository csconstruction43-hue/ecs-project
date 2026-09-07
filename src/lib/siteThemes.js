// lib/siteThemes.js
// The whole site is styled with one consistent Tailwind colour ramp
// (`green-100` through `green-900`) for the header, buttons, links and
// highlights — it shows up in ~470 places across ~105 files. Rather than
// touching every one of those files, each "theme" here is just an
// alternate 100-900 colour ramp. Selecting a theme injects a stylesheet
// that overrides the handful of Tailwind utility patterns (bg-green-600,
// hover:bg-green-700, text-green-600, etc.) with the new ramp's colours,
// so the whole site re-skins instantly for every visitor.
//
// "Forest Green" intentionally uses Tailwind's own green ramp — that's
// the site's current look, so it's the default and picking it is a no-op.

export const DEFAULT_THEME_ID = 'forest-green'

export const SITE_THEMES = [
  { id: 'indigo-classic', name: 'Indigo Classic', shades: { 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81' } },
  { id: 'ocean-blue', name: 'Ocean Blue', shades: { 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e' } },
  { id: 'forest-green', name: 'Forest Green (default)', shades: { 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d' } },
  { id: 'sunset-orange', name: 'Sunset Orange', shades: { 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12' } },
  { id: 'royal-purple', name: 'Royal Purple', shades: { 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87' } },
  { id: 'slate-professional', name: 'Slate Professional', shades: { 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' } },
  { id: 'crimson-bold', name: 'Crimson Bold', shades: { 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337' } },
  { id: 'teal-fresh', name: 'Teal Fresh', shades: { 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a' } },
  { id: 'hi-vis-construction', name: 'Hi-Vis Construction (amber/charcoal)', shades: { 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f' } },
  { id: 'safety-navy-orange', name: 'Safety Navy & Orange', shades: { 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' } },
  { id: 'midnight-dark', name: 'Midnight Dark', shades: { 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95' } },
  { id: 'rose', name: 'Rose', shades: { 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843' } },
  { id: 'emerald', name: 'Emerald', shades: { 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b' } },
  { id: 'steel-grey', name: 'Steel Grey', shades: { 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827' } },
  { id: 'copper', name: 'Copper', shades: { 100: '#fbe6d4', 200: '#f3c7a1', 300: '#e8a06a', 400: '#d9803f', 500: '#c2661f', 600: '#a34e12', 700: '#7f3c0e', 800: '#5e2c0a', 900: '#3f1d07' } },
  { id: 'cobalt', name: 'Cobalt', shades: { 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#2563eb', 600: '#1d4ed8', 700: '#1e40af', 800: '#1e3a8a', 900: '#172554' } },
]

export function getThemeById(id) {
  return SITE_THEMES.find((t) => t.id === id) || SITE_THEMES.find((t) => t.id === DEFAULT_THEME_ID)
}

// Every Tailwind utility *pattern* that's actually used with `green-*`
// across the codebase (found by grepping `src/` for `green-[0-9]00`).
// Each entry is [selectorTemplate, cssProperty]; `{shade}` and `{color}`
// are filled in per shade below. Selectors that Tailwind escapes with a
// backslash (e.g. `hover:bg-green-600` -> `.hover\:bg-green-600`) are
// written pre-escaped here.
const RULE_TEMPLATES = [
  ['.bg-green-{shade}', 'background-color'],
  ['.text-green-{shade}', 'color'],
  ['.border-green-{shade}', 'border-color'],
  ['.divide-green-{shade} > :not([hidden]) ~ :not([hidden])', 'border-color'],
  ['.ring-green-{shade}', '--tw-ring-color'],
  ['.dark\\:bg-green-{shade}', 'background-color'],
  ['.dark\\:text-green-{shade}', 'color'],
  ['.prose-a\\:text-green-{shade} a', 'color'],
]

const HOVER_FOCUS_TEMPLATES = [
  ['.hover\\:bg-green-{shade}:hover', 'background-color'],
  ['.hover\\:text-green-{shade}:hover', 'color'],
  ['.hover\\:border-green-{shade}:hover', 'border-color'],
  ['.focus\\:ring-green-{shade}:focus', '--tw-ring-color'],
  ['.group:hover .group-hover\\:text-green-{shade}', 'color'],
]

const SHADES = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export function buildThemeOverrideCSS(theme) {
  if (!theme) return ''
  const lines = []
  for (const shade of SHADES) {
    const color = theme.shades[shade]
    if (!color) continue
    for (const [selector, prop] of [...RULE_TEMPLATES, ...HOVER_FOCUS_TEMPLATES]) {
      lines.push(`${selector.replace(/\{shade\}/g, shade)} { ${prop}: ${color} !important; }`)
    }
    // Gradient stops (from-green-600, to-green-600) — best-effort: this
    // covers the vast majority of gradient usage, though a `from-` used
    // without a matching `to-` keeps a faint trace of the old fallback.
    lines.push(`.from-green-${shade} { --tw-gradient-from: ${color} !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(255 255 255 / 0)) !important; }`)
    lines.push(`.to-green-${shade} { --tw-gradient-to: ${color} !important; }`)
    lines.push(`.via-green-${shade} { --tw-gradient-via: ${color} !important; }`)
  }
  return lines.join('\n')
}

const STYLE_TAG_ID = 'site-theme-override'

export function applyTheme(themeId) {
  if (typeof document === 'undefined') return
  const theme = getThemeById(themeId)
  const css = buildThemeOverrideCSS(theme)
  let tag = document.getElementById(STYLE_TAG_ID)
  if (!tag) {
    tag = document.createElement('style')
    tag.id = STYLE_TAG_ID
    document.head.appendChild(tag)
  }
  tag.textContent = css
}
