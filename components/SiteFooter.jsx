import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-art" aria-hidden="true">
        <picture>
          <source srcSet="/assets/hero-full.webp" type="image/webp" />
          <img src="/assets/hero-full.jpg" alt="" loading="lazy" />
        </picture>
      </div>

      <div className="footer-panel">
        <p className="footer-eyebrow">Mapping HYD.</p>
        <p className="footer-title">
          Built in
          <br />
          <em>Hyderabad.</em>
        </p>

        <nav className="footer-nav" aria-label="Footer">
          <Link href="/startups">Startups</Link>
          <Link href="/eats">Eats</Link>
          <Link href="/heritage">Heritage</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="footer-tail">
          <p className="footer-contact">
            Have an idea for the series?{" "}
            <a href="mailto:shivachandra9490@gmail.com">shivachandra9490@gmail.com</a>
          </p>
          <p className="footer-meta">
            Built with love by{" "}
            <a href="https://www.tekkdevv.com/" target="_blank" rel="noopener noreferrer">
              tekkdevv
            </a>
            . A living atlas of the city, mapped one layer at a time.
            <br />© {year} Mapping HYD. · 17.3850° N, 78.4867° E
          </p>
        </div>
      </div>
    </footer>
  );
}
