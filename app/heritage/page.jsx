import Link from "next/link";
import SiteHeader from "../../components/SiteHeader.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";
import SiteFilter from "../../components/SiteFilter.jsx";
import { SITES, COUNTS, ERAS } from "../../lib/heritage.js";

const SITE = "https://mapmyhyd.com";

export const metadata = {
  title: "Hyderabad heritage sites — monuments, stepwells, palaces & tombs by era",
  description:
    "A working list of Hyderabad's built heritage: Qutb Shahi tombs and mosques, Asaf Jahi palaces, Nizam-era civic buildings, the British Residency, stepwells and gateways — filter by era, type and protection status.",
  alternates: { canonical: "/heritage" },
  openGraph: {
    title: "Hyderabad heritage sites, by era",
    description:
      "Monuments, stepwells, palaces and tombs across Hyderabad — Qutb Shahi to Nizam-era, with what's protected and what's at risk.",
    url: `${SITE}/heritage`,
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
  },
};

const listLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hyderabad heritage sites",
  url: `${SITE}/heritage`,
  isPartOf: { "@id": `${SITE}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: SITES.length,
    itemListElement: SITES.slice(0, 50).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/heritage/${s.id}`,
      name: s.name,
    })),
  },
};

// lean rows for the client filter
const rows = SITES.map((s) => ({
  id: s.id,
  name: s.name,
  altNames: s.altNames || [],
  area: s.area || "",
  era: s.era,
  type: s.type,
  status: s.status,
}));

export default function HeritageIndex() {
  return (
    <>
      <SiteHeader active="heritage" liveLabel="02 live" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }}
      />

      <main className="doc">
        <p className="section-label">Layer 03 · Deccan Heritage</p>
        <h1 className="doc-title">Hyderabad’s built heritage, by era.</h1>

        <div className="doc-body">
          <p>
            {COUNTS.total} sites and counting — Qutb Shahi tombs and mosques, Asaf Jahi palaces,
            the British Residency and cantonment churches, Nizam-era civic buildings, and{" "}
            {COUNTS.stepwells > 0
              ? `${COUNTS.stepwells} stepwell${COUNTS.stepwells === 1 ? "" : "s"}`
              : "stepwells"}
            . Each has its own
            page with dates, access, what’s protected, and where it sits. {COUNTS.atRisk} are
            flagged at risk or already lost.
          </p>
          <p className="doc-links">
            {COUNTS.byEra.map((b) => (
              <span key={b.era}>
                {ERAS[b.era].label} <b>{b.n}</b>
                {"   "}
              </span>
            ))}
          </p>
          <p>
            <Link href="/heritage/map" className="hx-cta">
              Open the interactive map →
            </Link>
          </p>
        </div>

        <SiteFilter sites={rows} />
      </main>

      <SiteFooter />
    </>
  );
}
