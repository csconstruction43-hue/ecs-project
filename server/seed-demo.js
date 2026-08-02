// server/seed-demo.js
// Creates the three demo accounts the Login page advertises
// (demo@example.com / pro@example.com / admin@example.com, all with
// password "password123") so that UI text is actually true out of the box.
//
// Usage (from the server/ folder, after `npm install`):
//   node seed-demo.js
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { findByEmail, createUser, updateUser } from './store.js'

const PASSWORD = 'password123'

const DEMO_ACCOUNTS = [
  { email: 'demo@example.com', name: 'Demo User', role: 'user', isPro: false, plan: null },
  { email: 'pro@example.com', name: 'Pro User', role: 'user', isPro: true, plan: 'monthly' },
  { email: 'admin@example.com', name: 'Admin User', role: 'admin', isPro: true, plan: 'lifetime' },
]

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10)

  for (const account of DEMO_ACCOUNTS) {
    const existing = await findByEmail(account.email)
    if (existing) {
      await updateUser(existing.id, {
        name: account.name,
        password: passwordHash,
        provider: 'password',
        role: account.role,
        isPro: account.isPro,
        plan: account.plan,
      })
    } else {
      await createUser({
        id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: account.name,
        email: account.email,
        password: passwordHash,
        provider: 'password',
        role: account.role,
        isPro: account.isPro,
        plan: account.plan,
        createdAt: new Date().toISOString(),
      })
    }
  }

  console.log('✅ Demo accounts ready (all use password: password123):')
  DEMO_ACCOUNTS.forEach((a) => console.log(`   ${a.email.padEnd(20)} role=${a.role.padEnd(6)} isPro=${a.isPro}`))
  console.log('')
  console.log('⚠️  These are for local demos/testing only — do not seed them in production.')
  console.log('   Make sure admin@example.com is also listed in server/.env under ADMIN_EMAILS')
  console.log('   if you want it to keep the admin role after a real re-login.')
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
