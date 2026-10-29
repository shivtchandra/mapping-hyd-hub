"use client";

import { useEffect, useRef } from "react";

/**
 * Giant footer wordmark. Letters wait below the baseline until the word has
 * scrolled well into view (past the bottom 30% of the screen), then rise once.
 * Without JS, or with reduced motion, the word simply shows.
 */
export default function FooterWord() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.reveal = "armed";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.reveal = "in";
        io.disconnect();
      },
      { rootMargin: "0px 0px -30% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const letters = (word, start) =>
    [...word].map((ch, i) => (
      <span key={i} style={{ "--i": start + i }}>
        {ch}
      </span>
    ));

  return (
    <p ref={ref} className="sf-word" aria-label="Mapping HYD">
      <span aria-hidden="true">
        {letters("Mapping", 0)} <em>{letters("HYD.", 7)}</em>
      </span>
    </p>
  );
}
