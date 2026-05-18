// ============================================================
// EVEREST INSIGHT — Data layer (ES module)
// Realistic Nepal stock market data. All numbers are illustrative.
// ============================================================

// ---------- Sectors ----------
export const SECTORS = [
  { id: "banking",       name: "Banking",            performance:  1.8, weight: 0.28, marketCap: 1842, color: "#1F3B6B" },
  { id: "hydropower",    name: "Hydropower",         performance:  4.2, weight: 0.18, marketCap:  962, color: "#0B7A3B" },
  { id: "finance",       name: "Finance",            performance:  0.6, weight: 0.10, marketCap:  486, color: "#5B6470" },
  { id: "insurance",     name: "Insurance",          performance: -0.9, weight: 0.09, marketCap:  524, color: "#8A5A1C" },
  { id: "microfinance",  name: "Microfinance",       performance: -2.4, weight: 0.07, marketCap:  318, color: "#C8102E" },
  { id: "manufacturing", name: "Manufacturing",      performance: -1.6, weight: 0.06, marketCap:  402, color: "#B5894A" },
  { id: "trading",       name: "Trading",            performance:  0.3, weight: 0.04, marketCap:  142, color: "#384148" },
  { id: "hotels",        name: "Hotels & Tourism",   performance:  2.7, weight: 0.05, marketCap:  208, color: "#2D6A4F" },
  { id: "investment",    name: "Investment",         performance:  1.2, weight: 0.07, marketCap:  362, color: "#3A5278" },
  { id: "lifeinsurance", name: "Life Insurance",     performance: -1.1, weight: 0.06, marketCap:  298, color: "#6C3A8A" },
];

export const sectorName = (id) => (SECTORS.find((s) => s.id === id) || { name: id }).name;
export const sectorColor = (id) => (SECTORS.find((s) => s.id === id) || { color: "#888" }).color;

// ---------- NEPSE composite history (60 days of closes) ----------
export const NEPSE = {
  current: 2085.32,
  changeDay: 1.2,
  changeMonth: 3.4,
  changeYear: 18.6,
  history: (() => {
    const out = [];
    let v = 1782;
    for (let i = 0; i < 60; i++) {
      const drift = 0.0028;
      const noise = (Math.sin(i * 0.7) + Math.cos(i * 0.31)) * 0.006 + Math.sin(i * 1.7) * 0.004;
      v = v * (1 + drift + noise);
      out.push({ d: i, v: Math.round(v * 100) / 100 });
    }
    const scale = 2085.32 / out[out.length - 1].v;
    return out.map((p) => ({ d: p.d, v: Math.round(p.v * scale * 100) / 100 }));
  })(),
};

// ============================================================
// Companies
// ============================================================

function buildSpark(pct, seed) {
  const out = [];
  const target = 100 * (1 + pct / 100);
  let s = seed || 1;
  const noise = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
  for (let i = 0; i < 30; i++) {
    const t = i / 29;
    const trend = 100 + (target - 100) * (t * t * (3 - 2 * t));
    const wobble = (target - 100) * 0.12 * (noise() + Math.sin(i * 0.9 + (seed || 0)) * 0.4);
    out.push(Math.round((trend + wobble) * 100) / 100);
  }
  out[0] = 100;
  out[out.length - 1] = Math.round(target * 100) / 100;
  return out;
}

function getCeo(id) {
  const ceos = {
    uppm:   { name: "Bigyan Prasad Shrestha",    role: "Managing Director", since: 2018 },
    nica:   { name: "Roshan Kumar Neupane",      role: "CEO",               since: 2020 },
    hbl:    { name: "Anirudh Khanal",            role: "CEO",               since: 2021 },
    nabil:  { name: "Gyanendra Prasad Dhungana", role: "CEO",               since: 2022 },
    ntc:    { name: "Sunil Paudel",              role: "Managing Director", since: 2019 },
    arun:   { name: "Sushil Bhatta",             role: "Chairman",          since: 2017 },
    cit:    { name: "Rabindra Bhattarai",        role: "CEO",               since: 2023 },
    globl:  { name: "Ratna Raj Bajracharya",     role: "CEO",               since: 2020 },
    everst: { name: "Sudesh Khaling",            role: "CEO",               since: 2022 },
  };
  return ceos[id] || null;
}

