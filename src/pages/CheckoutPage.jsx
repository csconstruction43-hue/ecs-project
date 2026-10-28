// src/pages/CheckoutPage.jsx
// Guest checkout (login nahi) + ek-baar ka payment (weekly / monthly / lifetime).
// PayPal account ki zarurat nahi: card se bhi pay ho sakta hai.
// Auto-renew nahi hota. Access ki expiry server par email ke saath save hogi.

import { useEffect, useRef, useState } from "react";
import { PLANS } from "../lib/pricingPlans";

// ---------- Settings ----------
const PAYPAL_CLIENT_ID =
  "Afc27Ar06j2wkEWnZ5z4TAchElICCAZ_00S11o-WFd4NGnop1AJul95o3kwKjfMynzjuaNapyV9-iCtD";

// Server endpoint jo payment verify karke access dega (server/index.js me banana hai)
const CONFIRM_ENDPOINT = "/api/paypal/confirm";

// Payment safal hone ke baad user kahan jayega
const SUCCESS_REDIRECT = "/";

// ---------- PayPal SDK loader ----------
let sdkPromise = null;
function loadPayPal() {
  if (window.paypal) return Promise.resolve(window.paypal);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&intent=capture&currency=GBP`;
    s.setAttribute("data-paypal-sdk", "true");
    s.onload = () => resolve(window.paypal);
    s.onerror = () => {
      sdkPromise = null;
      reject(new Error("PayPal SDK load failed"));
    };
    document.body.appendChild(s);
  });
  return sdkPromise;
}

// ---------- PayPal button (one-time payment) ----------
function PayPalButton({ plan, onSuccess }) {
  const containerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    loadPayPal()
      .then((paypal) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        paypal
          .Buttons({
            style: { shape: "rect", color: "gold", layout: "vertical", label: "pay" },
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
              onSuccess({ planId: plan.id, orderID: order.id });
            },
            onError: (err) => {
              console.error(err);
              setError("Payment failed. Please try again.");
            },
          })
          .render(containerRef.current);
      })
      .catch(() => setError("Could not load PayPal. Please refresh the page."));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan.id]);

  return (
    <div>
      <div ref={containerRef} />
      {error && <p style={{ color: "#b00020" }}>{error}</p>}
    </div>
  );
}

// ---------- Checkout page ----------
export default function CheckoutPage() {
  const planId = new URLSearchParams(window.location.search).get("plan");
  const plan = PLANS[planId];

  const [status, setStatus] = useState("idle"); // idle | confirming | done | failed
  const [message, setMessage] = useState("");

  // Login nahi chahiye: sirf email, taaki payment us email se jud jaye
  const [email, setEmail] = useState("");
  const emailRef = useRef("");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function handleSuccess(result) {
    setStatus("confirming");
    setMessage("Payment received. Activating your plan...");
    try {
      const res = await fetch(CONFIRM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result, email: emailRef.current }),
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
          result.orderID
      );
    }
  }

  if (!plan) {
    return (
      <main style={styles.wrap}>
        <h1 style={styles.h1}>Plan not found</h1>
        <p>Please choose a plan from the pricing page.</p>
        <a href="/pricing">View plans</a>
      </main>
    );
  }

  if (plan.priceValue === 0) {
    return (
      <main style={styles.wrap}>
        <h1 style={styles.h1}>{plan.name} plan</h1>
        <p>This plan is free. No payment needed.</p>
        <a href={plan.link}>{plan.buttonText}</a>
      </main>
    );
  }

  const billingText = plan.accessDays
    ? `One-time payment for ${plan.accessDays} days of access. No auto-renewal.`
    : "One-time payment. Access never expires.";

  return (
    <main style={styles.wrap}>
      <h1 style={styles.h1}>Checkout</h1>

      <section style={styles.summary}>
        <h2 style={styles.h2}>
          {plan.name} <span style={styles.price}>{plan.price}</span>
        </h2>
        <p style={styles.muted}>{billingText}</p>
        <ul style={styles.list}>
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      {status === "idle" && (
        <>
          <label htmlFor="checkout-email" style={styles.label}>
            Your email (no account needed)
          </label>
          <input
            id="checkout-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              emailRef.current = e.target.value.trim();
            }}
            style={styles.input}
          />
          <p style={styles.muted}>
            We use this email to activate your plan and send your receipt.
          </p>

          {emailOk ? (
            <PayPalButton plan={plan} onSuccess={handleSuccess} />
          ) : (
            <p style={styles.muted}>Enter a valid email to see the payment button.</p>
          )}
        </>
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

// ---------- Simple styles ----------
const styles = {
  wrap: { maxWidth: 480, margin: "40px auto", padding: "0 16px" },
  h1: { fontSize: 28, marginBottom: 16 },
  h2: { fontSize: 20, margin: "0 0 4px" },
  price: { fontWeight: 700 },
  muted: { color: "#555", marginTop: 0 },
  summary: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  list: { paddingLeft: 20, margin: "12px 0 0" },
  label: { display: "block", fontWeight: 600, marginBottom: 6 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    fontSize: 16,
    border: "1px solid #bbb",
    borderRadius: 6,
    marginBottom: 6,
  },
};
