// ============================================================
// EVEREST INSIGHT — Index / Winners / Losers pages
// ============================================================
import React, { useState } from "react";
import { useHashRoute, navigate, parseQuery } from "../router";
import { COMPANIES, SECTORS, ARTICLES, sectorName } from "../data";
import { ArticleCard } from "../components";
import { Sparkline, Heatmap, BulletBar } from "../charts";

export function RankingPage({ kind }) {
  const route = useHashRoute();
  const queryParams = parseQuery(route.path);
  const [sectorFilter, setSectorFilter] = useState(queryParams.sector || "all");
  const [tab, setTab] = useState(queryParams.tab || "rankings");
  const [sortKey, setSortKey] = useState(kind === "losers" ? "change-asc" : "change-desc");
  const [search, setSearch] = useState("");

  let list = COMPANIES;
  if (kind === "winners") list = list.filter((c) => c.change > 0);
  if (kind === "losers") list = list.filter((c) => c.change < 0);
  if (sectorFilter !== "all") list = list.filter((c) => c.sector === sectorFilter);
  if (search) {
    const t = search.toLowerCase();
    list = list.filter(
      (c) => c.name.toLowerCase().includes(t) || c.symbol.toLowerCase().includes(t)
    );
  }
  list = [...list].sort((a, b) => {
    switch (sortKey) {
      case "change-asc":  return a.change - b.change;
      case "change-desc": return b.change - a.change;
      case "price-asc":   return a.price - b.price;
      case "price-desc":  return b.price - a.price;
      case "mcap-asc":    return a.mcap - b.mcap;
      case "mcap-desc":   return b.mcap - a.mcap;
      case "name-asc":    return a.name.localeCompare(b.name);
      default:            return 0;
    }
  });

  const titles = {
    index: {
      eyebrow: "EVEREST INDEX — APRIL 2026",
      h: "The full Everest Index",
      dek: "Every listed company we track, ranked by 30-day performance, market cap, and sector flow.",
      crumb: "Everest Index",
    },
    winners: {
      eyebrow: "MONTHLY WINNERS",
      h: "Top gainers",
      dek: "Companies leading the index this month. Sorted by 30-day price change. Tap any row for a deeper read.",
      crumb: "Winners",
    },
    losers: {
      eyebrow: "MONTHLY LOSERS",
      h: "Top decliners",
      dek: "Companies under the most pressure. Look beyond the percentage — most of these are float-constrained, not earnings-broken.",
      crumb: "Losers",
    },
  };
  const t = titles[kind];

  return (
    <>
      <div className="page-head-cream">
        <div className="wrap">
          <div className="crumbs">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <span style={{ color: "var(--ink-1)" }}>{t.crumb}</span>
          </div>
          <div className="row between baseline wrap-row gap-6" style={{ marginTop: 20 }}>
            <div style={{ flex: 1, minWidth: 380, maxWidth: 720 }}>
              <div className="eyebrow red">
                <span className="bar"></span>
                {t.eyebrow}
              </div>
              <h1 className="h-display" style={{ marginTop: 14 }}>
                {t.h}
                <span className="red-period">.</span>
              </h1>
              <p className="body-lg" style={{ marginTop: 18 }}>
                {t.dek}
              </p>
            </div>
            <IndexSummary kind={kind} />
          </div>
        </div>
      </div>

      <div className="bg-elev" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap" style={{ padding: "20px 0" }}>
          <div className="row between center wrap-row gap-4">
            <div className="row gap-2 center wrap-row">
              <span className="meta">SECTOR:</span>
              <button
                className="chip"
                data-on={sectorFilter === "all"}
                onClick={() => setSectorFilter("all")}
              >
                All sectors
              </button>
              {SECTORS.map((s) => (
                <button
                  key={s.id}
                  className="chip"
                  data-on={sectorFilter === s.id}
                  onClick={() => setSectorFilter(s.id)}
                >
                  {s.name}
                </button>
              ))}
            </div>
            <div className="row gap-3 center">
              <div style={{ position: "relative" }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--ink-3)"
                  strokeWidth="2"
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  className="input"
                  placeholder="Filter rows…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingLeft: 32, width: 220 }}
                />
              </div>
              {kind === "index" && (
                <div className="seg">
                  <button data-on={tab === "rankings"} onClick={() => setTab("rankings")}>
                    RANKINGS
                  </button>
                  <button data-on={tab === "heatmap"} onClick={() => setTab("heatmap")}>
                    HEATMAP
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="section-pad-sm">
        <div className="wrap">
          {tab === "heatmap" ? (
            <FullHeatmap />
          ) : (
            <CompaniesTable companies={list} sortKey={sortKey} onSort={setSortKey} kind={kind} />
          )}
        </div>
      </section>

      <section className="bg-cream section-pad-sm">
        <div className="wrap">
          <div className="row between baseline">
            <div>
              <div className="eyebrow">
                <span className="bar"></span>EDITORIAL
              </div>
              <h3 className="h-headline" style={{ marginTop: 10 }}>
                The reporting behind the numbers<span className="red-period">.</span>
              </h3>
            </div>
            <a href="#/analysis" className="btn btn-ghost">
              All analysis →
            </a>
          </div>
          <div className="g-3" style={{ marginTop: 28 }}>
            {ARTICLES.slice(0, 3).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function IndexSummary({ kind }) {
  const all = COMPANIES;
  const up = all.filter((c) => c.change > 0).length;
  const dn = all.filter((c) => c.change < 0).length;
  const avg = all.reduce((s, c) => s + c.change, 0) / all.length;
  return (
    <div
      className="card"
      style={{
        minWidth: 340,
        padding: 22,
        background: "rgba(255,255,255,.55)",
        borderColor: "var(--rule-cream)",
      }}
    >
      <div className="meta">INDEX STATS · 30 DAYS</div>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 12 }}
      >
        <div>
          <div className="meta">TRACKED</div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 600 }}>
            {all.length}
          </div>
        </div>
        <div>
          <div className="meta">ADVANCERS</div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 600, color: "var(--green)" }}>
            {up}
          </div>
        </div>
        <div>
          <div className="meta">DECLINERS</div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 600, color: "var(--red)" }}>
            {dn}
          </div>
        </div>
      </div>
      <hr className="rule rule-cream" style={{ margin: "14px 0" }} />
      <div className="row between center">
        <span className="meta">INDEX AVG</span>
        <span className={`pct-pill ${avg >= 0 ? "up" : "down"}`}>
          {avg >= 0 ? "+" : ""}
          {avg.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

function CompaniesTable({ companies, sortKey, onSort }) {
  function clickHeader(field) {
    const [curField, curDir] = sortKey.split("-");
    if (curField === field) onSort(`${field}-${curDir === "asc" ? "desc" : "asc"}`);
    else onSort(`${field}-${field === "change" || field === "mcap" ? "desc" : "asc"}`);
  }
  function arrow(field) {
    if (!sortKey.startsWith(field)) return null;
    return sortKey.endsWith("asc") ? " ↑" : " ↓";
  }
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 50, paddingLeft: 22 }}>#</th>
            <th data-sort onClick={() => clickHeader("name")}>
              Company{arrow("name")}
            </th>
            <th style={{ width: 110 }}>Sector</th>
            <th
              className="num-col"
              data-sort
              onClick={() => clickHeader("price")}
              style={{ width: 110 }}
            >
              Price{arrow("price")}
            </th>
            <th
              className="num-col"
              data-sort
              onClick={() => clickHeader("change")}
              style={{ width: 110 }}
            >
              30-day{arrow("change")}
            </th>
            <th style={{ width: 130 }}>Trend</th>
            <th
              className="num-col"
              data-sort
              onClick={() => clickHeader("mcap")}
              style={{ width: 110, paddingRight: 22 }}
            >
              MCap (Cr){arrow("mcap")}
            </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c, i) => (
            <tr key={c.id} onClick={() => navigate(`#/company/${c.id}`)}>
              <td style={{ paddingLeft: 22 }} className="meta">
                {i + 1}
              </td>
              <td>
                <div
                  className="serif"
                  style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.005em" }}
                >
                  {c.name}
                </div>
                <div className="sym">{c.symbol}</div>
              </td>
              <td>
                <span className="tag" style={{ background: "rgba(0,0,0,0.04)" }}>
                  {sectorName(c.sector)}
                </span>
              </td>
              <td className="num-col" style={{ fontSize: 14, fontWeight: 600 }}>
                {c.price.toFixed(2)}
              </td>
              <td className="num-col">
                <span className={`pct-pill ${c.change >= 0 ? "up" : "down"}`}>
                  {c.change >= 0 ? "+" : ""}
                  {c.change.toFixed(1)}%
                </span>
              </td>
              <td>
                <Sparkline
                  data={c.spark}
                  width={100}
                  height={28}
                  color={c.change >= 0 ? "var(--green)" : "var(--red)"}
                  strokeWidth={1.3}
                  showFill={false}
                  showEndDot={true}
                />
              </td>
              <td className="num-col" style={{ paddingRight: 22, fontSize: 13 }}>
                {c.mcap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {companies.length === 0 && (
        <div style={{ padding: 60, textAlign: "center", color: "var(--ink-3)" }}>
          No companies match your filters.
        </div>
      )}
    </div>
  );
}

