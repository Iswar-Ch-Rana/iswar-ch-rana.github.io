import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { footer } from '../data/footer';
import { profile } from '../data/profile';

export default function Footer() {
  const social = [
    { href: profile.social.linkedin, Icon: FaLinkedin, label: 'LinkedIn' },
    { href: profile.social.github, Icon: FaGithub, label: 'GitHub' },
    { href: `mailto:${profile.social.email}`, Icon: FaEnvelope, label: 'Email' },
  ];

  return (
    <footer className="border-t border-violet-400/10 bg-space-950/60 backdrop-blur">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-12">
        <div>
          <p className="font-display text-lg font-semibold text-white">{footer.owner}</p>
          <p className="mt-2 text-sm text-slate-400">{footer.blurb}</p>
        </div>
        <nav aria-label="Footer">
          <p className="font-display font-semibold text-white">Links</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {footer.quickLinks.map((l) => (
              <li key={l.sectionId}>
                <a href={`#${l.sectionId}`} className="text-slate-400 hover:text-cyan-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-display font-semibold text-white">Connect</p>
          <div className="mt-3 flex gap-3">
            {social.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="glass glow-hover grid h-10 w-10 place-items-center rounded-full text-slate-200">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {footer.owner}. All rights reserved.
      </p>
    </footer>
  );
}
