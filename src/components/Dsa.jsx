import { SiGeeksforgeeks, SiLeetcode } from 'react-icons/si';
import { FaCode, FaGithub } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import Heatmap from './ui/Heatmap';
import { dsa } from '../data/highlights';

const ICONS = {
  leetcode: { Icon: SiLeetcode, color: '#FFA116' },
  gfg: { Icon: SiGeeksforgeeks, color: '#2F8D46' },
  tuf: { Icon: FaCode, color: '#f97316' },
};

// updatedAt is a plain YYYY-MM-DD date; read it as UTC so no timezone shifts the day
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function Dsa() {
  const total = dsa.platforms.reduce((sum, p) => sum + p.solved, 0);
  const max = Math.max(...dsa.platforms.map((p) => p.solved));

  return (
    <Section id="dsa" title={dsa.heading} subtitle={dsa.subtitle}>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_2fr]">
        <Reveal className="h-full">
          <div className="glass flex h-full flex-col items-center justify-center rounded-2xl p-8 text-center">
            <div className="font-display text-6xl font-bold">
              <span className="text-gradient">{total.toLocaleString('en-IN')}+</span>
            </div>
            <p className="mt-2 text-slate-400">problems solved</p>
            <dl className="mt-6 grid w-full grid-cols-3 gap-2 border-t border-white/5 pt-5">
              {dsa.activity.map((a) => (
                <div key={a.label}>
                  <dt className="sr-only">{a.label}</dt>
                  <dd className="font-display text-lg font-semibold text-slate-100">{a.value}</dd>
                  <dd className="text-[11px] leading-tight text-slate-500">{a.label}</dd>
                </div>
              ))}
            </dl>
            {dsa.updatedAt && (
              <p className="mt-5 text-[11px] text-slate-600">
                Synced daily · updated {formatDate(dsa.updatedAt)}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <div className="glass flex h-full flex-col justify-between gap-6 rounded-2xl p-6 sm:p-8">
            {dsa.platforms.map((p) => {
              const { Icon, color } = ICONS[p.icon];
              return (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="group block">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3 font-medium text-slate-100">
                      <Icon size={20} color={color} />
                      {p.name}
                      <FaArrowUpRightFromSquare size={11} className="text-slate-500 transition group-hover:text-cyan-300" />
                    </span>
                    <span className="font-display text-lg font-semibold text-white">{p.solved}+</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400"
                      style={{ width: `${(p.solved / max) * 100}%` }}
                    />
                  </div>
                  {p.detail && <p className="mt-2 text-xs text-slate-500">{p.detail}</p>}
                </a>
              );
            })}

            {dsa.repo && (
              <a
                href={dsa.repo.url}
                target="_blank"
                rel="noreferrer"
                className="glass glow-hover inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-sm text-slate-200"
              >
                <FaGithub /> {dsa.repo.label}
              </a>
            )}
          </div>
        </Reveal>

        {Object.keys(dsa.heatmap.days).length > 0 && (
          <Reveal delay={0.15} className="min-w-0 md:col-span-2">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <a href={dsa.heatmap.url} target="_blank" rel="noreferrer" className="group flex items-center gap-2 font-medium text-slate-100">
                  {dsa.heatmap.title}
                  <FaArrowUpRightFromSquare size={11} className="text-slate-500 transition group-hover:text-cyan-300" />
                </a>
                <p className="text-xs text-slate-500">{dsa.heatmap.caption}</p>
              </div>
              <Heatmap days={dsa.heatmap.days} thresholds={dsa.heatmap.thresholds} unit="submission" />
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
