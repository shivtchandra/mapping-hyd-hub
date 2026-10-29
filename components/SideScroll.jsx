"use client";

import { useEffect, useRef } from "react";

/**
 * Pins its content while the page scrolls, and turns that vertical scroll into
 * sideways movement of the track. The wrapper is made exactly as tall as the
 * track overflows, so one pixel down moves the cards one pixel left.
 * Reduced motion falls back to a plain horizontal scroller.
 */
export default function SideScroll({ head, children, trackClassName }) {
  const outer = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      o.dataset.mode = "native";
      return;
    }

    let dist = 0;

    // One rect read + one transform write per scroll event: cheap enough to run inline.
    const update = () => {
      const p = dist ? Math.min(1, Math.max(0, -o.getBoundingClientRect().top / dist)) : 0;
      t.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
    };
    const measure = () => {
      dist = Math.max(0, t.scrollWidth - t.clientWidth);
      o.style.height = dist ? `calc(100svh + ${dist}px)` : "";
      o.dataset.mode = dist ? "pinned" : "static";
      update();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={outer} className="side-scroll">
      <div className="side-sticky">
        {head}
        <div ref={track} className={trackClassName}>
          {children}
        </div>
      </div>
    </div>
  );
}
