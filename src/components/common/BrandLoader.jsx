import { Leaf } from 'lucide-react'
import { BotanicalSprig } from './BrandMarks'

/** Branded Suspense fallback — brief §19 page/loader moment. */
export function BrandLoader({ label = 'Preparing your page…' }) {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-5 bg-ivory texture-parchment px-6"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex items-center justify-center" aria-hidden="true">
        <Leaf
          size={28}
          strokeWidth={1.3}
          className="text-botanical-deep animate-pulse motion-reduce:animate-none"
        />
      </span>
      <BotanicalSprig className="w-24 h-auto text-botanical/60" />
      <p className="font-heading italic text-lg text-deep-brown text-center">{label}</p>
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default BrandLoader
