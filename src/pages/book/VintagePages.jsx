import { HerbArt } from './HerbArt'

export function Page({ children, className = '' }) {
  return (
    <div
      className={`paper-vintage relative h-full px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 text-deep-brown ${className}`}
    >
      <div className="pointer-events-none absolute inset-2.5 border border-deep-brown/25" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[13px] border border-deep-brown/10" aria-hidden="true" />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  )
}

export function RunningHead({ herb }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-deep-brown/25 pb-2.5">
      <span className="book-label book-label--tiny">Zulfe Khaas · Botanical Book</span>
      <span className="book-label book-label--tiny">Plate {herb.plate} · No. {String(herb.entryNo).padStart(2, '0')}</span>
    </div>
  )
}

export function Folio({ herb, side }) {
  return (
    <div className={`mt-auto pt-4 flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
      <span className="font-heading text-sm text-deep-brown-soft">{12 + herb.index * 2 + (side === 'right' ? 1 : 0)}</span>
    </div>
  )
}

export function TitleBlock({ herb }) {
  return (
    <header className="pt-5">
      <p className="book-label">Herbarium Entry No. {String(herb.entryNo).padStart(2, '0')}</p>
      <h2 className="font-heading text-[clamp(2.1rem,3.6vw,3.2rem)] leading-[1.03] mt-2 text-deep-brown">
        {herb.name}
      </h2>
      <p className="font-heading italic text-deep-brown-soft text-lg md:text-xl mt-1">{herb.botanicalName}</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="h-px w-10 bg-deep-brown/40" aria-hidden="true" />
        <span className="book-label book-label--tiny">{herb.family}</span>
      </div>
    </header>
  )
}

export function Plate({ herb, size = 'lg' }) {
  const minH = size === 'lg' ? 'min-h-[240px] md:min-h-[300px]' : 'min-h-[170px] md:min-h-[200px]'
  const artW = size === 'lg' ? 'w-40 md:w-56' : 'w-28 md:w-36'
  return (
    <figure className="mt-5">
      <div className="border border-deep-brown/35 bg-butter-soft/35 p-2.5">
        <div className={`border border-deep-brown/20 flex items-center justify-center py-4 ${minH}`}>
          <HerbArt slug={herb.slug} className={`${artW} h-auto text-botanical-deep`} />
        </div>
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between gap-3">
        <span className="font-heading italic text-sm text-deep-brown-soft">{herb.botanicalName}</span>
        <span className="book-label book-label--tiny">Pl. {herb.plate}</span>
      </figcaption>
    </figure>
  )
}

export function SpecimenLabel({ herb, className = '' }) {
  return (
    <div className={`bg-cream border border-deep-brown/35 px-4 py-3 shadow-[0_2px_0_rgba(46,37,30,0.08)] ${className}`} style={{ transform: 'rotate(-1.1deg)' }}>
      <p className="book-label book-label--tiny">Specimen · Vol. I</p>
      <p className="font-heading text-xl leading-tight mt-1 text-deep-brown">{herb.name}</p>
      <p className="font-heading italic text-sm text-deep-brown-soft">{herb.botanicalName}</p>
      <p className="book-label book-label--tiny mt-1.5">{herb.family} · {herb.specimenNote}</p>
    </div>
  )
}

export function Section({ s, className = '' }) {
  return (
    <section className={`border-t border-deep-brown/20 pt-3 ${className}`}>
      <div className="flex items-baseline gap-3">
        <span className="font-heading text-base text-deep-brown-soft" aria-hidden="true">{s.n}</span>
        <h3 className="font-heading text-[1.35rem] leading-tight text-deep-brown">{s.title}</h3>
      </div>
      <p className="mt-1.5 font-body text-[0.9rem] leading-relaxed text-deep-brown-soft">{s.body}</p>
      {s.note && (
        <p className="mt-2 border-l-2 border-rosewood/70 pl-3 font-body text-xs leading-relaxed text-deep-brown-soft">
          {s.note}
        </p>
      )}
    </section>
  )
}

export function FactBox({ s }) {
  return (
    <section className="bg-butter-soft/60 border border-deep-brown/25 px-4 py-3.5">
      <div className="flex items-baseline gap-3">
        <span className="font-heading text-base text-deep-brown-soft" aria-hidden="true">{s.n}</span>
        <h3 className="font-heading italic text-xl text-deep-brown">{s.title}</h3>
      </div>
      <p className="mt-1.5 font-body text-[0.9rem] leading-relaxed text-deep-brown-soft">{s.body}</p>
    </section>
  )
}

export function Annotation({ text, className = '' }) {
  return (
    <p className={`font-heading italic text-[0.85rem] leading-snug text-deep-brown-soft ${className}`}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-botanical-deep/70" aria-hidden="true" />
      {text}
    </p>
  )
}
