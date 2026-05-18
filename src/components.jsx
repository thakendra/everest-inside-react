// ============================================================
// EVEREST INSIGHT — Shared components
// Nav, Footer, Ticker, SearchOverlay, NewsletterCard, ArticleCard, ArticleHero
// ============================================================
import React, { useState, useEffect, useMemo, useRef } from "react";
import { navigate } from "./router";
import { Logo, Sparkline } from "./charts";
import {
  COMPANIES,
  ARTICLES,
  SECTORS,
  NEPSE,
  byId,
  sectorName,
  winners,
} from "./data";

// ----------------- Top ticker -----------------
export function Ticker() {
  const items = useMemo(() => {
    const sample = [
      { label: "NEPSE", val: "2,085.32", chg: 1.2 },
      ...COMPANIES.slice(0, 18).map((c) => ({
        label: c.symbol,
        val: c.price.toFixed(2),
        chg: c.changeDay,
      })),
    ];
    return [...sample, ...sample];
  }, []);
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="sym">{t.label}</span>
            <span className="price">{t.val}</span>
            <span className={t.chg >= 0 ? "up" : "down"}>
              {t.chg >= 0 ? "▲" : "▼"} {Math.abs(t.chg).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ----------------- Navbar -----------------
export function Nav({ active, onSearchOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: "#/index",       id: "index",       label: "Index" },
    { href: "#/winners",     id: "winners",     label: "Winners" },
    { href: "#/losers",      id: "losers",      label: "Losers" },
    { href: "#/analysis",    id: "analysis",    label: "Analysis" },
    { href: "#/methodology", id: "methodology", label: "Methodology" },
    { href: "#/about",       id: "about",       label: "About" },
  ];

  // Close mobile nav on hash change
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <a key={l.id} className="nav-link" href={l.href} data-active={active === l.id}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="iconbtn" onClick={onSearchOpen} aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <a href="#/subscribe" className="btn btn-red nav-subscribe-btn">Subscribe</a>
            <button
              className="nav-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav-overlay${mobileOpen ? " open" : ""}`} aria-modal="true">
        <div className="mobile-nav-header">
          <Logo />
          <button
            className="iconbtn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mobile-nav-links">
          {links.map((l) => (
            <a
              key={l.id}
              className="mobile-nav-link"
              href={l.href}
              data-active={active === l.id}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mobile-nav-footer">
          <button className="iconbtn" onClick={() => { onSearchOpen(); setMobileOpen(false); }} aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <a href="#/subscribe" className="btn btn-red btn-lg" onClick={() => setMobileOpen(false)}>
            Subscribe
          </a>
        </div>
      </div>
    </>
  );
}

// ----------------- Footer -----------------
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid">
          <div>
            <Logo dark />
            <p className="body-sm" style={{ marginTop: 16, maxWidth: 280 }}>
              Nepal's market intelligence, written like financial journalism. Updated monthly. Independent. Data-driven.
            </p>
            <div
              className="trust-row"
              style={{
                marginTop: 22,
                borderColor: "rgba(244,241,234,.25)",
                color: "rgba(244,241,234,.7)",
              }}
            >
              <span>EST. 2024</span>
              <span className="sep">·</span>
              <span>KATHMANDU</span>
            </div>
          </div>
          <div>
            <h6>Index</h6>
            <ul>
              <li><a href="#/index">Everest Index</a></li>
              <li><a href="#/winners">Winners</a></li>
              <li><a href="#/losers">Losers</a></li>
              <li><a href="#/index?tab=heatmap">Sector Heatmap</a></li>
            </ul>
          </div>
          <div>
            <h6>Editorial</h6>
            <ul>
              <li><a href="#/analysis">Analysis</a></li>
              <li><a href="#/analysis?cat=CEO%20Insight">CEO Insights</a></li>
              <li><a href="#/analysis?cat=Market%20Trends">Market Trends</a></li>
              <li><a href="#/methodology">Methodology</a></li>
            </ul>
          </div>
          <div>
            <h6>Company</h6>
            <ul>
              <li><a href="#/about">About</a></li>
              <li><a href="#/about#team">Team</a></li>
              <li><a href="#/about#disclaimer">Disclaimer</a></li>
              <li><a href="#/about#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h6>Legal</h6>
            <ul>
              <li><a href="#/about#privacy">Privacy</a></li>
              <li><a href="#/about#terms">Terms</a></li>
              <li><a href="#/about#disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Everest Insight · All analysis independent and not financial advice</span>
          <div className="social">
            <a aria-label="X / Twitter" href="#">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.014L4.5 22H1.244l8.04-9.187L1 2h6.844l4.846 6.4L18.244 2Zm-2.397 18h1.9L7.248 4H5.236l10.611 16Z" />
              </svg>
            </a>
            <a aria-label="LinkedIn" href="#">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5 1.11 1 2.5 1 4.98 2.119 4.98 3.5zM.222 8h4.56v14H.222V8zm7.554 0h4.36v1.91h.063c.608-1.15 2.094-2.37 4.31-2.37 4.612 0 5.464 3.04 5.464 6.987V22h-4.56v-6.32c0-1.508-.027-3.45-2.103-3.45-2.107 0-2.43 1.645-2.43 3.343V22h-4.56V8z" />
              </svg>
            </a>
            <a aria-label="YouTube" href="#">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
              </svg>
            </a>
            <a aria-label="Instagram" href="#">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.21.96.47 1.38.89.42.42.68.82.89 1.38.16.43.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s-.01 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.72 3.72 0 0 1-.89 1.38c-.42.42-.82.68-1.38.89-.43.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.89 3.72 3.72 0 0 1-.89-1.38c-.16-.43-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.43-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.32 4.14.6c-.79.3-1.46.7-2.13 1.37C1.34 2.64.94 3.31.64 4.1.36 4.86.17 5.74.11 7.01.05 8.29.04 8.7.04 11.96s.01 3.67.07 4.95c.06 1.27.25 2.15.53 2.91.3.79.7 1.46 1.37 2.13.67.67 1.34 1.07 2.13 1.37.76.28 1.64.47 2.91.53C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.25 2.91-.53.79-.3 1.46-.7 2.13-1.37.67-.67 1.07-1.34 1.37-2.13.28-.76.47-1.64.53-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.25-2.15-.53-2.91-.3-.79-.7-1.46-1.37-2.13A5.91 5.91 0 0 0 19.86.6c-.76-.28-1.64-.47-2.91-.53C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ----------------- Search Overlay -----------------
export function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
      setQ("");
      setActive(0);
    }
  }, [open]);

  function buildResults(text) {
    const t = (text || "").trim().toLowerCase();
    if (!t) return [];
    const co = COMPANIES.filter(
      (c) =>
        c.name.toLowerCase().includes(t) ||
        c.symbol.toLowerCase().includes(t) ||
        c.sector.toLowerCase().includes(t)
    )
      .slice(0, 6)
      .map((item) => ({ kind: "company", item }));
    const ar = ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(t) ||
        a.category.toLowerCase().includes(t) ||
        (a.dek && a.dek.toLowerCase().includes(t))
    )
      .slice(0, 4)
      .map((item) => ({ kind: "article", item }));
    const sc = SECTORS.filter((s) => s.name.toLowerCase().includes(t))
      .slice(0, 3)
      .map((item) => ({ kind: "sector", item }));
    return [...co, ...ar, ...sc];
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => a + 1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
      if (e.key === "Enter") {
        const all = buildResults(q);
        if (all[active]) {
          if (all[active].kind === "company") navigate(`#/company/${all[active].item.id}`);
          else if (all[active].kind === "article") navigate(`#/article/${all[active].item.slug}`);
          else if (all[active].kind === "sector") navigate(`#/index?sector=${all[active].item.id}`);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, q, active, onClose]);

  if (!open) return null;
  const r = buildResults(q);
  const grouped = {
    company: r.filter((x) => x.kind === "company"),
    article: r.filter((x) => x.kind === "article"),
    sector: r.filter((x) => x.kind === "sector"),
  };

  const suggestions = [
    { label: "Himalayan Bank", q: "Himalayan" },
    { label: "Hydropower", q: "Hydropower" },
    { label: "NEPSE", q: "NEPSE" },
    { label: "IPO Pipeline", q: "IPO" },
  ];

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-row">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink-3)"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Search companies, articles, sectors…"
          />
          <span className="kbd">ESC</span>
        </div>
        <div className="search-results">
          {!q && (
            <div style={{ padding: "12px 22px 22px" }}>
              <div className="search-group-label">Try</div>
              <div className="pillrow" style={{ padding: "4px 0 14px" }}>
                {suggestions.map((s) => (
                  <button key={s.q} className="chip" onClick={() => setQ(s.q)}>
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="search-group-label">Trending companies</div>
              {winners(3).map((c) => (
                <a
                  key={c.id}
                  className="search-item"
                  href={`#/company/${c.id}`}
                  onClick={onClose}
                >
                  <div>
                    <div className="si-name">{c.name}</div>
                    <div className="meta">
                      {c.symbol} · {sectorName(c.sector)}
                    </div>
                  </div>
                  <div className="si-meta pct-pill up">+{c.change.toFixed(1)}%</div>
                </a>
              ))}
            </div>
          )}
          {q && r.length === 0 && (
            <div className="search-empty">No results for "{q}".</div>
          )}
          {q && grouped.company.length > 0 && (
            <>
              <div className="search-group-label">Companies</div>
              {grouped.company.map((row, i) => (
                <a
                  key={row.item.id}
                  className="search-item"
                  data-active={i === active}
                  href={`#/company/${row.item.id}`}
                  onClick={onClose}
                >
                  <div>
                    <div className="si-name">{row.item.name}</div>
                    <div className="meta">
                      {row.item.symbol} · {sectorName(row.item.sector)}
                    </div>
                  </div>
                  <div
                    className={`si-meta pct-pill ${row.item.change >= 0 ? "up" : "down"}`}
                  >
                    {row.item.change >= 0 ? "+" : ""}
                    {row.item.change.toFixed(1)}%
                  </div>
                </a>
              ))}
            </>
          )}
          {q && grouped.article.length > 0 && (
            <>
              <div className="search-group-label">Analysis</div>
              {grouped.article.map((row) => (
                <a
                  key={row.item.id}
                  className="search-item"
                  href={`#/article/${row.item.slug}`}
                  onClick={onClose}
                >
                  <div>
                    <div className="si-name">{row.item.title}</div>
                    <div className="meta">
                      {row.item.category} · {row.item.readTime} min read
                    </div>
                  </div>
                </a>
              ))}
            </>
          )}
          {q && grouped.sector.length > 0 && (
            <>
              <div className="search-group-label">Sectors</div>
              {grouped.sector.map((row) => (
                <a
                  key={row.item.id}
                  className="search-item"
                  href={`#/index?sector=${row.item.id}`}
                  onClick={onClose}
                >
                  <div className="si-name">{row.item.name}</div>
                  <div
                    className={`si-meta pct-pill ${row.item.performance >= 0 ? "up" : "down"}`}
                  >
                    {row.item.performance >= 0 ? "+" : ""}
                    {row.item.performance.toFixed(1)}%
                  </div>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------- Newsletter card -----------------
export function NewsletterCard({ tone = "default", compact = false }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const isCream = tone === "cream";
  return (
    <div
      className={`card ${isCream ? "card-cream" : ""}`}
      style={compact ? { padding: 22 } : undefined}
    >
      <div className="eyebrow">
        <span className="bar"></span>NEWSLETTER
      </div>
      <div className="h-title" style={{ marginTop: 8 }}>
        Stay Ahead<span className="red-period">.</span>
      </div>
      <p className="body-sm" style={{ marginTop: 8, marginBottom: 16 }}>
        Monthly index, sector flow, and a short editor's note. One email. Free.
      </p>
      {!done ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
          style={{ display: "flex", gap: 8 }}
        >
          <input
            className={`input ${isCream ? "cream" : ""}`}
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-red">
            Subscribe
          </button>
        </form>
      ) : (
        <div className="row center gap-3" style={{ padding: "6px 0", color: "var(--green)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 12l5 5L20 6" />
          </svg>
          <span style={{ color: "var(--ink-1)", fontWeight: 600 }}>You're subscribed.</span>
        </div>
      )}
      <div className="meta" style={{ marginTop: 14 }}>
        No spam · Unsubscribe anytime · 4,200+ subscribers
      </div>
    </div>
  );
}

// ----------------- Article card / hero -----------------
export function ArticleCard({ article, large = false, onCream = false }) {
  return (
    <a
      className="article-card"
      href={`#/article/${article.slug}`}
      style={{
        display: "block",
        background: onCream ? "var(--bg-elev)" : undefined,
        border: "1px solid var(--rule)",
        borderRadius: 10,
        overflow: "hidden",
        transition: "transform .15s, box-shadow .15s",
      }}
    >
      <ArticleHero hero={article.hero} large={large} />
      <div style={{ padding: large ? "22px 22px 22px" : "18px 18px 18px" }}>
        <div className="row gap-3 center" style={{ marginBottom: 10 }}>
          <span className="tag tag-red">{article.category}</span>
          <span className="meta">{article.readTime} min read</span>
        </div>
        <div className={large ? "h-title" : "h-sub"}>{article.title}</div>
        {large && article.dek && (
          <p className="body-sm" style={{ marginTop: 10, color: "var(--ink-2)" }}>
            {article.dek}
          </p>
        )}
        <div className="row between center" style={{ marginTop: 14 }}>
          <span className="meta">
            {article.author} · {article.date}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export function ArticleHero({ hero, large }) {
  const h = hero || { kind: "abstract", tone: "ink" };
  const height = large ? 280 : 200;

  if (h.kind === "chart" && h.company) {
    const co = byId(h.company);
    if (co) {
      return (
        <div
          style={{
            height,
            background: "linear-gradient(180deg, #14140F 0%, #1B1B16 100%)",
            position: "relative",
            padding: 24,
            color: "#fff",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: ".1em",
              opacity: 0.6,
            }}
          >
            {co.symbol}
          </div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>
            {co.name}
          </div>
          <div style={{ position: "absolute", inset: "40% 0 0 0" }}>
            <Sparkline
              data={co.spark}
              width={500}
              height={height * 0.55}
              color={co.change >= 0 ? "#4DBE7C" : "#F47A82"}
              strokeWidth={2}
            />
          </div>
        </div>
      );
    }
  }
  if (h.kind === "chart" && h.index) {
    return (
      <div
        style={{
          height,
          background: "linear-gradient(180deg, #0E0E0C 0%, #1B1B16 100%)",
          position: "relative",
          padding: 24,
          color: "#fff",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: ".1em",
            opacity: 0.6,
          }}
        >
          NEPSE COMPOSITE
        </div>
        <div className="serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>
          2,085.32
        </div>
        <div style={{ position: "absolute", inset: "40% 0 0 0" }}>
          <Sparkline
            data={NEPSE.history.map((p) => p.v)}
            width={500}
            height={height * 0.55}
            color="#4DBE7C"
            strokeWidth={2}
          />
        </div>
      </div>
    );
  }
  if (h.kind === "portrait") {
    return (
      <div
        style={{
          height,
          background: "linear-gradient(135deg, #2A271E 0%, #0E0E0C 100%)",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width="80%"
          height="100%"
          preserveAspectRatio="xMidYMax meet"
          style={{ opacity: 0.85 }}
        >
          <defs>
            <radialGradient id="port-g" cx="50%" cy="35%" r="50%">
              <stop offset="0%" stopColor="#C8102E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C8102E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="80" r="60" fill="url(#port-g)" />
          <circle cx="100" cy="80" r="30" fill="#F4F1EA" opacity="0.95" />
          <path
            d="M40 200 C 40 140, 70 110, 100 110 C 130 110, 160 140, 160 200 Z"
            fill="#F4F1EA"
            opacity="0.95"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 22,
            bottom: 18,
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "#fff",
            opacity: 0.7,
            letterSpacing: ".1em",
          }}
        >
          CEO INSIGHT
        </div>
      </div>
    );
  }
  const tones = {
    red: { bg: "linear-gradient(135deg, #C8102E 0%, #6E081A 100%)", mark: "▼" },
    green: { bg: "linear-gradient(135deg, #0B7A3B 0%, #053A1D 100%)", mark: "▲" },
    cream: { bg: "linear-gradient(135deg, #E8DCC2 0%, #B5894A 100%)", mark: "◆" },
    ink: { bg: "linear-gradient(135deg, #1F2937 0%, #0E0E0C 100%)", mark: "●" },
  };
  const t = tones[h.tone] || tones.ink;
  return (
    <div style={{ height, background: t.bg, position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 18px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -30,
          bottom: -30,
          fontFamily: "var(--serif)",
          fontSize: 280,
          fontWeight: 700,
          color: "rgba(255,255,255,0.12)",
          lineHeight: 1,
        }}
      >
        {t.mark}
      </div>
    </div>
  );
}
