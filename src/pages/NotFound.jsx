import { Link } from 'react-router-dom'
import { BotanicalSprig } from '../components/common/BrandMarks'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 py-24 text-center bg-ivory">
      <BotanicalSprig className="w-28 h-auto text-botanical/70" />
      <p className="eyebrow">404</p>
      <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] text-deep-brown">
        This path has grown over.
      </h1>
      <p className="font-body text-deep-brown-soft max-w-md">
        The page you are looking for does not exist — or has been moved into the garden.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center uppercase font-medium font-body text-[0.72rem] tracking-[0.18em] px-6 py-3 bg-butter text-deep-brown hover:bg-butter-soft transition-colors"
      >
        Return home
      </Link>
    </div>
  )
}
