import Link from "next/link";
import SiteHeader from "../../components/SiteHeader.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";
import LandingTracker from "../../components/LandingTracker.jsx";
import SeriesSupport from "../../components/SeriesSupport.jsx";

const SITE = "https://mapmyhyd.com";

export const metadata = {
  title: "About — How Mapping HYD Happened & Founder Story",
  description:
    "Mapping HYD is a living digital atlas of Hyderabad, built independently by Shiva Chandra Takkelapati and Nitya. Explore how a bored-evening startup map grew into a multi-layer civic cartography project.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Mapping HYD · The Founder Story",
    description:
      "How a bored-evening startup map turned into a living digital atlas of Hyderabad.",
    url: `${SITE}/about`,
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
  },
};

const FAQ = [
  {
    q: "What are the best places to visit in Hyderabad?",
    a: "Start with the living heritage layer — Charminar, Golconda Fort, Chowmahalla, Salar Jung and dozens more — then branch into food and startups as you explore the city.",
    href: "https://heritage.mapmyhyd.com/",
    label: "Explore Deccan Heritage",
    layer: "heritage",
    layerName: "Layer 03 · Heritage",
  },
  {
    q: "Where is Charminar, and what else is nearby?",
    a: "Charminar sits at the Old City centre. Mapping HYD’s heritage pages cover the monument plus nearby Mecca Masjid, Chowmahalla and surrounding gates — with access notes and related sites.",
    href: "https://heritage.mapmyhyd.com/sites/charminar",
    label: "Open Charminar Guide",
    layer: "heritage",
    layerName: "Layer 03 · Heritage",
  },
  {
    q: "What should I know about Golconda Fort?",
    a: "Golconda is the old citadel west of the city. The heritage page pairs the fort with the Qutb Shahi Tombs and visit basics so you can plan a half-day without hunting five tabs.",
    href: "https://heritage.mapmyhyd.com/sites/golconda-fort",
    label: "Open Golconda Guide",
    layer: "heritage",
    layerName: "Layer 03 · Heritage",
  },
  {
    q: "Where can I find the best biryani and restaurants in Hyderabad?",
    a: "Hyderabad Eats is the food layer — map discovery, weekly community rankings, and Google-review baselines for biryani, cafes and restaurants across the city.",
    href: "https://eats.mapmyhyd.com/rankings/best-biryani-in-hyderabad",
    label: "View Biryani Rankings",
    layer: "eats",
    layerName: "Layer 02 · Eats",
  },
  {
    q: "What are the best cafes in Hyderabad?",
    a: "Browse cafes on the Eats map and the cafe ranking pages — community votes sit next to long-run Google baselines so you get both the current buzz and the old-guard list.",
    href: "https://eats.mapmyhyd.com/rankings/best-cafe-in-hyderabad",
    label: "View Cafe Rankings",
    layer: "eats",
    layerName: "Layer 02 · Eats",
  },
  {
    q: "How do I explore startups in Hyderabad?",
    a: "The Hyderabad Startup Map lists 1,100+ mapped companies with sectors, areas, funding stage and open roles — including corridor hubs like HITEC City, Madhapur and Gachibowli.",
    href: "https://startups.mapmyhyd.com/",
    label: "Explore Startup Map",
    layer: "startup",
    layerName: "Layer 01 · Startups",
  },
  {
    q: "Where are startup jobs in Hyderabad?",
    a: "Open roles from mapped companies are listed on the startups jobs board, with landings by area and sector so you can filter for Madhapur, HITEC City, SaaS and more.",
    href: "https://startups.mapmyhyd.com/jobs",
    label: "Browse Open Tech Jobs",
    layer: "startup",
    layerName: "Layer 01 · Startups",
  },
  {
    q: "What about weekend getaways and lakes near Hyderabad?",
    a: "Those layers are next in the series. The atlas already points the direction — heritage and food are live today; lakes and weekend escapes ship as their own maps under the same Mapping HYD brand.",
    href: "/",
    label: "View Atlas Roadmap",
    layer: "atlas",
    layerName: "Atlas Roadmap",
  },
];

