"use client";

import { useEffect, useState } from "react";
import { NEWSLETTER, EMAIL_RE } from "../lib/newsletter.js";
import { trackEvent } from "../lib/engagement-client.js";

const LOCAL_KEY = "hyd-newsletter-joined";

export default function NewsletterSignup({ source = "home" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | invalid | error

  useEffect(() => {
    try {
      if (localStorage.getItem(LOCAL_KEY) === "1") setState("done");
    } catch {}
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const value = email.trim();
    if (!EMAIL_RE.test(value)) return setState("invalid");

    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source, company: e.currentTarget.elements.company.value }),
      });
      if (!res.ok) throw new Error(String(res.status));
      try {
        localStorage.setItem(LOCAL_KEY, "1");
      } catch {}
      trackEvent("newsletter_signup");
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="news" id="newsletter" aria-labelledby="news-title">
      <div className="news-inner">
        <p className="news-label">Newsletter</p>
        <h2 id="news-title">{NEWSLETTER.name}</h2>
        <p className="news-promise">{NEWSLETTER.promise}</p>

        {state === "done" ? (
          <p className="news-done" role="status">
            You’re on the list. We’ll write when there’s something worth reading.
          </p>
        ) : (
          <form className="news-form" onSubmit={onSubmit} noValidate>
            <label className="sr-only" htmlFor="news-email">
              Email address
            </label>
            <input
              id="news-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "invalid" || state === "error") setState("idle");
              }}
              aria-invalid={state === "invalid"}
              aria-describedby="news-fine"
              required
            />
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="news-hp"
            />
            <button type="submit" disabled={state === "sending"}>
              {state === "sending" ? "Joining…" : "Join"}
            </button>
            <p
              id="news-fine"
              className={state === "invalid" || state === "error" ? "news-fine is-error" : "news-fine"}
              role={state === "invalid" || state === "error" ? "alert" : undefined}
            >
              {state === "invalid"
                ? "That email doesn’t look right. Check it and try again."
                : state === "error"
                  ? "Couldn’t sign you up just now. Please try again in a moment."
                  : NEWSLETTER.fine}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
