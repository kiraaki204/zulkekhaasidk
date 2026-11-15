import { ShoppingBag } from 'lucide-react'
import { product, formatPrice } from '../../data/product'
import { useBag } from '../../hooks/useBag'
import { useMediaQuery, useScrolled } from '../../hooks/useUi'

/** Mobile-only sticky Add to Bag bar near the bottom of the screen. */
export default function StickyAddBar({ onAdd, disabled = false }) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const pastThreshold = useScrolled(360)
  const { quantity } = useBag()

  if (!isMobile || !pastThreshold) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-parchment/80 bg-ivory/97 backdrop-blur-md px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(70,58,48,0.08)]"
      role="region"
      aria-label="Quick add to bag"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-heading text-base text-deep-brown leading-tight truncate">
            {product.name} · {product.size}
          </p>
          <p className="font-body text-xs text-deep-brown-soft">
            {formatPrice(product.price)}
            {quantity > 0 && (
              <span className="text-botanical-deep"> · {quantity} in bag</span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="inline-flex items-center gap-2 bg-butter text-deep-brown px-5 py-3 text-[0.68rem] uppercase tracking-[0.16em] font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed hover:bg-butter-soft transition-colors shrink-0"
        >
          <ShoppingBag size={15} strokeWidth={1.5} aria-hidden="true" />
          {disabled ? 'Sold out' : 'Add to Bag'}
        </button>
      </div>
    </div>
  )
}
