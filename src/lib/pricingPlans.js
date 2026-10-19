// lib/pricingPlans.js
// Single source of truth for plan names, prices and features.

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
    paypalType: 'subscription',
    paypalPlanId: 'PASTE_WEEKLY_PLAN_ID_HERE',
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
    paypalType: 'subscription',
    paypalPlanId: 'P-4H691120ST240793ENLK67FY',
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
    paypalType: 'order',
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

export function monthlySavingsVsWeekly() {
  const weeklyCostOverMonth = PLANS.weekly.priceValue * 4.33
  return Math.round((1 - PLANS.monthly.priceValue / weeklyCostOverMonth) * 100)
}

export function lifetimeBreakEvenMonths() {
  return Math.round(PLANS.lifetime.priceValue / PLANS.monthly.priceValue)
}
