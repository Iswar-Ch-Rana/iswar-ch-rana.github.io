import Reveal from './ui/Reveal';
import { stats } from '../data/highlights';

export default function Highlights() {
  return (
    <div className="mx-auto -mt-6 max-w-[88rem] px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.value + s.label} delay={i * 0.08}>
            <div className="glass glow-hover h-full rounded-2xl p-5 text-center">
              <div className="font-display text-3xl font-bold sm:text-4xl">
                <span className="text-gradient">{s.value}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
