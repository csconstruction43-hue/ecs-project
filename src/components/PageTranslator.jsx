// components/PageTranslator.jsx
// Mount once near the root of the app. Has no visual output — it just
// keeps the live DOM translated to whatever language is selected, and
// re-translates automatically as React mounts new content (route changes,
// tab switches, modals) via a MutationObserver.
import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { watchAndTranslate } from '../lib/pageTranslator'

function PageTranslator() {
  const { language } = useLanguage()

  useEffect(() => {
    const stop = watchAndTranslate(document.body, () => language)
    return stop
    // Re-subscribing on every language change re-runs translatePage
    // immediately with the new target language.
  }, [language])

  return null
}

export default PageTranslator
