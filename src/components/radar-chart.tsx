"use client";

export type SkillsetItem = {
  label: string;
  value: number; // 0–10
};

interface RadarChartProps {
  skillsets: SkillsetItem[];
  /** Chart renders only when there are exactly 6 items */
  size?: number;
}

export default function RadarChart({ skillsets, size = 280 }: RadarChartProps) {
  if (skillsets.length !== 6) return null;

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.36; // leave room for labels
  const levels = 5; // concentric hexagon rings
  const angleStep = (2 * Math.PI) / 6;
  // Start from top (−π/2)
  const startAngle = -Math.PI / 2;

  /** Get x,y for a given axis index at a given radius fraction (0–1) */
  const getPoint = (index: number, fraction: number) => {
    const angle = startAngle + index * angleStep;
    return {
      x: cx + Math.cos(angle) * maxRadius * fraction,
      y: cy + Math.sin(angle) * maxRadius * fraction,
    };
  };

  /** Build hex polygon string at a given fraction */
  const hexPoints = (fraction: number) =>
    Array.from({ length: 6 })
      .map((_, i) => {
        const p = getPoint(i, fraction);
        return `${p.x},${p.y}`;
      })
      .join(" ");

  /** Data polygon */
  const dataPoints = skillsets
    .map((s, i) => {
      const p = getPoint(i, s.value / 10);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  /** Vertex coords for markers */
  const vertices = skillsets.map((s, i) => getPoint(i, s.value / 10));

  /** Label positions — pushed slightly outside */
  const labelOffset = maxRadius + 16;
  const labels = skillsets.map((s, i) => {
    const angle = startAngle + i * angleStep;
    return {
      label: s.label,
      x: cx + Math.cos(angle) * labelOffset,
      y: cy + Math.sin(angle) * labelOffset,
      anchor: Math.abs(Math.cos(angle)) < 0.01
        ? "middle"
        : Math.cos(angle) > 0
          ? "start"
          : "end",
    };
  });

  return (
    <div className="-ml-4 md:ml-0 flex items-center justify-center pt-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Grid hexagons */}
        {Array.from({ length: levels }).map((_, lvl) => (
          <polygon
            key={lvl}
            points={hexPoints((lvl + 1) / levels)}
            fill="none"
            stroke="var(--color-brand-neutral-300)"
            strokeWidth={lvl === levels - 1 ? 1.2 : 0.6}
            opacity={0.6}
          />
        ))}

        {/* Axis lines from center to each vertex */}
        {Array.from({ length: 6 }).map((_, i) => {
          const p = getPoint(i, 1);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="var(--color-brand-neutral-300)"
              strokeWidth={0.6}
              opacity={0.5}
            />
          );
        })}

        {/* Filled data polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(45, 160, 160, 0.22)"
          stroke="rgba(35, 130, 135, 0.7)"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />

        {/* Vertex markers */}
        {vertices.map((v, i) => (
          <circle
            key={i}
            cx={v.x}
            cy={v.y}
            r={3.5}
            fill="rgba(35, 130, 135, 0.85)"
            stroke="white"
            strokeWidth={1.5}
          />
        ))}

        {/* Labels */}
        {labels.map((l, i) => (
          <text
            key={i}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor as "start" | "middle" | "end"}
            dominantBaseline="central"
            className="md:text-xs font-medium text-[8px]"
            fill="var(--color-brand-neutral-700)"
          >
            {l.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
