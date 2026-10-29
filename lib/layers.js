import layers from "../data/layers.json";

/** The live maps, in display order. Every count on the hub derives from this. */
export const LAYERS = layers;
export const LIVE_COUNT = layers.length;
export const LIVE_LABEL = `${String(LIVE_COUNT).padStart(2, "0")} live`;

const sum = layers.reduce((n, l) => n + l.count, 0);
export const TOTAL_PLACES = Math.floor(sum / 100) * 100;
