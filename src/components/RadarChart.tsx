import React, { useState } from 'react';

export interface RadarPoint {
  label: string;
  angle: number; // in degrees, 0 = top
}

export interface RadarSeries {
  id: string;
  name: string;
  color: string;
  fillColor?: string;
  strokeDash?: string;
  strokeWidth?: number;
  values: number[]; // 0 to 100 corresponding to axes
  glow?: boolean;
}

interface RadarChartProps {
  axes?: string[];
  series: RadarSeries[];
  size?: number;
  title?: string;
  legend?: boolean;
}

const DEFAULT_AXES = ['Mastication', 'Moisture Retention', 'Shear Tensile', 'Volatile Umami', 'Thermal Stability'];

export const RadarChart: React.FC<RadarChartProps> = ({
  axes = DEFAULT_AXES,
  series,
  size = 240,
  title,
  legend = true
}) => {
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = axes.length;

  // Compute coordinate for an axis at given percentage (0-100)
  const getCoordinates = (index: number, value: number) => {
    // 0 index is at top (-90 degrees)
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (radius * Math.max(0, Math.min(100, value))) / 100;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Label coordinates (positioned slightly outside the outer ring)
  const getLabelCoordinates = (index: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = radius + 22;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate polygon points string for a series
  const getPolygonPoints = (values: number[]) => {
    return values
      .map((val, idx) => {
        const { x, y } = getCoordinates(idx, val);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Ring levels: 25%, 50%, 75%, 100%
  const levels = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center select-none w-full">
      {title && (
        <span className="text-xs font-semibold text-[#17201C] mb-2">{title}</span>
      )}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          {/* Subtle light background circle */}
          <circle cx={center} cy={center} r={radius} fill="#F8FAF9" />

          {/* Concentric grid polygons */}
          {levels.map((level) => {
            const points = axes
              .map((_, idx) => {
                const { x, y } = getCoordinates(idx, level);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
              })
              .join(' ');
            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="#E5EAE7"
                strokeWidth={level === 100 ? '1.5' : '1'}
                strokeDasharray={level === 100 ? undefined : '2 2'}
              />
            );
          })}

          {/* Radial axis lines from center to outer ring */}
          {axes.map((_, idx) => {
            const { x, y } = getCoordinates(idx, 100);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#E5EAE7"
                strokeWidth="1"
                className={hoveredAxis === idx ? 'stroke-[#059669]' : ''}
              />
            );
          })}

          {/* Series Polygons */}
          {series.map((s) => {
            const points = getPolygonPoints(s.values);
            return (
              <g key={s.id} className="transition-all duration-300">
                <polygon
                  points={points}
                  fill={s.fillColor || `${s.color}15`}
                  stroke={s.color}
                  strokeWidth={s.strokeWidth || 2}
                  strokeDasharray={s.strokeDash}
                />
                {/* Dots at vertices */}
                {s.values.map((val, idx) => {
                  const { x, y } = getCoordinates(idx, val);
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r={2.5}
                      fill={s.color}
                      className="cursor-pointer hover:r-4 transition-all"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Axis Labels */}
          {axes.map((axis, idx) => {
            const { x, y } = getLabelCoordinates(idx);
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (x > center + 10) textAnchor = 'start';
            else if (x < center - 10) textAnchor = 'end';

            const isHovered = hoveredAxis === idx;

            return (
              <text
                key={axis}
                x={x}
                y={y + 4}
                textAnchor={textAnchor}
                className={`text-[10px] font-medium transition-colors cursor-pointer select-none ${
                  isHovered ? 'fill-[#059669] font-semibold' : 'fill-[#66716B]'
                }`}
                onMouseEnter={() => setHoveredAxis(idx)}
                onMouseLeave={() => setHoveredAxis(null)}
              >
                {axis}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      {legend && series.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-[#E5EAE7] w-full mt-2 text-xs">
          {series.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[#66716B] font-medium">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
