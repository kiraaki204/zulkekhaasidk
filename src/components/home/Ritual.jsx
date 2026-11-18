import { Leaf, MoonStar, Sun } from 'lucide-react'
import { useReveal } from '../../hooks/useUi'

/*
 * THE RITUAL — pending brand assets & confirmed instructions
 * ─────────────────────────────────────────────────────────
 * Two things are deliberately NOT finalised here, by design:
 *
 * 1. Photography — the lifestyle image slot (Fig. 03) is a styled
 *    placeholder. Drop the final vertical (3:4) asset at
 *    `src/assets/images/ritual-lifestyle.jpg`, import it, and swap the
 *    placeholder block for an <img>. The arch, caption and grid are
 *    already sized for it — no layout rebuild needed.
 *
 * 2. Instructions — amount, massage map, timing, frequency and rinse
 *    guidance have NOT been confirmed by the house. They are not
 *    invented here. When confirmed, the "Official method" panel below
 *    is the single place they belong.
 */

const senses = [
  {
    icon: Sun,
    label: 'The Aroma',
    text: 'Resinous, green and warm — herbs opened slowly in mustard oil, not perfume.',
  },
  {
    icon: Leaf,
    label: 'The Touch',
    text: 'A silky glide over scalp and lengths — light, never a heavy, greasy sit.',
  },
  {
    icon: MoonStar,
    label: 'The Pace',
    text: 'A calming interlude for daily or weekly care — exactly as your life holds it.',
  },
]

const pending = ['Amount to use', 'Massage map', 'Timing', 'Frequency', 'Rinse & cleanse']

