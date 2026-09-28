import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { site } from '../data/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const item of site.navItems) {
      const el = document.getElementById(item.sectionId);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
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
