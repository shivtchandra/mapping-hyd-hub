import Link from "next/link";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";

const LAYERS = [
  {
    n: "01",
    key: "startup",
    name: "Hyderabad Startup Map",
    desc: "See who’s building in Hyderabad — companies, funding and open jobs, on a live map.",
    href: "https://startups.mapmyhyd.com/",
    status: "Live",
    live: true,
  },
  {
    n: "02",
    key: "eats",
    name: "Eateries Race",
    desc: "Find where to eat near you, check in on the spot, and climb a city-wide leaderboard.",
    // href: "/eats",  — temporarily offline, coming back soon
    status: "Coming soon",
    live: false,
  },
  {
    n: "03",
    key: "heritage",
    name: "Deccan Heritage",
    desc: "Walk the city’s history — every monument, tomb and stepwell, by era, with routes you build.",
    href: "/heritage",
    status: "In development",
    live: false,
  },
  // Layers 04+ kept private — not listing publicly yet
];

export default function Home() {
  return (
    <>
      <SiteHeader liveLabel="01 live" />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A living atlas of Hyderabad · Est. 2026</p>
            <h1 id="hero-title">
              <span>Mapping</span>
              <span>HYD.</span>
            </h1>
            <p className="hero-tagline">Hyderabad, one layer at a time.</p>
            <p className="hero-summary">
              Maps that answer the questions this city actually asks — where to eat, where to
              live, what’s worth the drive, what’s being lost. Built one layer at a time.
            </p>
            <a className="hero-cta" href="#layers">
              Explore the layers <span aria-hidden="true">↓</span>
            </a>
          </div>

          <figure className="hero-figure desktop">
            <picture>
              <source srcSet="/assets/hero-full.webp" type="image/webp" />
              <img
                src="/assets/hero-full.jpg"
                width="1672"
                height="941"
                alt="Illustrated Hyderabad: Charminar, Hussain Sagar, the Metro and Financial District joined by a single map route."
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <figcaption>Charminar · Hussain Sagar · the Financial District — one route.</figcaption>
          </figure>

          <figure className="hero-figure mobile">
            <picture>
              <source srcSet="/assets/campaign-expanded.webp" type="image/webp" />
              <img
                src="/assets/campaign-expanded.jpg"
                width="1086"
                height="1448"
                alt="Illustrated Hyderabad at 17.3850°N, 78.4867°E — Charminar, a lake, the Metro and Irani chai."
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </figure>
        </section>

        <section className="origin band band--deep" aria-labelledby="origin-label">
          <div className="origin-inner">
            <p className="section-label" id="origin-label">
              Why this exists
            </p>
            <p className="origin-body">
              It started on a slow evening. I’d been looking at interactive city maps for places
              like San Francisco and Bangalore, and one question stuck: why doesn’t Hyderabad have
              this? So I built a startup map. People shared it, asked to be added — and the gap was
              obvious. <em>Not that the city lacked substance, but that nobody had built a visible,
              digital layer on top of it.</em> One map became a series.
            </p>
            <Link href="/about" className="origin-more">
              Read the full story →
            </Link>
          </div>

          <figure className="origin-figure" aria-hidden="true">
            <picture>
              <source srcSet="/assets/page-atlas.webp" type="image/webp" />
              <img src="/assets/page-atlas.webp" alt="" loading="lazy" />
            </picture>
          </figure>
        </section>

        <section className="purpose band band--paper" aria-labelledby="purpose-label">
          <p className="section-label" id="purpose-label">
            What this is
          </p>
          <div>
            <p className="purpose-copy">
              Hyderabad has the data, places and stories. <em>They are scattered.</em> Mapping HYD
              turns them into useful, searchable maps — one layer at a time.
            </p>
            <p className="purpose-kicker">Open data · real places · a map you can actually use.</p>
          </div>
        </section>

        <section className="layers band band--deep" id="layers" aria-labelledby="layers-title">
          <p className="section-label" style={{ marginBottom: 8 }}>
            The maps
          </p>
          <div className="layers-heading">
            <h2 id="layers-title">The layers</h2>
            <p>01 live · more in progress</p>
          </div>

          <figure className="layers-divider" aria-hidden="true">
            <img src="/assets/hero-full.webp" alt="" loading="lazy" />
          </figure>

          <div className="layers-grid">
            <div className="layer-list">
              {LAYERS.map((l) =>
                l.live ? (
                  <Link key={l.n} className="layer-row live" data-layer={l.key} href={l.href}>
                    <span className="layer-number">{l.n}</span>
                    <h3 className="layer-name">{l.name}</h3>
                    <p className="layer-description">{l.desc}</p>
                    <span className="layer-status">{l.status}</span>
                    <span className="layer-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                ) : (
                  <article key={l.n} className="layer-row" data-layer={l.key}>
                    <span className="layer-number">{l.n}</span>
                    <h3 className="layer-name">{l.name}</h3>
                    <p className="layer-description">{l.desc}</p>
                    <span className="layer-status">{l.status}</span>
                    <span className="layer-arrow" aria-hidden="true">
                      —
                    </span>
                  </article>
                )
              )}
            </div>

            <figure className="layers-rail" aria-hidden="true">
              <img src="/assets/page-atlas.webp" alt="" loading="lazy" />
              <figcaption>Six layers, one city.</figcaption>
            </figure>
          </div>
        </section>

      </main>

      <SiteFooter />
      <Reveal />
    </>
  );
}
