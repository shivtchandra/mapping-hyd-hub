"use client";

import { useEffect } from "react";

// Ports the landing page's IntersectionObserver reveal for .layer-row.
export default function Reveal({ selector = ".layer-row" }) {
  useEffect(() => {
    const rows = document.querySelectorAll(selector);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    rows.forEach((r) => r.classList.add("reveal-ready"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.18 }
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, [selector]);

  return null;
}
