// lib/audioLanguages.js
// Moved out of QuestionAudio.jsx so that file only exports a component
// (keeps react-refresh/only-export-components happy).
// value = code sent to the backend / cache key
// speech = BCP-47 tag used by the browser's SpeechSynthesis voice picker
export const AUDIO_LANGUAGES = [
  { value: 'en', label: 'English', flag: '🇬🇧', speech: 'en-GB' },
  { value: 'cy', label: 'Welsh', flag: '🏴', speech: 'cy-GB' },
  { value: 'bg', label: 'Bulgarian', flag: '🇧🇬', speech: 'bg-BG' },
  { value: 'cs', label: 'Czech', flag: '🇨🇿', speech: 'cs-CZ' },
  { value: 'fr', label: 'French', flag: '🇫🇷', speech: 'fr-FR' },
  { value: 'de', label: 'German', flag: '🇩🇪', speech: 'de-DE' },
  { value: 'hu', label: 'Hungarian', flag: '🇭🇺', speech: 'hu-HU' },
  { value: 'lt', label: 'Lithuanian', flag: '🇱🇹', speech: 'lt-LT' },
  { value: 'pl', label: 'Polish', flag: '🇵🇱', speech: 'pl-PL' },
  { value: 'pt', label: 'Portuguese', flag: '🇵🇹', speech: 'pt-PT' },
  { value: 'pa', label: 'Punjabi', flag: '🇮🇳', speech: 'pa-IN' },
  { value: 'ro', label: 'Romanian', flag: '🇷🇴', speech: 'ro-RO' },
  { value: 'ru', label: 'Russian', flag: '🇷🇺', speech: 'ru-RU' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸', speech: 'es-ES' },
]
