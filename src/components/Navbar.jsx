import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { site } from '../data/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // the active link is the last nav section whose top has passed 40% of the
    // viewport, worked out from the scroll position so scrolling back up (or
    // through sections without a nav link) never leaves a stale highlight
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      const sections = site.navItems
        .map((item) => document.getElementById(item.sectionId))
        .filter(Boolean);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = sections[0]?.id ?? '';
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = el.id;
      }
      // a short last section may never reach the 40% line
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const linkClass = (id) =>
    `rounded-full px-3 py-1.5 text-sm transition-colors ${
      active === id ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-violet-400/10 bg-space-950/70 backdrop-blur-md' : ''
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main">
        <a href="#top" className="font-display text-lg font-bold text-white">
          <span className="text-gradient">{site.name}</span>
        </a>

        <ul className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {site.navItems.map((item) => (
            <li key={item.sectionId}>
              <a href={`#${item.sectionId}`} className={linkClass(item.sectionId)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-linear-to-r from-violet-600 to-indigo-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 sm:inline-block"
          >
            {site.resumeLabel}
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-4 mb-3 rounded-2xl p-3 md:hidden">
          <ul className="flex flex-col">
            {site.navItems.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`#${item.sectionId}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 text-violet-300">
                {site.resumeLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
