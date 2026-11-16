import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf } from 'lucide-react'
import { herbs } from '../../data/herbs'
import SectionHeading from '../common/SectionHeading'
import { ButtonLink } from '../common/Button'
import { useReveal } from '../../hooks/useUi'

/** Decorative circular composition of herb names around a centre mark. */
function HerbOrbit({ activeId, onSelect }) {
  const radius = 42 // percent
  return (
    <div
      className="relative w-full max-w-[420px] aspect-square mx-auto"
      role="list"
      aria-label="Herb constellation"
    >
      <div
        className="absolute inset-[12%] rounded-full border border-parchment/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-[24%] rounded-full border border-botanical/30"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
        <Leaf className="w-6 h-6 text-botanical mb-2" strokeWidth={1.2} aria-hidden="true" />
        <p className="font-heading text-[clamp(1.5rem,3vw,2rem)] leading-tight text-deep-brown">
          27 Herbs
        </p>
        <p className="font-body text-[0.7rem] uppercase tracking-[0.16em] text-deep-brown-soft mt-1">
          One careful blend
        </p>
      </div>

      {herbs.map((herb, i) => {
        const angle = (i / herbs.length) * 2 * Math.PI - Math.PI / 2
        const x = 50 + radius * Math.cos(angle)
        const y = 50 + radius * Math.sin(angle)
        const active = activeId === herb.id
        return (
          <button
            key={herb.id}
            type="button"
            role="listitem"
            aria-pressed={active}
            aria-label={herb.name}
            onClick={() => onSelect(herb)}
            className={[
              'absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 font-body text-[0.62rem] sm:text-[0.68rem] tracking-[0.04em] transition-all duration-300 border',
              active
                ? 'bg-botanical text-deep-brown border-botanical-deep scale-110 shadow-lg z-10'
                : 'bg-ivory/90 text-deep-brown-soft border-parchment/70 hover:border-botanical hover:text-deep-brown hover:scale-105',
            ].join(' ')}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {herb.name}
          </button>
        )
      })}
    </div>
  )
}

export default function HerbFeature() {
  const ref = useReveal()
  const [selected, setSelected] = useState(herbs[0])
  const preview = useMemo(() => selected ?? herbs[0], [selected])

  return (
    <section
      ref={ref}
      aria-labelledby="herb-feature"
      className="py-20 md:py-28 bg-ivory relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 reveal">
          <SectionHeading
            eyebrow="Interactive Botanicals"
            title="A constellation of twenty-seven"
            titleAs="h2"
            align="center"
            id="herb-feature"
            className="items-center text-center"
          />
          <p className="font-body text-deep-brown-soft max-w-xl leading-relaxed">
            Every herb in Zulfe Khaas has a story — traditional uses, a relationship with hair,
            and a role in our formulation. Tap any name to begin.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal">
            <HerbOrbit activeId={preview?.id} onSelect={setSelected} />
          </div>

          <article
            className="reveal bg-cream border border-parchment/70 px-6 py-8 md:px-9 md:py-10"
            style={{ '--reveal-delay': '100ms' }}
            aria-live="polite"
          >
            <p className="eyebrow">Herb Profile</p>
            <h3 className="font-heading text-[clamp(1.75rem,3vw,2.35rem)] text-deep-brown mt-2">
              {preview.name}
            </h3>
            <p className="font-heading italic text-rosewood text-sm mt-1">
              {preview.botanicalName}
            </p>

            <dl className="mt-6 flex flex-col gap-4">
              <div>
                <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">Traditional Uses</dt>
                <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">
                  {preview.traditionalUses}
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">Relationship with Hair</dt>
                <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">
                  {preview.hairRelationship}
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">In Zulfe Khaas</dt>
                <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">
                  {preview.roleInFormulation}
                </dd>
              </div>
            </dl>

            <div className="mt-8 pt-5 border-t border-parchment/60 flex flex-wrap gap-4">
              <ButtonLink to="/botanical-garden" variant="solid" size="sm">
                Open Botanical Garden
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
              <Link
                to="/journal"
                className="inline-flex items-center font-body text-[0.7rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors self-center"
              >
                Read the Journal →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
