import { useEffect, useRef } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { product, formatPrice, orderTotals, shipping } from '../../data/product'
import { useBag } from '../../hooks/useBag'
import { ButtonLink } from '../common/Button'
import { useMediaQuery, useFocusTrap } from '../../hooks/useUi'

export default function BagDrawer() {
  const { quantity, subtotal, isOpen, closeBag, setQuantity } = useBag()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const panelRef = useRef(null)

  useFocusTrap(panelRef, { active: isOpen, onEscape: closeBag })

  useEffect(() => {
    if (!isOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen) return null

  const totals = orderTotals(quantity)
  const shippingLabel =
    quantity > 0 && totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)
  const freeShipRemaining =
    quantity > 0 && totals.shipping > 0 ? shipping.freeOver - totals.subtotal : 0

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button
        type="button"
        aria-label="Close bag"
        className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
        onClick={closeBag}
      />

      <div
        ref={panelRef}
        className={[
          'absolute bg-ivory shadow-2xl flex flex-col transition-all duration-400 ease-out',
          isDesktop
            ? 'right-0 top-0 h-full w-full max-w-md translate-x-0'
            : 'left-0 right-0 bottom-0 max-h-[88vh] rounded-t-2xl',
        ].join(' ')}
        style={{ animation: 'page-fade 0.3s ease both' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-parchment/70">
          <div>
            <p className="eyebrow">Your Bag</p>
            <p className="font-heading text-xl mt-1">
              {quantity === 0
                ? 'Empty'
                : `${quantity} item${quantity === 1 ? '' : 's'}`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeBag}
            aria-label="Close bag"
            className="p-2 -mr-2 text-deep-brown hover:text-rosewood transition-colors"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {quantity === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-5 text-center py-12">
              <p className="font-heading text-2xl text-deep-brown">Your bag is waiting.</p>
              <p className="font-body text-sm text-deep-brown-soft max-w-[16rem]">
                Add the 150 ml herbal oil to begin your ritual.
              </p>
              <ButtonLink to="/product" onClick={closeBag} variant="outline" size="sm">
                View Product
              </ButtonLink>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-24 shrink-0 aspect-[3/4] bg-parchment-light overflow-hidden">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    width={1681}
                    height={936}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <p className="font-heading text-lg leading-tight">{product.name}</p>
                  <p className="font-body text-xs uppercase tracking-[0.14em] text-deep-brown-soft">
                    {product.tagline} · {product.size}
                  </p>
                  <p className="font-body text-sm text-deep-brown mt-1">
                    {formatPrice(product.price)}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center border border-parchment">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(quantity - 1)}
                        className="px-2.5 py-1.5 text-deep-brown hover:text-rosewood transition-colors"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="px-3 font-body text-sm tabular-nums min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-1.5 text-deep-brown hover:text-rosewood transition-colors"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuantity(0)}
                      className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft hover:text-rosewood transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <hr className="rule-botanical" />

              <dl className="flex flex-col gap-2 font-body text-sm">
                <div className="flex justify-between">
                  <dt className="text-deep-brown-soft">Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-deep-brown-soft">Shipping (est.)</dt>
                  <dd className="tabular-nums">{shippingLabel}</dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-parchment/60 font-medium">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
                </div>
              </dl>

              {freeShipRemaining > 0 && (
                <p className="font-body text-[0.72rem] text-botanical-deep leading-snug">
                  Add {formatPrice(freeShipRemaining)} more for free shipping.
                </p>
              )}
            </div>
          )}
        </div>

        {quantity > 0 && (
          <div className="px-6 py-5 border-t border-parchment/70 flex flex-col gap-3">
            <ButtonLink to="/checkout" onClick={closeBag} className="w-full">
              Checkout · {formatPrice(totals.total)}
            </ButtonLink>
            <button
              type="button"
              onClick={closeBag}
              className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-deep-brown transition-colors py-1"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
