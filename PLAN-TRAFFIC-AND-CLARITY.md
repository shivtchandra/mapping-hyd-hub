# mapmyhyd.com hub — plan: make the site explain itself

Site folder: `place finder/mapping-hyd-hub/` (Next.js, static export on Cloudflare Pages, API on a Worker).
Written 2026-10-29. Builds on `../MAPMYHYD-CONTENT-SEO-PLAN.md` (does not replace it).
Scope: the website only. Instagram / reel / bio-link work is out of scope; the site should make sense to anyone, from any source.

## 1. Goal

A stranger lands on mapmyhyd.com from anywhere (search, WhatsApp, LinkedIn, a friend) and within 5 seconds knows:
1. **what it is**: interactive maps that answer questions about Hyderabad,
2. **what exists right now**: 4 live maps, each with a clear "use it to...",
3. **why trust it**: real places, named open data,
4. **where to go next**: open a map, and find the other three from inside it.

## 2. What I found

| # | Finding | Evidence |
|---|---|---|
| 1 | Hero is abstract. "A living atlas of Hyderabad" and "Hyderabad, one layer at a time" say nothing concrete about what a visitor can do. | `app/page.jsx:49-58` |
| 2 | 4 maps are live (startups, eats, heritage, live: all return 200) but the hub lists 3 and says "03 live", hardcoded in 3 places. Where to Live (water + flood score, 55 areas) is kept off the hub. | `app/page.jsx:37,43,138`, `components/SiteHeader.jsx:11` |
| 3 | Map rows are text only. No preview, no number, no question answered. The images are decorative atlas art. | `app/page.jsx:145-172` |
| 4 | No "how it works / where data comes from" on the home page. `/about` has a 532-line page with FAQ and roadmap that most visitors never reach. | `app/about/page.jsx` |
| 5 | The four maps are separate subdomain apps. Someone inside one map has no way to learn the other three exist. | nav only exists on the hub |
| 6 | Page title and OG say "Food, Heritage & Startups"; Where to Live is missing. | live `<title>` |
| 7 | Hardly findable: Google gave 1 click / 42 impressions in 3 months. | Search Console, 1 Aug–29 Oct |
| 8 | Cannot see what visitors do. GA4 not on the page and not connected. Own tracker only buckets referrers into search/social/other and ignores UTM. | `lib/engagement-client.js:12-19` |
| 9 | Search Console lists `www.mapmyhyd.com/...` URLs while canonical is the apex. Check the www redirect. | GSC pages; `app/layout.jsx:14` |

## 3. Phases (smallest first)

### Phase 1 — rework the home page
Files: `app/page.jsx`, `app/layout.jsx`, `components/SiteHeader.jsx`, `components/SiteFooter.jsx`, `app/globals.css`, new `data/layers.json`.
1. **Hero**: plain statement, e.g. "Interactive maps of Hyderabad." Sub-line: "Where to live, where to eat, who's building, what's worth seeing. Real places and open data, on maps you can use today." Single CTA: *Pick a map*.
2. **The 4 maps** directly under the hero (2x2 desktop, stacked on phone). Each card: real screenshot, name, the question it answers ("Which areas have water and flood risk?"), one live number (areas scored, startups mapped, eateries, heritage sites), Open button. Order: Where to Live, Eats, Startups, Heritage. Numbers and "4 live" come from `layers.json` / build-time counts, not hardcoded.
3. **How it works** (three short blocks): real places (verified coordinates), open data (sources named), built one question at a time. Concrete, no slogans. A total ("N places across 4 maps") derived from data.
4. Origin story shortened, linking to `/about`.
5. **Header + footer**: a "Maps" menu listing all four, count derived. Footer lists all four maps, About, and social links.
6. **Title / description / OG**: "Mapping HYD: interactive maps of Hyderabad. Where to live, eat, startups and heritage."

### Phase 2 — make the 4 maps feel like one product
- Slim shared bar in each map app: "Mapping HYD · Where to Live · Eats · Startups · Heritage", plus an "explore the other maps" block at the end of a flow. Biggest lever for cross-use, since people already inside one map are the warmest audience.
- Apps: `where-to-live-map`, `hyderabad-eateries-map`, `hyderabad-startup-map`, `deccan-heritage-map`. One small shared snippet, copied or vendored.

### Phase 3 — be findable
- A page per map on the hub (`/where-to-live`, `/eats`, `/startups`, `/heritage`): what it is, who it's for, what data, screenshots, FAQ, JSON-LD, link to the live app. These also serve as the "understand what we do" pages.
- Sitemap + `public/llms.txt` updated; verify www → apex redirect and canonical.
- Follow `../MAPMYHYD-CONTENT-SEO-PLAN.md` for per-entity pages and keywords; not repeated here.

### Phase 4 — measure
- Connect GA4 for mapmyhyd.com in OpenRush (needs you, one-time).
- Extend `trackEvent`: map-card clicks per map, scroll to maps, outbound per map; capture `utm_*`; classify in-app browsers.
- Report: hub → map click-through, and share of visitors who open 2+ maps.

### Later (optional)
- **Stories / Journal**: short sourced write-ups (e.g. where Hyderabad's water and power come from), shown as site content, not tied to any social channel. Good for search and as proof of depth.

## 4. Success checks
- 5-second test: 3 people see the home page cold; each says in one sentence what the site is and names at least 2 maps.
- Hub → map click-through (target set after one week of Phase 4 data).
- Share of visitors who open 2+ maps (the cross-use signal; Phase 2 should lift it).

## 5. Open decisions (need you)
1. **Hero wording**: "Interactive maps of Hyderabad." OK, or a different one-liner?
2. **Coming next**: show unreleased maps (Lakes, Things-to-do, Commute, others) as a "coming next" row, or keep them private as the code comment says today?
3. **Per-map pages** (Phase 3) now alongside Phase 1, or after?
4. **Stories / Journal**: yes or no.
5. **GA4**: connect now, or own tracker only for the first week.
