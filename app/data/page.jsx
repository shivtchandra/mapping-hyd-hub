import SiteHeader from "../../components/SiteHeader.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";
import { LAYERS } from "../../lib/layers.js";
import "../home.css";

const SITE = "https://mapmyhyd.com";
const CONTACT = "shivachandra9490@gmail.com";

export const metadata = {
  title: "Data and sources",
  description:
    "Where each Mapping HYD map gets its data, when it was last updated, and the datasets you can download.",
  alternates: { canonical: `${SITE}/data` },
};

// Only datasets we can publish as-is. Others stay on request until their sources allow it.
const DOWNLOADS = {
  heritage: {
    note: "45 sites with full pages: coordinates, era, type, protection status, access.",
    files: [
      { label: "CSV", href: "/data/heritage-sites.csv", type: "text/csv" },
      { label: "JSON", href: "/data/heritage-sites.json", type: "application/json" },
    ],
  },
};

const datasetLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Hyderabad heritage sites",
  description: DOWNLOADS.heritage.note,
  url: `${SITE}/data`,
  creator: { "@type": "Organization", name: "Mapping HYD", url: SITE },
  spatialCoverage: { "@type": "Place", name: "Hyderabad, India" },
  distribution: DOWNLOADS.heritage.files.map((f) => ({
    "@type": "DataDownload",
    encodingFormat: f.type,
    contentUrl: `${SITE}${f.href}`,
  })),
};

export default function DataPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <SiteHeader />
      <main className="data-page">
        <header className="data-head">
          <p className="section-label">Data and sources</p>
          <h1>Every number has a source.</h1>
          <p className="data-lede">
            What each map is built from, when it was last updated, and what you can download. If you use
            anything here, please credit Mapping HYD (mapmyhyd.com).
          </p>
        </header>

        <div className="data-list">
          {LAYERS.map((l) => {
            const dl = DOWNLOADS[l.key];
            return (
              <article className="data-item" key={l.key} data-layer={l.key}>
                <p className="map-meta">
                  <span>{l.n}</span>
                  <span>Updated {l.updated}</span>
                </p>
                <h2>{l.name}</h2>
                <p className="data-stat">{l.stat}</p>
                <p className="data-sources">
                  <strong>Sources:</strong> {l.source}
                </p>
                <p className="data-links">
                  <a href={l.sourceHref}>How we verify →</a>
                  <a href={l.href}>Open the map ↗</a>
                </p>
                {dl ? (
                  <div className="data-download">
                    <p>{dl.note}</p>
                    <p className="data-files">
                      {dl.files.map((f) => (
                        <a key={f.label} href={f.href} download>
                          Download {f.label}
                        </a>
                      ))}
                    </p>
                  </div>
                ) : (
                  <p className="data-request">
                    Dataset not published yet.{" "}
                    <a href={`mailto:${CONTACT}?subject=${encodeURIComponent(`Data request: ${l.name}`)}`}>
                      Ask us for access
                    </a>
                    .
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
