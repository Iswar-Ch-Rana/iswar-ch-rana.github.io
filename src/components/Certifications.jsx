import Section from './ui/Section';
import Reveal from './ui/Reveal';
import { certifications, certificationsMeta } from '../data/certifications';

export default function Certifications() {
  return (
    <Section id="certifications" title={certificationsMeta.heading} subtitle={certificationsMeta.subtitle}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08} className="h-full">
            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="glass glow-hover flex h-full flex-col items-center rounded-2xl p-6 text-center"
            >
              <img src={c.image} alt="" loading="lazy" className="h-28 w-28 object-contain" />
              <h3 className="mt-4 text-base font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-cyan-300">{c.issuer}</p>
              <p className="mt-1 text-xs text-slate-500">{c.period}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
