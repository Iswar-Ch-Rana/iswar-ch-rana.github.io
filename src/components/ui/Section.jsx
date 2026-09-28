import Reveal from './Reveal';

// a page section with the shared gradient heading, subtitle and accent bar
export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
