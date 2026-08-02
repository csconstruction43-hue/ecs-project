# ज़रूरी नोटिस — पढ़ें डिप्लॉय करने से पहले (Read before you deploy)

## 🚨 1. Rotate these keys immediately (सबसे ज़रूरी)

आपकी पुरानी ZIP file में ये असली/live secrets hardcoded थीं। मैंने उन्हें
`.env` और `server/.env` से हटाकर placeholder से replace कर दिया है — लेकिन
**पुरानी keys अभी भी valid हैं जब तक आप उन्हें revoke नहीं करते:**

| Secret | कहाँ से नई बनाएं |
|---|---|
| Google OAuth Client ID | https://console.cloud.google.com/apis/credentials |
| Groq API key | https://console.groq.com/keys |
| Gemini API key | https://aistudio.google.com/apikey |
| JWT_SECRET | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| Admin password | Settings page से login के बाद बदलें |

नई keys बनाने के बाद `server/.env` और `.env` में डालें (ये files `.gitignore`
में हैं, इसलिए GitHub पर push नहीं होंगी — पर pura folder zip करके कहीं भी
share न करें बिना पहले इन्हें redact किए)।

## ✅ 2. Fake data हटाई गई

- **Mock Tests page**: हर test पर fake `rating` (4.5-4.9 stars) और fake
  `students` count (860 – 15,234) हटा दिए। Sort by "Highest Rated" option
  भी हटाया (उस fake data पर depend करता था)।
- **Question counts**: हर test card पर जो "questions: 50" जैसे numbers थे,
  उन्हें असली question bank के size से match करा दिया।
- **Fake dashboard history**: नए users के dashboard में पहले से fabricated
  test history (fake scores, fake dates) inject हो रही थी — जैसे उन्होंने
  पहले टेस्ट दिए हों। ये हटा दिया; अब नए users का dashboard honest रूप से
  खाली शुरू होगा।
- Homepage के meta description से unverifiable "90%+ pass rate" claim हटाई।

## ✅ 3. Q&A bank बढ़ाई गई (64 नए सवाल इस batch में)

Green Card, Black Card, Skilled Worker, Supervisor, और Managers — इन 5 core
categories में 64 नए, सही (UK HSWA 1974 / CDM 2015 / RIDDOR / COSHH आधारित)
सवाल जोड़े गए। हर सवाल का correct answer verify किया गया है (automated check
से कोई mismatch नहीं मिला)।

**3000+ सवालों तक पहुँचना एक बड़ा multi-session काम है** — genuine, सही
सवाल बनाने में समय लगता है ताकि कोई गलत जवाब न जाए (वरना students का
भरोसा टूटेगा, जो असली suspension-risk है)। अगली बार बताइए तो अगला batch
(300-500 सवाल) तैयार करता हूँ।

## ✅ 4. SEO

- `public/sitemap.xml` को fully rewrite किया — अब site के सभी 45+ असली
  pages (सभी 21 mock tests, blog posts, study material वगैरह) इसमें हैं,
  पहले सिर्फ ~19 URLs थे।
- Deploy से पहले sitemap.xml और robots.txt में
  `https://ecsrevision.com` को अपने असली domain से replace करें।

## ⚠️ अभी बाकी है (अगले batch में)

- Skilled Worker/Supervisor/Manager के अलावा बाकी 16 specialist tests में
  भी question count बढ़ाना
- Professional redesign (Pro plan page, pricing page पॉलिश)
- Google Login टेस्ट करना (code सही है, बस नई rotated Client ID चाहिए)
