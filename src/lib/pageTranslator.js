// lib/pageTranslator.js
// Translates the *rendered* page into any of the 14 supported languages by
// walking visible text nodes and swapping their content — rather than
// hand-writing translation files for every one of the ~50 pages in this
// app, which would be a huge, constantly-drifting maintenance burden.
//
// How it works:
//  1. Walk all Text nodes under `root`, skipping <script>/<style>/inputs/
//     editable fields and anything marked data-no-translate.
//  2. Remember each node's ORIGINAL English text in a WeakMap (set once).
//  3. Collect the unique strings not yet cached for the target language,
//     translate them in ONE batched AI call (see /api/translate/batch),
//     and write the results back into the DOM.
//  4. A MutationObserver re-runs the walk (debounced) whenever React
//     renders new content — new tabs, modals, route changes — so
//     newly-mounted text gets translated automatically too.
//  5. Switching back to English restores the original text from the
//     WeakMap — no server round-trip needed.
import { apiRequest } from './api'

const originalText = new WeakMap() // Text node -> original English string
const originalAttrs = new WeakMap() // Element -> { attrName: original English value }
// Visible strings that live in attributes, not text nodes, so the plain
// TreeWalker below never sees them (placeholders, tooltips, a11y labels,
// image alt text). Left untranslated, these silently stay in English
// forever no matter what language is selected.
const TRANSLATABLE_ATTRS = ['placeholder', 'title', 'aria-label', 'alt']
const CACHE_KEY_PREFIX = 'ecsprep_translations_'
const MAX_CACHED_PER_LANG = 3000
// Smaller batches translate far more reliably: the server has a fixed
// per-request token budget, and long UI sentences in token-heavy scripts
// (Punjabi, Bulgarian, Russian, etc.) can eat that budget fast. 100 strings
// per call used to cause the model's reply to get cut off partway through,
// so later strings on the page silently stayed in English. The server also
// now retries any lines that come back missing, so this is belt-and-braces.
const BATCH_SIZE = 40

// Tags whose own *text content* should never be swapped (script bodies,
// raw code samples, etc). NOTE: this deliberately does NOT include INPUT,
// TEXTAREA or SELECT/OPTION any more — see the two bugs fixed below.
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'])

// Separate, narrower skip list used only for the *text-node* walk. INPUT/
// TEXTAREA never contain real text nodes (their visible value lives in the
// `value`/`placeholder` attributes instead) so excluding them here is just
// a minor optimisation, not a translation-correctness issue. OPTION is
// intentionally left OUT: <option>Foo</option> text is a normal, visible,
// user-facing string (every <select> dropdown on the site — topic filters,
// settings, sort order, etc.) and was being silently skipped because it
// used to share the same SKIP_TAGS set as attribute targets below.
const TEXT_NODE_SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'CODE', 'PRE'])

function loadCache(lang) {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + lang)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveCache(lang, cache) {
  try {
    const keys = Object.keys(cache)
    if (keys.length > MAX_CACHED_PER_LANG) {
      // Simple bound: drop the oldest half rather than growing forever.
      const trimmed = {}
      keys.slice(keys.length - MAX_CACHED_PER_LANG).forEach((k) => { trimmed[k] = cache[k] })
      localStorage.setItem(CACHE_KEY_PREFIX + lang, JSON.stringify(trimmed))
    } else {
      localStorage.setItem(CACHE_KEY_PREFIX + lang, JSON.stringify(cache))
    }
  } catch {
    // localStorage full/unavailable — translations just won't be cached across reloads
  }
}

function isEligibleTextNode(node) {
  if (node.nodeType !== Node.TEXT_NODE) return false
  const value = node.nodeValue
  if (!value || !value.trim()) return false
  // Pure numbers/punctuation aren't worth a translation round-trip.
  if (!/[a-zA-Z]/.test(value)) return false
  const parent = node.parentElement
  if (!parent) return false
  if (TEXT_NODE_SKIP_TAGS.has(parent.tagName)) return false
  if (parent.closest('[contenteditable="true"], [data-no-translate]')) return false
  return true
}

function collectTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => (isEligibleTextNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
  })
  const nodes = []
  let current
  // eslint-disable-next-line no-cond-assign
  while ((current = walker.nextNode())) nodes.push(current)
  return nodes
}