function FullHeatmap() {
  return (
    <div className="card card-lg">
      <div className="row between baseline" style={{ marginBottom: 6 }}>
        <div>
          <div className="eyebrow">
            <span className="bar"></span>SECTOR HEATMAP
          </div>
          <h2 className="h-title" style={{ marginTop: 10 }}>
            30-day performance, weighted by market cap
          </h2>
        </div>
        <div className="row gap-3 center">
          <span className="meta">SCALE:</span>
          <div className="row gap-2 center">
            <span style={{ width: 14, height: 14, background: "oklch(40% 0.18 22)", borderRadius: 2 }} />
            <span className="meta">−5%</span>
            <span style={{ width: 14, height: 14, background: "var(--ink-4)", borderRadius: 2 }} />
            <span className="meta">0%</span>
            <span style={{ width: 14, height: 14, background: "oklch(40% 0.16 148)", borderRadius: 2 }} />
            <span className="meta">+5%</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, minHeight: 360 }}>
        <Heatmap sectors={SECTORS} onSelect={(s) => navigate(`#/index?sector=${s.id}`)} />
      </div>

      <hr className="rule" style={{ margin: "32px 0 24px" }} />

      <div className="row between baseline" style={{ marginBottom: 16 }}>
        <div className="h-title">Sector breakdown</div>
        <div className="meta">CLICK A ROW TO FILTER</div>
      </div>
      <div className="rank-list">
        {[...SECTORS].sort((a, b) => b.performance - a.performance).map((s, i) => (
          <a
            key={s.id}
            href={`#/index?sector=${s.id}`}
            className={`rank-row ${s.performance >= 0 ? "up" : "down"}`}
          >
            <div className="rank-num-chip">{i + 1}</div>
            <div>
              <div className="rank-name">{s.name}</div>
              <div className="rank-sub">
                Rs {s.marketCap} Cr · {(s.weight * 100).toFixed(0)}% weight
              </div>
            </div>
            <div style={{ width: 200 }}>
              <BulletBar value={s.performance} min={-5} max={5} />
            </div>
            <div className={`pct ${s.performance >= 0 ? "up" : "down"}`}>
              {s.performance >= 0 ? "+" : ""}
              {s.performance.toFixed(1)}%
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
