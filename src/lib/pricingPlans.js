// lib/pricingPlans.js
// Single source of truth for plan names, prices and features. Every page
// that shows a price (PricingPage, PricingPlansPage, CheckoutPage,
// SettingsPage) imports from here instead of hardcoding its own numbers.
//
// Why this file exists: the app used to have the same 4 plans hardcoded
// in 4+ different files, and they'd drifted out of sync (one page showed
// Monthly at £6.99, everywhere else said £4.99). Changing a price now
// means editing this one file.

export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: '£0',
    priceValue: 0,
    period: null,
    tagline: 'Try before you buy',
    features: [
      '2 free sample mock tests',
      'Basic practice questions',
      'No credit card required',
    ],
    link: '/guest-test',
    buttonText: 'Get started',
  },
  weekly: {
    id: 'weekly',
    name: 'Weekly',
    price: '£4.99',
    priceValue: 4.99,
    period: 'week',
    tagline: 'Short-term crammer',
    features: [
      'Unlimited mock tests',
      'AI-powered explanations',
      'All 22 ECS test routes',
      'Practice by topic',
      'Analytics dashboard',
      'Cancel anytime',
    ],
    link: '/checkout?plan=weekly',
    buttonText: 'Try now',
  },
  monthly: {
    id: 'monthly',
    name: 'Monthly',
    price: '£9.99',
    priceValue: 9.99,
    period: 'month',
    tagline: 'Most popular',
    popular: true,
    features: [
      'Unlimited mock tests',
      'AI-powered explanations',
      'All 22 ECS test routes',
      'Practice by topic',
      'Analytics dashboard',
      'Personalised study plan',
      'Cancel anytime',
    ],
    link: '/checkout?plan=monthly',
    buttonText: 'Get started',
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime',
    price: '£60',
    priceValue: 60,
    period: 'one-time',
    tagline: 'Best long-term value',
    features: [
      'Everything in Monthly',
      'Never expires',
      'All future updates',
      'Covers card renewal resits (3–5 yr)',
    ],
    link: '/checkout?plan=lifetime',
    buttonText: 'Best value',
  },
}

export const PLAN_LIST = Object.values(PLANS)

// Weekly-equivalent cost of Monthly, for the "save X%" messaging — computed
// instead of hardcoded so it can't drift from the real prices again.
export function monthlySavingsVsWeekly() {
  const weeklyCostOverMonth = PLANS.weekly.priceValue * 4.33 // avg weeks/month
  const savingPct = Math.round((1 - PLANS.monthly.priceValue / weeklyCostOverMonth) * 100)
  return savingPct
}

// How many months of Monthly it takes before Lifetime is the cheaper
// choice — computed so the "pays for itself" messaging can't drift from
// the real prices either.
export function lifetimeBreakEvenMonths() {
  return Math.round(PLANS.lifetime.priceValue / PLANS.monthly.priceValue)
}
