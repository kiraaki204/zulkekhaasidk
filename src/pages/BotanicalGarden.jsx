import { useEffect, useMemo, useState } from 'react'
import { Search, Sprout, X } from 'lucide-react'
import { herbs, getHerbById } from '../data/herbs'
import { useReveal } from '../hooks/useUi'
import { BotanicalSprig } from '../components/common/BrandMarks'
import { ButtonLink } from '../components/common/Button'

function HerbProfile({ herb, onClose }) {
  const closeRef = useMemo(() => ({ current: null }), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, closeRef])

  if (!herb) return null

  return (
    <div className="fixed inset-0 z-[65] flex items-end md:items-center justify-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="herb-profile-title">
      <button
        type="button"
        aria-label="Close herb profile"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <article
        className="relative bg-ivory w-full md:max-w-xl max-h-[92vh] overflow-y-auto border border-parchment/70 shadow-2xl md:rounded-sm"
        style={{ animation: 'page-fade 0.3s ease both' }}
      >
        <div className="sticky top-0 bg-ivory/97 backdrop-blur border-b border-parchment/60 px-6 py-4 flex items-start justify-between gap-4 z-10">
          <div>
            <p className="eyebrow !text-[0.62rem]">Herb Profile</p>
            <h2 id="herb-profile-title" className="font-heading text-2xl text-deep-brown mt-1">
              {herb.name}
            </h2>
            <p className="font-heading italic text-rosewood text-sm mt-0.5">{herb.botanicalName}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 -mr-2 -mt-1 text-deep-brown hover:text-rosewood transition-colors shrink-0"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="flex items-center justify-center bg-butter-soft/50 border border-butter/60 py-6" aria-hidden="true">
            <Sprout size={40} strokeWidth={1} className="text-botanical-deep" />
          </div>

          <dl className="flex flex-col gap-4">
            <div>
              <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">Traditional Uses</dt>
              <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">{herb.traditionalUses}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">Relationship with Hair</dt>
              <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">{herb.hairRelationship}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">Role in Zulfe Khaas</dt>
              <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">{herb.roleInFormulation}</dd>
            </div>
          </dl>

          <div className="pt-4 border-t border-parchment/60 flex flex-wrap gap-4">
            <ButtonLink to={`/journal/${herb.slug}`} variant="solid" size="sm" onClick={onClose}>
              Read the Journal entry
            </ButtonLink>
            <button
              type="button"
              onClick={onClose}
              className="font-body text-[0.7rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors self-center"
            >
              Back to garden
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function BotanicalGarden() {
  const ref = useReveal()
  const [selectedId, setSelectedId] = useState(null)
  const [filter, setFilter] = useState('')

  const selected = useMemo(() => (selectedId ? getHerbById(selectedId) : null), [selectedId])

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return herbs
    return herbs.filter(
      (h) => h.name.toLowerCase().includes(q) || h.botanicalName.toLowerCase().includes(q),
    )
  }, [filter])

  const clearSelection = () => setSelectedId(null)

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen relative">
      <header className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8 md:pt-20">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">Explore</p>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] text-deep-brown mt-4 text-balance">
            The Botanical <span className="italic text-botanical-deep">Garden</span>
          </h1>
          <BotanicalSprig className="w-28 h-auto text-botanical/70 mt-5" />
          <p className="mt-5 font-body text-deep-brown-soft leading-relaxed max-w-2xl">
            Walk among the twenty-seven botanicals that shape Zulfe Khaas. Select any plant to
            open its profile — traditional uses, its relationship with hair, and its role in our
            formulation.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-4 reveal" style={{ '--reveal-delay': '80ms' }}>
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft">
              Find a herb
            </span>
            <span className="relative inline-block">
              <Search size={15} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-parchment" aria-hidden="true" />
              <input
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Name or botanical name…"
                className="bg-cream border border-parchment pl-9 pr-4 py-2.5 font-body text-sm text-deep-brown placeholder:text-parchment focus:border-rosewood focus:outline-none transition-colors w-full sm:w-72"
              />
            </span>
          </label>
          <p className="font-body text-xs text-deep-brown-soft pb-2.5" aria-live="polite">
            {filtered.length} of {herbs.length} herbs
          </p>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length === 0 ? (
          <div className="reveal text-center py-20 bg-cream border border-parchment/60">
            <p className="font-heading text-2xl text-deep-brown">No herbs match “{filter}”.</p>
            <button
              type="button"
              onClick={() => setFilter('')}
              className="mt-4 font-body text-[0.72rem] uppercase tracking-[0.16em] text-rosewood border-b border-rosewood/40 pb-1 hover:text-deep-brown transition-colors"
            >
              Show all herbs
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filtered.map((herb, i) => (
              <li key={herb.id} className="reveal" style={{ '--reveal-delay': `${Math.min(i * 40, 480)}ms` }}>
                <button
                  type="button"
                  onClick={() => setSelectedId(herb.id)}
                  aria-haspopup="dialog"
                  className={[
                    'w-full h-full text-left bg-cream border px-4 py-5 transition-all duration-300 group flex flex-col gap-2 min-h-[7.5rem]',
                    selectedId === herb.id
                      ? 'border-botanical shadow-md'
                      : 'border-parchment/60 hover:border-botanical/70 hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  <span className="font-body text-[0.6rem] tracking-[0.14em] text-parchment group-hover:text-botanical transition-colors uppercase">
                    {String(herb.id).padStart(2, '0')}
                  </span>
                  <span className="font-heading text-lg text-deep-brown leading-tight">
                    {herb.name}
                  </span>
                  <span className="font-heading italic text-[0.78rem] text-rosewood/90 leading-snug">
                    {herb.botanicalName}
                  </span>
                  <span className="mt-auto pt-2 font-body text-[0.62rem] uppercase tracking-[0.14em] text-deep-brown-soft group-hover:text-rosewood transition-colors inline-flex items-center gap-1">
                    View profile <span aria-hidden="true">→</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-14 reveal text-center flex flex-col items-center gap-4">
          <BotanicalSprig className="w-32 text-botanical/60" />
          <p className="font-body text-sm text-deep-brown-soft max-w-md">
            Each profile links to a full editorial entry in the Botanical Journal.
          </p>
          <ButtonLink to="/journal" variant="outline" size="sm">
            Open the Journal
          </ButtonLink>
        </div>
      </div>

      {selected && <HerbProfile herb={selected} onClose={clearSelection} />}
    </div>
  )
}
