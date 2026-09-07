import { SITES } from "../lib/heritage.js";

const SITE = "https://mapmyhyd.com";

export default function sitemap() {
  const now = new Date();
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/heritage", priority: 0.9 },
  ].map(({ path: p, priority }) => ({
    url: `${SITE}${p || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));

  const heritagePages = SITES.map((s) => ({
    url: `${SITE}/heritage/${s.id}`,
    lastModified: s.verifiedAt ? new Date(s.verifiedAt) : now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...heritagePages];
}
