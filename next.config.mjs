/** @type {import('next').NextConfig} */

// Live layers are separate Vercel deploys. Path URLs permanently redirect to
// their subdomain hosts so Google does not index soft duplicates on the hub.
const STARTUPS = process.env.STARTUPS_ORIGIN || "https://startups.mapmyhyd.com";
const EATS = process.env.EATS_ORIGIN || "https://eats.mapmyhyd.com";
const HERITAGE_APP = process.env.HERITAGE_APP_ORIGIN || "https://heritage.mapmyhyd.com";

const nextConfig = {
  async redirects() {
    return [
      // Collapse www onto the apex host Google should index.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mapmyhyd.com" }],
        destination: "https://mapmyhyd.com/:path*",
        permanent: true,
      },
      { source: "/eats", destination: `${EATS}/`, permanent: true },
      { source: "/eats/:path*", destination: `${EATS}/:path*`, permanent: true },
      { source: "/startups", destination: `${STARTUPS}/`, permanent: true },
      { source: "/startups/:path*", destination: `${STARTUPS}/:path*`, permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Heritage SEO pages stay on the hub; only the interactive map app is proxied.
      { source: "/heritage/map", destination: HERITAGE_APP },
      { source: "/heritage/map/:path*", destination: `${HERITAGE_APP}/:path*` },
    ];
  },
};

export default nextConfig;
