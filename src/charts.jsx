// ============================================================
// EVEREST INSIGHT — Chart primitives
// Sparkline, AreaChart, Heatmap, Bullet, Donut — all SVG, dependency-free
// ============================================================
import React, { useState, useRef, useEffect, useMemo } from "react";

// ----------------- Sparkline -----------------
export function Sparkline({
  data,
  color = "var(--ink-1)",
  width = 96,
  height = 28,
  strokeWidth = 1.4,
  showFill = true,
  showEndDot = true,
}) {
  const { path, fillPath, endX, endY } = useMemo(() => {
    if (!data || data.length < 2) return { path: "", fillPath: "", endX: 0, endY: 0 };
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = 2;
    const xs = data.map((_, i) => pad + (i * (width - pad * 2)) / (data.length - 1));
    const ys = data.map((v) => height - pad - ((v - min) / range) * (height - pad * 2));
    let d = `M${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`;
    for (let i = 1; i < xs.length; i++) {
      d += ` L${xs[i].toFixed(2)} ${ys[i].toFixed(2)}`;
    }
    const f =
      d +
      ` L${xs[xs.length - 1].toFixed(2)} ${height} L${xs[0].toFixed(2)} ${height} Z`;
    return { path: d, fillPath: f, endX: xs[xs.length - 1], endY: ys[ys.length - 1] };
  }, [data, width, height]);

  return (
    <svg
      className="spark"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
    >
      {showFill && <path className="fill" d={fillPath} fill={color} />}
      <path
        className="line"
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showEndDot && <circle cx={endX} cy={endY} r="2.5" fill={color} />}
    </svg>
  );
}

// ----------------- AreaChart -----------------
export function AreaChart({
  data,
  height = 320,
  color = "var(--red)",
  label = "Value",
  showAxes = true,
  showGrid = true,
  valueFormat = (v) => v.toFixed(2),
}) {
  const ref = useRef(null);
  const [hover, setHover] = useState(null);
  const [size, setSize] = useState({ w: 800 });

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setSize({ w: e.contentRect.width });
    });
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const w = size.w;
  const h = height;
  const padL = 56,
    padR = 16,
    padT = 16,
    padB = 32;
  const innerW = Math.max(0, w - padL - padR);
  const innerH = Math.max(0, h - padT - padB);

  const values = data.map((d) => d.v);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = maxV - minV || 1;
  const padV = range * 0.08;
  const yMin = minV - padV;
  const yMax = maxV + padV;
  const yRange = yMax - yMin;

  const xOf = (i) => padL + (i / (data.length - 1)) * innerW;
  const yOf = (v) => padT + innerH - ((v - yMin) / yRange) * innerH;

  let linePath = `M${xOf(0)} ${yOf(values[0])}`;
  for (let i = 1; i < data.length; i++) linePath += ` L${xOf(i)} ${yOf(values[i])}`;
  const fillPath =
    linePath + ` L${xOf(data.length - 1)} ${padT + innerH} L${xOf(0)} ${padT + innerH} Z`;

  const yTicks = Array.from({ length: 5 }, (_, i) => yMin + (yRange * i) / 4);

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < padL || x > w - padR) {
      setHover(null);
      return;
    }
    const idx = Math.round(((x - padL) / innerW) * (data.length - 1));
    const clamped = Math.max(0, Math.min(data.length - 1, idx));
    setHover({ idx: clamped, x: xOf(clamped), y: yOf(values[clamped]) });
  }
  function onLeave() {
    setHover(null);
  }

  return (
    <div className="chart-wrap" ref={ref} style={{ position: "relative" }}>
      <svg
        width={w}
        height={h}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showGrid &&
          yTicks.map((t, i) => (
            <line
              key={i}
              x1={padL}
              x2={w - padR}
              y1={yOf(t)}
              y2={yOf(t)}
              className="chart-grid"
              strokeDasharray="2 4"
            />
          ))}
        <path d={fillPath} fill="url(#areaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {showAxes &&
          yTicks.map((t, i) => (
            <text
              key={`yl-${i}`}
              x={padL - 10}
              y={yOf(t) + 4}
              textAnchor="end"
              className="chart-axis"
            >
              {valueFormat(t)}
            </text>
          ))}
        {showAxes &&
          [
            0,
            Math.floor(data.length / 4),
            Math.floor(data.length / 2),
            Math.floor((3 * data.length) / 4),
            data.length - 1,
          ].map((i) => (
            <text
              key={`xl-${i}`}
              x={xOf(i)}
              y={h - padB + 18}
              textAnchor="middle"
              className="chart-axis"
            >
              D{i + 1}
            </text>
          ))}
        {hover && (
          <g>
            <line
              x1={hover.x}
              x2={hover.x}
              y1={padT}
              y2={padT + innerH}
              stroke="var(--ink-1)"
              strokeWidth="1"
              strokeDasharray="2 3"
              opacity="0.4"
            />
            <circle
              cx={hover.x}
              cy={hover.y}
              r="4.5"
              fill="var(--bg-elev)"
              stroke={color}
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
      {hover && (
        <div className="tooltip" style={{ left: hover.x, top: hover.y - 6 }}>
          <div className="ttl">
            {label} · Day {hover.idx + 1}
          </div>
          <div className="val">{valueFormat(values[hover.idx])}</div>
        </div>
      )}
    </div>
  );
}

