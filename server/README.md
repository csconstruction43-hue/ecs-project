# ECSPrep API server

Real Stripe payments and real Google Sign-In both require secret keys that
must never sit in frontend code (anyone could open devtools and steal them).
This tiny Express server holds those secrets and exposes safe endpoints for
the React app to call instead.

## 1. Install

```bash
cd server
npm install
cp .env.example .env
```

## 2. Fill in `.env`

- **Stripe**: create an account at https://dashboard.stripe.com, grab your
  secret key from *Developers → API keys*, and create one Price per plan
  under *Product catalog*. Paste the price IDs in.
- **Stripe webhook**: run `stripe listen --forward-to localhost:4000/api/stripe/webhook`
  (Stripe CLI) while developing, and copy the `whsec_...` it prints into
  `STRIPE_WEBHOOK_SECRET`. In production, create a webhook endpoint in the
  Stripe dashboard pointing at `https://your-api-domain.com/api/stripe/webhook`.
- **Google Sign-In**: create an OAuth Client ID (type "Web application") at
  https://console.cloud.google.com/apis/credentials, add your frontend URL
  (e.g. `http://localhost:5173`) under "Authorized JavaScript origins", and
  paste the client ID here AND in the frontend's `.env` as
  `VITE_GOOGLE_CLIENT_ID`.

## 3. Run it

```bash
npm run dev
```

The API runs on `http://localhost:4000` by default. Point the frontend's
`VITE_API_URL` at this address.

## 4. Deploying

Deploy this folder anywhere that runs Node (Render, Railway, Fly.io, a VPS,
etc). Set the same environment variables there, and update `CLIENT_URL` to
your live frontend domain plus `VITE_API_URL` in the frontend to your live
API domain.

`users.json` is a flat-file "database" so the demo works instantly. Swap it
for Postgres/MongoDB/etc before going to real production traffic — only
`store.js` needs to change.
