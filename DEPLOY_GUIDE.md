# ECSPrep — Live Deployment Guide (Vercel + Render)

Follow these steps in order. Total time: ~20-30 minutes.

---

## Step 1 — Get a free Gemini API key (fixes translation)

1. Go to https://aistudio.google.com/apikey
2. Sign in with any Google account.
3. Click **"Create API key"**.
4. Copy the key (starts with `AIza...`). Keep this tab open, you'll paste it in Step 3.

This is what powers the 14-language AI translation. No credit card needed.

---

## Step 2 — Push this project to GitHub

1. Create a new **private** GitHub repo (e.g. `ecsprep`).
2. From this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ecsprep.git
   git push -u origin main
   ```

> The `.gitignore` already excludes `.env`, `server/.env`, and `node_modules` — your secrets won't be pushed.

---

## Step 3 — Deploy the backend on Render

1. Go to https://render.com → sign in with GitHub.
2. **New +** → **Web Service** → pick your `ecsprep` repo.
3. Render will detect `render.yaml` in the repo root — click **Apply**.
4. When asked, fill in these environment variables (the ones marked `sync: false` in render.yaml):
   | Variable | Value |
   |---|---|
   | `CLIENT_URL` | leave blank for now, you'll fill this after Step 4 |
   | `ADMIN_EMAILS` | `csconstruction43@gmail.com` |
   | `ADMIN_SEED_EMAIL` | `csconstruction43@gmail.com` |
   | `ADMIN_SEED_PASSWORD` | `Revision@2026` |
   | `GEMINI_API_KEY` | the key from Step 1 |
   | `STRIPE_SECRET_KEY`, `STRIPE_PRICE_*`, `STRIPE_WEBHOOK_SECRET` | only if you use payments — otherwise leave blank |
   | `GOOGLE_CLIENT_ID` | only if you use Google Sign-In — otherwise leave blank |
   | `SMTP_*`, `FROM_EMAIL` | only if you want emails (welcome/reset) to send — otherwise leave blank |
5. Click **Create Web Service**. Wait for the build to finish.
6. Copy the live URL Render gives you, e.g. `https://ecsprep-api.onrender.com`.
7. Once deployed, open a **Shell** tab on the Render service and run:
   ```bash
   npm run seed-admin
   ```
   This creates your admin + Pro account using `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`.

---

## Step 4 — Deploy the frontend on Vercel

1. Go to https://vercel.com → sign in with GitHub.
2. **Add New** → **Project** → pick the same `ecsprep` repo.
3. Vercel auto-detects Vite (uses `vercel.json` already in the repo). Leave build settings as-is.
4. Add these Environment Variables:
   | Variable | Value |
   |---|---|
   | `VITE_API_URL` | the Render URL from Step 3.6, e.g. `https://ecsprep-api.onrender.com` |
   | `VITE_GOOGLE_CLIENT_ID` | only if using Google Sign-In |
5. Click **Deploy**. You'll get a live URL like `https://ecsprep.vercel.app`.

---

## Step 5 — Connect the two

1. Go back to Render → your service → **Environment** → set `CLIENT_URL` to your Vercel URL (e.g. `https://ecsprep.vercel.app`).
2. Render will auto-redeploy. This lets the backend accept requests from your live frontend (CORS).

---

## Step 6 — Log in as admin

1. Open your live site → **Sign In**.
2. Use the admin email + password you set in `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`.
3. You now have `role: admin` + Pro/lifetime access, and can see the Admin Panel with all users, analytics, etc.

---

## Step 7 — Test translation

1. On the live site, switch the language selector to any of the 14 languages.
2. Wait a couple of seconds — the whole page should translate. First switch to a language is slower (live AI call); after that it's cached in the browser and instant.

---

### Custom domain (optional)
Both Vercel and Render support adding your own domain for free under **Settings → Domains** on each service.
