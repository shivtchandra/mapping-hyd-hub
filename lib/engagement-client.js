"use client";

/** Anonymous hub funnel → Firestore. No emails, queries, or coordinates. */
export function trackEvent(event, variant = "new") {
  try {
    let s = JSON.parse(sessionStorage.getItem("hyd-hub-session") || "null");
    if (!s || Date.now() - s.started > 1_800_000) {
      s = { id: crypto.randomUUID(), started: Date.now() };
      sessionStorage.setItem("hyd-hub-session", JSON.stringify(s));
    }

    const ref = document.referrer;
    const source = !ref
      ? "direct"
      : /google|bing|duckduckgo/i.test(ref)
        ? "search"
        : /linkedin|instagram|facebook|t\.co|twitter|x\.com/i.test(ref)
          ? "social"
          : "other";
    const device =
      innerWidth < 768 ? "phone" : innerWidth < 1024 ? "tablet" : "desktop";

    fetch("/api/events", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        session: s.id,
        product: "hub",
        variant,
        device,
        source,
      }),
    }).catch(() => {});

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", event, {
        engagement_product: "hub",
        engagement_variant: variant,
        engagement_device: device,
        engagement_source: source,
      });
    }
  } catch {}
}
