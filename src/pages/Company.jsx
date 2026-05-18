// ============================================================
// EVEREST INSIGHT — Company detail page
// ============================================================
import React, { useState } from "react";
import { COMPANIES, SECTORS, ARTICLES, byId, bySector, sectorName } from "../data";
import { ArticleCard } from "../components";
import { Sparkline, AreaChart, BulletBar } from "../charts";

export function CompanyPage({ companyId }) {
  const c = byId(companyId);
  const [range, setRange] = useState("1M");

  if (!c) {
    return (
      <div className="wrap section-pad" style={{ textAlign: "center" }}>
        <div className="eyebrow red">
          <span className="bar"></span>NOT FOUND
        </div>
        <h1 className="h-display" style={{ marginTop: 12 }}>
          That company isn't tracked yet.
        </h1>
        <a href="#/index" className="btn btn-red" style={{ marginTop: 22 }}>
          ← Back to Index
        </a>
      </div>
    );
  }

  const fullData = [...Array(60)].map((_, i) => {
    if (i < 30) {
      const v = 100 * (0.92 + Math.sin(i * 0.4) * 0.02 + (i / 30) * 0.04);
      return { d: i, v: Math.round(v * 100) / 100 };
    }
    return { d: i, v: c.spark[i - 30] };
  });
  const sliced =
    range === "1W" ? fullData.slice(-7) : range === "1M" ? fullData.slice(-30) : fullData;

  const peers = bySector(c.sector)
    .filter((p) => p.id !== c.id)
    .slice(0, 4);
  const relevantArticles = ARTICLES.filter((a) => a.tags && a.tags.includes(c.id));
  const sector = SECTORS.find((s) => s.id === c.sector);

  return (
    <>
      <div className="bg-cream" style={{ borderBottom: "1px solid var(--rule-cream)" }}>
        <div className="wrap" style={{ padding: "40px 0 32px" }}>
          <div className="crumbs">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <a href="#/index">Index</a>
            <span className="sep">/</span>
            <span style={{ color: "var(--ink-1)" }}>{c.symbol}</span>
          </div>
          <div className="g-2w" style={{ gap: 48, alignItems: "end", marginTop: 22 }}>
            <div>
              <div className="row gap-3 center">
                <span className="meta">{c.symbol}</span>
                <span className="meta">·</span>
                <span className="meta">{sectorName(c.sector).toUpperCase()}</span>
              </div>
              <h1 className="h-display" style={{ marginTop: 10 }}>
                {c.name}
                <span className="red-period">.</span>
              </h1>
              <div className="row gap-6 baseline" style={{ marginTop: 22 }}>
                <div>
                  <div className="meta">PRICE (NPR)</div>
                  <div
                    className="serif num"
                    style={{
                      fontSize: 48,
                      fontWeight: 600,
                      letterSpacing: "-0.022em",
                      lineHeight: 1,
                    }}
                  >
                    {c.price.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="meta">30-DAY</div>
                  <div
                    className={`pct ${c.change >= 0 ? "up" : "down"}`}
                    style={{ fontSize: 24 }}
                  >
                    {c.change >= 0 ? "+" : ""}
                    {c.change.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="meta">YEAR</div>
                  <div
                    className={`pct ${c.changeYear >= 0 ? "up" : "down"}`}
                    style={{ fontSize: 24 }}
                  >
                    {c.changeYear >= 0 ? "+" : ""}
                    {c.changeYear.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="meta">MARKET CAP</div>
                  <div className="serif num" style={{ fontSize: 24, fontWeight: 600 }}>
                    Rs {c.mcap.toLocaleString()} Cr
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{
                background: "rgba(255,255,255,.7)",
                borderColor: "var(--rule-cream)",
              }}
            >
              <div className="eyebrow">
                <span className="bar"></span>EVEREST RANK
              </div>
              <div className="row baseline gap-3" style={{ marginTop: 8 }}>
                <div
                  className="serif"
                  style={{
                    fontSize: 56,
                    fontWeight: 700,
                    color: c.change >= 0 ? "var(--green)" : "var(--red)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                  }}
                >
                  #{rankOf(c)}
                </div>
                <div className="meta">OF {COMPANIES.length}</div>
              </div>
              <hr className="rule rule-cream" style={{ margin: "14px 0" }} />
              <div className="row between center">
                <span className="meta">SECTOR PERF</span>
                <span
                  className={`pct-pill ${sector.performance >= 0 ? "up" : "down"}`}
                >
                  {sector.performance >= 0 ? "+" : ""}
                  {sector.performance.toFixed(1)}%
                </span>
              </div>
              <div className="row between center" style={{ marginTop: 8 }}>
                <span className="meta">VS SECTOR</span>
                <span
                  className={`pct-pill ${c.change - sector.performance >= 0 ? "up" : "down"}`}
                >
                  {c.change - sector.performance >= 0 ? "+" : ""}
                  {(c.change - sector.performance).toFixed(1)} pts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-pad-sm">
        <div className="wrap">
          <div className="card card-lg">
            <div className="row between baseline" style={{ marginBottom: 14 }}>
              <div>
                <div className="eyebrow">
                  <span className="bar"></span>PRICE HISTORY
                </div>
                <div className="h-title" style={{ marginTop: 8 }}>
                  Daily close, NPR
                </div>
              </div>
              <div className="seg">
                {["1W", "1M", "3M"].map((r) => (
                  <button key={r} data-on={range === r} onClick={() => setRange(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <AreaChart
              data={sliced}
              height={340}
              color={c.change >= 0 ? "var(--green)" : "var(--red)"}
              label={c.symbol}
              valueFormat={(v) => v.toFixed(1)}
            />
          </div>
        </div>
      </section>

      <section className="section-pad-sm">
        <div className="wrap">
          <div className="g-2w">
            <div className="card card-lg">
              <div className="eyebrow">
                <span className="bar"></span>KEY STATISTICS
              </div>
              <div className="g-3" style={{ gap: 28, marginTop: 16 }}>
                <Stat
                  label="DAY CHANGE"
                  value={`${c.changeDay >= 0 ? "+" : ""}${c.changeDay.toFixed(2)}%`}
                  tone={c.changeDay >= 0 ? "up" : "down"}
                />
                <Stat label="VOLUME (30D AVG)" value={`${c.volume.toLocaleString()}K`} />
                <Stat label="MARKET CAP" value={`Rs ${c.mcap.toLocaleString()} Cr`} />
                <Stat label="SECTOR" value={sectorName(c.sector)} />
                <Stat label="SYMBOL" value={c.symbol} />
                <Stat label="LISTING" value="NEPSE" />
              </div>
              <hr className="rule" style={{ margin: "28px 0 20px" }} />
              <div className="eyebrow">
                <span className="bar"></span>30-DAY PERFORMANCE VS SECTOR
              </div>
              <div style={{ marginTop: 18 }}>
                <BulletBar
                  value={c.change}
                  min={-25}
                  max={25}
                  color={c.change >= 0 ? "var(--green)" : "var(--red)"}
                />
                <div className="row between" style={{ marginTop: 8 }}>
                  <span className="meta">-25%</span>
                  <span className="meta">SECTOR: {sector.performance.toFixed(1)}%</span>
                  <span className="meta">+25%</span>
                </div>
              </div>
            </div>

            <div className="col gap-4">
              {c.ceo && (
                <div className="card card-cream">
                  <div className="eyebrow">
                    <span className="bar"></span>LEADERSHIP
                  </div>
                  <div className="row gap-3 center" style={{ marginTop: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, var(--red) 0%, var(--red-deep) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontFamily: "var(--serif)",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      {c.ceo.name
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="serif" style={{ fontSize: 17, fontWeight: 600 }}>
                        {c.ceo.name}
                      </div>
                      <div className="meta">
                        {c.ceo.role} · since {c.ceo.since}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="card">
                <div className="eyebrow">
                  <span className="bar"></span>WATCHLIST
                </div>
                <div className="h-sub" style={{ marginTop: 10 }}>
                  Track {c.symbol}
                </div>
                <p className="body-sm" style={{ marginTop: 8 }}>
                  Get notified when this company moves more than 5% in a single session.
                </p>
                <button className="btn btn-ink btn-sm" style={{ marginTop: 14 }}>
                  + Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {peers.length > 0 && (
        <section className="section-pad-sm">
          <div className="wrap">
            <div className="row between baseline" style={{ marginBottom: 18 }}>
              <div>
                <div className="eyebrow">
                  <span className="bar"></span>SECTOR PEERS
                </div>
                <h2 className="h-headline" style={{ marginTop: 8 }}>
                  Other names in {sectorName(c.sector)}
                  <span className="red-period">.</span>
                </h2>
              </div>
              <a href={`#/index?sector=${c.sector}`} className="btn btn-ghost">
                View sector →
              </a>
            </div>
            <div className="g-fill">
              {peers.map((p) => (
                <a key={p.id} href={`#/company/${p.id}`} className="card">
                  <div className="row between center" style={{ marginBottom: 8 }}>
                    <span className="meta">{p.symbol}</span>
                    <span className={`pct-pill ${p.change >= 0 ? "up" : "down"}`}>
                      {p.change >= 0 ? "+" : ""}
                      {p.change.toFixed(1)}%
                    </span>
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <Sparkline
                      data={p.spark}
                      width={220}
                      height={36}
                      color={p.change >= 0 ? "var(--green)" : "var(--red)"}
                      strokeWidth={1.3}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {relevantArticles.length > 0 && (
        <section className="bg-cream section-pad-sm">
          <div className="wrap">
            <div className="row between baseline" style={{ marginBottom: 22 }}>
              <h2 className="h-headline">
                Reporting on {c.symbol}
                <span className="red-period">.</span>
              </h2>
              <a href="#/analysis" className="btn btn-ghost">
                All analysis →
              </a>
            </div>
            <div className="g-fill">
              {relevantArticles.slice(0, 3).map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function rankOf(c) {
  const sorted = [...COMPANIES].sort((a, b) => b.change - a.change);
  return sorted.findIndex((x) => x.id === c.id) + 1;
}

function Stat({ label, value, tone }) {
  return (
    <div>
      <div className="meta">{label}</div>
      <div
        className={`serif ${tone === "up" ? "green-text" : tone === "down" ? "red-text" : ""}`}
        style={{ fontSize: 22, fontWeight: 600, marginTop: 6, letterSpacing: "-0.01em" }}
      >
        {value}
      </div>
    </div>
  );
}
