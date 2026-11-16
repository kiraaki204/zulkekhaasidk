import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { product, formatPrice } from '../data/product'
import { useBag } from '../hooks/useBag'
import { useReveal } from '../hooks/useUi'
import { Button } from '../components/common/Button'
import SectionHeading from '../components/common/SectionHeading'
import { BotanicalSprig } from '../components/common/BrandMarks'
import QuantitySelector from '../components/product/QuantitySelector'
import HowToUse from '../components/product/HowToUse'
import StickyAddBar from '../components/product/StickyAddBar'

const trustNotes = [
  { icon: Sparkles, label: '27 botanicals' },
  { icon: Truck, label: 'Nationwide delivery' },
  { icon: ShieldCheck, label: 'Cash on delivery available' },
]

export default function Product() {
  const ref = useReveal()
  const { add } = useBag()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const outOfStock = !product.inStock

  const handleAdd = useCallback(() => {
    if (outOfStock) return
    add(qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }, [add, qty, outOfStock])

  const handleBuyNow = useCallback(() => {
    if (outOfStock) return
    add(qty)
    navigate('/checkout')
  }, [add, qty, outOfStock, navigate])

  return (
    <div ref={ref} className="bg-ivory texture-parchment">
      {/* Breadcrumb */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" className="hover:text-rosewood transition-colors">Home</a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-deep-brown">Product</li>
          </ol>
        </nav>
      </div>

      {/* Main product layout */}
      <section aria-labelledby="product-title" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="reveal lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]">
            <figure className="relative">
              <div
                className="absolute -inset-2.5 bg-parchment-light/45 rounded-[1.5rem] -rotate-1"
                aria-hidden="true"
              />
              <img
                src={product.heroImage}
                alt={`${product.name} ${product.tagline} — ${product.size} bottle styled in a botanical still life`}
                className="relative w-full aspect-[4/3] object-cover rounded-sm"
                width={1681}
                height={936}
                fetchPriority="high"
              />
              <figcaption className="mt-3 font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft text-center">
                Still life · {product.size}
              </figcaption>
            </figure>

            {/* Trust strip */}
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {trustNotes.map((n) => {
                const Icon = n.icon
                return (
                  <li key={n.label} className="inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.12em] text-deep-brown-soft">
                    <Icon size={14} strokeWidth={1.4} className="text-botanical" aria-hidden="true" />
                    {n.label}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Info */}
          <div className="reveal" style={{ '--reveal-delay': '100ms' }}>
            <p className="eyebrow">{product.tagline} · {product.size}</p>
            <h1 id="product-title" className="font-heading text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.05] text-deep-brown mt-3">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="font-heading text-[2rem] leading-none text-rosewood">
                {formatPrice(product.price)}
              </p>
              <p className="font-body text-sm text-deep-brown-soft">
                Size <span className="text-deep-brown font-medium">{product.size}</span>
              </p>
              {outOfStock ? (
                <span className="inline-flex items-center gap-1.5 font-body text-[0.7rem] uppercase tracking-[0.14em] text-rosewood bg-rosewood-soft/25 px-3 py-1">
                  Currently out of stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-body text-[0.7rem] uppercase tracking-[0.14em] text-botanical-deep">
                  <Check size={13} strokeWidth={2} aria-hidden="true" /> In stock
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <BotanicalSprig className="w-20 h-auto text-botanical/70" />
              <span className="h-px flex-1 bg-gradient-to-r from-parchment to-transparent" />
            </div>

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

            {/* Purchase controls */}
            <div className="mt-8 pt-7 border-t border-parchment/70 flex flex-col gap-5 max-w-lg">
              <div className="flex flex-wrap items-center gap-5">
                <div>
                  <p className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft mb-2">
                    Quantity
                  </p>
                  <QuantitySelector value={qty} onChange={setQty} disabled={outOfStock} max={10} />
                </div>
                <div className="font-body text-sm text-deep-brown-soft self-end pb-1">
                  Subtotal{' '}
                  <span className="text-deep-brown font-medium tabular-nums">
                    {formatPrice(qty * product.price)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAdd}
                  disabled={outOfStock}
                  size="lg"
                  variant="solid"
                  className="flex-1"
                  aria-live="polite"
                >
                  {added ? (
                    <>
                      <Check size={15} strokeWidth={2} aria-hidden="true" /> Added to bag
                    </>
                  ) : (
                    'Add to Bag'
                  )}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={outOfStock}
                  size="lg"
                  variant="outline"
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>

              {outOfStock && (
                <p className="font-body text-sm text-rosewood bg-rosewood-soft/20 border border-rosewood-soft/40 px-4 py-3" role="status">
                  This batch is temporarily out of stock. Please check back soon — we prepare
                  each run in limited quantities.
                </p>
              )}
            </div>

            {/* Understated links */}
            <div className="mt-8 flex flex-col gap-3 max-w-lg">
              <a
                href="/botanical-book"
                className="group inline-flex items-center justify-between border-b border-parchment/70 pb-2 font-body text-[0.75rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood hover:border-rosewood/50 transition-colors"
              >
                Discover the 27 Herbs
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a
                href="/reviews"
                className="group inline-flex items-center justify-between border-b border-parchment/70 pb-2 font-body text-[0.75rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood hover:border-rosewood/50 transition-colors"
              >
                Read Customer Reviews
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal">
        <HowToUse />
      </div>

      {/* Editorial closer */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="reveal bg-cream border border-parchment/70 px-6 py-10 md:px-12 md:py-14 text-center flex flex-col items-center gap-4">
          <SectionHeading
            eyebrow="From the botanical book"
            title="Twenty-seven herbs, one slow simmer"
            titleAs="h2"
            align="center"
            accent={false}
            className="items-center text-center"
          />
          <p className="font-body text-deep-brown-soft max-w-xl leading-relaxed">
            Every herb is selected individually, simmered in mustard oil, and strained by hand.
            Meet the botanicals behind the bottle.
          </p>
          <a
            href="/botanical-book"
            className="mt-2 font-body text-[0.72rem] uppercase tracking-[0.18em] text-rosewood hover:text-deep-brown border-b border-rosewood/40 hover:border-deep-brown pb-1 transition-colors"
          >
            Open the Botanical Book →
          </a>
        </div>
      </section>

      <StickyAddBar onAdd={handleAdd} disabled={outOfStock} />
    </div>
  )
}
