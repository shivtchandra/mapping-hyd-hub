import Link from "next/link";
import { LAYERS } from "../lib/layers.js";
import FooterWord from "./FooterWord.jsx";
import "./site-footer.css";

const MORE = [
  { label: "Data & sources", href: "/data" },
  { label: "About", href: "/about" },
  { label: "Instagram", href: "https://www.instagram.com/mapmyhyd/" },
  { label: "Suggest a map", href: "mailto:shivachandra9490@gmail.com" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="sf" aria-label="Site footer">
      {/* Wordmark first, links after: the page keeps scrolling while the letters rise. */}
      <FooterWord />

      <div className="sf-links">
        <nav aria-label="Maps">
          <p className="sf-head">The maps</p>
          {LAYERS.map((l) => (
            <a key={l.key} href={l.href} data-layer={l.key}>
              <i className="sf-dot" aria-hidden="true" />
              {l.short}
            </a>
          ))}
        </nav>
        <nav aria-label="More">
          <p className="sf-head">More</p>
          {MORE.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sf-bottom">
        <span>© {year} Mapping HYD</span>
        <span>
          Built by{" "}
          <a href="https://www.tekkdevv.com/" target="_blank" rel="noopener noreferrer">
            tekkdevv
          </a>
        </span>
      </div>
    </footer>
  );
}
