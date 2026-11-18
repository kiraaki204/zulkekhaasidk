import { herbs } from '../../../data/herbs'

const COLS = 5
const ROWS = 6

function noise(i, salt) {
  const v = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return v - Math.floor(v)
}

const stars = herbs.map((herb, i) => {
  const row = Math.floor(i / COLS)
  const colInRow = i % COLS
  const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow
  const jx = (noise(i, 1) - 0.5) * 0.16
  const jy = (noise(i, 2) - 0.5) * 0.3
  return {
    herb,
    x: ((col + 0.5 + jx) / COLS) * 100,
    y: ((row + 0.5 + jy) / ROWS) * 100,
  }
})

const figure = stars.map((s) => `${s.x.toFixed(2)},${s.y.toFixed(2)}`).join(' ')

function Tick({ className }) {
  return <span aria-hidden="true" className={`absolute h-4 w-4 border-eucalyptus/45 ${className}`} />
}

export default function StarChart({ activeId, onSelect }) {
  return (
    <div
      className="relative w-full max-w-[460px] aspect-[5/6] mx-auto bg-ink border border-eucalyptus/25"
      role="group"
      aria-label="Herb star chart"
    >
      <Tick className="top-2 left-2 border-t border-l" />
      <Tick className="top-2 right-2 border-t border-r" />
      <Tick className="bottom-2 left-2 border-b border-l" />
      <Tick className="bottom-2 right-2 border-b border-r" />

      <div className="absolute inset-5 sm:inset-6">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-eucalyptus/45"
          aria-hidden="true"
        >
          <polyline
            points={figure}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {stars.map(({ herb, x, y }) => {
          const active = activeId === herb.id
          return (
            <button
              key={herb.id}
              type="button"
              aria-pressed={active}
              aria-label={herb.name}
              onClick={() => onSelect(herb)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 px-1 transition duration-300"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span
                aria-hidden="true"
                className={[
                  'block h-1.5 w-1.5 rounded-full transition-all duration-300',
                  active
                    ? 'bg-dusty-pink scale-150 shadow-[0_0_12px_rgba(221,185,184,0.9)]'
                    : 'bg-eucalyptus/80',
                ].join(' ')}
              />
              <span
                className={[
                  'font-body text-[0.56rem] sm:text-[0.6rem] tracking-[0.06em] whitespace-nowrap transition-colors duration-300 bg-ink px-0.5 rounded-[2px]',
                  active ? 'text-ivory' : 'text-eucalyptus/85 hover:text-ivory',
                ].join(' ')}
              >
                {herb.name}
              </span>
            </button>
          )
        })}
      </div>

      <p className="absolute bottom-4 left-5 font-body text-[0.55rem] uppercase tracking-[0.2em] text-eucalyptus/55">
        27 stars · one blend
      </p>
    </div>
  )
}
