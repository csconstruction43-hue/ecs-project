// CheckoutPage.jsx  (ek hi file me sab kuch: page + PayPal button)
//
// Kahan rakhein: apne purane CheckoutPage ki jagah (jaise src/pages/CheckoutPage.jsx)
// Import path neeche line 1 me apne folder ke hisaab se theek kar lein.
// Zaruri: lib/pricingPlans.js me weekly/monthly par `paypalType: 'subscription'` +
// `paypalPlanId`, aur lifetime par `paypalType: 'order'` hona chahiye.

import { useEffect, useRef, useState } from "react";
import { PLANS } from "../lib/pricingPlans"; // <-- path apne project ke hisaab se badlein

// ---------- Settings ----------
const PAYPAL_CLIENT_ID =
  "BAARo_tccNroZ_wxOWP38vaPoNT7aYM7pUUCwTLF8V52gnbiahxopSJ5LALLPUZ8lGyRprkw-3BRUYWlqE";

// Payment ke baad server ko bataane ka endpoint (server/index.js me banana hai)
const CONFIRM_ENDPOINT = "/api/paypal/confirm";

// Payment safal hone ke baad user kahan jayega
const SUCCESS_REDIRECT = "/";

// ---------- PayPal SDK loader ----------
// Subscription aur ek-baar-ka-payment ki SDK settings alag hoti hain,
// isliye mode badalne par script dobara load hoti hai.
function loadPayPal(mode) {
  if (window.__paypalMode === mode && window.paypal) {
    return Promise.resolve(window.paypal);
  }
  document
    .querySelectorAll("script[data-paypal-sdk]")
    .forEach((s) => s.remove());
  delete window.paypal;

  const params =
    mode === "subscription"
      ? `client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription&currency=GBP`
      : `client-id=${PAYPAL_CLIENT_ID}&intent=capture&currency=GBP`;

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?${params}`;
    s.setAttribute("data-paypal-sdk", "true");
    s.onload = () => {
      window.__paypalMode = mode;
      resolve(window.paypal);
    };
    s.onerror = () => reject(new Error("PayPal SDK load failed"));
    document.body.appendChild(s);
  });
}

// ---------- PayPal button ----------
function PayPalButton({ plan, onSuccess, onError }) {
  const containerRef = useRef(null);
  const [loadError, setLoadError] = useState("");

  const isSubscription = plan.paypalType === "subscription";
  const missingPlanId =
    isSubscription &&
    (!plan.paypalPlanId || plan.paypalPlanId.startsWith("PASTE"));

  useEffect(() => {
    if (missingPlanId) return;
    let cancelled = false;

    loadPayPal(isSubscription ? "subscription" : "order")
      .then((paypal) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        const baseStyle = { shape: "rect", color: "gold", layout: "vertical" };
        const handleError = (err) => {
          console.error(err);
          setLoadError("Payment failed. Please try again.");
          onError && onError(err);
        };

        const buttons = isSubscription
          ? paypal.Buttons({
              style: { ...baseStyle, label: "subscribe" },
              createSubscription: (data, actions) =>
                actions.subscription.create({ plan_id: plan.paypalPlanId }),
              onApprove: (data) =>
                onSuccess({
                  type: "subscription",
                  planId: plan.id,
                  subscriptionID: data.subscriptionID,
                }),
              onError: handleError,
            })
          : paypal.Buttons({
              style: { ...baseStyle, label: "pay" },
              createOrder: (data, actions) =>
                actions.order.create({
                  purchase_units: [
                    {
                      description: `${plan.name} plan`,
                      amount: {
                        currency_code: "GBP",
                        value: plan.priceValue.toFixed(2),
                      },
                    },
                  ],
                }),
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                onSuccess({
                  type: "order",
                  planId: plan.id,
                  orderID: order.id,
                });
              },
              onError: handleError,
            });

        buttons.render(containerRef.current);
      })
      .catch(() =>
        setLoadError("Could not load PayPal. Please refresh the page.")
      );

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan.id]);

  if (missingPlanId) {
    return <p>This plan is not available for payment yet.</p>;
  }

  return (
    <div>
      <div ref={containerRef} />
      {loadError && <p style={{ color: "#b00020" }}>{loadError}</p>}
    </div>
  );
}

// ---------- Checkout page ----------
export default function CheckoutPage() {
  const planId = new URLSearchParams(window.location.search).get("plan");
  const plan = PLANS[planId];

  const [status, setStatus] = useState("idle"); // idle | confirming | done | failed
  const [message, setMessage] = useState("");

  async function handleSuccess(result) {
    setStatus("confirming");
    setMessage("Payment received. Activating your plan...");
    try {
      const res = await fetch(CONFIRM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(result),
      });
      if (!res.ok) throw new Error("Server could not verify payment");
      setStatus("done");
      setMessage("Your plan is active. Redirecting...");
      setTimeout(() => {
        window.location.href = SUCCESS_REDIRECT;
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatus("failed");
      setMessage(
        "Payment went through, but we could not activate your plan. Please contact support and quote: " +
          (result.subscriptionID || result.orderID)
      );
    }
  }

  // Galat ya missing plan
  if (!plan) {
    return (
      <main style={styles.wrap}>
        <h1 style={styles.h1}>Plan not found</h1>
        <p>Please choose a plan from the pricing page.</p>
        <a href="/pricing">View plans</a>
      </main>
    );
  }

  // Free plan ko checkout ki zarurat nahi
  if (plan.priceValue === 0) {
    return (
      <main style={styles.wrap}>
        <h1 style={styles.h1}>{plan.name} plan</h1>
        <p>This plan is free. No payment needed.</p>
        <a href={plan.link}>{plan.buttonText}</a>
      </main>
    );
  }

  const billingText =
    plan.period === "one-time"
      ? "One-time payment. No recurring charges."
      : `Billed every ${plan.period}. Cancel anytime from your PayPal account.`;

  return (
    <main style={styles.wrap}>
      <h1 style={styles.h1}>Checkout</h1>

      <section style={styles.summary}>
        <h2 style={styles.h2}>
          {plan.name} <span style={styles.price}>{plan.price}</span>
          {plan.period && plan.period !== "one-time" && (
            <span style={styles.period}> / {plan.period}</span>
          )}
        </h2>
        <p style={styles.muted}>{billingText}</p>
        <ul style={styles.list}>
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      {status === "idle" && (
        <PayPalButton
          plan={plan}
          onSuccess={handleSuccess}
          onError={() => {}}
        />
      )}

      {status !== "idle" && (
        <p
          role="status"
          style={{ color: status === "failed" ? "#b00020" : "inherit" }}
        >
          {message}
        </p>
      )}
    </main>
  );
}

// ---------- Simple styles (apne CSS me badal sakte hain) ----------
const styles = {
  wrap: { maxWidth: 480, margin: "40px auto", padding: "0 16px" },
  h1: { fontSize: 28, marginBottom: 16 },
  h2: { fontSize: 20, margin: "0 0 4px" },
  price: { fontWeight: 700 },
  period: { fontWeight: 400, color: "#555" },
  muted: { color: "#555", marginTop: 0 },
  summary: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  list: { paddingLeft: 20, margin: "12px 0 0" },
};
