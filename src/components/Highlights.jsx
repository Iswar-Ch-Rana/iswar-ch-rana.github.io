import { FaCloud, FaCode, FaSitemap } from 'react-icons/fa';
import { FaGaugeHigh, FaShieldHalved } from 'react-icons/fa6';
import Reveal from './ui/Reveal';
import { stats } from '../data/highlights';

const ICONS = {
  architecture: FaSitemap,
  build: FaCode,
  performance: FaGaugeHigh,
  devops: FaCloud,
  reliability: FaShieldHalved,
};

// what I do: one card per capability, each backed by a number from real work
export default function Highlights() {
  return (
    <div className="mx-auto -mt-6 max-w-[88rem] px-5 sm:px-8 lg:px-12">
      {/* centred wrap so an odd card count leaves a balanced last row */}
      <div className="flex flex-wrap justify-center gap-4">
        {stats.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <Reveal
              key={s.title}
              delay={i * 0.08}
              className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] 2xl:w-[calc((100%-4rem)/5)]"
            >
              <div className="glass glow-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-base font-semibold text-slate-100">{s.title}</h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{s.text}</p>
                <div className="mt-5 flex flex-col gap-1 border-t border-white/5 pt-4">
                  <span className="shrink-0 font-display text-2xl font-bold whitespace-nowrap">
                    <span className="text-gradient">{s.value}</span>
                  </span>
                  <span className="text-xs leading-snug text-slate-500">{s.label}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