// ----------------- Sector Heatmap -----------------
export function Heatmap({ sectors, onSelect }) {
  const sorted = [...sectors].sort((a, b) => b.marketCap - a.marketCap);
  return (
    <div
      className="heatmap"
      style={{ gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "100px" }}
    >
      {sorted.map((s) => {
        const span = Math.max(3, Math.round((s.marketCap / 7600) * 12 * 1.4));
        const bg = perfColor(s.performance);
        return (
          <div
            key={s.id}
            className="heatmap-cell"
            style={{ gridColumn: `span ${span}`, background: bg, color: "#fff" }}
            onClick={() => onSelect && onSelect(s)}
          >
            <div className="hm-name">{s.name}</div>
            <div className="hm-pct">
              {(s.performance >= 0 ? "+" : "") + s.performance.toFixed(1)}%
            </div>
            <div className="hm-mc">Rs {s.marketCap} Cr</div>
          </div>
        );
      })}
    </div>
  );
}

export function perfColor(p) {
  if (p > 0) {
    const t = Math.min(1, p / 5);
    return `oklch(${52 - 8 * t}% ${0.06 + 0.1 * t} 148)`;
  } else {
    const t = Math.min(1, -p / 5);
    return `oklch(${50 - 8 * t}% ${0.06 + 0.12 * t} 22)`;
  }
}

// ----------------- Bullet / Bias bar -----------------
export function BulletBar({ value, min = -20, max = 25, color }) {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const finalColor = color || (value >= 0 ? "var(--green)" : "var(--red)");
  return (
    <div style={{ position: "relative", height: 8 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, var(--red) 0%, var(--ink-4) 50%, var(--green) 100%)",
          opacity: 0.18,
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1,
          height: 14,
          background: "var(--ink-4)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -3,
          left: `${t * 100}%`,
          width: 3,
          height: 14,
          background: finalColor,
          borderRadius: 2,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

// ----------------- Donut chart -----------------
export function Donut({ segments, size = 160, thickness = 22 }) {
  const r = size / 2 - thickness / 2;
  const cx = size / 2,
    cy = size / 2;
  const total = segments.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const arcs = segments.map((seg) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += seg.value;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start),
      y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end),
      y2 = cy + r * Math.sin(end);
    const d = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
    return { d, color: seg.color, key: seg.key || seg.label };
  });
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rule)" strokeWidth={thickness} />
      {arcs.map((a, i) => (
        <path
          key={a.key || i}
          d={a.d}
          stroke={a.color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}

// ----------------- Logo mark (abstract peak) -----------------
export function LogoMark({ size = 28, color = "var(--red)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M2 27 L11 11 L17 19 L21 13 L30 27 Z" fill={color} />
      <path d="M11 11 L17 19 L13 19 Z" fill="#fff" opacity="0.85" />
    </svg>
  );
}

export function Logo({ size = 28, dark = false }) {
  return (
    <a className="logo" href="#/" style={{ color: dark ? "#fff" : undefined }}>
      <span className="logo-mark">
        <LogoMark size={size} color="var(--red)" />
      </span>
      <span>
        <strong>EVEREST</strong> <span className="logo-second">INSIGHT</span>
      </span>
    </a>
  );
}
