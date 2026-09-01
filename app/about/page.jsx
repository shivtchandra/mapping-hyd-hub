import Link from "next/link";
import SiteHeader from "../../components/SiteHeader.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";

const SITE = "https://mapmyhyd.com";

export const metadata = {
  title: "About — how Mapping HYD started, and where it's going",
  description:
    "Mapping HYD began as a Hyderabad startup map. It became a series: startups, food, neighbourhoods, lakes, weekend escapes and heritage — one layer of the city at a time.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Mapping HYD",
    description:
      "How a bored-evening startup map turned into a growing digital atlas of Hyderabad.",
    url: `${SITE}/about`,
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
  },
};

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Mapping HYD",
  url: `${SITE}/about`,
  about: { "@id": `${SITE}/#organization` },
  publisher: { "@id": `${SITE}/#organization` },
};

export default function About() {
  return (
    <>
      <SiteHeader active="about" liveLabel="02 live" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />

      <main className="doc">
        <p className="section-label">The story</p>
        <h1 className="doc-title">
          Where this started, and what it’s building toward.
        </h1>

        <figure className="about-art">
          <picture>
            <source srcSet="/assets/campaign-expanded.webp" type="image/webp" />
            <img
              src="/assets/campaign-expanded.jpg"
              width="1086"
              height="1448"
              alt="Illustrated Hyderabad at 17.3850°N, 78.4867°E — Charminar, a lake, a stepwell, the Metro and Irani chai, joined by a route."
              decoding="async"
            />
          </picture>
          <figcaption>17.3850° N, 78.4867° E — one city, drawn as one route.</figcaption>
        </figure>

        <div className="doc-body">
          <h2>How it started</h2>
          <p>
            It began out of boredom. No grand plan, no market-research spreadsheet — just idle
            curiosity on a slow evening. I’d been looking at interactive city maps that exist for
            places like San Francisco or Bangalore, and one question followed me around for days:
            why doesn’t Hyderabad have something like this?
          </p>
          <p>
            So I built one. A startup map, plotting the city’s companies at real office locations,
            filterable by sector. Nothing fancy in scope — just something that didn’t exist yet. I
            posted it around a few platforms without much expectation, and the response surprised
            me. People shared it, asked when their company would be added. The gap wasn’t that
            Hyderabad lacked substance; it was that nobody had built a visible, digital layer on
            top of what was already here. That reaction turned a bored evening into a direction.
          </p>
          <p>
            The next idea was impossible to miss if you live here: a new cafe every week, sometimes
            every few days, and no good way to actually explore it. So the second build became the{" "}
            <Link href="/eats">Eateries Race</Link> — a discovery map with a leaderboard, weekly
            themes, and a GPS-verified check-in so claiming a spot means you were actually there. A
            game layered on a map, for a city where the food scene is one of the fastest-changing
            things about it.
          </p>
          <p>
            Two projects in, the realisation landed: why stop at startups and food. I grew up in
            this city and live in it now, and there wasn’t one place to understand any layer of it
            — heritage, neighbourhoods, water, weekends — all of it scattered across government
            PDFs, outdated blog posts and word of mouth. That became Mapping HYD, shaped alongside
            my cofounder <strong>Shiva Chandra Takkelapati</strong> from a loose ambition into a
            real series: startups, where to live, weekend escapes, lakes, heritage — each a
            separate layer of the same city, under one growing product.
          </p>

          <h2>Why a series, not a single app</h2>
          <p>
            A single app has a ceiling. It solves one problem and plateaus. A series compounds:
            every new map extends the reach of the whole, every mention strengthens the same
            domain, and every person who finds one map has more waiting once they’re in. Mapping
            HYD isn’t six apps that share a brand — it’s one product with six features, shipped one
            at a time.
          </p>

          <h2>How the pages are built</h2>
          <p>
            The plan is simple to state and slower to execute: keep shipping one layer at a time,
            keep the pages specific instead of general, and let the domain do the compounding while
            the content does the answering. Every locality gets its own page. Every lake. Every
            landmark. Dozens, eventually hundreds, of specific answers instead of one general page
            trying to rank for everything.
          </p>

          <h2>What’s live</h2>
          <ul>
            <li>
              <Link href="/startups">Hyderabad Startup Map</Link> — companies, open jobs, funding.
            </li>
            <li>
              <Link href="/eats">Eateries Race</Link> — discovery map with a city leaderboard.
            </li>
          </ul>
          <p>
            <Link href="/heritage">Deccan Heritage</Link>, Where to Live, Weekend Escapes and Lakes
            are in progress.
          </p>

          <p className="doc-back">
            <Link href="/">← Back to the atlas</Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
