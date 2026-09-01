import Link from "next/link";

const NAV = [
  { label: "Startups", href: "/startups", key: "startups" },
  { label: "Eats", href: "/eats", key: "eats" },
  { label: "Heritage", href: "/heritage", key: "heritage" },
  { label: "About", href: "/about", key: "about" },
];

// `active` = one of the NAV keys, to mark the current page.
export default function SiteHeader({ active, liveLabel = "03 live" }) {
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="wordmark" style={{ textDecoration: "none" }}>
          Mapping HYD.
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className="nav-link"
              data-active={active === n.key ? "true" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <span className="live-count" aria-label={liveLabel}>
          {liveLabel}
        </span>

        <details className="nav-menu">
          <summary aria-label="Menu">Menu</summary>
          <div className="nav-menu-panel">
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} className="nav-menu-link">
                {n.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
