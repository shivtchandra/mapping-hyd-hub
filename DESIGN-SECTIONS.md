# mapmyhyd.com — section plan & image use

## What was wrong

The old hero painted the huge `MAPPING HYD.` type directly over the busy
watercolour with a weak translucent wash. The black display face collided with
Charminar's minarets; tagline and summary were unreadable over the art; on
mobile it collapsed into a cramped overlap. Fix: **separate type from art.**
Type lives on clean paper. The illustration gets its own framed or full-bleed
band where nothing sits on top of it.

## The four images and where each goes

| Asset | Size | Role |
|-------|------|------|
| `hero-full` | 1672×941 landscape panorama | Hero right-column framed crop (desktop) + full-bleed **closing band** above the footer, no text over it |
| `campaign-expanded` | 1086×1448 portrait, has `17.3850° N, 78.4867° E` | `/about` hero art + the **mobile** hero image (stacked under the type) |
| `page-atlas` | 941×1672 tall "journey" strip | **Sticky rail** beside the layers list on desktop; a divider image on mobile |
| `og-image` | 1200×630, lockup baked in | social card only (metadata) |
| `favicon.svg` | — | tab icon |

## Landing (`/`) — sections top to bottom

1. **Header** — `MAPPING HYD.` / `03 LIVE`, thin rule. Unchanged.

2. **Hero** — 2-column on desktop, stacked on mobile.
   - *Left / top:* eyebrow `A LIVING ATLAS OF HYDERABAD · EST. 2026`, h1
     `MAPPING HYD.`, tagline `Hyderabad, one layer at a time.`, one-line
     summary, CTA `EXPLORE THE LAYERS ↓`. All on solid paper — nothing behind.
   - *Right (desktop):* `hero-full` cropped to the Charminar + lake portion,
     inside a 1px-bordered `<figure>` with a mono caption:
     `Charminar · Hussain Sagar · the Financial District — one route.`
   - *Mobile:* `campaign-expanded` as a full-width image band **below** the type.

3. **Origin story (condensed)** — new on the landing, ~110 words.
   Label `WHY THIS EXISTS`. The bored-evening → startup map → the response →
   "the gap wasn't substance, it was a missing digital layer" → so it became a
   series. Ends: `Read the full story →` → `/about`. Readable single column;
   a faint vertical slice of `page-atlas` pinned right as texture (desktop only,
   low opacity, `aria-hidden`).

4. **What this is** — the existing big statement:
   *"Hyderabad has the data, places and stories. They are scattered. Mapping HYD
   turns them into useful, searchable maps — one layer at a time."* Kept.

5. **The layers** — the 6-row list (row design kept; it's the strength).
   Desktop: 2-column — list left, `page-atlas` **sticky** in a right column so
   the vertical journey art scrolls alongside the stacking layers. Mobile:
   `page-atlas` becomes a full-width divider between the heading and the list,
   or is dropped under 620px.
   Rows: 01 Startup Map · 02 Eateries Race · 03 Deccan Heritage (all live) ·
   04 Where to Live · 05 Weekend Escapes · 06 Lakes (in progress).

6. **Closing band** — full-bleed `hero-full` panorama, no text, mono caption
   strip under it: `Mapping the city as it changes.` Then the black footer.

7. **Footer** — `BUILT IN HYDERABAD.` + About / Heritage links. Unchanged.

## `/about`

Keep the story copy. Add `campaign-expanded` as the page's hero art (portrait,
carries the coordinates — fits a story page). This page holds the **full**
origin narrative; the landing only teases it.

## `/heritage` and `/heritage/[slug]`

Unchanged this pass. Optional later: the Golconda-ruins crop from the bottom of
`page-atlas` as a faint texture on the heritage index header.

## CSS changes

- Remove `.hero-background` absolute overlay + `::after` wash.
- `.hero` → `display: grid; grid-template-columns: 1.05fr 0.95fr` desktop,
  single column ≤980px. New `.hero-figure` (bordered, `overflow:hidden`,
  `object-fit: cover`, fixed aspect) + `.hero-caption` (mono, muted).
- New `.origin` (section label + prose column + `.origin-rail` decorative image).
- `.layers` → optional 2-col wrapper `.layers-grid` with `.layers-rail`
  (`position: sticky; top: 88px`), collapses ≤980px.
- New `.closing-band` (full-bleed `width:100vw; margin-left:calc(50% - 50vw)`)
  + `.closing-caption`.
- Keep all existing tokens, layer-row styles, reduced-motion block.
