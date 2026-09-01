"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ERAS, ERA_ORDER, TYPES, typeLabel, statusLabel, eraColor } from "../lib/heritage.js";

export default function SiteFilter({ sites }) {
  const [era, setEra] = useState("");
  const [type, setType] = useState("");
  const [risk, setRisk] = useState(false);
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sites.filter((s) => {
      if (era && s.era !== era) return false;
      if (type && s.type !== type) return false;
      if (risk && !(s.status === "at-risk" || s.status === "lost" || s.status === "unprotected"))
        return false;
      if (needle) {
        const hay = (s.name + " " + (s.altNames || []).join(" ") + " " + (s.area || "")).toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [sites, era, type, risk, q]);

  const typesPresent = useMemo(() => {
    const set = new Set(sites.map((s) => s.type));
    return Object.keys(TYPES).filter((t) => set.has(t));
  }, [sites]);

  return (
    <div className="hx">
      <div className="hx-controls">
        <input
          className="hx-search"
          placeholder={`Search ${sites.length} sites…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="hx-chips">
          <button className="hx-chip" data-on={risk} onClick={() => setRisk((v) => !v)}>
            ⚠ At risk
          </button>
          {ERA_ORDER.filter((e) => sites.some((s) => s.era === e)).map((e) => (
            <button
              key={e}
              className="hx-chip"
              data-on={era === e}
              onClick={() => setEra((cur) => (cur === e ? "" : e))}
            >
              <span className="hx-dot" style={{ background: ERAS[e].color }} />
              {ERAS[e].label}
            </button>
          ))}
          {typesPresent.map((t) => (
            <button
              key={t}
              className="hx-chip"
              data-on={type === t}
              onClick={() => setType((cur) => (cur === t ? "" : t))}
            >
              {typeLabel(t)}
            </button>
          ))}
        </div>
        <p className="hx-count">
          {shown.length} of {sites.length}
        </p>
      </div>

      <ul className="hx-list">
        {shown.map((s) => (
          <li key={s.id} className="hx-item">
            <Link href={`/heritage/${s.id}`} className="hx-link">
              <span className="hx-era" style={{ background: eraColor(s.era) }} aria-hidden="true" />
              <span className="hx-name">{s.name}</span>
              <span className="hx-meta">
                {ERAS[s.era]?.label} · {typeLabel(s.type)}
                {(s.status === "at-risk" || s.status === "lost") && (
                  <span className="hx-risk"> · {statusLabel(s.status)}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
