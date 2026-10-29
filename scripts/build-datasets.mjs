// Writes the downloadable datasets served from /data. Factual fields only: no prose
// summaries, which can carry third-party text. Run after data/heritage-sites.json changes:
//   node scripts/build-datasets.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public/data");
mkdirSync(out, { recursive: true });

const sites = JSON.parse(readFileSync(join(root, "data/heritage-sites.json"), "utf8"));
const FIELDS = ["id", "name", "lat", "lng", "era", "yearBuilt", "type", "status", "access", "area", "wikidata", "verifiedAt"];

const rows = sites
  .map((s) => Object.fromEntries(FIELDS.map((k) => [k, s[k] ?? null])))
  .sort((a, b) => a.name.localeCompare(b.name));

const cell = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = [FIELDS.join(","), ...rows.map((r) => FIELDS.map((k) => cell(r[k])).join(","))].join("\n") + "\n";

writeFileSync(join(out, "heritage-sites.json"), JSON.stringify(rows, null, 2) + "\n");
writeFileSync(join(out, "heritage-sites.csv"), csv);
console.log(`heritage-sites: ${rows.length} rows -> public/data/`);
