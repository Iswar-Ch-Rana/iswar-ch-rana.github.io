import { FaGraduationCap } from 'react-icons/fa';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import { education } from '../data/education';

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="mx-auto max-w-5xl space-y-5">
        {education.map((e) => (
          <Reveal key={e.degree}>
            <article className="glass glow-hover flex gap-5 rounded-2xl p-6 sm:p-7">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
                <FaGraduationCap size={22} />
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">{e.degree}</h3>
                  <span className="text-xs text-violet-200">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-cyan-300">{e.institution}</p>
                {e.extra && <p className="mt-3 text-sm text-slate-400">{e.extra}</p>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
