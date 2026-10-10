// Per-site settings for the API Worker build (build.mjs) and router (src/index.js).
export default {
  skip: [/^events$/],
  origins: ["https://mapmyhyd.com", "https://www.mapmyhyd.com", "https://mapmyhyd-hub.pages.dev", "http://localhost:3000"],
  cache: {},
  data: { exclude: [], trim: {} },
};
