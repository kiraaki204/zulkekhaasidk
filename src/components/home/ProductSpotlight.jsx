import { ArrowRight } from 'lucide-react'
import { product, formatPrice } from '../../data/product'
import { ButtonLink } from '../common/Button'
import SectionHeading from '../common/SectionHeading'
import { useReveal } from '../../hooks/useUi'

export default function ProductSpotlight() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="spotlight"
      className="relative py-20 md:py-28 bg-parchment-light/40 texture-parchment overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image */}
          <div className="lg:col-span-6 reveal">
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-botanical/40 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-rosewood/30 pointer-events-none"
                aria-hidden="true"
              />
              <img
                src={product.heroImage}
                alt={`${product.name} ${product.size} bottle`}
                className="w-full aspect-[4/3] object-cover rounded-sm"
                loading="lazy"
                width={1681}
                height={936}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 reveal" style={{ '--reveal-delay': '100ms' }}>
            <SectionHeading eyebrow="Product Spotlight" title={product.name} titleAs="h2" id="spotlight" />
            <p className="mt-5 font-body text-deep-brown-soft leading-relaxed max-w-lg">
              {product.description}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5 max-w-lg">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 font-body text-sm text-deep-brown">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-botanical shrink-0" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <p className="eyebrow !text-[0.6rem]">Price</p>
                <p className="font-heading text-[2rem] leading-none text-deep-brown mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div>
                <p className="eyebrow !text-[0.6rem]">Size</p>
                <p className="font-heading text-[2rem] leading-none text-deep-brown mt-1">
                  {product.size}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink to="/product" size="md" variant="solid">
                View Product
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/botanical-garden" size="md" variant="outline">
                The 27 Herbs
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
