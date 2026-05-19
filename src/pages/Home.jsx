// ============================================================
// EVEREST INSIGHT — Home page
// Hero · Everest Index · Market Snapshot · Heatmap · Analysis · Newsletter
// ============================================================
import React, { useState } from "react";
import {
  ARTICLES,
  NEPSE,
  SECTORS,
  byId,
  featuredArticle,
  losers as getLosers,
  sectorName,
  winners as getWinners,
} from "../data";
import {
  Ticker,
  NewsletterCard,
  ArticleCard,
  ArticleHero,
} from "../components";
import { Sparkline, AreaChart, perfColor } from "../charts";

export function HomePage() {
  const winners = getWinners(5);
  const losers = getLosers(5);
  const featured = featuredArticle();
  const otherArticles = ARTICLES.filter((a) => !a.featured).slice(0, 4);

  return (
    <>
      <Ticker />
      <section className="wrap" style={{ position: "relative" }}>
        <div className="hero-grid">
          <div>
            <div className="eyebrow red fade-up">
              <span className="bar"></span>EVEREST INDEX — APRIL 2026
            </div>
            <h1 className="hero-headline fade-up fade-up-d1" style={{ marginTop: 22 }}>
              At the peak of<br />
              business <em>intelligence</em>
              <span className="red-period">.</span>
            </h1>
            <p className="hero-sub fade-up fade-up-d2">
              We track Nepal's listed companies — who is rising, who is falling, and what the flow data says
              about where capital is moving next. Written like financial journalism. Updated monthly.
            </p>
            <div className="hero-actions fade-up fade-up-d2">
              <a href="#/index" className="btn btn-red btn-lg">
                View Everest Index
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#/methodology" className="btn btn-outline btn-lg">
                How it works
              </a>
            </div>
            <div className="trust-row fade-up fade-up-d3" style={{ marginTop: 32 }}>
              <span>UPDATED MONTHLY</span>
              <span className="sep">·</span>
              <span>DATA-DRIVEN</span>
              <span className="sep">·</span>
              <span>INDEPENDENT</span>
            </div>
          </div>

          <div className="fade-up fade-up-d2">
            <HomeIndexCard winners={winners} losers={losers} />
          </div>
        </div>
      </section>

      <section
        className="bg-cream"
        style={{
          borderTop: "1px solid var(--rule-cream)",
          borderBottom: "1px solid var(--rule-cream)",
        }}
      >
        <div className="wrap market-snap-section">
          <MarketSnapshot />
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <div className="row between baseline" style={{ marginBottom: 24 }}>
            <div>
              <div className="eyebrow">
                <span className="bar"></span>MARKET PULSE
              </div>
              <h2 className="h-headline" style={{ marginTop: 10 }}>
                The story of Nepal's market<span className="red-period">.</span>
              </h2>
            </div>
            <a href="#/index" className="btn btn-ghost">
              Full index dashboard →
            </a>
          </div>
          <div className="g-2w">
            <NepseChartCard />
            <SectorHeatmapCard />
          </div>
        </div>
      </section>

      <section
        className="bg-cream section-pad-sm"
        style={{ borderTop: "1px solid var(--rule-cream)" }}
      >
        <div className="wrap">
          <div className="row between baseline" style={{ marginBottom: 24 }}>
            <div>
              <div className="eyebrow">
                <span className="bar"></span>FEATURED COMPANIES
              </div>
              <h2 className="h-headline" style={{ marginTop: 10 }}>
                This month's spotlight<span className="red-period">.</span>
              </h2>
            </div>
            <a href="#/winners" className="btn btn-ghost">
              All movers →
            </a>
          </div>
          <FeaturedCompanies />
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <div className="row between baseline" style={{ marginBottom: 24 }}>
            <div>
              <div className="eyebrow">
                <span className="bar"></span>LATEST ANALYSIS
              </div>
              <h2 className="h-headline" style={{ marginTop: 10 }}>
                The reporting<span className="red-period">.</span>
              </h2>
            </div>
            <a href="#/analysis" className="btn btn-ghost">
              View all articles →
            </a>
          </div>

          <div className="g-2w">
            <a href={`#/article/${featured.slug}`} style={{ display: "block" }}>
              <div style={{ overflow: "hidden", borderRadius: 12, border: "1px solid var(--rule)" }}>
                <ArticleHero hero={featured.hero} large />
                <div style={{ padding: 28, background: "var(--bg-elev)" }}>
                  <div className="row gap-3 center" style={{ marginBottom: 14 }}>
                    <span className="tag tag-red">{featured.category}</span>
                    <span className="meta">{featured.readTime} MIN READ</span>
                    <span className="meta">·</span>
                    <span className="meta">{featured.author}</span>
                  </div>
                  <h3
                    className="h-headline"
                    style={{ fontSize: 38, letterSpacing: "-0.02em", marginBottom: 12 }}
                  >
                    {featured.title}
                  </h3>
                  <p className="body-lg" style={{ maxWidth: 620 }}>
                    {featured.dek}
                  </p>
                </div>
              </div>
            </a>

            <div className="col gap-4">
              {otherArticles.slice(0, 3).map((a) => (
                <SmallArticleRow key={a.id} article={a} />
              ))}
              <NewsletterCard compact />
            </div>
          </div>

          <div className="g-4" style={{ marginTop: 48 }}>
            {ARTICLES.filter((a) => !a.featured)
              .slice(0, 4)
              .map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
          </div>
        </div>
      </section>

      <section className="bg-ink section-pad-sm">
        <div className="wrap">
          <div className="row between baseline" style={{ marginBottom: 28 }}>
            <div>
              <div className="eyebrow" style={{ color: "rgba(244,241,234,.6)" }}>
                <span className="bar"></span>CEO INSIGHTS
              </div>
              <h2 className="h-headline" style={{ marginTop: 10, color: "#fff" }}>
                In their own words<span style={{ color: "var(--red)" }}>.</span>
              </h2>
            </div>
            <a
              href="#/analysis?cat=CEO%20Insight"
              className="btn btn-outline"
              style={{ borderColor: "rgba(244,241,234,.5)", color: "#fff" }}
            >
              All interviews →
            </a>
          </div>
          <CeoStrip />
        </div>
      </section>

      <section className="bg-cream section-pad-sm">
        <div className="wrap g-nl">
          <div>
            <div className="eyebrow">
              <span className="bar"></span>JOIN 4,200+ READERS
            </div>
            <h2 className="h-display" style={{ marginTop: 16 }}>
              The monthly index, before it moves<span className="red-period">.</span>
            </h2>
            <p className="body-lg" style={{ marginTop: 18, maxWidth: 520 }}>
              First Monday of every month. Index rankings, sector flow, and a 400-word note from the editor.
              Free. No spam.
            </p>
          </div>
          <NewsletterCard tone="cream" />
        </div>
      </section>
    </>
  );
}

function HomeIndexCard({ winners, losers }) {
  const [tab, setTab] = useState("winners");
  const rows = tab === "winners" ? winners : losers;
  return (
    <div className="card card-lg" style={{ background: "var(--bg-elev)" }}>
      <div className="row between baseline" style={{ marginBottom: 18 }}>
        <div className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em" }}>
          Everest Index{" "}
          <span style={{ color: "var(--ink-3)", fontWeight: 400 }}>· April 2026</span>
        </div>
        <div className="meta">
          UPDATED <span className="ink-1">APR 18</span>
        </div>
      </div>

      <div className="seg" style={{ marginBottom: 16 }}>
        <button data-on={tab === "winners"} onClick={() => setTab("winners")}>
          ▲ TOP 10 WINNERS
        </button>
        <button data-on={tab === "losers"} onClick={() => setTab("losers")}>
          ▼ TOP 10 LOSERS
        </button>
      </div>

      <div className="rank-list">
        {rows.map((c, i) => (
          <a
            key={c.id}
            className={`rank-row ${c.change >= 0 ? "up" : "down"}`}
            href={`#/company/${c.id}`}
          >
            <div className="rank-num-chip">{i + 1}</div>
            <div>
              <div className="rank-name">{c.name}</div>
              <div className="rank-sub">
                {c.symbol} · {sectorName(c.sector)}
              </div>
            </div>
            <div className="rank-spark" style={{ width: 64, opacity: 0.85 }}>
              <Sparkline
                data={c.spark}
                width={64}
                height={22}
                color={c.change >= 0 ? "var(--green)" : "var(--red)"}
                strokeWidth={1.2}
                showFill={false}
                showEndDot={false}
              />
            </div>
            <div className={`pct ${c.change >= 0 ? "up" : "down"}`}>
              {c.change >= 0 ? "+" : ""}
              {c.change.toFixed(1)}%
            </div>
          </a>
        ))}
      </div>

      <hr className="rule" style={{ margin: "16px 0 14px" }} />
      <a
        href={tab === "winners" ? "#/winners" : "#/losers"}
        className="row between center"
        style={{ color: "var(--ink-1)", fontWeight: 600, fontSize: 13.5 }}
      >
        <span>View full list of 10</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}

function MarketSnapshot() {
  const indicators = [
    { label: "NEPSE Index", value: "2,085.32", chg: 1.2 },
    { label: "Banking", value: null, chg: 1.8 },
    { label: "Hydropower", value: null, chg: 4.2 },
    { label: "Manufacturing", value: null, chg: -1.6 },
    { label: "Microfinance", value: null, chg: -2.4 },
    { label: "Trading", value: null, chg: 0.3 },
  ];
  return (
    <div className="market-snap-wrap">
    <div className="market-snap-inner">
      <div className="market-snap-title">
        <div className="eyebrow">
          <span className="bar"></span>MARKET
        </div>
        <div
          className="serif"
          style={{ fontSize: 26, fontWeight: 600, marginTop: 4, letterSpacing: "-0.015em" }}
        >
          Snapshot
        </div>
      </div>
      {indicators.map((ind) => (
        <div key={ind.label}>
          <div className="meta" style={{ marginBottom: 4 }}>
            {ind.label.toUpperCase()}
          </div>
          {ind.value && (
            <div
              className="serif"
              style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em" }}
            >
              {ind.value}
            </div>
          )}
          <div
            className={`pct-pill ${ind.chg >= 0 ? "up" : "down"}`}
            style={{ marginTop: ind.value ? 4 : 8 }}
          >
            {ind.chg >= 0 ? "+" : ""}
            {ind.chg.toFixed(1)}%
          </div>
        </div>
      ))}
      <div className="meta no-wrap market-snap-updated">
        LAST UPDATED
        <br />
        <span className="ink-1" style={{ fontSize: 13, letterSpacing: "-0.005em" }}>
          Apr 18, 2026 · 14:32
        </span>
      </div>
    </div>
    </div>
  );
}

function NepseChartCard() {
  const [range, setRange] = useState("1M");
  const fullData = NEPSE.history;
  const sliced =
    range === "1W" ? fullData.slice(-7) : range === "1M" ? fullData.slice(-30) : fullData;
  return (
    <div className="card card-lg">
      <div className="row between baseline" style={{ marginBottom: 4 }}>
        <div>
          <div className="eyebrow">
            <span className="bar"></span>NEPSE COMPOSITE
          </div>
          <div className="row baseline gap-3" style={{ marginTop: 10 }}>
            <div
              className="serif num"
              style={{
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.022em",
                lineHeight: 1,
              }}
            >
              2,085<span style={{ color: "var(--ink-3)" }}>.32</span>
            </div>
            <div className="col" style={{ paddingBottom: 4 }}>
              <div className={`pct-pill ${NEPSE.changeDay >= 0 ? "up" : "down"}`}>
                {NEPSE.changeDay >= 0 ? "▲" : "▼"} {Math.abs(NEPSE.changeDay).toFixed(2)}% today
              </div>
              <div className="meta" style={{ marginTop: 4 }}>
                +{NEPSE.changeMonth.toFixed(1)}% MTD · +{NEPSE.changeYear.toFixed(1)}% YTD
              </div>
            </div>
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
      <div style={{ marginTop: 18 }}>
        <AreaChart
          data={sliced}
          height={260}
          color="var(--red)"
          label="NEPSE"
          valueFormat={(v) => v.toFixed(0)}
        />
      </div>
    </div>
  );
}

function SectorHeatmapCard() {
  return (
    <div
      className="card card-lg"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="eyebrow">
        <span className="bar"></span>SECTOR HEATMAP
      </div>
      <div className="h-title" style={{ marginTop: 10, marginBottom: 14 }}>
        30-day performance
      </div>
      <div style={{ flex: 1 }}>
        <CompactHeatmap sectors={SECTORS} />
      </div>
      <div className="row between center" style={{ marginTop: 18 }}>
        <div className="meta">By market cap weighting</div>
        <a href="#/index?tab=heatmap" className="btn btn-ghost btn-sm">
          Full heatmap →
        </a>
      </div>
    </div>
  );
}

function CompactHeatmap({ sectors }) {
  return (
    <div className="heatmap g-heatmap-sm" style={{ gridAutoRows: 86 }}>
      {sectors.slice(0, 8).map((s) => (
        <a
          key={s.id}
          href={`#/index?sector=${s.id}`}
          className="heatmap-cell"
          style={{ background: perfColor(s.performance) }}
        >
          <div className="hm-name" style={{ fontSize: 13 }}>
            {s.name}
          </div>
          <div className="hm-pct" style={{ fontSize: 18 }}>
            {s.performance >= 0 ? "+" : ""}
            {s.performance.toFixed(1)}%
          </div>
        </a>
      ))}
    </div>
  );
}

function SmallArticleRow({ article }) {
  return (
    <a
      href={`#/article/${article.slug}`}
      className="row gap-4"
      style={{
        padding: 16,
        background: "var(--bg-elev)",
        border: "1px solid var(--rule)",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          flexShrink: 0,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <ArticleHero hero={article.hero} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="row gap-2 center" style={{ marginBottom: 6 }}>
          <span className="tag tag-red">{article.category}</span>
          <span className="meta">{article.readTime} MIN</span>
        </div>
        <div
          className="serif"
          style={{
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {article.title}
        </div>
      </div>
    </a>
  );
}

function FeaturedCompanies() {
  const featured = [byId("uppm"), byId("hbl"), byId("ntc"), byId("nica")];
  return (
    <div className="g-4">
      {featured.map((c) => (
        <a
          key={c.id}
          href={`#/company/${c.id}`}
          className="card"
          style={{ padding: 22, background: "var(--bg-elev)" }}
        >
          <div className="row between center" style={{ marginBottom: 12 }}>
            <span className="meta">{c.symbol}</span>
            <span className={`pct-pill ${c.change >= 0 ? "up" : "down"}`}>
              {c.change >= 0 ? "+" : ""}
              {c.change.toFixed(1)}%
            </span>
          </div>
          <div
            className="serif"
            style={{
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: 4,
            }}
          >
            {c.name}
          </div>
          <div className="meta" style={{ marginBottom: 16 }}>
            {sectorName(c.sector)}
          </div>
          <Sparkline
            data={c.spark}
            width={240}
            height={50}
            color={c.change >= 0 ? "var(--green)" : "var(--red)"}
            strokeWidth={1.5}
          />
          <div className="row between center" style={{ marginTop: 14 }}>
            <div>
              <div className="meta">PRICE</div>
              <div className="num serif" style={{ fontSize: 18, fontWeight: 600 }}>
                Rs {c.price.toFixed(0)}
              </div>
            </div>
            <div className="right-text">
              <div className="meta">MCAP</div>
              <div className="num" style={{ fontSize: 13, fontWeight: 600 }}>
                {c.mcap} Cr
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function CeoStrip() {
  const ceos = ["nica", "hbl", "nabil"].map((id) => ({ ...byId(id), ...byId(id).ceo }));
  return (
    <div className="g-3">
      {ceos.map((ceo) => (
        <a
          key={ceo.id}
          href="#/article/ceo-interview-nica"
          className="card"
          style={{
            background: "rgba(244,241,234,0.04)",
            border: "1px solid rgba(244,241,234,0.12)",
            color: "var(--ink-on-dark)",
            padding: 26,
          }}
        >
          <div className="row gap-4 center" style={{ marginBottom: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #C8102E 0%, #6E081A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--serif)",
                fontSize: 22,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {ceo.name
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>
                {ceo.name}
              </div>
              <div className="meta" style={{ color: "rgba(244,241,234,.55)" }}>
                {ceo.role} ·{" "}
                {ceo.name === "Roshan Kumar Neupane" ? "NIC Asia" : ceo.symbol}
              </div>
            </div>
          </div>
          <div
            className="serif"
            style={{
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.3,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            "{ceoQuote(ceo.id)}"
          </div>
          <div className="row between center" style={{ marginTop: 22 }}>
            <span className="meta" style={{ color: "rgba(244,241,234,.55)" }}>
              READ INTERVIEW
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
}

function ceoQuote(id) {
  return (
    {
      nica: "Digital adoption isn't a feature anymore. It's the whole product.",
      hbl: "We rebalanced into the segment everyone else was ignoring. That's where the spread lives.",
      nabil: "If you're worried about the rate cut, you're solving the wrong problem.",
    }[id] || "The market punishes complacency every time."
  );
}
