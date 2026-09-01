import sitesRaw from "../data/heritage-sites.json";

export const ERAS = {
  earlier: { label: "Pre-Qutb Shahi", color: "#7a6e8c", note: "Kakatiya / early Golconda, before 1518" },
  "qutb-shahi": { label: "Qutb Shahi", color: "#3e7c8c", note: "1518–1687" },
  "asaf-jahi": { label: "Asaf Jahi", color: "#c98b2e", note: "Nizams, 1724–1948" },
  "british-residency": { label: "British Residency", color: "#8c5a3c", note: "Company & Raj presence" },
  "nizam-civic": { label: "Nizam-era Civic", color: "#6b7b4a", note: "Public works, ~1880–1948" },
};
export const ERA_ORDER = ["earlier", "qutb-shahi", "asaf-jahi", "british-residency", "nizam-civic"];

export const TYPES = {
  tomb: "Tomb",
  mosque: "Mosque",
  baoli: "Stepwell",
  palace: "Palace",
  fort: "Fort",
  gateway: "Gateway",
  civic: "Civic building",
  mansion: "Mansion / Deodi",
  temple: "Temple",
  church: "Church",
  tank: "Tank / Lake",
  cemetery: "Cemetery",
};

export const STATUS = {
  "asi-protected": "ASI protected",
  "state-protected": "State protected",
  "intach-listed": "INTACH listed",
  unprotected: "Unprotected",
  "at-risk": "At risk",
  lost: "Lost / demolished",
};

export const ACCESS = {
  open: "Open access",
  ticketed: "Ticketed",
  restricted: "Restricted entry",
  ruin: "Ruin — open ground",
  private: "Private — view from outside",
};

export const eraLabel = (e) => ERAS[e]?.label || "Unknown era";
export const eraColor = (e) => ERAS[e]?.color || "#948567";
export const typeLabel = (t) => TYPES[t] || "Structure";
export const statusLabel = (s) => STATUS[s] || "Unlisted";
export const accessLabel = (a) => ACCESS[a] || a || "—";

// Sorted, stable list. slug === id.
export const SITES = [...sitesRaw].sort((a, b) => a.name.localeCompare(b.name));

export function getSite(slug) {
  return SITES.find((s) => s.id === slug) || null;
}

function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// Up to `n` related sites: same era first (nearest by distance), then nearest
// overall. Never includes the site itself.
export function siblingsOf(site, n = 5) {
  const others = SITES.filter((s) => s.id !== site.id).map((s) => ({
    s,
    km: haversineKm(site, s),
    sameEra: s.era === site.era,
  }));
  others.sort((a, b) => {
    if (a.sameEra !== b.sameEra) return a.sameEra ? -1 : 1;
    return a.km - b.km;
  });
  return others.slice(0, n).map((o) => o.s);
}

export const COUNTS = {
  total: SITES.length,
  byEra: ERA_ORDER.map((e) => ({ era: e, n: SITES.filter((s) => s.era === e).length })).filter((x) => x.n),
  atRisk: SITES.filter((s) => s.status === "at-risk" || s.status === "lost").length,
  stepwells: SITES.filter((s) => s.type === "baoli").length,
};
