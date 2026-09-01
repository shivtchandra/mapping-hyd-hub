/** @type {import('next').NextConfig} */

// The two live layers are their own Vercel deployments. The hub proxies them so
// the public URL stays path-based under mapmyhyd.com.
// TODO: swap these hosts for the real deploy URLs once known.
const STARTUPS = process.env.STARTUPS_ORIGIN || "https://startups.mapmyhyd.com";
const EATS = process.env.EATS_ORIGIN || "https://eats.mapmyhyd.com";
const HERITAGE_APP = process.env.HERITAGE_APP_ORIGIN || "https://heritage.mapmyhyd.com";

const nextConfig = {
  async rewrites() {
    return [
      { source: "/startups", destination: STARTUPS },
      { source: "/startups/:path*", destination: `${STARTUPS}/:path*` },
      { source: "/eats", destination: EATS },
      { source: "/eats/:path*", destination: `${EATS}/:path*` },
      { source: "/heritage/map", destination: HERITAGE_APP },
      { source: "/heritage/map/:path*", destination: `${HERITAGE_APP}/:path*` },
    ];
  },
};

export default nextConfig;
