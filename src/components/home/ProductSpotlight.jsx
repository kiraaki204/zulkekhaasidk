import { ArrowRight } from 'lucide-react'
import { product, formatPrice } from '../../data/product'
import { CornerLeaf } from '../common/BrandMarks'
import { ButtonLink } from '../common/Button'
import SectionHeading from '../common/SectionHeading'
import { useReveal } from '../../hooks/useUi'

export default function ProductSpotlight() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="spotlight"
      className="relative py-16 md:py-24 bg-sage/40 texture-parchment overflow-hidden"
    >
      <CornerLeaf
        className="absolute -top-4 -right-6 w-32 text-eucalyptus-deep/30 rotate-45 pointer-events-none hidden md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          <div className="lg:col-span-7 reveal">
            <SectionHeading
              eyebrow="Product Spotlight"
              title={product.name}
              titleAs="h2"
              id="spotlight"
            />
            <p className="mt-4 font-body text-deep-brown-soft leading-relaxed max-w-xl">
              {product.description}
            </p>
          </div>

          <div
            className="lg:col-span-5 reveal flex flex-wrap items-end gap-x-10 gap-y-5 lg:justify-end"
            style={{ '--reveal-delay': '100ms' }}
          >
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
            <ButtonLink to="/product" size="md" variant="solid">
              View Product
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
