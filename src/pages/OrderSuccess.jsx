import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { product, formatPrice, orderTotals } from '../data/product'
import { useReveal } from '../hooks/useUi'
import { BotanicalSprig, CornerLeaf, LogoMark } from '../components/common/BrandMarks'
import { ButtonLink } from '../components/common/Button'

function readLastOrder(reference) {
  try {
    const raw = sessionStorage.getItem('zulfe-khaas-last-order')
    const parsed = raw ? JSON.parse(raw) : null
    if (parsed && (!reference || parsed.reference === reference)) return parsed
  } catch {
    /* ignore */
  }
  return reference
    ? { reference, quantity: null, totals: null, paymentMethod: null }
    : null
}

/** Folded letter that unfolds on mount (reduced-motion safe via CSS). */
function ThankYouCard() {
  const [opened, setOpened] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (opened) return undefined
    const t = window.setTimeout(() => setOpened(true), 350)
    return () => window.clearTimeout(t)
  }, [opened])

  return (
    <div className="perspective-[1200px] w-full max-w-md mx-auto" aria-label="Thank-you note">
      <div
        className="relative bg-cream border border-parchment/80 shadow-[0_20px_60px_rgba(70,58,48,0.12)] origin-bottom transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: opened ? 'rotateX(0deg)' : 'rotateX(-88deg)',
        }}
      >
        {/* Fold crease */}
        <div
          className="absolute inset-x-0 top-1/2 h-px bg-parchment/70 pointer-events-none"
          aria-hidden="true"
        />

        {/* Envelope-style flap */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 origin-top border-b border-parchment/50 bg-parchment-light/70 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: opened ? 'rotateX(180deg)' : 'rotateX(0deg)',
            backfaceVisibility: 'hidden',
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <LogoMark size={44} className="text-botanical/60" />
          </div>
        </div>

        <div
          className="relative px-8 py-10 md:px-10 md:py-12 transition-opacity duration-700 delay-300"
          style={{ opacity: opened ? 1 : 0 }}
        >
          <div className="flex justify-center mb-5" aria-hidden="true">
            <BotanicalSprig className="w-24 text-botanical/70" />
          </div>

          <p className="font-body text-[0.65rem] uppercase tracking-[0.24em] text-rosewood text-center">
            A little note of gratitude
          </p>

          <div className="mt-6 flex flex-col gap-4 items-center text-center">
            <p className="font-heading italic text-[1.15rem] md:text-[1.3rem] leading-snug text-deep-brown text-balance">
              Thank you for welcoming us into your hair-care ritual.
            </p>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-deep-brown-soft">
              With warmth,
            </p>
            <p className="font-heading text-2xl tracking-[0.14em] uppercase text-deep-brown">
              Zulfe Khaas
            </p>
          </div>

          <div className="mt-8 pt-5 border-t border-parchment/60 flex justify-center" aria-hidden="true">
            <Leaf size={16} strokeWidth={1.2} className="text-botanical" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccess() {
  const ref = useReveal()
  const location = useLocation()
  const [order] = useState(() => readLastOrder(location.state?.reference))

  const fallbackTotals = useMemo(() => orderTotals(order?.quantity ?? 0), [order?.quantity])

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen relative overflow-hidden">
      <CornerLeaf className="absolute top-24 left-6 w-24 text-botanical/20 hidden md:block" aria-hidden="true" />
      <CornerLeaf className="absolute bottom-20 right-8 w-28 text-rosewood/15 rotate-90 hidden md:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24 flex flex-col items-center gap-8 text-center">
        <div className="reveal">
          <p className="eyebrow">Order confirmed</p>
          <h1 className="font-heading text-[clamp(2.2rem,5vw,3.5rem)] leading-tight text-deep-brown mt-3 text-balance">
            Your parcel begins its journey
          </h1>
          <p className="font-body text-deep-brown-soft mt-4 max-w-xl mx-auto leading-relaxed">
            We are preparing your bottle by hand. A confirmation with your order reference is
            on its way to your inbox — keep it handy for any questions.
          </p>
        </div>

        {order && order.reference && (
          <div className="reveal bg-cream border border-parchment/70 px-6 py-4 font-body text-sm text-deep-brown" style={{ '--reveal-delay': '80ms' }}>
            Order reference <span className="font-medium tracking-[0.08em]">{order.reference}</span>
            {order.quantity ? (
              <span className="text-deep-brown-soft">
                {' '} · {product.name} × {order.quantity}
                {order.totals ? ` · ${formatPrice(order.totals.total ?? fallbackTotals.total)}` : ''}
              </span>
            ) : null}
            {order.paymentMethod && (
              <span className="block text-xs text-deep-brown-soft mt-1 capitalize">
                Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
              </span>
            )}
          </div>
        )}

        <div className="reveal w-full mt-4" style={{ '--reveal-delay': '150ms' }}>
          <ThankYouCard />
        </div>

        <div className="reveal flex flex-wrap gap-4 justify-center mt-6" style={{ '--reveal-delay': '300ms' }}>
          <ButtonLink to="/" variant="solid" size="md">
            Return Home
          </ButtonLink>
          <Link
            to="/product"
            className="inline-flex items-center uppercase font-medium font-body text-[0.72rem] tracking-[0.18em] px-6 py-3 border border-deep-brown/30 text-deep-brown hover:border-deep-brown/70 hover:bg-deep-brown/[0.03] transition-all"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="reveal font-body text-xs text-deep-brown-soft/80 max-w-md" style={{ '--reveal-delay': '360ms' }}>
          Delivery updates and courier details will follow by email or WhatsApp.
        </p>
      </div>
    </div>
  )
}
