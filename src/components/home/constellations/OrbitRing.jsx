import { Leaf } from 'lucide-react'
import { herbs } from '../../../data/herbs'

const OUTER_COUNT = Math.ceil(herbs.length / 2)
const INNER_COUNT = herbs.length - OUTER_COUNT

function ringPosition(i) {
  const outer = i % 2 === 0
  const k = Math.floor(i / 2)
  const radius = outer ? 47 : 31
  const step = (Math.PI * 2) / (outer ? OUTER_COUNT : INNER_COUNT)
  const offset = outer ? 0 : step / 2
  const angle = -Math.PI / 2 + offset + k * step
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  }
}

/** Decorative circular composition of herb names around a centre mark. */
export default function OrbitRing({ activeId, onSelect }) {
  return (
    <div
      className="relative w-full max-w-[460px] aspect-square mx-auto"
      role="group"
      aria-label="Herb constellation"
    >
      <div
        className="absolute inset-[8%] rounded-full border border-parchment/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-[24%] rounded-full border border-eucalyptus-deep/35"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-14">
        <Leaf className="w-6 h-6 text-eucalyptus-deep mb-2" strokeWidth={1.2} aria-hidden="true" />
        <p className="font-heading text-[clamp(1.5rem,3vw,2rem)] leading-tight text-deep-brown">
          27 Herbs
        </p>
        <p className="font-body text-[0.7rem] uppercase tracking-[0.16em] text-deep-brown-soft mt-1">
          One careful blend
        </p>
      </div>

      {herbs.map((herb, i) => {
        const { x, y } = ringPosition(i)
        const active = activeId === herb.id
        return (
          <button
            key={herb.id}
            type="button"
            aria-pressed={active}
            aria-label={herb.name}
            onClick={() => onSelect(herb)}
            className={[
              'absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-1.5 py-0.5 font-body text-[0.56rem] sm:text-[0.6rem] tracking-[0.03em] whitespace-nowrap transition-all duration-300 border',
              active
                ? 'bg-eucalyptus-deep text-ivory border-eucalyptus-deep scale-110 shadow-lg z-10'
                : 'bg-ivory/90 text-deep-brown-soft border-parchment/70 hover:border-eucalyptus-deep hover:text-deep-brown hover:scale-105',
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
