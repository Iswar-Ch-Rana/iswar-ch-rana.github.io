import { FaEnvelope, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import { profile } from '../data/profile';
import { education } from '../data/education';

export default function About() {
  const facts = [
    { Icon: FaMapMarkerAlt, label: 'Based in', value: 'Hyderabad, India' },
    { Icon: FaGraduationCap, label: 'Education', value: education[0]?.degree },
    { Icon: FaEnvelope, label: 'Email', value: profile.social.email, href: `mailto:${profile.social.email}` },
  ];

  return (
    <Section id="about" title="About Me" subtitle="Who I am and what I build.">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="glass h-full space-y-4 rounded-2xl p-6 leading-relaxed sm:p-8">
            {profile.bio.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="glass h-full space-y-5 rounded-2xl p-6 sm:p-8">
            {facts.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="text-xs tracking-wider text-slate-500 uppercase">{label}</p>
                  {href ? (
                    <a href={href} className="break-all text-slate-200 hover:text-cyan-300">
                      {value}
                    </a>
                  ) : (
                    <p className="text-slate-200">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
