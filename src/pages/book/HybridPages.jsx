import { HerbArt } from './HerbArt'
import { BotanicalSprig } from '../../components/common/BrandMarks'

export function Page({ children, className = '' }) {
  return (
    <div
      className={`paper-hybrid relative h-full px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-9 text-deep-brown ${className}`}
    >
      <div className="pointer-events-none absolute inset-2 border border-parchment/70" aria-hidden="true" />
      <div className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-botanical-deep/60" aria-hidden="true" />
      <div className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-botanical-deep/60" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-botanical-deep/60" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-botanical-deep/60" aria-hidden="true" />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  )
}

export function Head({ herb }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-parchment pb-2.5">
      <span className="book-label">Botanical Book · Herbarium</span>
      <span className="font-heading text-sm italic text-deep-brown-soft">
        Pl. {herb.plate} — {herb.family}
      </span>
    </div>
  )
}

export function Folio({ herb, side }) {
  return (
    <div className={`mt-auto pt-4 flex items-center gap-3 ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
      <span className="h-px w-8 bg-parchment" aria-hidden="true" />
      <span className="font-heading text-sm text-deep-brown-soft">{12 + herb.index * 2 + (side === 'right' ? 1 : 0)}</span>
    </div>
  )
}

export function Title({ herb, intro }) {
  return (
    <header className="pt-5">
      <div className="flex items-center gap-3">
        <BotanicalSprig className="w-12 text-botanical/70" />
        <p className="book-label book-label--tiny">Entry {String(herb.entryNo).padStart(2, '0')}</p>
      </div>
      <h2 className="font-heading text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.02] mt-2.5 text-deep-brown">
        {herb.name}
      </h2>
      <p className="font-heading italic text-deep-brown-soft text-lg md:text-xl mt-1">{herb.botanicalName}</p>
      {intro && <p className="mt-3 font-body text-[0.9rem] leading-relaxed text-deep-brown-soft">{intro}</p>}
    </header>
  )
}

export function Section({ s, className = '' }) {
  return (
    <section className={`pt-3.5 border-t border-parchment/80 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-botanical-deep/50 font-body text-[0.6rem] font-semibold text-deep-brown-soft" aria-hidden="true">
          {s.n}
        </span>
        <h3 className="font-heading text-[1.3rem] leading-tight text-deep-brown">{s.title}</h3>
      </div>
      <p className="mt-1.5 font-body text-[0.9rem] leading-relaxed text-deep-brown-soft">{s.body}</p>
      {s.note && (
        <p className="mt-2 bg-butter-soft/45 px-3 py-2 font-body text-xs leading-relaxed text-deep-brown-soft">
          {s.note}
        </p>
      )}
    </section>
  )
}

export function SpecimenFrame({ herb, size = 'lg' }) {
  const minH = size === 'lg' ? 'min-h-[230px] md:min-h-[280px]' : 'min-h-[165px] md:min-h-[195px]'
  const artW = size === 'lg' ? 'w-36 md:w-48' : 'w-24 md:w-32'
  return (
    <figure className="mt-5">
      <div className="border border-parchment bg-cream/70 p-3">
        <div className={`flex items-center justify-center border border-parchment/70 bg-ivory/60 py-4 ${minH}`}>
          <HerbArt slug={herb.slug} className={`${artW} h-auto text-botanical-deep`} />
        </div>
        <figcaption className="mt-2.5 flex items-baseline justify-between gap-3 border-t border-parchment/70 pt-2">
          <span className="font-heading italic text-sm text-deep-brown-soft">{herb.botanicalName}</span>
          <span className="book-label book-label--tiny">{herb.specimenNote}</span>
        </figcaption>
      </div>
    </figure>
  )
}

export function MarginNote({ text, className = '' }) {
  return (
    <p className={`font-heading italic text-[0.88rem] leading-snug text-deep-brown-soft ${className}`}>
      <span className="book-label book-label--tiny mr-2 not-italic">Note</span>
      {text}
    </p>
  )
}

export function FactPanel({ s }) {
  return (
    <section className="border border-botanical-deep/40 bg-cream/60 px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-botanical-deep/50 font-body text-[0.6rem] font-semibold text-deep-brown-soft" aria-hidden="true">
          {s.n}
        </span>
        <h3 className="font-heading italic text-[1.25rem] text-deep-brown">{s.title}</h3>
      </div>
      <p className="mt-1.5 font-body text-[0.9rem] leading-relaxed text-deep-brown-soft">{s.body}</p>
    </section>
  )
}
