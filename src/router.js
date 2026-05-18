// ============================================================
// EVEREST INSIGHT — Hash router helpers
// ============================================================
import { useState, useEffect } from "react";

export function useHashRoute() {
  const [hash, setHash] = useState(
    typeof window !== "undefined" ? window.location.hash || "#/" : "#/"
  );
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const path = hash.replace(/^#/, "");
  const [pathOnly, queryStr = ""] = path.split("?");
  const [route, ...rest] = pathOnly.split("/").filter(Boolean);
  return { hash, path, route: route || "home", params: rest, query: queryStr };
}

export function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function parseQuery(path) {
  const q = (path || "").split("?")[1] || "";
  const params = {};
  q.split("&").forEach((p) => {
    if (!p) return;
    const [k, v] = p.split("=");
    params[decodeURIComponent(k)] = decodeURIComponent(v || "");
  });
  return params;
}
