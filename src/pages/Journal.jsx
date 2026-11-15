import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Search, Sprout, X } from 'lucide-react'
import { herbs, getHerbBySlug } from '../data/herbs'
import { useReveal } from '../hooks/useUi'
import { BotanicalSprig, CornerLeaf } from '../components/common/BrandMarks'
import { ButtonLink } from '../components/common/Button'

/* ——— Search overlay ——— */
function SearchPanel({ open, onClose, onPick }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const closeAndReset = () => {
    setQuery('')
    onClose()
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return herbs.filter(
      (h) => h.name.toLowerCase().includes(q) || h.botanicalName.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[65] flex items-start justify-center pt-24 px-4" role="dialog" aria-modal="true" aria-label="Search the journal">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close search" onClick={closeAndReset} />
      <div className="relative w-full max-w-lg bg-ivory border border-parchment shadow-2xl" style={{ animation: 'page-fade 0.25s ease both' }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-parchment/70">
          <Search size={17} strokeWidth={1.5} className="text-deep-brown-soft shrink-0" aria-hidden="true" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search herbs…"
            aria-label="Search herbs"
            className="flex-1 bg-transparent font-body text-deep-brown placeholder:text-parchment focus:outline-none py-1"
          />
          <button type="button" onClick={closeAndReset} aria-label="Close search" className="text-deep-brown-soft hover:text-rosewood transition-colors p-1">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() === '' ? (
            <p className="font-body text-sm text-deep-brown-soft px-5 py-6">
              Type an herb name — try “amla” or “lavender”.
            </p>
          ) : results.length === 0 ? (
            <p className="font-body text-sm text-deep-brown-soft px-5 py-6">No herbs found.</p>
          ) : (
            <ul>
              {results.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onPick(h.slug)
                      onClose()
                    }}
                    className="w-full text-left px-5 py-3 hover:bg-butter-soft/50 transition-colors flex items-baseline justify-between gap-3"
                  >
                    <span className="font-heading text-deep-brown">{h.name}</span>
                    <span className="font-heading italic text-xs text-rosewood">{h.botanicalName}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

/* ——— Landing ——— */
function JournalIndex({ onOpenSearch }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen relative">
      <CornerLeaf className="absolute top-28 right-8 w-24 text-botanical/25 hidden lg:block" aria-hidden="true" />

      <header className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-6 md:pt-20">
        <div className="flex items-start justify-between gap-6 reveal">
          <div className="max-w-3xl">
            <p className="eyebrow">Read</p>
            <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] text-deep-brown mt-4 text-balance">
              The Botanical <span className="italic text-rosewood">Journal</span>
            </h1>
            <BotanicalSprig className="w-28 h-auto text-botanical/70 mt-5" />
            <p className="mt-5 font-body text-deep-brown-soft leading-relaxed max-w-2xl">
              A vintage diary of the plants we live with — their stories, their folklore, their
              place in the Zulfe Khaas formulation. Pages open one herb at a time.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search the journal"
            className="mt-2 shrink-0 w-11 h-11 rounded-full border border-parchment bg-cream text-deep-brown hover:border-rosewood hover:text-rosewood transition-all flex items-center justify-center"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Feature entry */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <Link
          to={`/journal/${herbs[0].slug}`}
          className="reveal group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-cream border border-parchment/70 p-6 md:p-10 hover:border-botanical/70 transition-colors"
        >
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="eyebrow !text-[0.62rem]">Featured entry · No. {String(herbs[0].id).padStart(2, '0')}</p>
            <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.75rem)] text-deep-brown mt-2 leading-tight">
              {herbs[0].name}
            </h2>
            <p className="font-heading italic text-rosewood mt-1">{herbs[0].botanicalName}</p>
            <p className="font-body text-deep-brown-soft leading-relaxed mt-4 max-w-xl">
              {herbs[0].hairRelationship}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.16em] text-rosewood group-hover:gap-3 transition-all">
              Read entry <span aria-hidden="true">→</span>
            </span>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="flex items-center justify-center bg-butter-soft/40 border border-butter/60 aspect-[4/3] group-hover:bg-butter-soft/70 transition-colors" aria-hidden="true">
              <Sprout size={56} strokeWidth={0.9} className="text-botanical-deep" />
            </div>
          </div>
        </Link>
      </div>

      {/* All entries — asymmetric editorial grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="flex items-center gap-4 reveal">
          <p className="eyebrow">All entries</p>
          <span className="h-px flex-1 bg-parchment/70" />
          <span className="font-body text-xs text-deep-brown-soft">{herbs.length} pages</span>
        </div>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {herbs.map((herb, i) => {
            const tall = i % 5 === 0
            return (
              <li
                key={herb.id}
                className={`reveal ${tall ? 'lg:row-span-1' : ''}`}
                style={{ '--reveal-delay': `${Math.min(i * 35, 420)}ms` }}
              >
                <Link
                  to={`/journal/${herb.slug}`}
                  className={[
                    'group h-full flex flex-col bg-ivory border border-parchment/60 px-5 py-6 hover:border-rosewood/50 hover:-translate-y-0.5 transition-all duration-300',
                    i % 7 === 3 ? 'bg-parchment-light/35' : '',
                  ].join(' ')}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-body text-[0.6rem] uppercase tracking-[0.16em] text-parchment group-hover:text-botanical transition-colors">
                      Vol. I · {String(herb.id).padStart(2, '0')}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-botanical/50 group-hover:bg-rosewood transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-2xl text-deep-brown mt-3 group-hover:text-rosewood transition-colors leading-tight">
                    {herb.name}
                  </h3>
                  <p className="font-heading italic text-sm text-rosewood/90 mt-0.5">{herb.botanicalName}</p>
                  <p className="font-body text-sm text-deep-brown-soft leading-relaxed mt-3 line-clamp-3 flex-1">
                    {herb.traditionalUses}
                  </p>
                  <span className="mt-4 pt-3 border-t border-parchment/50 font-body text-[0.65rem] uppercase tracking-[0.14em] text-deep-brown-soft group-hover:text-rosewood transition-colors">
                    Read the entry →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/* ——— Full-page herb entry ——— */
function JournalEntry({ herb }) {
  const ref = useReveal()

  const sections = [
    { n: '01', title: 'Meet the Herb', body: `${herb.name} (${herb.botanicalName}) is part of the twenty-seven-botanical composition of Zulfe Khaas.`, extra: herb.roleInFormulation },
    { n: '02', title: 'Relationship with Hair', body: herb.hairRelationship },
    { n: '03', title: 'Traditional Uses', body: herb.traditionalUses, note: 'Traditional use reflects historical and folk practice. It is not a claim of clinical effect.' },
    { n: '04', title: 'Why It’s in Zulfe Khaas', body: herb.roleInFormulation },
    { n: '05', title: 'Did You Know?', body: herb.didYouKnow },
  ]

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen relative">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <Link
          to="/journal"
          className="reveal inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> Journal
        </Link>

        <header className="reveal mt-8 text-center flex flex-col items-center" style={{ '--reveal-delay': '60ms' }}>
          <p className="eyebrow">Entry No. {String(herb.id).padStart(2, '0')}</p>
          <h1 className="font-heading text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.03] text-deep-brown mt-4 text-balance">
            {herb.name}
          </h1>
          <p className="font-heading italic text-rosewood text-lg md:text-xl mt-2">
            {herb.botanicalName}
          </p>
          <BotanicalSprig className="w-40 h-auto text-botanical/70 mt-6" />
        </header>

        <div className="reveal mt-10 flex items-center justify-center bg-butter-soft/40 border border-butter/60 py-14" style={{ '--reveal-delay': '100ms' }} aria-hidden="true">
          <Sprout size={64} strokeWidth={0.8} className="text-botanical-deep" />
        </div>

        {/* Five editorial sections */}
        <div className="mt-12 flex flex-col gap-0">
          {sections.map((s, i) => (
            <section
              key={s.n}
              className="reveal py-10 border-t border-parchment/60 first:border-t-0"
              style={{ '--reveal-delay': `${i * 60}ms` }}
              aria-labelledby={`sec-${s.n}`}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-3xl text-parchment leading-none" aria-hidden="true">{s.n}</span>
                <div className="flex-1">
                  <h2 id={`sec-${s.n}`} className="font-heading text-[clamp(1.5rem,3vw,2rem)] text-deep-brown leading-snug">
                    {s.title}
                  </h2>
                </div>
              </div>
              <div className="mt-4 pl-0 sm:pl-14 flex flex-col gap-3">
                <p className="font-body text-[1.02rem] text-deep-brown-soft leading-relaxed">{s.body}</p>
                {s.extra && (
                  <p className="font-body text-[0.95rem] text-deep-brown-soft/90 leading-relaxed italic">{s.extra}</p>
                )}
                {s.note && (
                  <p className="font-body text-xs text-rosewood/90 bg-rosewood-soft/15 border border-rosewood-soft/30 px-4 py-2.5 leading-relaxed">
                    {s.note}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Next entry */}
        <nav className="reveal mt-6 py-10 border-t border-parchment/60 flex flex-wrap items-center justify-between gap-4" aria-label="Journal navigation">
          <ButtonLink to="/journal" variant="outline" size="sm">
            ← All entries
          </ButtonLink>
          <Link
            to={`/journal/${herbs.find((h) => h.id === herb.id % 27 + 1)?.slug ?? herbs[0].slug}`}
            className="font-body text-[0.72rem] uppercase tracking-[0.16em] text-rosewood hover:text-deep-brown transition-colors border-b border-rosewood/40 pb-1"
          >
            Next entry →
          </Link>
        </nav>

        <div className="reveal pb-16 text-center flex flex-col items-center gap-4">
          <BotanicalSprig className="w-28 text-botanical/60" />
          <ButtonLink to="/botanical-garden" variant="ghost" size="sm">
            Visit the Botanical Garden
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

/* ——— Router ——— */
export default function Journal() {
  const { slug } = useParams()
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  const herb = slug ? getHerbBySlug(slug) : null

  // 404-style herb not found inside journal
  if (slug && !herb) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 py-24 text-center bg-ivory">
        <p className="eyebrow">Journal</p>
        <h1 className="font-heading text-4xl text-deep-brown">That page has faded.</h1>
        <p className="font-body text-deep-brown-soft">This herb entry does not exist (yet).</p>
        <ButtonLink to="/journal" variant="solid" size="sm">Back to the Journal</ButtonLink>
      </div>
    )
  }

  return (
    <>
      {herb ? <JournalEntry herb={herb} /> : <JournalIndex onOpenSearch={() => setSearchOpen(true)} />}
      <SearchPanel
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPick={(s) => {
          setSearchOpen(false)
          navigate(`/journal/${s}`)
        }}
      />
    </>
  )
}

