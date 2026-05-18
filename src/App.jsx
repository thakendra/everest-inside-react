// ============================================================
// EVEREST INSIGHT — App root + router
// ============================================================
import React, { useState, useEffect } from "react";
import { useHashRoute } from "./router";
import { Nav, Footer, SearchOverlay } from "./components";
import { HomePage } from "./pages/Home";
import { RankingPage } from "./pages/Rankings";
import { AnalysisPage, ArticlePage } from "./pages/Analysis";
import { CompanyPage } from "./pages/Company";
import { MethodologyPage } from "./pages/Methodology";
import { AboutPage } from "./pages/About";
import { SubscribePage } from "./pages/Subscribe";

export default function App() {
  const route = useHashRoute();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (
        e.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const r = route.route;
  let active = "home";
  let page;

  if (r === "home")        { page = <HomePage />;                            active = "home"; }
  else if (r === "index")  { page = <RankingPage kind="index" />;            active = "index"; }
  else if (r === "winners"){ page = <RankingPage kind="winners" />;          active = "winners"; }
  else if (r === "losers") { page = <RankingPage kind="losers" />;           active = "losers"; }
  else if (r === "analysis"){ page = <AnalysisPage />;                       active = "analysis"; }
  else if (r === "methodology"){ page = <MethodologyPage />;                 active = "methodology"; }
  else if (r === "about")  { page = <AboutPage />;                           active = "about"; }
  else if (r === "subscribe"){ page = <SubscribePage />;                     active = "subscribe"; }
  else if (r === "company"){ page = <CompanyPage companyId={route.params[0]} />; active = "index"; }
  else if (r === "article"){ page = <ArticlePage slug={route.params[0]} />;  active = "analysis"; }
  else                     { page = <HomePage />;                            active = "home"; }

  return (
    <>
      <Nav active={active} onSearchOpen={() => setSearchOpen(true)} />
      <main key={route.path}>{page}</main>
      <Footer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <button
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 50,
          background: "var(--ink-1)",
          color: "#fff",
          border: 0,
          padding: "10px 14px",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,.18)",
          transition: "transform .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        onClick={() => setSearchOpen(true)}
        aria-label="Open search"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span
          style={{
            marginLeft: 4,
            background: "rgba(255,255,255,.12)",
            color: "rgba(255,255,255,.85)",
            border: "1px solid rgba(255,255,255,.16)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 20,
            padding: "0 5px",
            height: 20,
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            borderRadius: 4,
          }}
        >
          ⌘K
        </span>
      </button>
    </>
  );
}
