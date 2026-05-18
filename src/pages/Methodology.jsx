// ============================================================
// EVEREST INSIGHT — Methodology page
// ============================================================
import React from "react";
import { SECTORS } from "../data";
import { Donut } from "../charts";

export function MethodologyPage() {
  const blocks = [
    {
      num: "01",
      title: "Market Data Collection",
      body: "We ingest daily NEPSE closes, volume, and float-adjusted shares outstanding for every actively traded security. Historical data going back to 2020 is stored in a versioned warehouse so that revisions are traceable and reproducible.",
    },
    {
      num: "02",
      title: "Performance Scoring",
      body: "Companies are ranked on a composite of five inputs: price return, volume change, sector strength, momentum, and price stability. Each input is z-scored across the universe; weights are documented and unchanged month-to-month.",
    },
    {
      num: "03",
      title: "Sector Weighting",
      body: "Sectors are not equally weighted. Banking, with its disproportionate share of free float and turnover, receives a 28% weight in the composite; smaller sectors are weighted by their share of NEPSE market cap.",
    },
    {
      num: "04",
      title: "Risk Adjustment",
      body: "We filter for liquidity. Names with average daily turnover below Rs 5 lakh are excluded from headline rankings, as are names showing classic pump-and-dump signatures (single-session price moves above 8% on volume below the 20-day median).",
    },
    {
      num: "05",
      title: "Monthly Rebalancing",
      body: "The Everest Index is rebalanced on the first trading day of each month using closing data from the prior month. New listings are eligible after one month of trading history; delisted names are removed immediately.",
    },
    {
      num: "06",
      title: "Independent Analysis",
      body: "Everest Insight does not provide financial advice. We do not take payment for coverage. We do not accept gifts from listed companies. Our editorial decisions are made by our editors, not by an algorithm and not by anyone we cover.",
    },
  ];

  return (
    <>
      <div className="page-head-cream">
        <div className="wrap">
          <div className="crumbs">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <span style={{ color: "var(--ink-1)" }}>Methodology</span>
          </div>
          <div style={{ maxWidth: 820, marginTop: 22 }}>
            <div className="eyebrow red">
              <span className="bar"></span>METHODOLOGY · VERSION 2.4
            </div>
            <h1 className="h-display" style={{ marginTop: 14 }}>
              How the Everest Index works<span className="red-period">.</span>
            </h1>
            <p
              className="body-lg"
              style={{
                marginTop: 22,
                fontSize: 22,
                fontFamily: "var(--serif)",
              }}
            >
              The Everest Index is built on publicly available market data, sector performance,
              momentum analysis, and company growth indicators. We track Nepal's strongest and
              weakest market performers each month — and we publish the rules we use to do it.
            </p>
          </div>
        </div>
      </div>

      <section className="section-pad">
        <div className="wrap">
          <div className="g-2" style={{ gap: 32 }}>
            {blocks.map((b) => (
              <div key={b.num} className="card card-lg">
                <div className="row gap-3 baseline">
                  <span
                    className="serif"
                    style={{
                      fontSize: 52,
                      fontWeight: 700,
                      color: "var(--red)",
                      letterSpacing: "-0.025em",
                      lineHeight: 0.9,
                    }}
                  >
                    {b.num}
                  </span>
                  <div>
                    <div className="meta" style={{ marginBottom: 4 }}>
                      STEP {b.num}
                    </div>
                    <h3 className="h-title">{b.title}</h3>
                  </div>
                </div>
                <hr className="rule" style={{ margin: "20px 0 18px" }} />
                <p className="body" style={{ fontSize: 16, color: "var(--ink-2)" }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream section-pad-sm">
        <div className="wrap">
          <div className="row between baseline" style={{ marginBottom: 28 }}>
            <div>
              <div className="eyebrow">
                <span className="bar"></span>SECTOR WEIGHTS
              </div>
              <h2 className="h-headline" style={{ marginTop: 10 }}>
                How the index is composed<span className="red-period">.</span>
              </h2>
            </div>
            <div className="meta">CURRENT AS OF APRIL 2026</div>
          </div>

          <div className="g-2nw">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Donut
                size={280}
                thickness={42}
                segments={SECTORS.map((s) => ({
                  key: s.id,
                  value: s.weight,
                  color: s.color,
                  label: s.name,
                }))}
              />
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {SECTORS.map((s) => (
                  <div
                    key={s.id}
                    className="row gap-3 center"
                    style={{
                      padding: "10px 14px",
                      background: "var(--bg-elev)",
                      borderRadius: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        background: s.color,
                        borderRadius: 2,
                      }}
                    />
                    <span style={{ flex: 1, fontWeight: 500, fontSize: 14 }}>{s.name}</span>
                    <span
                      className="num meta"
                      style={{ color: "var(--ink-1)", fontWeight: 600 }}
                    >
                      {(s.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink section-pad-sm">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ color: "rgba(244,241,234,.55)" }}>
            <span className="bar"></span>DISCLAIMER
          </div>
          <h2 className="h-headline" style={{ marginTop: 12, color: "#fff" }}>
            Independence is the only thing we sell
            <span style={{ color: "var(--red)" }}>.</span>
          </h2>
          <p className="body-lg" style={{ marginTop: 18, color: "rgba(244,241,234,.75)" }}>
            Everest Insight does not provide financial advice. Nothing on this site is a
            recommendation to buy, sell, or hold any security. Rankings are based on historical
            data and statistical models; past performance is not predictive of future results.
            Always do your own research.
          </p>
        </div>
      </section>
    </>
  );
}
