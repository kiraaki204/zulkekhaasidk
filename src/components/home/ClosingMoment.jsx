import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BotanicalSprig } from '../common/BrandMarks'
import { useReveal } from '../../hooks/useUi'

export default function ClosingMoment() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="closing"
      className="relative overflow-hidden bg-ink text-center"
    >
      {/* Glow — the last warm light before the footer */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[34rem] w-[52rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(221,185,184,0.16),rgba(185,201,183,0.07)_55%,transparent_75%)] blur-2xl pointer-events-none"
      />
      {/* Soft hand-off from the pink ritual section into the closing dark */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-16 md:h-24 bg-gradient-to-b from-dusty-pink-deep/25 to-transparent pointer-events-none"
      />
      {/* Ghost monogram, surfacing once more before the footer */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[9rem] md:text-[17rem] leading-none text-warm-cream/[0.035] select-none pointer-events-none"
      >
        ZK
      </span>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center">
        <p className="reveal eyebrow text-butter/85">Zulfe Khaas · by Hinaas World</p>

        <h2
          id="closing"
          className="reveal mt-6 font-heading text-warm-cream text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.02] tracking-[-0.01em] text-balance"
          style={{ '--reveal-delay': '120ms' }}
        >
          Some things ripen slowly.
          <br />
          <span className="italic font-normal text-dusty-pink">This is one of them.</span>
        </h2>

        <div
          className="reveal mt-8 flex items-center gap-4 w-full max-w-md"
          style={{ '--reveal-delay': '220ms' }}
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-sage/50 to-sage/10" />
          <BotanicalSprig className="w-16 h-auto text-sage/80" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-sage/50 to-sage/10" />
        </div>

        <p
          className="reveal mt-7 font-body text-[0.7rem] uppercase tracking-[0.26em] text-warm-cream/60"
          style={{ '--reveal-delay': '300ms' }}
        >
          Herbal Hair Oil · 150 ml · Nationwide delivery across Pakistan
        </p>

        <nav
          className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={{ '--reveal-delay': '380ms' }}
          aria-label="Where to next"
        >
          <Link
            to="/product"
            className="group inline-flex items-center gap-2 font-body text-[0.72rem] uppercase tracking-[0.2em] text-butter hover:text-butter-soft transition-colors border-b border-butter/40 hover:border-butter pb-1"
          >
            Shop the Oil
            <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/botanical-book"
            className="group inline-flex items-center gap-2 font-body text-[0.72rem] uppercase tracking-[0.2em] text-eucalyptus hover:text-sage transition-colors border-b border-eucalyptus/30 hover:border-sage pb-1"
          >
            Explore the 27 Herbs
            <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </nav>

        <a
          href="mailto:hello@zulfekhaas.pk"
          className="reveal mt-10 font-heading italic text-sm text-warm-cream/55 hover:text-dusty-pink transition-colors"
          style={{ '--reveal-delay': '460ms' }}
        >
          hello@zulfekhaas.pk
        </a>
      </div>
    </section>
  )
}
