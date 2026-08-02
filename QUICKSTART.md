# Quick Start (read this first!)

This project has TWO parts that must both be running at the same time:
- **Backend** (`server/` folder) — on port 4000
- **Frontend** (this root folder) — on port 5173

## One-time setup

Open ONE terminal in this folder (`my-react-app`) and run:

```powershell
npm install
npm run server:install
```

Make sure both `.env` files exist and are filled in:
- `.env` (this folder) — needs `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID`
- `server\.env` — needs `GOOGLE_CLIENT_ID`, and Stripe keys when you're ready for payments

## Create your admin + Pro account

After `npm run server:install`, run this once from the `server/` folder to
create a ready-to-use admin account with Pro already unlocked (no Stripe
payment needed for this one account):

```powershell
cd server
node seed-admin.js
```

Login at `/login` with:
- **Email:** `admin@ecsprep.local`
- **Password:** `bKQKBASYAzmbKV!`

This account has `role: admin` (so `/admin` works) and `isPro: true` (so all
Pro-only pages/features work). **Change the password from the Settings page
after your first login**, and keep `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`
in `server/.env` in sync if you change them there instead.

## Every time you want to run the app

**Before starting, close ALL old terminals** that might still have `npm run dev`
running in them (old leftover servers are the #1 cause of "Failed to fetch"
and random port numbers). If unsure, run this once to force-kill everything:

```powershell
taskkill /F /IM node.exe
```

Then, in this folder, run ONE command that starts both servers together:

```powershell
npm run dev:all
```

You'll see BACKEND and FRONTEND logs interleaved in the same window, in
green and blue. Wait until you see both:
```
[BACKEND] ECSPrep API running on http://localhost:4000
[FRONTEND] Local: http://localhost:5173/
```

Open **http://localhost:5173** in your browser (always this exact address —
the dev server is now locked to port 5173 and will refuse to start on a
different port if something else is already using it, so you don't
accidentally break Google Sign-In by opening the wrong port).

To stop everything: click into that terminal and press `Ctrl+C` once.

## "Failed to fetch" checklist

If you ever see "Failed to fetch" in the app, it means the browser could not
reach the backend. In order, check:
1. Is the `npm run dev:all` terminal still open and showing no errors?
2. Does `http://localhost:4000/api/auth/me` (opened directly in the browser)
   return `{"error":"Not signed in."}`? If it says "can't be reached" instead,
   the backend isn't running — go back to step 1.
3. Does `.env` have `VITE_API_URL=http://localhost:4000` exactly?
