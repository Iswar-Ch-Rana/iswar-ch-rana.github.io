import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import Heatmap from './ui/Heatmap';
import { projects, github } from '../data/projects';

const PREVIEW_BULLETS = 3;

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const bullets = expanded ? project.bullets : project.bullets.slice(0, PREVIEW_BULLETS);
  const hiddenCount = project.bullets.length - PREVIEW_BULLETS;

  return (
    <article className="glass glow-hover flex h-full flex-col rounded-2xl p-6">
      <div className="mb-4 h-1 w-12 rounded-full bg-linear-to-r from-violet-400 to-cyan-400" />
      <h3 className="text-lg leading-snug font-semibold">{project.title}</h3>
      <p className="mt-1 text-xs tracking-wide text-slate-500 uppercase">{project.period}</p>

      <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 self-start text-xs font-medium text-violet-300 hover:text-violet-200"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : `Show ${hiddenCount} more`}
        </button>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border border-slate-600/40 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
            {t}
          </span>
        ))}
      </div>

      {(project.links?.code || project.links?.demo) && (
        <div className="mt-5 flex gap-3">
          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noreferrer" className="glass glow-hover inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white">
              <FaGithub /> Code
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-violet-600 to-indigo-500 px-4 py-1.5 text-sm text-white">
              <FaArrowUpRightFromSquare size={12} /> Live
            </a>
          )}
        </div>
      )}
    </article>
  );
}

// the live calendar as { date: count } for the active days, or null if it can't be read
async function fetchGithubDays(signal) {
  const res = await fetch(github.liveUrl, { signal });
  if (!res.ok) return null;
  const { contributions } = await res.json();
  if (!Array.isArray(contributions) || contributions.length < 365) return null;
  return Object.fromEntries(contributions.filter((d) => d.count > 0).map((d) => [d.date, d.count]));
}

export default function Projects() {
  const [githubDays, setGithubDays] = useState(github.days);
  useEffect(() => {
    const controller = new AbortController();
    fetchGithubDays(controller.signal)
      .then((days) => days && setGithubDays(days))
      .catch(() => {}); // keep the saved copy
    return () => controller.abort();
  }, []);

  return (
    <Section id="projects" title="Projects" subtitle="Systems I've built and the results they delivered.">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {Object.keys(githubDays).length > 0 && (
        <Reveal className="mt-6">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <a href={github.url} target="_blank" rel="noreferrer" className="group flex items-center gap-2 font-medium text-slate-100">
                <FaGithub size={18} /> {github.title}
                <FaArrowUpRightFromSquare size={11} className="text-slate-500 transition group-hover:text-cyan-300" />
              </a>
              <p className="text-xs text-slate-500">
                {Object.values(githubDays).reduce((sum, n) => sum + n, 0).toLocaleString('en-IN')} contributions in the last year
              </p>
            </div>
            <Heatmap days={githubDays} />
          </div>
        </Reveal>
      )}
    </Section>
  );
}
