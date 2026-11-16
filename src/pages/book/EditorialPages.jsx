import { HerbArt } from './HerbArt'

export function Page({ children, className = '' }) {
  return (
    <div className={`relative h-full bg-cream px-6 py-8 sm:px-9 sm:py-10 md:px-11 md:py-12 text-deep-brown ${className}`}>
      <div className="flex h-full flex-col">{children}</div>
    </div>
  )
}

export function Kicker({ herb, right }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="book-label">The Botanical Book</span>
      <span className="book-label">{right ?? `No. ${String(herb.entryNo).padStart(2, '0')} / 27`}</span>
    </div>
  )
}

export function DisplayTitle({ herb }) {
  return (
    <header>
      <p className="book-label mt-6">Entry {String(herb.entryNo).padStart(2, '0')}</p>
      <h2 className="font-heading text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.01em] mt-3 text-deep-brown">
        {herb.name}
      </h2>
      <p className="font-heading italic text-[1.35rem] md:text-[1.6rem] text-rosewood mt-2">{herb.botanicalName}</p>
      <div className="mt-5 h-px w-full bg-parchment" aria-hidden="true" />
      <p className="book-label mt-3">{herb.family}</p>
    </header>
  )
}

export function Section({ s, size = 'md' }) {
  const headingCls =
    size === 'lg'
      ? 'font-heading text-[1.7rem] leading-tight text-deep-brown'
      : 'font-heading text-[1.4rem] leading-tight text-deep-brown'
  const bodyCls =
    size === 'lg'
      ? 'mt-2 font-body text-[1rem] leading-[1.75] text-deep-brown-soft'
      : 'mt-2 font-body text-[0.92rem] leading-[1.7] text-deep-brown-soft'
  return (
    <section className="pt-5 border-t border-parchment first:border-t-0 first:pt-0">
      <p className="book-label book-label--tiny" aria-hidden="true">{s.n}</p>
      <h3 className={`${headingCls} mt-1.5`}>{s.title}</h3>
      <p className={bodyCls}>{s.body}</p>
      {s.note && <p className="mt-2 font-body text-xs leading-relaxed text-deep-brown-soft/85 italic">{s.note}</p>}
    </section>
  )
}

export function PullQuote({ s }) {
  return (
    <section className="mt-auto pt-6 border-t border-parchment">
      <p className="book-label book-label--tiny">{s.n} — {s.title}</p>
      <blockquote className="mt-2 font-heading italic text-[clamp(1.35rem,2vw,1.8rem)] leading-snug text-deep-brown">
        “{s.body}”
      </blockquote>
    </section>
  )
}

export function ArtPanel({ herb, tall = false }) {
  const h = tall ? 'min-h-[320px] md:min-h-[420px]' : 'min-h-[200px] md:min-h-[250px]'
  return (
    <div className={`flex items-center justify-center border border-parchment ${h}`}>
      <HerbArt slug={herb.slug} className={`${tall ? 'w-48 md:w-64' : 'w-32 md:w-44'} h-auto text-botanical-deep`} />
    </div>
  )
}