const LAYERS_ROADMAP = [
  {
    n: "01",
    key: "startup",
    name: "Hyderabad Startup Map",
    desc: "1,100+ companies, funding rounds and open tech jobs mapped across city hubs.",
    href: "https://startups.mapmyhyd.com/",
    status: "Live",
    live: true,
  },
  {
    n: "02",
    key: "eats",
    name: "Eateries Race",
    desc: "Discovery map with a citywide leaderboard, GPS verified check-ins and weekly themes.",
    href: "https://eats.mapmyhyd.com/",
    status: "Live",
    live: true,
  },
  {
    n: "03",
    key: "heritage",
    name: "Deccan Heritage",
    desc: "50+ historic monuments, stepwells and tombs across 5 dynasties with interactive routes.",
    href: "https://heritage.mapmyhyd.com/",
    status: "Live",
    live: true,
  },
  {
    n: "04",
    key: "live",
    name: "Where to Live",
    desc: "Neighbourhoods mapped by vibe, character, rent baselines and real commute times.",
    status: "In progress",
    live: false,
  },
  {
    n: "05",
    key: "weekends",
    name: "Weekend Escapes",
    desc: "Curated day trips, hill forts, and scenic drives within 3 hours of the city.",
    status: "In progress",
    live: false,
  },
  {
    n: "06",
    key: "lakes",
    name: "Lakes of Hyderabad",
    desc: "Every major waterbody, tank, and reservoir mapped with history and ecology notes.",
    status: "In progress",
    live: false,
  },
];

const aboutLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "About Mapping HYD",
      url: `${SITE}/about`,
      about: { "@id": `${SITE}/#organization` },
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${item.a} ${item.label}: ${item.href}`,
        },
      })),
    },
  ],
};

export default function About() {
  return (
    <>
      <SiteHeader active="about" />
      <LandingTracker event="about_view" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />

      <main className="doc about-page">
        {/* Story & Hero Section */}
        <div className="about-layout">
          <div className="about-copy">
            <p className="section-label">The story</p>

            <h1 className="doc-title">
              How Mapping HYD happened.
            </h1>

            <p className="about-lead">
              A bored evening, a missing startup address, and the realization that one of India’s
              most vibrant cities was missing its own digital map layers.
            </p>

            <div className="doc-body">
              {/* ACT 01 */}
              <section className="story-act" aria-labelledby="act-1-heading">
                <div className="story-act-header">
                  <p className="story-act-eyebrow">Act 01 · Origin</p>
                  <h2 id="act-1-heading">The Bored Evening &amp; The Startup Map</h2>
                </div>

                <p>
                  Sometime in early 2026, I was trying to find the office address of a startup I’d
                  heard about. Google gave me a generic LinkedIn company page. LinkedIn gave me a
                  vague area name without a building. That was it.
                </p>
                <p>
                  I knew the company was real — half my friend circle had interviewed there. But
                  there was no map, no directory, no way to actually see the Hyderabad startup scene
                  the way you can for Bangalore or San Francisco.
                </p>
                <p>
                  So I opened a code editor and started plotting real office locations. Spent three
                  weeks collecting coordinates across HITEC City, Madhapur, and Gachibowli, categorized
                  them by sector, and pushed a filterable map to Reddit and a few WhatsApp founder
                  groups.
                </p>

                {/* Milestone Showcase: Startup Map */}
                <div className="milestone-card milestone-startup">
                  <div className="milestone-header">
                    <span className="milestone-pill" data-accent="startup">LAYER 01 · LIVE</span>
                    <span className="milestone-metric">1,100+ Companies</span>
                  </div>
                  <h3 className="milestone-title">Hyderabad Startup Map</h3>
                  <p className="milestone-desc">
                    Every tech startup, funding stage, and open job mapped by real office coordinate.
                  </p>
                  <a
                    href="https://startups.mapmyhyd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="milestone-cta"
                  >
                    <span>Explore Layer 01: Startup Map</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <blockquote className="editorial-pullquote">
                  “People started sharing it immediately. Founders DMed asking when their company
                  would be added. The gap wasn’t that Hyderabad lacked substance; it was that nobody
                  had built a visible layer on top of it.”
                </blockquote>
              </section>

              {/* ACT 02 */}
              <section className="story-act" aria-labelledby="act-2-heading">
                <div className="story-act-header">
                  <p className="story-act-eyebrow">Act 02 · Expansion</p>
                  <h2 id="act-2-heading">The Cafe Boom &amp; The Eateries Race</h2>
                </div>

                <p>
                  The second build was impossible to ignore if you live here. In Jubilee Hills,
                  Madhapur, and Kokapet, a new cafe or bistro opens every few days. The food scene
                  is one of the fastest moving things about Hyderabad, but reviews on typical apps
                  were cluttered and noisy.
                </p>
                <p>
                  We wanted to make food discovery feel like exploring a living world. So we built the{" "}
                  <strong>Eateries Race</strong> — a discovery map turned into a citywide game with
                  GPS-verified check-ins, weekly curated themes (best Irani chai, specialty roasters,
                  heritage biryani), and a live explorer leaderboard.
                </p>

                {/* Milestone Showcase: Eateries Race */}
                <div className="milestone-card milestone-eats">
                  <div className="milestone-header">
                    <span className="milestone-pill" data-accent="eats">LAYER 02 · LIVE</span>
                    <span className="milestone-metric">City Leaderboard</span>
                  </div>
                  <h3 className="milestone-title">Eateries Race</h3>
                  <p className="milestone-desc">
                    Discover spots near you, check in on site with verified GPS, and climb weekly rankings.
                  </p>
                  <a
                    href="https://eats.mapmyhyd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="milestone-cta"
                  >
                    <span>Explore Layer 02: Eateries Race</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </section>

              {/* ACT 03 */}
              <section className="story-act" aria-labelledby="act-3-heading">
                <div className="story-act-header">
                  <p className="story-act-eyebrow">Act 03 · Living History</p>
                  <h2 id="act-3-heading">Deccan Heritage &amp; The Living Atlas</h2>
                </div>

                <p>
                  Two maps in, the larger vision clicked. Hyderabad is over four hundred years old,
                  with Qutb Shahi stepwells, Asaf Jahi palaces, granite boulder parks, and historic
                  citadels that most residents drive past every single day without knowing their
                  stories.
                </p>
                <p>
                  All of it was scattered across decaying government PDFs, defunct blogs, and oral
                  folklore. With <strong>Deccan Heritage</strong>, we catalogued 50+ heritage sites
                  across five dynasties with dedicated history notes, visit guidelines, and custom
                  route builders.
                </p>

                {/* Milestone Showcase: Deccan Heritage */}
                <div className="milestone-card milestone-heritage">
                  <div className="milestone-header">
                    <span className="milestone-pill" data-accent="heritage">LAYER 03 · LIVE</span>
                    <span className="milestone-metric">50+ Historic Sites</span>
                  </div>
                  <h3 className="milestone-title">Deccan Heritage</h3>
                  <p className="milestone-desc">
                    Walk the city’s historic spine — monuments, tombs, and stepwells filtered by era.
                  </p>
                  <a
                    href="https://heritage.mapmyhyd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="milestone-cta"
                  >
                    <span>Explore Layer 03: Deccan Heritage</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </section>

              {/* WHY A SERIES */}
              <section className="story-act" aria-labelledby="series-philosophy">
                <div className="story-act-header">
                  <p className="story-act-eyebrow">Philosophy</p>
                  <h2 id="series-philosophy">Why a Series, Not Six Disconnected Apps</h2>
                </div>

                <p>
                  A single app solves one narrow problem and plateaus. A series compounds: every
                  person who explores startups eventually looks for good coffee nearby; someone
                  discovering a stepwell wants to know what weekend getaways exist just past the
                  Outer Ring Road.
                </p>
                <p>
                  Mapping HYD isn’t six separate apps — it is <em>one living atlas</em> with multiple
                  specialized layers, built with open data and honest curation.
                </p>
              </section>

              {/* FAQ / Search Directory */}
              <section className="about-faq-section" aria-labelledby="faq-heading">
                <div className="story-act-header">
                  <p className="story-act-eyebrow">Search Directory</p>
                  <h2 id="faq-heading">Questions Hyderabad Actually Searches</h2>
                </div>
                <p className="faq-intro">
                  High-intent questions answered directly on the layer that owns them:
                </p>
                <div className="about-query-grid">
                  {FAQ.map((item) => (
                    <div key={item.q} className="query-card" data-layer={item.layer}>
                      <div className="query-card-top">
                        <span className="query-layer-badge" data-layer={item.layer}>
                          {item.layerName}
                        </span>
                      </div>
                      <h3 className="query-question">{item.q}</h3>
                      <p className="query-answer">{item.a}</p>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="query-cta-btn"
                        data-layer={item.layer}
                      >
                        <span>{item.label}</span>
                        <span className="query-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              <p className="doc-back">
                <Link href="/">← Back to the atlas homepage</Link>
              </p>
            </div>
          </div>

          {/* Sticky Campaign Art */}
          <aside className="about-aside" aria-label="Campaign art">
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
              <figcaption>17.3850° N, 78.4867° E — One city, drawn as one living route.</figcaption>
            </figure>
          </aside>
        </div>

        {/* 6-Layer Atlas Roadmap Grid */}
        <section className="about-series" aria-labelledby="roadmap-heading">
          <div className="roadmap-header">
            <div>
              <p className="section-label">The Atlas Roadmap</p>
              <h2 id="roadmap-heading">Six Layers, One City</h2>
            </div>
            <span className="roadmap-status-badge">03 Live · 03 In Progress</span>
          </div>

          <div className="about-layers">
            {LAYERS_ROADMAP.map((l) =>
              l.live ? (
                <a
                  key={l.n}
                  className="layer-row live"
                  data-layer={l.key}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="layer-number">{l.n}</span>
                  <span className="layer-name">{l.name}</span>
                  <span className="layer-description">{l.desc}</span>
                  <span className="layer-status">{l.status}</span>
                  <span className="layer-arrow" aria-hidden="true">↗</span>
                </a>
              ) : (
                <article key={l.n} className="layer-row" data-layer={l.key}>
                  <span className="layer-number">{l.n}</span>
                  <span className="layer-name">{l.name}</span>
                  <span className="layer-description">{l.desc}</span>
                  <span className="layer-status">{l.status}</span>
                  <span className="layer-arrow" aria-hidden="true">—</span>
                </article>
              )
            )}
          </div>
        </section>

        {/* Dual Founder Profile Cards */}
        <section className="about-founders" aria-labelledby="creators-heading">
          <div className="founders-header">
            <p className="section-label">The Creators</p>
            <h2 id="creators-heading">Who Built This</h2>
            <p className="founders-subtitle">
              Mapping HYD is built independently in Hyderabad — no outside agency, no venture capital,
              just two locals mapping their city with care.
            </p>
          </div>

          <div className="founders-grid">
            {/* Founder 1: Shiva */}
            <div className="founder-card">
              <div className="founder-avatar-wrap">
                <span className="founder-monogram">ST</span>
              </div>
              <div className="founder-info">
                <h3 className="founder-name">Shiva Chandra Takkelapati</h3>
                <p className="founder-role">Founder · Engineering &amp; Cartography</p>
                <p className="founder-bio">
                  Grew up in Hyderabad. Built the initial startup map out of curiosity, now engineering
                  the living atlas stack, dataset pipelines, and layer navigation.
                </p>
                <div className="founder-links">
                  <a
                    href="https://www.linkedin.com/in/shiva-chandra-takkelapati-10ba3032b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-link"
                  >
                    LinkedIn ↗
                  </a>
                  <span className="founder-sep">·</span>
                  <a
                    href="https://www.tekkdevv.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-link"
                  >
                    tekkdevv ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Founder 2: Nitya */}
            <div className="founder-card">
              <div className="founder-avatar-wrap">
                <span className="founder-monogram">NB</span>
              </div>
              <div className="founder-info">
                <h3 className="founder-name">Nitya Boyapati</h3>
                <p className="founder-role">Cofounder · Design &amp; Curation</p>
                <p className="founder-bio">
                  Leading editorial research, heritage curation, and design systems. Documenting the
                  unwritten stories, monuments, and culinary culture of Hyderabad.
                </p>
                <div className="founder-links">
                  <a
                    href="https://www.linkedin.com/in/nitya-boyapati/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-link"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back the Atlas Milestone Dock */}
        <div className="about-support-dock">
          <SeriesSupport embedded />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

