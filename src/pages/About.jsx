// ============================================================
// EVEREST INSIGHT — About page
// ============================================================
import React from "react";
import { NewsletterCard } from "../components";

export function AboutPage() {
  const team = [
    {
      name: "Anjali Karki",
      role: "Markets Editor",
      bio: "Twelve years covering Nepali banking and capital markets. Previously at The Kathmandu Post.",
    },
    {
      name: "Suraj Adhikari",
      role: "Senior Analyst",
      bio: "Quantitative analyst with a focus on market microstructure and float-adjusted indexing.",
    },
    {
      name: "Priya Tamang",
      role: "Strategy",
      bio: "Former equity research, now writing about sector rotation and institutional flows.",
    },
    {
      name: "Rabin Shrestha",
      role: "Markets Editor",
      bio: "Macro and technicals. Was running a hedge book in Singapore before moving home in 2023.",
    },
  ];

  return (
    <>
      <div className="page-head-cream">
        <div className="wrap" style={{ maxWidth: 920 }}>
          <div className="crumbs">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <span style={{ color: "var(--ink-1)" }}>About</span>
          </div>
          <div className="eyebrow red" style={{ marginTop: 22 }}>
            <span className="bar"></span>EST. 2024 · KATHMANDU
          </div>
          <h1 className="h-display" style={{ marginTop: 14 }}>
            Nepal's market, written like
            <br />
            financial journalism<span className="red-period">.</span>
          </h1>
          <p
            className="body-lg"
            style={{
              marginTop: 22,
              fontSize: 22,
              fontFamily: "var(--serif)",
              maxWidth: 720,
            }}
          >
            We started Everest Insight because Nepal's stock market deserved better reporting. We
            track what's moving, we explain why, and we publish the methodology so you can audit our
            work. Always independent. Always free.
          </p>
        </div>
      </div>

      <section className="section-pad-sm">
        <div className="wrap">
          <div className="g-3" style={{ gap: 32 }}>
            {[
              { num: "32", label: "COMPANIES TRACKED" },
              { num: "10", label: "SECTORS COVERED" },
              { num: "4.2K", label: "MONTHLY READERS" },
              { num: "100%", label: "INDEPENDENT" },
              { num: "0", label: "PAID COVERAGE" },
              { num: "MONTHLY", label: "INDEX REBALANCE" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ padding: "20px 0", borderTop: "1px solid var(--rule-strong)" }}
              >
                <div
                  className="serif"
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div className="meta" style={{ marginTop: 8 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm" id="team">
        <div className="wrap">
          <div className="eyebrow">
            <span className="bar"></span>THE TEAM
          </div>
          <h2 className="h-headline" style={{ marginTop: 12, marginBottom: 32 }}>
            The people behind the numbers<span className="red-period">.</span>
          </h2>
          <div className="g-2">
            {team.map((p) => (
              <div key={p.name} className="card card-lg">
                <div className="row gap-4 center">
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "var(--bg-cream)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--serif)",
                      fontWeight: 600,
                      fontSize: 28,
                    }}
                  >
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div
                      className="serif"
                      style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}
                    >
                      {p.name}
                    </div>
                    <div className="meta" style={{ marginTop: 4 }}>
                      {p.role.toUpperCase()}
                    </div>
                  </div>
                </div>
                <p className="body" style={{ marginTop: 18 }}>
                  {p.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="disclaimer" className="bg-cream section-pad-sm">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="eyebrow">
            <span className="bar"></span>EDITORIAL POLICY
          </div>
          <h2 className="h-headline" style={{ marginTop: 12 }}>
            What we do, what we don't<span className="red-period">.</span>
          </h2>
          <div className="g-2" style={{ marginTop: 28, gap: 32 }}>
            <div>
              <h3 className="h-title" style={{ color: "var(--green)" }}>
                We do
              </h3>
              <ul
                className="body-lg"
                style={{
                  marginTop: 14,
                  paddingLeft: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <li>· Track every actively traded NEPSE listing</li>
                <li>· Publish our methodology in full</li>
                <li>· Disclose all conflicts of interest</li>
                <li>· Source every claim to a data feed or filing</li>
              </ul>
            </div>
            <div>
              <h3 className="h-title" style={{ color: "var(--red)" }}>
                We don't
              </h3>
              <ul
                className="body-lg"
                style={{
                  marginTop: 14,
                  paddingLeft: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <li>· Give investment advice</li>
                <li>· Accept paid coverage</li>
                <li>· Run sponsored content</li>
                <li>· Trade in the names we cover</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad-sm">
        <div
          className="wrap g-2"
          style={{ gap: 48, alignItems: "center" }}
        >
          <div>
            <div className="eyebrow">
              <span className="bar"></span>GET IN TOUCH
            </div>
            <h2 className="h-headline" style={{ marginTop: 12 }}>
              Tip, correction, or comment?<span className="red-period">.</span>
            </h2>
            <p className="body-lg" style={{ marginTop: 18 }}>
              Have a story we should be covering? See a number that looks wrong? We read every email.
            </p>
            <div className="col gap-2" style={{ marginTop: 22 }}>
              <div className="row gap-3 center">
                <span className="meta">EDITORIAL</span>
                <span style={{ fontWeight: 600 }}>editors@everestinsight.np</span>
              </div>
              <div className="row gap-3 center">
                <span className="meta">DATA</span>
                <span style={{ fontWeight: 600 }}>data@everestinsight.np</span>
              </div>
              <div className="row gap-3 center">
                <span className="meta">PRESS</span>
                <span style={{ fontWeight: 600 }}>press@everestinsight.np</span>
              </div>
            </div>
          </div>
          <NewsletterCard />
        </div>
      </section>
    </>
  );
}
