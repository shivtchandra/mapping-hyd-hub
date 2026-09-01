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
  const title = `${s.name} — ${era} ${kind} in Hyderabad`;
  const description =
    (s.summary && s.summary.length > 40
      ? s.summary.slice(0, 155).replace(/\s+\S*$/, "") + "…"
      : `${s.name}: a ${era} ${kind} in ${s.area || "Hyderabad"}. Dates, access, protection status and location.`);
  return {
    title,
    description,
    alternates: { canonical: `/heritage/${s.id}` },
    openGraph: {
      title,
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

  const ld = {
    "@context": "https://schema.org",
    "@type": ["LandmarksOrHistoricalBuildings", "TouristAttraction"],
    name: s.name,
    alternateName: s.altNames || undefined,
    description: s.summary || undefined,
    url: `${SITE}/heritage/${s.id}`,
    geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
    address: { "@type": "PostalAddress", addressLocality: s.area || "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
    sameAs: [s.wikipedia, s.wikidata ? `https://www.wikidata.org/wiki/${s.wikidata}` : null].filter(Boolean),
    isAccessibleForFree: s.access === "open" || s.access === "ruin",
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
      <SiteHeader active="heritage" liveLabel="02 live" />
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