// Finds every { element, attr } pair on the page holding a translatable
// attribute value (see TRANSLATABLE_ATTRS above).
function collectAttrTargets(root) {
  if (!root.querySelectorAll) return []
  const selector = TRANSLATABLE_ATTRS.map((a) => `[${a}]`).join(',')
  const elements = root.querySelectorAll(selector)
  const targets = []
  elements.forEach((el) => {
    if (SKIP_TAGS.has(el.tagName)) return
    if (el.closest('[data-no-translate]')) return
    TRANSLATABLE_ATTRS.forEach((attr) => {
      const value = el.getAttribute(attr)
      if (value && value.trim() && /[a-zA-Z]/.test(value)) targets.push({ el, attr })
    })
  })
  return targets
}

async function translateBatchStrings(strings, lang) {
  const out = {}
  for (let i = 0; i < strings.length; i += BATCH_SIZE) {
    const chunk = strings.slice(i, i + BATCH_SIZE)
    try {
      const { translations } = await apiRequest('/api/translate/batch', {
        method: 'POST',
        body: { texts: chunk, lang },
        auth: false,
      })
      chunk.forEach((original, idx) => { out[original] = translations[idx] ?? original })
    } catch {
      // Server not configured / offline — leave this chunk untranslated
      // rather than breaking the page.
      chunk.forEach((original) => { out[original] = original })
    }
  }
  return out
}

// Runs one full translate-and-apply pass over `root` for `lang`.
// Returns nothing; mutates the DOM directly.
export async function translatePage(root, lang) {
  if (!root) return
  const nodes = collectTextNodes(root)
  const attrTargets = collectAttrTargets(root)

  if (lang === 'en') {
    nodes.forEach((node) => {
      const original = originalText.get(node)
      if (original !== undefined && node.nodeValue !== original) node.nodeValue = original
    })
    attrTargets.forEach(({ el, attr }) => {
      const stored = originalAttrs.get(el)
      const original = stored && stored[attr]
      if (original !== undefined && el.getAttribute(attr) !== original) el.setAttribute(attr, original)
    })
    return
  }

  const cache = loadCache(lang)
  const toTranslate = new Set()

  nodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue)
    const original = originalText.get(node)
    if (!cache[original]) toTranslate.add(original)
  })

  attrTargets.forEach(({ el, attr }) => {
    let stored = originalAttrs.get(el)
    if (!stored) { stored = {}; originalAttrs.set(el, stored) }
    if (!(attr in stored)) stored[attr] = el.getAttribute(attr)
    const original = stored[attr]
    if (!cache[original]) toTranslate.add(original)
  })

  if (toTranslate.size > 0) {
    const translated = await translateBatchStrings([...toTranslate], lang)
    Object.assign(cache, translated)
    saveCache(lang, cache)
  }

  nodes.forEach((node) => {
    const original = originalText.get(node)
    const translated = cache[original]
    if (translated && node.nodeValue !== translated) node.nodeValue = translated
  })

  attrTargets.forEach(({ el, attr }) => {
    const stored = originalAttrs.get(el)
    const original = stored && stored[attr]
    const translated = cache[original]
    if (translated && el.getAttribute(attr) !== translated) el.setAttribute(attr, translated)
  })
}

// Sets up a MutationObserver that re-runs translatePage (debounced)
// whenever React mounts new content into `root`. Returns a cleanup fn.
export function watchAndTranslate(root, getLang) {
  if (!root) return () => {}
  let applying = false
  // Set when a real DOM mutation (new content mounting, an attribute
  // changing) arrives WHILE a translation pass is already running. A full
  // page translation is a network round-trip and can take a couple of
  // seconds, and React keeps mounting things the whole time (lazy tabs,
  // async data, route changes). The old code just did `if (applying)
  // return` here, which silently threw those mutations away forever —
  // that content stayed in English until some unrelated later mutation
  // happened to fire. Now we remember it happened and immediately run
  // another pass once the current one finishes, so nothing gets missed.
  let pending = false
  let timer = null

  const run = () => {
    applying = true
    pending = false
    Promise.resolve(translatePage(root, getLang())).finally(() => {
      // Let the DOM settle before re-enabling the observer's reaction to
      // our own writes (otherwise we'd trigger an infinite loop).
      setTimeout(() => {
        applying = false
        if (pending) run()
      }, 50)
    })
  }

  const observer = new MutationObserver(() => {
    if (applying) { pending = true; return }
    clearTimeout(timer)
    timer = setTimeout(run, 200)
  })

  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: TRANSLATABLE_ATTRS,
  })
  run()

  return () => {
    observer.disconnect()
    clearTimeout(timer)
  }
}
