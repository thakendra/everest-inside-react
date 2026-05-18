// ============================================================
// EVEREST INSIGHT — Subscribe page
// ============================================================
import React from "react";
import { NewsletterCard } from "../components";

export function SubscribePage() {
  return (
    <>
      <div className="page-head-cream">
        <div
          className="wrap"
          style={{ maxWidth: 820, textAlign: "center", margin: "0 auto" }}
        >
          <div className="eyebrow red" style={{ justifyContent: "center" }}>
            <span className="bar"></span>NEWSLETTER · FREE FOREVER
          </div>
          <h1 className="h-display" style={{ marginTop: 14 }}>
            One email,
            <br />
            the first Monday of every month<span className="red-period">.</span>
          </h1>
          <p
            className="body-lg"
            style={{ marginTop: 22, fontSize: 21, fontFamily: "var(--serif)" }}
          >
            The Everest Index, sector flow data, and a short note from the editor. Read by 4,200+
            analysts, founders, and investors across Nepal.
          </p>

          <div
            className="card"
            style={{
              marginTop: 36,
              padding: 32,
              background: "var(--bg-elev)",
              borderColor: "var(--rule-cream)",
              textAlign: "left",
              maxWidth: 540,
              margin: "36px auto 0",
            }}
          >
            <NewsletterCard />
          </div>

          <div
            className="trust-row"
            style={{
              marginTop: 28,
              marginLeft: "auto",
              marginRight: "auto",
              display: "inline-flex",
            }}
          >
            <span>NO SPAM</span>
            <span className="sep">·</span>
            <span>UNSUBSCRIBE ANYTIME</span>
            <span className="sep">·</span>
            <span>4,200+ SUBSCRIBERS</span>
          </div>
        </div>
      </div>

      <section className="section-pad-sm">
        <div className="wrap" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 className="h-headline center-text">
            What you get<span className="red-period">.</span>
          </h2>
          <div
            className="g-3"
            style={{ marginTop: 40 }}
          >
            {[
              {
                num: "01",
                t: "The Index, before everyone else",
                b: "Full monthly rankings of every NEPSE listing we track, delivered before they're published on the site.",
              },
              {
                num: "02",
                t: "Sector flow data",
                b: "Where institutional money is moving. Which sectors are seeing inflow, which are seeing outflow, and why.",
              },
              {
                num: "03",
                t: "Editor's note",
                b: "A short, 400-word piece from one of our editors on what mattered last month — and what to watch next.",
              },
            ].map((f) => (
              <div key={f.num}>
                <div
                  className="serif"
                  style={{
                    fontSize: 44,
                    fontWeight: 700,
                    color: "var(--red)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {f.num}
                </div>
                <hr className="rule" style={{ margin: "12px 0 16px" }} />
                <div className="h-title">{f.t}</div>
                <p className="body" style={{ marginTop: 12 }}>
                  {f.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink section-pad-sm">
        <div
          className="wrap"
          style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", color: "rgba(244,241,234,.55)" }}
          >
            <span className="bar"></span>READER QUOTES
          </div>
          <h2 className="h-headline" style={{ marginTop: 12, color: "#fff" }}>
            What readers say<span style={{ color: "var(--red)" }}>.</span>
          </h2>
          <blockquote
            className="serif"
            style={{
              fontSize: 32,
              lineHeight: 1.3,
              color: "#fff",
              marginTop: 32,
              fontWeight: 500,
              letterSpacing: "-0.015em",
            }}
          >
            "The only newsletter on Nepal's market I actually read on day one. The methodology
            section is the best thing on the Nepali internet."
          </blockquote>
          <div className="meta" style={{ marginTop: 22, color: "rgba(244,241,234,.6)" }}>
            — SENIOR ANALYST, NIC ASIA SECURITIES
          </div>
        </div>
      </section>
    </>
  );
}
