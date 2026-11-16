import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { product } from '../../data/product'
import { BotanicalSprig, CornerLeaf } from '../common/BrandMarks'
import { ButtonLink } from '../common/Button'
import { useReveal } from '../../hooks/useUi'

export default function Hero() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative overflow-hidden bg-ivory texture-parchment"
    >
      {/* Decorative botanicals */}
      <CornerLeaf className="absolute top-8 left-4 w-16 md:w-24 text-botanical/30 pointer-events-none hidden sm:block" aria-hidden="true" />
      <BotanicalSprig
        className="absolute bottom-12 right-6 w-32 md:w-44 text-rosewood/25 pointer-events-none hidden md:block"
        flip
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[calc(100vh-var(--nav-height))] py-12 lg:py-16">
          {/* Editorial copy */}
          <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1 flex flex-col gap-6 lg:gap-7 reveal">
            <p className="eyebrow">Herbal Hair Oil · 27 Botanicals</p>

            <h1 className="font-heading text-deep-brown text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.02] tracking-[-0.01em] text-balance">
              Quiet luxury
              <br />
              <span className="italic font-normal text-rosewood">for your roots.</span>
            </h1>

            <div className="flex items-center gap-4 max-w-md">
              <span className="h-px flex-1 bg-gradient-to-r from-parchment to-transparent" />
              <BotanicalSprig className="w-20 h-auto text-botanical" />
              <span className="h-px flex-1 bg-gradient-to-l from-parchment to-transparent" />
            </div>

            <p className="font-body text-deep-brown-soft text-[1rem] md:text-[1.05rem] leading-relaxed max-w-md text-balance">
              {product.name} is a slow-simmered hair oil enriched with twenty-seven
              hand-selected herbs — a botanical ritual rooted in tradition, made for
              modern quiet moments of care.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <ButtonLink to="/product" size="lg" variant="solid">
                Shop Now
                <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
              <Link
                to="/botanical-book"
                className="font-body text-[0.72rem] uppercase tracking-[0.18em] text-deep-brown-soft hover:text-rosewood transition-colors border-b border-parchment hover:border-rosewood pb-1"
              >
                Explore the 27 Herbs
              </Link>
            </div>

            <p className="font-heading italic text-sm text-deep-brown-soft/80 mt-1">
              {product.size} · Nationwide delivery across Pakistan
            </p>
          </div>

          {/* Product photograph */}
          <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Soft frame */}
              <div
                className="absolute -inset-3 md:-inset-5 bg-parchment-light/50 rounded-[2rem] -rotate-1"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-1.5 bg-butter-soft/40 rounded-[1.5rem] rotate-[0.6deg]"
                aria-hidden="true"
              />

              <figure className="relative overflow-hidden rounded-[1.25rem] bg-parchment-light hero-animate hero-animate-delay">
                <img
                  src={product.heroImage}
                  alt="Zulfe Khaas herbal hair oil bottle styled with botanical still-life props"
                  className="w-full aspect-[4/3] lg:aspect-[16/11] object-cover object-center"
                  width={1681}
                  height={936}
                  fetchPriority="high"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent px-5 py-6">
                  <p className="font-heading italic text-ivory text-sm md:text-base drop-shadow">
                    The still life — {product.size} of botanical care
                  </p>
                </figcaption>
              </figure>

              {/* Floating price chip */}
              <div className="absolute -bottom-4 left-4 md:left-8 bg-ivory border border-parchment/80 px-4 py-3 shadow-[0_8px_24px_rgba(70,58,48,0.08)] hero-animate hero-animate-delay">
                <p className="eyebrow !text-[0.6rem] !text-rosewood">Signature Oil</p>
                <p className="font-heading text-lg text-deep-brown mt-0.5">
                  {product.name} · {product.size}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-ivory to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
