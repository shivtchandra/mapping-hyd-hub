"use client";

import { trackEvent } from "../lib/engagement-client.js";

/** Wrap live layer links so outbound clicks count as useful hub visits. */
export default function LayerClickTracker({ children, layer }) {
  return (
    <span
      onClick={() => trackEvent("layer_click")}
      onKeyDown={(e) => {
        if (e.key === "Enter") trackEvent("layer_click");
      }}
      data-layer={layer}
      style={{ display: "contents" }}
    >
      {children}
    </span>
  );
}
