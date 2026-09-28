import Section from './ui/Section';
import Reveal from './ui/Reveal';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <Section id="experience" title="Experience" subtitle="Where I've worked and what I delivered.">
      <ol className="relative mx-auto max-w-5xl border-l border-violet-400/25 pl-8 sm:pl-10">
        {experience.map((job, i) => (
          <li key={job.title + job.period} className="relative mb-10 last:mb-0">
            <span className="absolute top-6 -left-[41px] h-4 w-4 rounded-full border-2 border-cyan-300 bg-space-950 shadow-[0_0_12px_#22d3ee] sm:-left-[49px]" />
            <Reveal delay={i * 0.05}>
              <article className="glass glow-hover rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="mt-1 text-sm font-medium text-cyan-300">{job.company}</p>
                    {job.project && <p className="mt-2 text-sm text-slate-400">{job.project}</p>}
                  </div>
                  <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {job.tags?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="rounded-full border border-slate-600/40 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
