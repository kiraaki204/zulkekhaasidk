import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import { BotanicalSprig } from '../common/BrandMarks'
import { useReveal } from '../../hooks/useUi'

export default function BrandIntro() {
  const ref = useReveal()

  return (
    <section ref={ref} aria-labelledby="brand-intro" className="relative py-20 md:py-28 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 reveal">
            <SectionHeading eyebrow="The Brand" title="Meet Zulfe Khaas" titleAs="h2" id="brand-intro" />
          </div>

          <div className="lg:col-span-8 reveal" style={{ '--reveal-delay': '120ms' }}>
            <div className="relative bg-cream border border-parchment/60 px-6 py-8 md:px-10 md:py-12 texture-parchment">
              <BotanicalSprig
                className="absolute top-4 right-5 w-16 text-botanical/50"
                aria-hidden="true"
              />
              <p className="font-heading text-[clamp(1.35rem,2.5vw,1.85rem)] leading-snug text-deep-brown text-balance">
                We make one oil — and we make it carefully.
              </p>
              <div className="mt-5 flex flex-col gap-4 font-body text-deep-brown-soft leading-relaxed max-w-2xl">
                <p>
                  Zulfe Khaas began with a simple belief: hair care should feel like a ritual,
                  not a rush. We select each of our twenty-seven herbs individually, simmer them
                  slowly in a mustard-oil base, and strain the blend by hand.
                </p>
                <p>
                  The result is a warm, botanical hair oil that carries the patience of traditional
                  herbal craft into a bottle designed for everyday luxury. No shortcuts. No
                  crowded shelf of half-used products. Just one considered formula.
                </p>
                <p>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 font-body text-[0.72rem] uppercase tracking-[0.18em] text-rosewood hover:text-deep-brown transition-colors border-b border-rosewood/40 hover:border-deep-brown pb-0.5"
                  >
                    Read our story
                    <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
