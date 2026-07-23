import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-4 mb-14 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <Reveal delay={0}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-accent">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
