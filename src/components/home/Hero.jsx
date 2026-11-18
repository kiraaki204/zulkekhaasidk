import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { product } from '../../data/product'
import atmosphereImage from '../../assets/images/Dried Flowers Still Life.jpg'
import { getCredit } from '../../data/imageCredits'
import { BotanicalSprig, CornerLeaf } from '../common/BrandMarks'
import { ButtonLink } from '../common/Button'
import { useReveal } from '../../hooks/useUi'
import { useHeroChoice } from '../../hooks/useHeroChoice'

const atmosphereCredit = getCredit('Dried Flowers Still Life.jpg')

export default function Hero() {
  const ref = useReveal()
  const [heroChoice] = useHeroChoice()
  const atmosphere = heroChoice === 'atmosphere'

  return (
    <section ref={ref} aria-label="Hero" className="relative overflow-hidden bg-ink">
      {/* Full-bleed background: real still life by default, CC0 botanicals on request */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={atmosphere ? atmosphereImage : product.heroImage}
          alt=""
          width={atmosphere ? 2048 : 1681}
          height={atmosphere ? 1365 : 936}
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        <div
          className={`absolute inset-0 lg:bg-transparent ${atmosphere ? 'bg-ink/70' : 'bg-ink/60'}`}
        />
        <div
          className={`absolute inset-0 hidden lg:block bg-gradient-to-r ${
            atmosphere
              ? 'from-ink/95 via-ink/75 to-ink/25'
              : 'from-ink/90 via-ink/65 to-ink/10'
          }`}
        />
        {/* Keeps the transparent navbar legible over both backgrounds */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-ink/75 to-transparent" />
      </div>

      {/* Oversized botanical composition */}
      <BotanicalSprig
        className="absolute -bottom-6 right-[-3rem] w-[22rem] md:w-[30rem] lg:w-[36rem] text-eucalyptus/25 pointer-events-none"
        aria-hidden="true"
      />
      <CornerLeaf
        className="absolute top-24 right-6 w-24 md:w-40 text-dusty-pink/30 pointer-events-none hidden sm:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[100svh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-28 lg:py-24">
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col gap-6 lg:gap-7 reveal">
            <p className="eyebrow text-eucalyptus">Herbal Hair Oil · 27 Botanicals</p>

            <h1 className="font-heading text-ivory text-[clamp(2.9rem,8vw,5.5rem)] leading-[1] tracking-[-0.01em] text-balance">
              Quiet luxury
              <br />
              <span className="italic font-normal text-dusty-pink">for your roots.</span>
            </h1>

            <div className="flex items-center gap-4 max-w-md">
              <span className="h-px flex-1 bg-gradient-to-r from-eucalyptus/70 to-transparent" />
              <BotanicalSprig className="w-20 h-auto text-eucalyptus/80" />
              <span className="h-px flex-1 bg-gradient-to-l from-eucalyptus/70 to-transparent" />
            </div>

            <p className="font-body text-warm-cream text-[1rem] md:text-[1.1rem] leading-relaxed max-w-lg text-balance">
              {product.name} is a slow-simmered hair oil enriched with twenty-seven
              hand-selected herbs — a botanical ritual rooted in tradition, made for
              modern quiet moments of care.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <ButtonLink to="/product" size="lg" variant="solid">
                Shop Now
                <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
              <Link
                to="/botanical-book"
                className="font-body text-[0.72rem] uppercase tracking-[0.18em] text-warm-cream hover:text-dusty-pink transition-colors border-b border-warm-cream/40 hover:border-dusty-pink pb-1"
              >
                Explore the 27 Herbs
              </Link>
            </div>

            <p className="font-heading italic text-sm text-warm-cream/85 mt-1">
              {product.size} · Nationwide delivery across Pakistan
            </p>
          </div>
        </div>
      </div>

      {atmosphere && atmosphereCredit && (
        <a
          href={atmosphereCredit.landingUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-20 right-5 z-20 bg-ink/70 px-2.5 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.16em] text-warm-cream/85 hover:text-dusty-pink transition-colors"
        >
          Photo: {atmosphereCredit.author} · {atmosphereCredit.licenceShort}
        </a>
      )}

      {/* Bottom fade into the Meet Zulfe Khaas section — a long, soft dissolve
          into the exact warm-cream the next section opens with, so the two
          sections read as one continuous room rather than two bands. */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 md:h-40 bg-gradient-to-t from-warm-cream via-warm-cream/45 via-35% to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
    </section>
  )
}
