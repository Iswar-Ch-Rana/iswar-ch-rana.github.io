import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import { contact } from '../data/contact';

// FormSubmit only answers fetch() with JSON on its /ajax/ endpoint
const ajaxEndpoint = (url) => url.replace('://formsubmit.co/', '://formsubmit.co/ajax/').replace('/ajax/ajax/', '/ajax/');

const EMPTY = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(ajaxEndpoint(contact.formEndpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setForm(EMPTY);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const links = [
    { Icon: FaPhone, label: contact.phone, href: `tel:${contact.phone}` },
    { Icon: FaEnvelope, label: contact.email, href: `mailto:${contact.email}` },
    { Icon: FaLinkedin, label: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: contact.linkedin },
    { Icon: FaGithub, label: contact.github.replace(/^https?:\/\//, ''), href: contact.github },
  ];

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-400/60 focus:outline-none';

  return (
    <Section id="contact" title={contact.heading} subtitle={contact.intro}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="glass h-full rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-semibold">{contact.subheading}</h3>
            <ul className="mt-6 space-y-4">
              {links.map(({ Icon, label, href }) => (
                <li key={href}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 text-slate-200 hover:text-cyan-300">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
                      <Icon />
                    </span>
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <form onSubmit={onSubmit} className="glass h-full space-y-4 rounded-2xl p-6 sm:p-8">
            <label className="block">
              <span className="mb-1.5 block text-sm text-slate-300">Name</span>
              <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-slate-300">Email</span>
              <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@company.com" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-slate-300">Message</span>
              <textarea name="message" rows={5} value={form.message} onChange={onChange} required placeholder="Your message" className={field} />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-linear-to-r from-violet-600 to-indigo-500 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            <p role="status" className="min-h-5 text-sm">
              {status === 'sent' && <span className="text-emerald-300">{contact.successMessage}</span>}
              {status === 'error' && <span className="text-rose-300">{contact.errorMessage}</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
