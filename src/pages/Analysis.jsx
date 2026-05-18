// ============================================================
// EVEREST INSIGHT — Analysis listing + Article detail
// ============================================================
import React, { useState } from "react";
import { useHashRoute, parseQuery } from "../router";
import { ARTICLES, NEPSE, byId, articleById, sectorName } from "../data";
import { ArticleCard, ArticleHero, NewsletterCard } from "../components";
import { Sparkline } from "../charts";

export function AnalysisPage() {
  const route = useHashRoute();
  const q = parseQuery(route.path);
  const [cat, setCat] = useState(q.cat || "All");

  const cats = ["All", "Analysis", "Insight", "Market Trends", "CEO Insight"];
  let list = ARTICLES;
  if (cat !== "All") list = list.filter((a) => a.category === cat);

  const featured = list.find((a) => a.featured) || list[0];
  const rest = list.filter((a) => a.id !== featured?.id);

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <div className="crumbs">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <span style={{ color: "var(--ink-1)" }}>Analysis</span>
          </div>
          <div className="row between baseline wrap-row" style={{ marginTop: 20, gap: 32 }}>
            <div style={{ maxWidth: 720 }}>
              <div className="eyebrow red">
                <span className="bar"></span>EDITORIAL · UPDATED WEEKLY
              </div>
              <h1 className="h-display" style={{ marginTop: 14 }}>
                Analysis<span className="red-period">.</span>
              </h1>
              <p className="body-lg" style={{ marginTop: 14 }}>
                Long-form reporting on Nepal's market. Written by editors, not algorithms.
              </p>
            </div>
            <div className="row gap-2 wrap-row" style={{ alignSelf: "flex-end" }}>
              {cats.map((c) => (
                <button
                  key={c}
                  className="chip"
                  data-on={cat === c}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {featured && (
        <section className="section-pad-sm">
          <div className="wrap">
            <a
              href={`#/article/${featured.slug}`}
              className="g-2f"
            >
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid var(--rule)",
                }}
              >
                <ArticleHero hero={featured.hero} large />
              </div>
              <div>
                <div className="row gap-3 center">
                  <span className="tag tag-red">{featured.category}</span>
                  <span className="meta">FEATURED · {featured.readTime} MIN READ</span>
                </div>
                <h2
                  className="h-headline"
                  style={{ marginTop: 16, fontSize: 48, letterSpacing: "-0.025em" }}
                >
                  {featured.title}
                </h2>
                <p className="body-lg" style={{ marginTop: 16, maxWidth: 540 }}>
                  {featured.dek}
                </p>
                <div className="row gap-3 center" style={{ marginTop: 22 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "var(--bg-cream)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--serif)",
                      fontWeight: 600,
                    }}
                  >
                    {featured.author[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{featured.author}</div>
                    <div className="meta">
                      {featured.role} · {featured.date}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      <hr className="rule" />

      <section className="section-pad-sm">
        <div className="wrap">
          <div className="g-3">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream section-pad-sm">
        <div className="wrap g-nl">
          <div>
            <div className="eyebrow">
              <span className="bar"></span>SUBSCRIBE
            </div>
            <h2 className="h-display" style={{ marginTop: 14 }}>
              The reporting in your inbox<span className="red-period">.</span>
            </h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              One email, first Monday of every month. Free.
            </p>
          </div>
          <NewsletterCard tone="cream" />
        </div>
      </section>
    </>
  );
}

export function ArticlePage({ slug }) {
  const article = articleById(slug);
  if (!article) {
    return (
      <div className="wrap section-pad" style={{ textAlign: "center" }}>
        <div className="eyebrow red">
          <span className="bar"></span>NOT FOUND
        </div>
        <h1 className="h-display" style={{ marginTop: 12 }}>
          That article doesn't exist.
        </h1>
        <a href="#/analysis" className="btn btn-red" style={{ marginTop: 22 }}>
          ← Back to Analysis
        </a>
      </div>
    );
  }
  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <article>
        <div style={{ padding: "56px 0 32px" }}>
          <div className="wrap" style={{ maxWidth: 800 }}>
            <div className="crumbs">
              <a href="#/">Home</a>
              <span className="sep">/</span>
              <a href="#/analysis">Analysis</a>
              <span className="sep">/</span>
              <span style={{ color: "var(--ink-1)" }}>{article.category}</span>
            </div>
            <div className="row gap-3 center" style={{ marginTop: 22 }}>
              <span className="tag tag-red">{article.category}</span>
              <span className="meta">{article.readTime} MIN READ</span>
              <span className="meta">·</span>
              <span className="meta">{article.date}</span>
            </div>
            <h1
              className="h-display"
              style={{ marginTop: 18, fontSize: "clamp(40px, 5vw, 64px)" }}
            >
              {article.title}
            </h1>
            <p
              className="body-lg"
              style={{
                marginTop: 18,
                fontSize: 22,
                color: "var(--ink-2)",
                fontFamily: "var(--serif)",
              }}
            >
              {article.dek}
            </p>
            <div className="row gap-4 center" style={{ marginTop: 30 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--bg-cream)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {article.author[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>By {article.author}</div>
                <div className="meta">{article.role} · Everest Insight</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button className="iconbtn" aria-label="Share">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
                  </svg>
                </button>
                <button className="iconbtn" aria-label="Bookmark">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap" style={{ marginBottom: 48 }}>
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--rule)",
            }}
          >
            <ArticleHero hero={article.hero} large />
          </div>
          <div className="meta" style={{ marginTop: 10, color: "var(--ink-3)" }}>
            {article.hero?.kind === "chart"
              ? "Chart: 30-day price action · Source: NEPSE, Everest Insight analysis"
              : article.hero?.kind === "portrait"
              ? "Photograph: courtesy of subject"
              : "Illustration: Everest Insight"}
          </div>
        </div>

        <div className="wrap" style={{ paddingBottom: 64 }}>
          <div className="g-article">
            <div className="article-body">
              {article.body.map((b, i) => {
                if (typeof b === "string") return <p key={i}>{b}</p>;
                if (b.h2) return <h2 key={i}>{b.h2}</h2>;
                if (b.pq)
                  return (
                    <div key={i} className="pullquote">
                      "{b.pq}"
                    </div>
                  );
                return null;
              })}

              <hr className="rule" style={{ margin: "48px 0 24px" }} />
              <div className="row between center wrap-row gap-4">
                <div className="row gap-2 wrap-row">
                  {article.tags &&
                    article.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                </div>
                <div className="meta">PUBLISHED {article.date}</div>
              </div>
            </div>

            <aside style={{ position: "relative" }}>
              <div
                style={{
                  position: "sticky",
                  top: 100,
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <div className="card card-cream">
                  <div className="eyebrow">
                    <span className="bar"></span>THE NUMBERS
                  </div>
                  <div style={{ marginTop: 12 }}>
                    {article.tags && article.tags.includes("hbl") && (
                      <CompanyMiniCard companyId="hbl" />
                    )}
                    {article.tags && article.tags.includes("nepse") && <NepseMiniCard />}
                    {(!article.tags ||
                      (!article.tags.includes("hbl") && !article.tags.includes("nepse"))) && (
                      <div className="meta">Watch this space — the data behind the story.</div>
                    )}
                  </div>
                </div>

                <NewsletterCard compact />

                <div>
                  <div className="eyebrow">
                    <span className="bar"></span>RELATED
                  </div>
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 14 }}>
                    {related.map((r) => (
                      <a
                        key={r.id}
                        href={`#/article/${r.slug}`}
                        className="col gap-2"
                        style={{ padding: "12px 0", borderTop: "1px solid var(--rule)" }}
                      >
                        <span className="meta">
                          {r.category} · {r.readTime} MIN
                        </span>
                        <span
                          className="serif"
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            lineHeight: 1.25,
                            letterSpacing: "-0.005em",
                          }}
                        >
                          {r.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="bg-cream section-pad-sm">
        <div className="wrap">
          <div className="row between baseline" style={{ marginBottom: 24 }}>
            <h2 className="h-headline">
              Keep reading<span className="red-period">.</span>
            </h2>
            <a href="#/analysis" className="btn btn-ghost">
              All analysis →
            </a>
          </div>
          <div className="g-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} onCream />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CompanyMiniCard({ companyId }) {
  const c = byId(companyId);
  if (!c) return null;
  return (
    <a href={`#/company/${c.id}`}>
      <div className="meta">
        {c.symbol} · {sectorName(c.sector)}
      </div>
      <div
        className="serif"
        style={{ fontSize: 18, fontWeight: 600, marginTop: 4, marginBottom: 8 }}
      >
        {c.name}
      </div>
      <div className="row between center">
        <div className="serif num" style={{ fontSize: 26, fontWeight: 600 }}>
          Rs {c.price.toFixed(0)}
        </div>
        <span className={`pct-pill ${c.change >= 0 ? "up" : "down"}`}>
          {c.change >= 0 ? "+" : ""}
          {c.change.toFixed(1)}%
        </span>
      </div>
      <div style={{ marginTop: 12 }}>
        <Sparkline
          data={c.spark}
          width={260}
          height={48}
          color={c.change >= 0 ? "var(--green)" : "var(--red)"}
          strokeWidth={1.5}
        />
      </div>
    </a>
  );
}

function NepseMiniCard() {
  return (
    <a href="#/index">
      <div className="meta">NEPSE COMPOSITE</div>
      <div className="row between center" style={{ marginTop: 6 }}>
        <div className="serif num" style={{ fontSize: 26, fontWeight: 600 }}>
          2,085.32
        </div>
        <span className="pct-pill up">+1.2%</span>
      </div>
      <div style={{ marginTop: 12 }}>
        <Sparkline
          data={NEPSE.history.map((p) => p.v)}
          width={260}
          height={48}
          color="var(--green)"
          strokeWidth={1.5}
        />
      </div>
    </a>
  );
}
