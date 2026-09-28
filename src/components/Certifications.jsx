import Section from './ui/Section';
import Reveal from './ui/Reveal';
import { certifications, certificationsMeta } from '../data/certifications';

// a short strip of badge tiles: image on the left, name and issuer beside it
export default function Certifications() {
  return (
    <Section id="certifications" title={certificationsMeta.heading} subtitle={certificationsMeta.subtitle} compact>
      {/* centred wrap, so a short list stays balanced instead of hugging the left */}
      <div className="flex flex-wrap justify-center gap-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05} className="w-full sm:w-80">
            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="glass glow-hover flex h-full items-center gap-3 rounded-xl p-3"
            >
              {c.icon ? (
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${c.tint}26` }}
                >
                  <img src={c.image} alt="" loading="lazy" className="h-6 w-6" />
                </span>
              ) : (
                <img src={c.image} alt="" loading="lazy" className="h-12 w-12 shrink-0 object-contain" />
              )}
              <span className="min-w-0">
                <span className="block text-sm leading-snug font-medium text-slate-100">{c.name}</span>
                <span className="mt-0.5 block text-xs text-cyan-300/80">{c.issuer}</span>
                {c.period && <span className="block text-xs whitespace-nowrap text-slate-500">{c.period}</span>}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
