import { useState } from 'react'
import { Link } from 'react-router-dom'
import { herbs } from '../data/herbs'
import { constellationDirections } from '../lib/constellationChoice'
import { useConstellationChoice } from '../hooks/useConstellationChoice'
import { OrbitRing, StarChart } from '../components/home/constellations'

function SelectionNote({ herb }) {
  return (
    <div className="mt-5 pt-4 border-t border-parchment/60">
      <p className="eyebrow !text-[0.6rem]">Selected</p>
      <p className="font-heading text-xl text-deep-brown mt-1">{herb.name}</p>
      <p className="font-heading italic text-sm text-rosewood">{herb.botanicalName}</p>
    </div>
  )
}

function DirectionCard({ direction, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(direction.id)}
      aria-pressed={active}
      className={[
        'text-left px-6 py-6 border transition-colors duration-300',
        active
          ? 'border-deep-brown bg-cream shadow-[0_2px_0_rgba(70,58,48,0.08)]'
          : 'border-parchment bg-warm-cream/60 hover:border-eucalyptus-deep hover:bg-cream',
      ].join(' ')}
    >
      <span className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={[
            'inline-flex h-8 w-8 items-center justify-center rounded-full border font-heading text-lg',
            active ? 'border-deep-brown bg-deep-brown text-ivory' : 'border-parchment text-deep-brown-soft',
          ].join(' ')}
        >
          {direction.letter}
        </span>
        <span className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-deep-brown">
          {direction.label}
        </span>
      </span>
      <span className="block font-body text-[0.82rem] text-deep-brown-soft mt-2.5 leading-relaxed">
        {direction.hint}
      </span>
    </button>
  )
}

export default function ConstellationComparison() {
  const [choice, setChoice] = useConstellationChoice()
  const [orbitPick, setOrbitPick] = useState(herbs[0])
  const [chartPick, setChartPick] = useState(herbs[0])

  return (
    <div className="bg-warm-cream min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-24">
        <p className="eyebrow">Interactive botanicals · review</p>
        <h1 className="font-heading text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] text-deep-brown mt-4 max-w-2xl text-balance">
          Two directions for the herb constellation
        </h1>
        <p className="font-body text-deep-brown-soft leading-relaxed mt-4 max-w-xl">
          The homepage section uses whichever direction is selected here. Both plates below are
          live — tap any herb to see how a selection behaves.
        </p>

        <p className="mt-5 font-body text-sm">
          <Link to="/logo-comparison" className="text-rosewood-ink border-b border-rosewood-ink/40 hover:border-rosewood-ink pb-0.5">
            Also reviewing: the wordmark →
          </Link>
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {constellationDirections.map((d) => (
            <DirectionCard
              key={d.id}
              direction={d}
              active={choice === d.id}
              onSelect={setChoice}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section aria-labelledby="orbit-variant" className="border border-parchment bg-ivory px-5 sm:px-8 py-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="eyebrow !text-[0.6rem]">Direction A</p>
                <h2 id="orbit-variant" className="font-heading text-2xl text-deep-brown mt-1">
                  Orbit ring
                </h2>
              </div>
              <span
                className={[
                  'font-body text-[0.65rem] uppercase tracking-[0.16em] px-3 py-1 border',
                  choice === 'orbit'
                    ? 'border-deep-brown bg-deep-brown text-ivory'
                    : 'border-parchment text-deep-brown-soft',
                ].join(' ')}
              >
                {choice === 'orbit' ? 'In use' : 'Preview'}
              </span>
            </div>

            <div className="mt-6">
              <OrbitRing activeId={orbitPick?.id} onSelect={setOrbitPick} />
            </div>
            <SelectionNote herb={orbitPick} />
          </section>

          <section aria-labelledby="chart-variant" className="border border-parchment bg-warm-cream px-5 sm:px-8 py-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="eyebrow !text-[0.6rem]">Direction B</p>
                <h2 id="chart-variant" className="font-heading text-2xl text-deep-brown mt-1">
                  Star chart
                </h2>
              </div>
              <span
                className={[
                  'font-body text-[0.65rem] uppercase tracking-[0.16em] px-3 py-1 border',
                  choice === 'chart'
                    ? 'border-deep-brown bg-deep-brown text-ivory'
                    : 'border-parchment text-deep-brown-soft',
                ].join(' ')}
              >
                {choice === 'chart' ? 'In use' : 'Preview'}
              </span>
            </div>

            <div className="mt-6">
              <StarChart activeId={chartPick?.id} onSelect={setChartPick} />
            </div>
            <SelectionNote herb={chartPick} />
          </section>
        </div>
      </div>
    </div>
  )
}