const rawCompanies = [
  // Winners
  { id: "uppm",  name: "Upper Tamakoshi Hydropower", symbol: "UPPER", sector: "hydropower",   price: 482.50, change:  25.8, changeDay:  2.1, changeYear:  58.2, volume: 1240, mcap: 1320 },
  { id: "nica",  name: "NIC Asia Bank",              symbol: "NICA",  sector: "banking",      price: 812.00, change:  21.3, changeDay:  1.4, changeYear:  42.7, volume:  892, mcap: 2860 },
  { id: "ntc",   name: "Nepal Telecom",              symbol: "NTC",   sector: "trading",      price: 945.00, change:  18.7, changeDay:  0.6, changeYear:  31.4, volume:  564, mcap: 7560 },
  { id: "hbl",   name: "Himalayan Bank",             symbol: "HBL",   sector: "banking",      price: 528.00, change:  17.2, changeDay:  0.9, changeYear:  28.3, volume:  742, mcap: 2114 },
  { id: "arun",  name: "Arun Valley Hydropower",     symbol: "AHPC",  sector: "hydropower",   price: 268.00, change:  16.4, changeDay:  1.8, changeYear:  44.1, volume:  486, mcap:  428 },
  { id: "nabil", name: "Nabil Bank",                 symbol: "NABIL", sector: "banking",      price: 692.00, change:  14.9, changeDay:  0.7, changeYear:  22.8, volume: 1086, mcap: 3742 },
  { id: "cit",   name: "Citizen Investment Trust",   symbol: "CIT",   sector: "investment",   price: 2980.00,change:  13.6, changeDay:  0.4, changeYear:  19.2, volume:  124, mcap: 1192 },
  { id: "rurl",  name: "Rural Microfinance",         symbol: "RMDC",  sector: "microfinance", price:  724.00,change:  12.4, changeDay:  1.1, changeYear:  18.6, volume:  208, mcap:  362 },
  { id: "soal",  name: "Solu Hydropower",            symbol: "SHPC",  sector: "hydropower",   price:  468.00,change:  11.8, changeDay:  0.8, changeYear:  26.3, volume:  338, mcap:  234 },
  { id: "globl", name: "Global IME Bank",            symbol: "GBIME", sector: "banking",      price:  286.00,change:  11.2, changeDay:  0.5, changeYear:  16.4, volume: 1462, mcap: 2924 },
  { id: "everst",name: "Everest Bank",               symbol: "EBL",   sector: "banking",      price:  496.00,change:  10.6, changeDay:  0.3, changeYear:  14.8, volume:  624, mcap: 1786 },
  { id: "soaltr",name: "Soaltee Hotel",              symbol: "SHL",   sector: "hotels",       price:  282.00,change:   9.4, changeDay:  0.6, changeYear:  21.7, volume:  246, mcap:  286 },
  { id: "barun", name: "Barun Hydropower",           symbol: "BARUN", sector: "hydropower",   price:  198.00,change:   8.7, changeDay:  0.4, changeYear:  17.2, volume:  168, mcap:  142 },
  { id: "siddh", name: "Siddhartha Bank",            symbol: "SBL",   sector: "banking",      price:  346.00,change:   7.9, changeDay:  0.2, changeYear:  11.4, volume:  486, mcap: 1462 },
  { id: "yati",  name: "Yeti Airlines Investment",   symbol: "YETI",  sector: "investment",   price:  524.00,change:   7.1, changeDay:  0.5, changeYear:   9.8, volume:   86, mcap:  314 },
  { id: "ngbl",  name: "Nepal Grindlays Bank",       symbol: "SCB",   sector: "banking",      price:  624.00,change:   6.4, changeDay:  0.3, changeYear:  12.6, volume:  142, mcap: 1486 },

  // Losers
  { id: "manu1", name: "Bottlers Nepal Manufacturing",symbol:"BNL",   sector: "manufacturing",price: 1840.00,change: -20.5, changeDay: -1.4, changeYear: -18.2, volume:   86, mcap:  486 },
  { id: "abc",   name: "ABC Trading Holdings",       symbol: "ABC",   sector: "trading",      price:   86.00,change: -15.2, changeDay: -2.1, changeYear: -28.4, volume:  346, mcap:  142 },
  { id: "def",   name: "DEF Hydropower",             symbol: "DEFH",  sector: "hydropower",   price:  142.00,change: -12.8, changeDay: -0.9, changeYear: -16.7, volume:  168, mcap:   86 },
  { id: "ghi",   name: "GHI Finance Ltd.",           symbol: "GHIF",  sector: "finance",      price:  246.00,change: -10.4, changeDay: -0.6, changeYear: -12.4, volume:  124, mcap:  124 },
  { id: "jkl",   name: "JKL Industries",             symbol: "JKLI",  sector: "manufacturing",price:  428.00,change:  -9.7, changeDay: -1.2, changeYear: -14.8, volume:  208, mcap:  286 },
  { id: "nmf",   name: "Nepal Microfinance",         symbol: "NMFBS", sector: "microfinance", price:  186.00,change:  -8.6, changeDay: -0.8, changeYear: -11.2, volume:  486, mcap:  168 },
  { id: "psl",   name: "Premier Insurance",          symbol: "PRIN",  sector: "insurance",    price:  486.00,change:  -7.8, changeDay: -0.4, changeYear:  -6.4, volume:  142, mcap:  246 },
  { id: "lic1",  name: "Nepal Life Insurance",       symbol: "NLIC",  sector: "lifeinsurance",price:  582.00,change:  -6.9, changeDay: -0.5, changeYear:  -4.8, volume:  124, mcap:  362 },
  { id: "tlc",   name: "Tinau Mission Hydropower",   symbol: "TMHC",  sector: "hydropower",   price:  168.00,change:  -5.4, changeDay: -0.3, changeYear:  -2.6, volume:   86, mcap:   72 },
  { id: "mehd",  name: "Mero Microfinance",          symbol: "MERO",  sector: "microfinance", price:  246.00,change:  -5.1, changeDay: -0.4, changeYear:  -8.4, volume:  168, mcap:  124 },
  { id: "kbl",   name: "Kumari Bank",                symbol: "KBL",   sector: "banking",      price:  168.00,change:  -4.6, changeDay: -0.2, changeYear:  -1.8, volume:  246, mcap:  742 },
  { id: "hgi",   name: "Himalayan General Insurance",symbol: "HGI",   sector: "insurance",    price:  386.00,change:  -3.9, changeDay: -0.3, changeYear:  -2.4, volume:   86, mcap:  142 },
  { id: "scbf",  name: "Standard Finance Ltd.",      symbol: "SFFIL", sector: "finance",      price:  124.00,change:  -3.4, changeDay: -0.1, changeYear:  -1.2, volume:  142, mcap:   86 },

  // Mid / flat
  { id: "pcbl",  name: "Prabhu Bank",                symbol: "PRVU",  sector: "banking",      price:  264.00,change:   2.4, changeDay:  0.1, changeYear:   4.8, volume:  486, mcap:  962 },
  { id: "nlife", name: "Nepal Life Hold.",           symbol: "NLH",   sector: "lifeinsurance",price:  486.00,change:   1.6, changeDay:  0.2, changeYear:   3.2, volume:  124, mcap:  246 },
  { id: "machhi",name: "Machhapuchhre Bank",         symbol: "MBL",   sector: "banking",      price:  192.00,change:   0.8, changeDay:  0.0, changeYear:   2.4, volume:  208, mcap:  486 },
];

