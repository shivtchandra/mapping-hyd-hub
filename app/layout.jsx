import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const SITE = "https://mapmyhyd.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Mapping HYD — Interactive Maps of Hyderabad: Where to Live, Eat, Startups & Heritage",
    template: "%s · Mapping HYD",
  },
  description:
    "Four interactive maps of Hyderabad — compare 55 areas to live in, find 3,600+ places to eat, explore 1,200+ startups, and walk 85+ heritage sites. Real places, open data.",
  alternates: { canonical: "https://mapmyhyd.com/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Mapping HYD",
    url: SITE,
    title: "Mapping HYD — Interactive Maps of Hyderabad: Where to Live, Eat, Startups & Heritage",
    description:
      "Four interactive maps of Hyderabad — compare 55 areas to live in, find 3,600+ places to eat, explore 1,200+ startups, and walk 85+ heritage sites. Real places, open data.",
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapping HYD — Interactive Maps of Hyderabad: Where to Live, Eat, Startups & Heritage",
    description:
      "Four interactive maps of Hyderabad — where to live, where to eat, who's building, what's worth seeing.",
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
      description: "Interactive maps of Hyderabad: where to live, where to eat, who's building, what's worth seeing.",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Mapping HYD",
      alternateName: ["MapMyHyd", "Map My Hyd"],
      url: `${SITE}/`,
      logo: `${SITE}/assets/favicon.svg`,
      founder: [
        { "@type": "Person", name: "Shiva Chandra Takkelapati" },
        { "@type": "Person", name: "Nitya" },
      ],
      // TODO: add LinkedIn company page URL once it exists.
      sameAs: [
        "https://www.instagram.com/mapmyhyd/",
        "https://mapmyhyd.com/",
        "https://live.mapmyhyd.com/",
        "https://eats.mapmyhyd.com/",
        "https://startups.mapmyhyd.com/",
        "https://heritage.mapmyhyd.com/",
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
