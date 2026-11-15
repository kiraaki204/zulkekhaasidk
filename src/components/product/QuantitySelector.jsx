import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  className = '',
}) {
  const clamp = (n) => Math.max(min, Math.min(max, n))

  return (
    <div
      className={`inline-flex items-center border border-parchment bg-ivory ${className}`}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - 1))}
        className="px-3.5 py-2.5 text-deep-brown hover:text-rosewood disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
      >
        <Minus size={15} strokeWidth={1.5} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label="Quantity value"
        className="w-10 bg-transparent text-center font-body text-sm tabular-nums text-deep-brown focus:outline-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => {
          const n = Number.parseInt(e.target.value, 10)
          onChange(Number.isNaN(n) ? min : clamp(n))
        }}
      />
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + 1))}
        className="px-3.5 py-2.5 text-deep-brown hover:text-rosewood disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={15} strokeWidth={1.5} />
      </button>
    </div>
  )
}