export const COMPANIES = rawCompanies.map((c, i) => ({
  ...c,
  spark: buildSpark(c.change, i + 1),
  ceo: getCeo(c.id),
}));

export const byId = (id) => COMPANIES.find((c) => c.id === id);
export const bySymbol = (s) => COMPANIES.find((c) => c.symbol === s);
export const winners = (n = 10) => [...COMPANIES].sort((a, b) => b.change - a.change).slice(0, n);
export const losers = (n = 10) => [...COMPANIES].sort((a, b) => a.change - b.change).slice(0, n);
export const bySector = (sectorId) => COMPANIES.filter((c) => c.sector === sectorId);

// ============================================================
// Articles + Events
// ============================================================

export const ARTICLES = [
  {
    id: "himalayan-bank-quarter",
    slug: "why-himalayan-bank-is-dominating",
    category: "Analysis",
    readTime: 6,
    title: "Why Himalayan Bank Is Dominating This Quarter",
    dek: "A loan-book mix shift toward mid-sized infrastructure clients, plus a clean cost-to-income ratio, has put HBL ahead of every other Class A bank in Q3.",
    author: "Anjali Karki",
    role: "Markets Editor",
    date: "Apr 14, 2026",
    iso: "2026-04-14",
    hero: { kind: "chart", company: "hbl" },
    featured: true,
    tags: ["banking", "hbl"],
    body: [
      "For most of 2025, Nepal's Class A commercial banks moved in lockstep — a familiar pattern in a market where interest-rate decisions are made within a narrow corridor and credit growth is constrained by liquidity rules. Then, somewhere between January and March, Himalayan Bank pulled away.",
      "Shares of HBL are up 17.2 per cent this month, more than double the next-best major bank, and well above the broader NEPSE composite. The pull-away is not a one-month phenomenon: HBL has now outperformed the sector index in three of the past four quarters.",
      { h2: "Loan book mix" },
      "Two structural shifts explain the rerating. First, HBL has quietly rebalanced its loan book away from large-cap project finance — historically the bank's bread and butter — toward mid-sized infrastructure clients in the Rs 100 million to Rs 1 billion segment. Yields on that bucket are roughly 180 basis points wider, and impairment data through Q2 suggests provisioning remains contained.",
      { h2: "A cleaner cost line" },
      "Second, the cost-to-income ratio. HBL's most recent disclosure puts it at 38.4 per cent — the lowest among Class A banks and roughly 600 basis points better than the Class A median. Branch consolidation and a measured digital push are doing the work that loan growth alone cannot.",
      { pq: "The pull-away is not a one-month phenomenon. HBL has now outperformed the sector index in three of the past four quarters." },
      "Risks remain. A rate cut would compress the very NIM expansion that has driven recent quarters, and the bank's exposure to hospitality lending — concentrated around Kathmandu and Pokhara — is non-trivial. But for a bank that traded at a 12 per cent discount to NABIL on book value just twelve months ago, the gap has now closed entirely.",
      { h2: "The takeaway" },
      "For retail investors weighing Class A exposure, HBL is no longer the cheap option — it is the leader. Whether that leadership persists into Q4 will depend on two numbers most investors do not track closely: deposit cost trends and the share of CASA in new-deposit growth. We will be watching both.",
    ],
  },
  {
    id: "april-losers",
    slug: "real-reasons-behind-april-losers",
    category: "Insight",
    readTime: 5,
    title: "The Real Reasons Behind April's Losers",
    dek: "It is not a sector story — it is a liquidity story. Five of the month's ten biggest declines share a single trait that has nothing to do with their business.",
    author: "Suraj Adhikari",
    role: "Senior Analyst",
    date: "Apr 12, 2026",
    iso: "2026-04-12",
    hero: { kind: "abstract", tone: "red" },
    tags: ["manufacturing", "liquidity"],
    body: [
      "On the surface, April looks like a manufacturing-led correction. Bottlers Nepal is down 20 per cent, JKL Industries is off nearly 10, and three other manufacturers sit in the bottom quartile of the index. But run the numbers a different way — by free-float, daily turnover, and the share of recent buying that came from margin accounts — and a different picture emerges.",
      { h2: "Liquidity, not earnings" },
      "Five of April's ten biggest decliners share a single trait: their free float is below 18 per cent of paid-up capital. When margin calls hit in the second week of the month, these were the names with the thinnest exit. Selling pressure that would barely register in a NABIL or a Nepal Telecom became a 10-15 per cent drawdown in a name where a single block trade can move price by 4 per cent.",
      "That is not a sector story. It is a market microstructure story — and one that recurs every time short-term rates move sharply.",
      { h2: "What this means for next month" },
      "The takeaway is uncomfortable for retail investors who anchor on sector narratives. Manufacturing did not become structurally worse in April. It just happened to house most of the float-constrained names that retail flow had recently chased. When that flow reversed, the math worked against them.",
      "Watch turnover ratios, not earnings.",
    ],
  },
  {
    id: "sector-shift-april",
    slug: "sector-shift-where-smart-money",
    category: "Market Trends",
    readTime: 7,
    title: "Sector Shift: Where Smart Money Is Moving Next",
    dek: "Institutional flow data from the past 30 sessions shows a clear rotation out of microfinance and into hydropower mid-caps. Here is what to watch.",
    author: "Priya Tamang",
    role: "Strategy",
    date: "Apr 10, 2026",
    iso: "2026-04-10",
    hero: { kind: "abstract", tone: "cream" },
    tags: ["hydropower", "rotation"],
    body: [
      "Sector rotation in Nepal's market is usually hard to spot in real time. The signals are small, the data lags, and most retail investors only see the moves after they have already happened. But institutional flow data from the past 30 sessions tells a clear story: a rotation is underway, out of microfinance and into hydropower — specifically mid-cap hydropower names.",
      { h2: "The flow data" },
      "Net institutional buying in microfinance has been negative for 22 of the last 30 trading sessions. Over the same window, mid-cap hydropower names — those with market caps between Rs 200 crore and Rs 800 crore — have seen 18 sessions of net institutional inflow.",
      { h2: "Why hydropower, why now" },
      "Three reasons. First, the monsoon season is approaching and hydropower companies historically rerate ahead of peak-generation months. Second, the NEA's recent tariff revision is expected to flow through to PPA-linked revenues starting next quarter. Third — and perhaps most importantly — microfinance has run into a regulatory headwind that flows directly to bottom lines.",
      { pq: "Three reasons. First, the monsoon season is approaching. Second, the NEA's tariff revision. Third, microfinance has hit a regulatory wall." },
      { h2: "Names to watch" },
      "Among mid-caps, Upper Tamakoshi (UPPER), Arun Valley (AHPC), and Solu Hydropower (SHPC) have absorbed roughly 38 per cent of net hydropower inflow over the past month. None of these are without risk — execution timelines and water-flow variance remain — but the flow signal is unusually clean.",
    ],
  },
  {
    id: "nepse-2100-watch",
    slug: "nepse-2100-watch-what-it-takes",
    category: "Analysis",
    readTime: 5,
    title: "NEPSE at 2,100: What It Takes to Break Through",
    dek: "The composite has flirted with the 2,100 level three times in four months. A look at the resistance, and what would need to clear for a sustained break.",
    author: "Rabin Shrestha",
    role: "Markets Editor",
    date: "Apr 8, 2026",
    iso: "2026-04-08",
    hero: { kind: "chart", index: true },
    tags: ["nepse", "macro"],
    body: ["The NEPSE composite is now 1.4 per cent below its 2,100 ceiling for the fourth time since December."],
  },
  {
    id: "hydropower-monsoon",
    slug: "hydropower-monsoon-setup",
    category: "Insight",
    readTime: 4,
    title: "The Hydropower Monsoon Setup, Decoded",
    dek: "Why the next 60 days matter more than any quarterly earnings release for the sector's mid-caps.",
    author: "Anjali Karki",
    role: "Markets Editor",
    date: "Apr 6, 2026",
    iso: "2026-04-06",
    hero: { kind: "abstract", tone: "green" },
    tags: ["hydropower"],
    body: ["Generation data, not earnings releases, drives hydropower rerating windows. Here is what to watch in the next 60 days."],
  },
  {
    id: "microfinance-regulatory",
    slug: "microfinance-regulatory-wall",
    category: "Market Trends",
    readTime: 5,
    title: "Microfinance Hits a Regulatory Wall",
    dek: "The NRB circular no one is reading, and what it means for the eight largest names in the sector.",
    author: "Suraj Adhikari",
    role: "Senior Analyst",
    date: "Apr 4, 2026",
    iso: "2026-04-04",
    hero: { kind: "abstract", tone: "red" },
    tags: ["microfinance", "regulation"],
    body: ["A two-page NRB circular issued in late March will compress microfinance NIMs by an estimated 80-120 basis points starting Q1 FY27."],
  },
  {
    id: "ipo-pipeline-2026",
    slug: "ipo-pipeline-2026",
    category: "Analysis",
    readTime: 6,
    title: "The 2026 IPO Pipeline, Ranked",
    dek: "Twenty-two filings, three sectors, one clear winner. Our ranking of every active IPO in front of SEBON.",
    author: "Priya Tamang",
    role: "Strategy",
    date: "Apr 2, 2026",
    iso: "2026-04-02",
    hero: { kind: "abstract", tone: "ink" },
    tags: ["ipo"],
    body: ["Twenty-two active filings sit on the SEBON desk. We rank them by pricing discipline, sector tailwind, and post-listing supply overhang."],
  },
  {
    id: "ceo-interview-nica",
    slug: "ceo-interview-nica-roshan-neupane",
    category: "CEO Insight",
    readTime: 8,
    title: "Inside NIC Asia: A Conversation with Roshan Neupane",
    dek: "The CEO of Nepal's most-traded bank on digital adoption, the consolidation question, and why he isn't worried about a rate cut.",
    author: "Anjali Karki",
    role: "Markets Editor",
    date: "Apr 1, 2026",
    iso: "2026-04-01",
    hero: { kind: "portrait" },
    tags: ["banking", "interview"],
    body: ["Roshan Neupane has run NIC Asia through two of the most volatile years in Nepali banking. We sat down with him at the bank's Naxal headquarters to talk about what comes next."],
  },
];

export const articleById = (id) => ARTICLES.find((a) => a.id === id || a.slug === id);
export const featuredArticle = () => ARTICLES.find((a) => a.featured) || ARTICLES[0];

export const EVENTS = [
  { date: "Apr 22", title: "NRB monetary policy review",         tag: "Macro",    important: true },
  { date: "Apr 24", title: "NIC Asia Q3 earnings release",       tag: "Earnings" },
  { date: "Apr 26", title: "Upper Tamakoshi generation update",  tag: "Sector" },
  { date: "Apr 28", title: "SEBON IPO allotment — Barun Hydro",  tag: "Primary" },
  { date: "May 02", title: "NEPSE composite rebalance",          tag: "Index",    important: true },
];
