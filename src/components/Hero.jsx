import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaAws, FaGithub, FaJava, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiDocker, SiMysql, SiNodedotjs, SiPostgresql, SiRedis, SiSpringboot } from 'react-icons/si';
import { profile } from '../data/profile';
import { site } from '../data/site';

const ORBIT = [
  { Icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F' },
  { Icon: FaJava, label: 'Java', color: '#f89820' },
  { Icon: SiMysql, label: 'MySQL', color: '#7fb3e0' },
  { Icon: FaAws, label: 'AWS', color: '#FF9900' },
  { Icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { Icon: SiNodedotjs, label: 'Node.js', color: '#5FA04E' },
  { Icon: SiPostgresql, label: 'PostgreSQL', color: '#8aa8f0' },
  { Icon: SiRedis, label: 'Redis', color: '#FF4438' },
];

function useTyping(words, typeMs = 70, holdMs = 1600) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer;
    if (!deleting && text === word) timer = setTimeout(() => setDeleting(true), holdMs);
    else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timer = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? typeMs / 2 : typeMs,
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeMs, holdMs]);

  return text;
}

export default function Hero() {
  const typed = useTyping(profile.titles);
  const [firstName, ...rest] = profile.name.split(' ');

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* glow behind the hero, a light stand-in for the reference's black-hole video */}
      <div aria-hidden="true" className="animate-pulse-glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.28),rgba(34,211,238,0.07)_45%,transparent_70%)] blur-2xl" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            Backend Software Engineer
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="text-gradient">{firstName}</span>
            <br />
            <span className="text-gradient">{rest.join(' ')}</span>
          </h1>

          <p className="mt-5 h-8 font-display text-xl text-cyan-300 sm:text-2xl" aria-live="polite">
            {typed}
            <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-cyan-300 align-middle">&nbsp;</span>
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300/90">{profile.bio[0]}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-linear-to-r from-violet-600 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
            >
              View Projects
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="glass glow-hover rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            >
              Download Resume
            </a>
            <a href="#contact" className="glass glow-hover rounded-full px-6 py-2.5 text-sm font-semibold text-white">
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { href: `mailto:${profile.social.email}`, Icon: FaEnvelope, label: 'Email' },
              { href: profile.social.linkedin, Icon: FaLinkedin, label: 'LinkedIn' },
              { href: profile.social.github, Icon: FaGithub, label: 'GitHub' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass glow-hover grid h-10 w-10 place-items-center rounded-full text-slate-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[460px] xl:max-w-[520px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-[10%] rounded-full border border-violet-400/15" />
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-300/10" />

          <div className="animate-orbit absolute inset-0">
            {ORBIT.map(({ Icon, label, color }, i) => {
              const angle = (i / ORBIT.length) * Math.PI * 2;
              return (
                <div
                  key={label}
                  className="absolute"
                  style={{ left: `${50 + 45 * Math.cos(angle)}%`, top: `${50 + 45 * Math.sin(angle)}%` }}
                >
                  <div className="animate-counter-orbit -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-xl border border-violet-300/25 bg-slate-800/85 shadow-lg shadow-black/40 backdrop-blur sm:h-12 sm:w-12"
                      title={label}
                    >
                      <Icon size={22} color={color} aria-label={label} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute inset-[22%] rounded-full bg-linear-to-br from-violet-500 via-indigo-500 to-cyan-400 p-[3px] shadow-[0_0_60px_-10px_rgba(124,58,237,0.8)]">
            <img
              src={profile.image}
              alt={profile.name}
              className="h-full w-full rounded-full bg-space-900 object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
