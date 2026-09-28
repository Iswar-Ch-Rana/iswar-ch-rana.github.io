import Reveal from './Reveal';

// a page section with the shared gradient heading, subtitle and accent bar;
// compact trims the padding and heading for short sections
export default function Section({ id, title, subtitle, compact = false, children }) {
  return (
    <section id={id} className={`relative ${compact ? 'py-12 sm:py-14' : 'py-20 sm:py-24'}`}>
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal className={`${compact ? 'mb-8' : 'mb-12'} text-center`}>
          <h2 className={`font-bold tracking-tight ${compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`}>
            <span className="text-gradient">{title}</span>
          </h2>
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-slate-400">{subtitle}</p>}
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-violet-400 to-cyan-400" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
