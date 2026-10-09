import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const SITE = "https://mapmyhyd.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Mapping HYD — Interactive Maps of Hyderabad Food, Heritage & Startups",
    template: "%s · Mapping HYD",
  },
  description:
    "Discover Hyderabad with curated interactive maps — 45+ heritage sites and stepwells, best food & biryani discovery, and 1,100+ tech startups mapped across the city.",
  alternates: { canonical: "https://mapmyhyd.com/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Mapping HYD",
    url: SITE,
    title: "Mapping HYD — Interactive Maps of Hyderabad Food, Heritage & Startups",
    description:
      "Discover Hyderabad with curated interactive maps — 45+ heritage sites and stepwells, best food & biryani discovery, and 1,100+ tech startups mapped across the city.",
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapping HYD — Interactive Maps of Hyderabad Food, Heritage & Startups",
    description:
      "Discover Hyderabad with curated interactive maps — 45+ heritage sites, food discovery, and 1,100+ tech startups.",
    images: ["/assets/og-image.jpg"],
  },
  icons: { icon: "/assets/favicon.svg" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Mapping HYD",
      description: "A growing digital atlas of Hyderabad, built one layer at a time.",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Mapping HYD",
      url: `${SITE}/`,
      logo: `${SITE}/assets/favicon.svg`,
      founder: [
        { "@type": "Person", name: "Shiva Chandra Takkelapati" },
        { "@type": "Person", name: "Nitya" },
      ],
      sameAs: [
        "https://mapmyhyd.com/",
        "https://eats.mapmyhyd.com/",
        "https://startups.mapmyhyd.com/",
        "https://github.com/shivtchandra/hydstartuplist",
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className="js">
      <head>
        <meta name="theme-color" content="#f7f4ec" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..650,30&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body>{children}{process.env.HYD_STATIC_EXPORT !== "1" && <Analytics />}</body>
    </html>
  );
}
