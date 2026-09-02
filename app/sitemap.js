import { SITES } from "../lib/heritage.js";

const SITE = "https://mapmyhyd.com";

export default function sitemap() {
  const now = new Date();
  const staticPages = ["", "/about", "/heritage"].map((p) => ({
    url: `${SITE}${p || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : p === "/heritage" ? 0.85 : 0.7,
  }));

  const heritagePages = SITES.map((s) => ({
    url: `${SITE}/heritage/${s.id}`,
    lastModified: s.verifiedAt ? new Date(s.verifiedAt) : now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...heritagePages];
}
