"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "../lib/engagement-client.js";

const LOCAL_KEY = "hyd-series-supported";

export default function SeriesSupport() {
  const [count, setCount] = useState(null);
  const [supported, setSupported] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      setSupported(localStorage.getItem(LOCAL_KEY) === "1");
    } catch {}
    fetch("/api/series-support")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});
  }, []);

  async function support() {
    if (busy || supported) return;
    setBusy(true);
    try {
      const r = await fetch("/api/series-support", { method: "POST" });
      const d = await r.json().catch(() => ({}));
      if (typeof d.count === "number") setCount(d.count);
      setSupported(true);
      try {
        localStorage.setItem(LOCAL_KEY, "1");
      } catch {}
      if (!d.already) trackEvent("series_support");
    } catch {
      /* keep UI calm */
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="series-support band band--paper" aria-labelledby="support-label">
      <div className="series-support-inner">
        <p className="section-label" id="support-label">
          The series
        </p>
        <h2 className="series-support-title">Like this atlas?</h2>
        <p className="series-support-copy">
          One tap tells us the Mapping HYD series is worth continuing — no account, no email.
        </p>
        <div className="series-support-row">
          <button
            type="button"
            className={`series-support-btn${supported ? " is-on" : ""}`}
            onClick={support}
            disabled={busy || supported}
            aria-pressed={supported}
          >
            {supported ? "You’re supporting the series" : busy ? "Saving…" : "Support the series"}
          </button>
          <p className="series-support-count" aria-live="polite">
            {count == null ? "…" : `${count.toLocaleString("en-IN")} ${count === 1 ? "person supports" : "people support"} this`}
          </p>
        </div>
      </div>
    </section>
  );
}
