import Link from "next/link";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";
import LandingTracker from "../components/LandingTracker.jsx";
import SeriesSupport from "../components/SeriesSupport.jsx";
import LayerClickTracker from "../components/LayerClickTracker.jsx";
import NewsletterSignup from "../components/NewsletterSignup.jsx";
import SideScroll from "../components/SideScroll.jsx";
import { LAYERS, LIVE_COUNT, LIVE_LABEL, TOTAL_PLACES } from "../lib/layers.js";
import "./home.css";

const mapsLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mapping HYD maps",
  itemListElement: LAYERS.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "WebApplication",
      name: l.name,
      url: l.href,
      description: l.desc,
      applicationCategory: "Maps",
      operatingSystem: "Any",
      areaServed: { "@type": "City", name: "Hyderabad" },
    },
  })),
};

// Maps beyond these stay private until they ship; see data/layers.json.
const STEPS = [
  { title: "Pick a question", body: "Where to live, where to eat, who’s hiring, what to see." },
  { title: "Open its map", body: "Every pin is a real place at its real location." },
  { title: "Check the source", body: "Each map shows where its data comes from and when it was updated." },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mapsLd) }} />
      <SiteHeader />
      <LandingTracker />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Mapping HYD · {LIVE_COUNT} maps live</p>
            <h1 id="hero-title">
              <span>Interactive</span>
              <span>maps of</span>
              <span>Hyderabad.</span>
            </h1>
            <p className="hero-summary">
              We take Hyderabad’s scattered data — rents, restaurants, startups, monuments — and turn it
              into maps that each answer one question.
            </p>
            <ol className="hero-steps" aria-label="How it works">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="hero-step-n">{i + 1}</span>
                  <span>
                    <strong>{s.title}</strong> {s.body}
                  </span>
                </li>
              ))}
            </ol>
            <a className="hero-pick" href="#maps">
              Pick a map <span aria-hidden="true">↓</span>
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

        </section>

        <section className="layers maps band band--paper" id="maps" aria-labelledby="maps-title">
          <SideScroll
            trackClassName="map-grid"
            head={
              <div className="maps-head">
                <p className="section-label">The maps</p>
                <h2 id="maps-title">Pick a map.</h2>
                <p className="maps-count">
                  {LIVE_LABEL} · {TOTAL_PLACES.toLocaleString("en-IN")}+ places · tap one to open it
                </p>
              </div>
            }
          >
            {LAYERS.map((l) => (
              <LayerClickTracker key={l.key} layer={l.key}>
                <Link className="map-card" data-layer={l.key} href={l.href}>
                  <figure className="map-shot">
                    <img
                      src={l.image}
                      alt={l.alt}
                      width="1200"
                      height="750"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="map-body">
                    <p className="map-meta">
                      <span>{l.n}</span>
                      <span>Live</span>
                    </p>
                    <h3 className="map-name">{l.name}</h3>
                    <p className="map-desc">{l.question}</p>
                    <div className="map-foot">
                      <span className="map-stat">{l.stat}</span>
                      <span className="map-open">
                        Open map <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </LayerClickTracker>
            ))}
          </SideScroll>

          <Link href="/data" className="origin-more maps-sources">
            Where the data comes from →
          </Link>
        </section>

        <NewsletterSignup source="home" />

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
              digital layer on top of it.</em> One map became four.
            </p>
            <Link href="/about" className="origin-more">
              Read the full story →
            </Link>
          </div>

          {/* Paper is cut out of these files (transparent), so they sit on any band colour. */}
          <figure className="origin-figure" aria-hidden="true">
            <img className="origin-strip" src="/assets/page-atlas-cut.webp" alt="" loading="lazy" />
            <img className="origin-scene" src="/assets/atlas-scene.webp" alt="" width="782" height="695" loading="lazy" />
          </figure>
        </section>

        <section className="backer-end" aria-label="What we map next">
          <SeriesSupport embedded />
        </section>
      </main>

      <SiteFooter />
      <Reveal selector=".map-card" />
    </>
  );
}