export default function Ritual() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="ritual"
      className="relative overflow-hidden scroll-mt-24 bg-gradient-to-br from-dusty-pink-pale via-dusty-pink/55 to-dusty-pink/80 texture-parchment"
    >
      {/* Soft contour print — decorative botanical line work */}
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-96 md:w-[34rem] text-rosewood-ink/15 pointer-events-none hidden lg:block"
        fill="none"
      >
        <path d="M100 190C96 130 104 70 100 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        {Array.from({ length: 9 }, (_, i) => {
          const y = 34 + i * 18
          const len = 30 + (i % 3) * 14
          return (
            <g key={y} stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
              <path d={`M100 ${y}c-${len * 0.7} -2 -${len} -10 -${len} -22`} />
              <path d={`M100 ${y}c${len * 0.7} -2 ${len} -10 ${len} -22`} />
            </g>
          )
        })}
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Editorial plate — Fig. 03, pending brand photography */}
          <figure className="lg:col-span-5 reveal order-2 lg:order-1 w-full max-w-md mx-auto lg:max-w-none">
            <div
              role="img"
              aria-label="Placeholder for the ritual lifestyle photograph — a vertical 3:4 image of hands warming and applying the hair oil in soft daylight will be commissioned"
              className="zk-asset-pending zk-arch border border-rosewood-ink/40 p-2 md:p-2.5 shadow-[0_28px_60px_-26px_rgba(70,58,48,0.5)]"
            >
              <div className="zk-arch border border-dashed border-warm-cream/35 min-h-[26rem] md:min-h-[32rem] flex flex-col items-center justify-center text-center px-6 py-10 gap-5">
                <svg viewBox="0 0 120 64" className="w-20 text-warm-cream/70" fill="none" aria-hidden="true">
                  <path d="M8 52C28 48 48 40 64 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M28 46c-2-6 1-11 6-13 2 5 0 11-6 13Z" stroke="currentColor" strokeWidth="0.9" />
                  <path d="M40 38c-1-6 3-11 8-12 1 5-2 11-8 12Z" stroke="currentColor" strokeWidth="0.9" />
                  <path d="M52 28c0-6 4-10 9-11 0 5-3 10-9 11Z" stroke="currentColor" strokeWidth="0.9" />
                  <path d="M64 24c4-5 10-6 14-3-4 4-9 6-14 3Z" stroke="currentColor" strokeWidth="0.9" />
                </svg>

                <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-warm-cream/75">
                  Asset Pending — Photography
                </p>
                <p className="font-heading italic text-[1.35rem] leading-snug text-warm-cream text-balance">
                  The ritual, lived-in
                </p>
                <div className="font-body text-[0.72rem] leading-relaxed text-warm-cream/80 max-w-[16rem]">
                  <p>A vertical 3:4 photograph of the oil being warmed and applied — soft daylight, a quiet counter, the bottle present in frame.</p>
                </div>
                <span className="h-px w-16 bg-warm-cream/30" aria-hidden="true" />
                <p className="font-body text-[0.58rem] uppercase tracking-[0.18em] text-warm-cream/60 leading-relaxed">
                  Drop at<br />
                  <span className="text-warm-cream/85 normal-case tracking-normal">src/assets/images/ritual-lifestyle.jpg</span><br />
                  — layout already reserves this arch
                </p>
              </div>
            </div>
            <figcaption className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 border-b border-rosewood-ink/30 pb-3">
              <span className="font-body text-[0.6rem] uppercase tracking-[0.22em] text-rosewood-ink">
                Fig. 03
              </span>
              <span className="font-heading italic text-[0.95rem] text-deep-brown/80 sm:text-right">
                Pending — brand photography to be provided
              </span>
            </figcaption>
          </figure>

          {/* Copy */}
          <div className="lg:col-span-7 reveal order-1 lg:order-2" style={{ '--reveal-delay': '120ms' }}>
            <p className="eyebrow text-[0.68rem] text-rosewood-ink">The Ritual</p>
            <h2 id="ritual" className="mt-3 font-heading text-deep-brown text-[clamp(2.4rem,5.6vw,4rem)] leading-[1.02] text-balance">
              An unhurried moment,
              <br />
              <span className="italic font-normal text-rosewood-ink">the way the oil was made.</span>
            </h2>

            <p className="mt-6 font-body text-deep-brown/90 leading-relaxed max-w-lg">
              Long before oiling became a product, it was a pause — a few quiet minutes claimed
              for the scalp, the lengths, and the person carrying them. Zulfe Khaas exists for
              exactly that pause.
            </p>

            {/* The senses — experience, not instructions */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl">
              {senses.map((s) => {
                const Icon = s.icon
                return (
                  <li
                    key={s.label}
                    className="border-t border-rosewood-ink/35 pt-4 flex flex-col gap-2"
                  >
                    <Icon size={17} strokeWidth={1.4} aria-hidden="true" className="text-rosewood-ink" />
                    <p className="font-body text-[0.62rem] uppercase tracking-[0.22em] text-rosewood-ink">
                      {s.label}
                    </p>
                    <p className="font-body text-[0.78rem] leading-relaxed text-deep-brown/85">
                      {s.text}
                    </p>
                  </li>
                )
              })}
            </ul>

            {/* Official method — reserved for confirmed house instructions */}
            <div className="mt-8 max-w-2xl bg-warm-cream/85 backdrop-blur-[2px] border border-dashed border-rosewood-ink/45 px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="eyebrow text-[0.6rem] text-rosewood-ink">The Official Method</p>
                <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-deep-brown-soft border border-rosewood-ink/40 px-2 py-1">
                  To be confirmed
                </span>
              </div>
              <p className="mt-3 font-body text-[0.82rem] leading-relaxed text-deep-brown/85">
                The house has not yet published its confirmed application steps, amount or
                frequency — so this page does not invent them. When Zulfe Khaas confirms the
                ritual, it will live here, in the house&rsquo;s own words.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Details awaiting confirmation">
                {pending.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 font-body text-[0.65rem] uppercase tracking-[0.14em] text-rosewood-ink border border-rosewood-ink/30 bg-dusty-pink-pale/60 px-2.5 py-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-butter border border-deep-brown/30" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
