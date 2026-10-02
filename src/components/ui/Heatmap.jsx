import { useEffect, useRef } from 'react';

// a GitHub-style activity calendar: 53 week columns ending today, one cell per day.
// days is { 'YYYY-MM-DD': count } with only the active days; thresholds are the
// minimum counts for levels 1-4, defaulting to quartiles of the active days.
const WEEKS = 53;
const CELL = 11;
const STEP = CELL + 3;
const LEFT = 30; // room for the weekday labels
const TOP = 18; // room for the month labels
const COLORS = ['rgb(255 255 255 / 0.06)', '#4c1d95', '#7c3aed', '#818cf8', '#22d3ee'];
const DAY = 86_400_000;

// dates are handled as UTC midnights so no timezone shifts a day
const iso = (t) => new Date(t).toISOString().slice(0, 10);
const label = (t) =>
  new Date(t).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

function quartiles(counts) {
  const sorted = counts.filter((c) => c > 0).sort((a, b) => a - b);
  if (!sorted.length) return [1, 2, 3, 4];
  return [1, ...[0.25, 0.5, 0.75].map((q) => sorted[Math.floor(q * sorted.length)])].map((t, i, a) =>
    Math.max(t, i ? a[i - 1] + 1 : 1),
  );
}

export default function Heatmap({ days, thresholds, unit = 'contribution', title }) {
  const scroller = useRef(null);
  // on narrow screens the calendar scrolls; start at the most recent weeks
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const today = Date.parse(new Date().toLocaleDateString('en-CA'));
  const start = today - ((WEEKS - 1) * 7 + new Date(today).getUTCDay()) * DAY; // a Sunday
  const levels = thresholds ?? quartiles(Object.values(days));
  const level = (n) => levels.filter((t) => n >= t).length;
  const plural = (n) => `${n.toLocaleString('en-IN')} ${unit}${n === 1 ? '' : 's'}`;

  const weeks = Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const t = start + (w * 7 + d) * DAY;
      return t > today ? null : { t, count: days[iso(t)] ?? 0 };
    }),
  );

  // a month is labelled over the first week that starts in it, unless too close to the last label
  const months = [];
  weeks.forEach((week, w) => {
    const m = new Date(week[0].t).getUTCMonth();
    if (w && m === new Date(weeks[w - 1][0].t).getUTCMonth()) return;
    if (months.length && w - months.at(-1).w < 3) months.pop();
    months.push({ w, text: new Date(week[0].t).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }) });
  });

  const width = LEFT + WEEKS * STEP;
  const height = TOP + 7 * STEP;

  return (
    <div>
      <div ref={scroller} className="overflow-x-auto pb-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[42rem]"
          role="img"
          aria-label={title ?? `Daily ${unit}s over the last 12 months`}
        >
          {months.map((m) => (
            <text key={m.w} x={LEFT + m.w * STEP} y={11} className="fill-slate-500 text-[10px]">
              {m.text}
            </text>
          ))}
          {['Mon', 'Wed', 'Fri'].map((d, i) => (
            <text key={d} x={0} y={TOP + (i * 2 + 1) * STEP + 9} className="fill-slate-500 text-[10px]">
              {d}
            </text>
          ))}
          {weeks.map((week, w) =>
            week.map(
              (day, d) =>
                day && (
                  <rect
                    key={day.t}
                    x={LEFT + w * STEP}
                    y={TOP + d * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={COLORS[level(day.count)]}
                  >
                    <title>{`${day.count ? plural(day.count) : `No ${unit}s`} on ${label(day.t)}`}</title>
                  </rect>
                ),
            ),
          )}
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-slate-500" aria-hidden="true">
        Less
        {COLORS.map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
        ))}
        More
      </div>
    </div>
  );
}
