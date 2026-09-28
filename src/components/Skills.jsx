import { motion } from 'motion/react';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import { skills } from '../data/skills';

// dark devicon marks vanish on the starfield: black ones are inverted, dim ones brightened
const iconTone = (url) => {
  if (['express', 'github-original', 'json', 'oauth'].some((n) => url.includes(n))) return 'invert';
  if (['mysql', 'oracle'].some((n) => url.includes(n))) return 'brightness-[1.9] saturate-150';
  return '';
};

// one entry per distinct logo, for the cloud
const cloud = [];
for (const group of skills) {
  for (const item of group.items) {
    if (!cloud.some((c) => c.icon === item.icon)) cloud.push(item);
  }
}

// rows narrowing by two, like the reference: the widest row that lets 10, 8, 6 … hold every logo
function pyramid(items) {
  const capacity = (w) => {
    let total = 0;
    for (let row = w; row > 0; row -= 2) total += row;
    return total;
  };
  let width = 1;
  while (capacity(width) < items.length) width += 1;
  const rows = [];
  for (let start = 0; start < items.length; width -= 2) {
    rows.push(items.slice(start, start + width));
    start += width;
  }
  return rows;
}

function CloudIcon({ item, index, row }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (row * 3 + index) * 0.03 }}
    >
      <motion.img
        src={item.icon}
        alt={item.name}
        loading="lazy"
        className={`h-10 w-10 object-contain drop-shadow-[0_0_14px_rgba(124,58,237,0.35)] transition-transform duration-300 group-hover:scale-125 md:h-14 md:w-14 ${iconTone(item.icon)}`}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: (index + row) * 0.2 }}
      />
      {/* hover-only label; hidden on phones, where it can't show and would widen the page */}
      <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 hidden -translate-x-1/2 rounded-md bg-space-800/95 px-2 py-0.5 text-xs whitespace-nowrap text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 md:block">
        {item.name}
      </span>
    </motion.div>
  );
}

function TechCloud() {
  const rows = pyramid(cloud);
  return (
    <div className="relative mb-16 py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[720px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.30),rgba(34,211,238,0.06)_50%,transparent_72%)] blur-xl"
      />
      {/* tablet and up: the narrowing pyramid */}
      <div className="relative hidden flex-col items-center gap-7 md:flex">
        {rows.map((row, r) => (
          <div key={r} className="flex justify-center gap-7 lg:gap-9">
            {row.map((item, i) => (
              <CloudIcon key={item.icon} item={item} index={i} row={r} />
            ))}
          </div>
        ))}
      </div>
      {/* phones: centred rows that wrap */}
      <div className="relative flex flex-wrap justify-center gap-5 md:hidden">
        {cloud.map((item, i) => (
          <CloudIcon key={item.icon} item={item} index={i} row={0} />
        ))}
      </div>
    </div>
  );
}

function SkillGroup({ group }) {
  return (
    <div className="glass h-full rounded-2xl p-6 sm:p-7">
      <h3 className="text-lg font-semibold">
        <span className="bg-linear-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">{group.title}</span>
      </h3>
      <div className="mt-3 h-px bg-linear-to-r from-cyan-400/70 via-violet-500/50 to-transparent" />
      <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(5.75rem,1fr))] gap-x-3 gap-y-5">
        {group.items.map((item) => (
          <li key={item.name} className="group flex flex-col items-center text-center">
            <span className="grid h-14 w-14 place-items-center rounded-xl border border-white/8 bg-white/[0.04] transition duration-300 group-hover:-translate-y-1 group-hover:border-violet-400/40 group-hover:shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)]">
              <img src={item.icon} alt="" loading="lazy" className={`h-8 w-8 object-contain ${iconTone(item.icon)}`} />
            </span>
            <span className="mt-2 text-xs leading-snug text-slate-400 group-hover:text-slate-200">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const lastIsAlone = skills.length % 2 === 1;
  return (
    <Section id="skills" title="Technical Skills" subtitle="The tools I use to build, ship and run backend systems.">
      <TechCloud />
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={(i % 2) * 0.06} className={`h-full ${lastIsAlone && i === skills.length - 1 ? 'md:col-span-2' : ''}`}>
            <SkillGroup group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
