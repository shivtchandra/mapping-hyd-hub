"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "../lib/engagement-client.js";
import { LIVE_COUNT } from "../lib/layers.js";

const LOCAL_KEY = "hyd-series-supported";

// Where to Live shipped, so it left this list; numbering continues after the live maps.
const UPCOMING = [
  { n: "05", label: "Lakes & Waterways" },
  { n: "06", label: "Weekend Escapes" },
];
const COUNT_WORD = ["No", "One", "Two", "Three", "Four", "Five", "Six"][LIVE_COUNT] || String(LIVE_COUNT);

export default function SeriesSupport({ embedded = false }) {
  const [count, setCount] = useState(0);
  const [supported, setSupported] = useState(false);
  const [busy, setBusy] = useState(false);
  const [justSupported, setJustSupported] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const hasLocal = localStorage.getItem(LOCAL_KEY) === "1";
        const hasCookie = document.cookie.includes("hyd_supported=1");
        if (hasLocal || hasCookie) {
          setSupported(true);
        }
      }
    } catch {}

    fetch("/api/series-support")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.count === "number") {
          setCount(d.count);
        }
        if (d?.userBacked) {
          setSupported(true);
          try {
            localStorage.setItem(LOCAL_KEY, "1");
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  async function support() {
    if (busy) return;
    if (supported) {
      // Re-trigger pulse animation if already backed
      setJustSupported(false);
      setTimeout(() => setJustSupported(true), 50);
      return;
    }

    setBusy(true);
    setCount((prev) => (typeof prev === "number" ? prev + 1 : 1));
    setSupported(true);
    setJustSupported(true);

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_KEY, "1");
        document.cookie = "hyd_supported=1; max-age=31536000; path=/; SameSite=Lax";
      }
    } catch {}

    try {
      const r = await fetch("/api/series-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const d = await r.json().catch(() => ({}));
      if (typeof d?.count === "number") {
        setCount(d.count);
      }
      if (!d?.already) {
        trackEvent("series_support");
      }
    } catch (err) {
      console.warn("Series support note:", err);
    } finally {
      setBusy(false);
    }
  }

  const cardContent = (
    <div className="atlas-backer-card">
      <div className="backer-left">
        <div className="backer-meta-row">
          <span className="backer-badge">ROADMAP &amp; BACKER LEDGER</span>
          <span className="backer-coords">17.3850° N, 78.4867° E</span>
        </div>

        <h3 id="support-title" className="backer-heading">
          Want the rest of Hyderabad mapped?
        </h3>

        <p className="backer-summary">
          {COUNT_WORD} layers are live. Layers {UPCOMING[0].n}–{UPCOMING[UPCOMING.length - 1].n} are currently in research. A single tap tells us
          the Mapping HYD series is worth continuing — zero login, no spam.
        </p>

        <div className="upcoming-layers-row" aria-label="Upcoming layers">
          <span className="upcoming-label">NEXT UP:</span>
          {UPCOMING.map((u) => (
            <span key={u.n} className="upcoming-pill">
              <strong className="upcoming-num">{u.n}</strong> {u.label}
            </span>
          ))}
        </div>
      </div>

      <div className="backer-right">
        <div className="backer-cta-group">
          <button
            type="button"
            className={`backer-btn${supported ? " is-supported" : ""}${
              justSupported ? " just-backed" : ""
            }`}
            onClick={support}
            disabled={busy}
            aria-pressed={supported}
          >
            <span className="backer-btn-icon" aria-hidden="true">
              {supported ? "✓" : "♥"}
            </span>
            <span className="backer-btn-text">
              {supported
                ? "You’re backing Mapping HYD"
                : busy
                ? "Recording…"
                : "Back the Atlas"}
            </span>
          </button>

          <div className="backer-count-badge" aria-live="polite">
            <span className="backer-pulse-dot" aria-hidden="true" />
            <span>
              {count == null ? (
                "Live ledger…"
              ) : (
                <>
                  <strong>{count.toLocaleString("en-IN")}</strong>{" "}
                  {count === 1 ? "person backs this" : "people back this"}
                </>
              )}
            </span>
          </div>
        </div>

        {supported && (
          <div className="backer-thankyou" role="status">
            ✨ <strong>Thank you!</strong> Your backing directly prioritizes the next Hyderabad layers.
          </div>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return cardContent;
  }

  return (
    <section className="series-support-section" aria-labelledby="support-title">
      {cardContent}
    </section>
  );
}
