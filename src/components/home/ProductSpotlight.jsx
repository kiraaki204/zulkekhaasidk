import { Link } from 'react-router-dom'
import { ArrowRight, Leaf } from 'lucide-react'
import { product, formatPrice } from '../../data/product'
import { ButtonLink } from '../common/Button'
import { useReveal } from '../../hooks/useUi'

const ticker =
  'Slow-simmered · 27 Hand-selected Botanicals · Mustard-oil Base · Small Batches · By Hinaas World · '

export default function ProductSpotlight() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="spotlight"
      className="relative bg-ink text-warm-cream overflow-hidden"
    >
      {/* Apothecary ticker — the house label, set in motion */}
      <div
        className="relative border-y border-butter/20 bg-[#241B14] overflow-hidden py-2.5"
        aria-hidden="true"
      >
        <div className="zk-marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-butter/70 pr-2"
            >
              {ticker.repeat(3)}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Ambient glows — lamplight on amber glass */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-24 w-96 h-96 rounded-full bg-dusty-pink/[0.09] blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-7rem] bottom-[-5rem] w-[30rem] h-[30rem] rounded-full bg-butter/[0.08] blur-3xl pointer-events-none"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy — hierarchy: house name, format, story, proof, price, CTA */}
          <div className="lg:col-span-6 reveal flex flex-col">
            <p className="eyebrow text-butter/90">The Oil — No. 01</p>

            <h2
              id="spotlight"
              className="mt-4 font-heading text-[clamp(3rem,7vw,5.25rem)] leading-[0.96] tracking-[-0.01em] text-warm-cream"
            >
              Zulfe{' '}
              <span className="italic font-normal text-dusty-pink">Khaas</span>
            </h2>
            <p className="mt-4 font-body text-[0.72rem] uppercase tracking-[0.3em] text-sage">
              Herbal Hair Oil · 150 ml
            </p>

            <span className="mt-6 h-px w-24 bg-gradient-to-r from-butter/70 to-transparent" aria-hidden="true" />

            <p className="mt-6 font-body text-warm-cream/85 leading-relaxed max-w-md">
              {product.description}
            </p>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-lg">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <Leaf
                    size={13}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="mt-[0.2rem] shrink-0 text-sage"
                  />
                  <span className="font-body text-[0.8rem] leading-snug text-warm-cream/80">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex items-end gap-10">
              <div>
                <p className="eyebrow text-[0.58rem] text-warm-cream/55">Price</p>
                <p className="font-heading text-[2.5rem] leading-none text-butter mt-1.5">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div>
                <p className="eyebrow text-[0.58rem] text-warm-cream/55">Net Vol</p>
                <p className="font-heading text-[2.5rem] leading-none text-warm-cream mt-1.5">
                  150 <span className="text-xl align-baseline">ml</span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink
                to="/product"
                size="lg"
                variant="solid"
                className="shadow-[0_14px_34px_-12px_rgba(232,217,159,0.35)]"
              >
                Shop the Oil
                <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
              <Link
                to="/botanical-book"
                className="font-body text-[0.72rem] uppercase tracking-[0.18em] text-warm-cream/75 hover:text-butter transition-colors border-b border-warm-cream/30 hover:border-butter pb-1"
              >
                Ask the 27 herbs first
              </Link>
            </div>

            <p className="mt-6 font-body text-[0.62rem] uppercase tracking-[0.22em] text-sage/75">
              In stock · Nationwide delivery across Pakistan
            </p>
          </div>

          {/* Visual — the real bottle, set in an arch with a spec plate */}
          <figure
            className="lg:col-span-6 reveal flex flex-col items-center"
            style={{ '--reveal-delay': '150ms' }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Halo behind the arch */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[78%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(237,216,215,0.22),rgba(232,217,159,0.1)_55%,transparent_75%)] blur-2xl"
              />
              <div className="relative zk-arch border border-butter/30 bg-gradient-to-b from-[#3A2F26] via-[#2E251E] to-[#241B14] p-2 md:p-2.5 shadow-[0_36px_80px_-30px_rgba(0,0,0,0.75)]">
                <img
                  src={product.heroImage}
                  alt="Zulfe Khaas herbal hair oil — amber glass bottle with the house label, photographed on warm stone beside white stock flowers"
                  width={1681}
                  height={936}
                  loading="lazy"
                  className="zk-arch w-full aspect-[3/4] object-cover object-[50%_50%]"
                />
              </div>

              {/* Spec plate — the label, transcribed as an index card.
                  Flows below the arch on small screens; overlaps the
                  photography on larger ones. */}
              <div className="relative mt-4 w-full sm:mt-0 sm:w-44 sm:absolute sm:-left-7 sm:bottom-14 bg-warm-cream text-deep-brown border border-deep-brown/10 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] px-4 py-3 sm:px-5 sm:py-4">
                <p className="eyebrow text-[0.5rem] text-rosewood-ink">The Label</p>
                <dl className="mt-2 flex flex-col">
                  <div className="flex items-baseline justify-between gap-2 border-b border-deep-brown/15 pb-1.5">
                    <dt className="font-body text-[0.58rem] uppercase tracking-[0.14em] text-deep-brown-soft">
                      Net Vol
                    </dt>
                    <dd className="font-heading text-lg leading-none">150 ml</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 border-b border-deep-brown/15 py-1.5">
                    <dt className="font-body text-[0.58rem] uppercase tracking-[0.14em] text-deep-brown-soft">
                      Botanicals
                    </dt>
                    <dd className="font-heading text-lg leading-none">27</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 pt-1.5">
                    <dt className="font-body text-[0.58rem] uppercase tracking-[0.14em] text-deep-brown-soft">
                      Base
                    </dt>
                    <dd className="font-body text-[0.6rem] text-right leading-tight">
                      Mustard oil<br />slow-simmered
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <figcaption className="mt-5 flex items-baseline gap-3">
              <span className="font-body text-[0.6rem] uppercase tracking-[0.22em] text-butter/80">
                Fig. 02
              </span>
              <span className="font-heading italic text-[0.95rem] text-warm-cream/60">
                The bottle, exactly as it arrives
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
