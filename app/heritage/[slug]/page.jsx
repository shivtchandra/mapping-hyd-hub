import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader.jsx";
import SiteFooter from "../../../components/SiteFooter.jsx";
import {
  SITES,
  getSite,
  siblingsOf,
  ERAS,
  eraLabel,
  eraColor,
  typeLabel,
  statusLabel,
  accessLabel,
} from "../../../lib/heritage.js";

const SITE = "https://mapmyhyd.com";

export function generateStaticParams() {
  return SITES.map((s) => ({ slug: s.id }));
}

export function generateMetadata({ params }) {
  const s = getSite(params.slug);
  if (!s) return {};
  const era = eraLabel(s.era);
  const kind = typeLabel(s.type).toLowerCase();
  const title = `${s.name} Hyderabad — Timings, Entry Fee, History & Location`;
  
  const entrySnippet = s.ticket?.inr != null 
    ? (s.ticket.inr === 0 ? "Free entry" : `Entry ₹${s.ticket.inr}`) 
    : (s.access === "open" ? "Free entry" : accessLabel(s.access));
  const timingSnippet = s.ticket?.hours ? `Hours: ${s.ticket.hours}.` : "";
  const metroSnippet = s.nearestMetro ? `Nearest Metro: ${s.nearestMetro}.` : "";

  const baseSummary = s.summary || `${s.name} is a historic ${era} ${kind} located in ${s.area || "Hyderabad"}.`;
  const rawDescription = `Visit ${s.name} in ${s.area || "Hyderabad"}. ${entrySnippet}. ${timingSnippet} ${metroSnippet} ${baseSummary}`.replace(/\s+/g, " ").trim();
  const description = rawDescription.length > 160 ? rawDescription.slice(0, 157).replace(/\s+\S*$/, "") + "…" : rawDescription;

  return {
    title,
    description,
    alternates: { canonical: `/heritage/${s.id}` },
    openGraph: {
      title: `${s.name} — ${era} ${kind} in Hyderabad`,
      description,
      url: `${SITE}/heritage/${s.id}`,
      images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function HeritageSite({ params }) {
  const s = getSite(params.slug);
  if (!s) notFound();

  const sibs = siblingsOf(s, 5);
  const era = ERAS[s.era];

  const isFree = s.access === "open" || s.access === "ruin" || s.ticket?.inr === 0;

  const ld = {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "LandmarksOrHistoricalBuildings"],
    name: s.name,
    alternateName: s.altNames || undefined,
    description: s.summary || undefined,
    url: `${SITE}/heritage/${s.id}`,
    geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
    address: { 
      "@type": "PostalAddress", 
      addressLocality: s.area || "Hyderabad", 
      addressRegion: "Telangana", 
      addressCountry: "IN" 
    },
    sameAs: [s.wikipedia, s.wikidata ? `https://www.wikidata.org/wiki/${s.wikidata}` : null].filter(Boolean),
    isAccessibleForFree: isFree,
    publicAccess: s.access === "open" || s.access === "ticketed",
    openingHours: s.ticket?.hours || undefined,
    priceRange: s.ticket?.inr != null ? (s.ticket.inr === 0 ? "₹0" : `₹${s.ticket.inr}`) : undefined,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Mapping HYD", item: SITE },
      { "@type": "ListItem", position: 2, name: "Heritage", item: `${SITE}/heritage` },
      { "@type": "ListItem", position: 3, name: s.name, item: `${SITE}/heritage/${s.id}` },
    ],
  };

  return (
    <>
      <SiteHeader active="heritage" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="doc site-page">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/heritage">Heritage</Link> <span aria-hidden="true">/</span> {s.name}
        </nav>

        <p className="section-label" style={{ color: era?.color }}>
          {eraLabel(s.era)} · {typeLabel(s.type)}
        </p>
        <h1 className="doc-title">{s.name}</h1>
        {s.altNames?.length > 0 && (
          <p className="alt">also {s.altNames.join(", ")}</p>
        )}

        <div className="badges">
          <span className="badge era" style={{ background: eraColor(s.era) }}>
            {eraLabel(s.era)}
          </span>
          <span className="badge">{typeLabel(s.type)}</span>
          <span
            className={`badge${
              s.status === "at-risk" || s.status === "lost" ? " risk" : ""
            }`}
          >
            {statusLabel(s.status)}
          </span>
        </div>

        <div className="doc-body">
          {s.summary && <p className="lede">{s.summary}</p>}

          {s.significance?.length > 0 && (
            <ul>
              {s.significance.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          )}

          {s.sections?.length > 0 && (
            <div className="doc-sections">
              {s.sections.map((sec) => (
                <section key={sec.heading}>
                  <h2>{sec.heading}</h2>
                  <p>{sec.body}</p>
                </section>
              ))}
            </div>
          )}

          <dl className="facts">
            {s.yearBuilt && (
              <>
                <dt>Built</dt>
                <dd>{s.yearBuilt}</dd>
              </>
            )}
            <dt>Access</dt>
            <dd>{accessLabel(s.access)}</dd>
            {s.ticket?.inr != null && (
              <>
                <dt>Entry</dt>
                <dd>
                  ₹{s.ticket.inr}
                  {s.ticket.hours ? ` · ${s.ticket.hours}` : ""}
                  {s.ticket.closedOn ? ` · closed ${s.ticket.closedOn}` : ""}
                </dd>
              </>
            )}
            {s.nearestMetro && (
              <>
                <dt>Nearest metro</dt>
                <dd>{s.nearestMetro}</dd>
              </>
            )}
            {s.area && (
              <>
                <dt>Area</dt>
                <dd>{s.area}</dd>
              </>
            )}
            <dt>Location</dt>
            <dd>
              {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
            </dd>
          </dl>

          <p>
            <Link href="/heritage/map" className="hx-cta">
              Open {s.name} on the map →
            </Link>
          </p>

          {s.sources?.length > 0 && (
            <p className="src">
              Sources:{" "}
              {s.sources.map((x, i) =>
                x.url ? (
                  <a key={i} href={x.url} target="_blank" rel="noreferrer">
                    {x.label}
                  </a>
                ) : (
                  <span key={i}>{x.label} </span>
                )
              )}
              {s.wikipedia && (
                <>
                  {" "}
                  <a href={s.wikipedia} target="_blank" rel="noreferrer">
                    Wikipedia
                  </a>
                </>
              )}
            </p>
          )}

          {s.needsReview && (
            <p className="review">
              Some details for this site are unverified. Corrections are welcome — the interactive
              map has a submit form.
            </p>
          )}

          <h2 className="sib-h">Nearby &amp; related</h2>
          <ul className="sibs">
            {sibs.map((x) => (
              <li key={x.id}>
                <Link href={`/heritage/${x.id}`}>{x.name}</Link>
                <span className="sib-meta">
                  {" "}
                  — {eraLabel(x.era)}, {typeLabel(x.type).toLowerCase()}
                </span>
              </li>
            ))}
          </ul>

          <p className="doc-back">
            <Link href="/heritage">← All heritage sites</Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
