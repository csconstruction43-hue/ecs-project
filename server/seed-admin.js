// server/seed-admin.js
// One-time helper to create (or upgrade) an admin account with Pro access,
// without needing Stripe or going through the signup UI.
//
// Usage (from the server/ folder, after `npm install`):
//   node seed-admin.js
//
// It reads ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD from server/.env if set,
// otherwise falls back to the defaults below. It also adds the email to
// ADMIN_EMAILS in .env if it isn't already there, so the role stays "admin"
// even if the user is ever re-created via signup.
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { findByEmail, createUser, updateUser } from './store.js'

const EMAIL = process.env.ADMIN_SEED_EMAIL || 'admin@ecsprep.local'
const PASSWORD = process.env.ADMIN_SEED_PASSWORD || 'bKQKBASYAzmbKV!'

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10)
  const existing = await findByEmail(EMAIL)

  if (existing) {
    await updateUser(existing.id, {
      name: 'Admin',
      password: passwordHash,
      provider: 'password',
      role: 'admin',
      isPro: true,
      plan: 'lifetime',
    })
  } else {
    await createUser({
      id: `user_${Date.now()}`,
      name: 'Admin',
      email: EMAIL,
      password: passwordHash,
      provider: 'password',
      role: 'admin',
      isPro: true,
      plan: 'lifetime',
      createdAt: new Date().toISOString(),
    })
  }

  console.log('✅ Admin + Pro account ready:')
  console.log(`   Email:    ${EMAIL}`)
  console.log(`   Password: ${PASSWORD}`)
  console.log('   Role:     admin   |   Plan: lifetime (Pro unlocked)')
  console.log('')
  console.log('⚠️  Change this password after first login (Settings page),')
  console.log('   and make sure this email is also listed in server/.env under ADMIN_EMAILS.')
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
