import { Link } from 'react-router-dom'
import SectionHeading from '../components/common/SectionHeading'
import { ButtonLink } from '../components/common/Button'
import { BotanicalSprig } from '../components/common/BrandMarks'

/**
 * Lightweight placeholder for routes that will be fully built in later feature branches.
 */
export default function PagePlaceholder({ eyebrow, title, blurb, to = '/', cta = 'Back home' }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-ivory texture-parchment">
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center gap-5">
        <BotanicalSprig className="w-28 h-auto text-botanical/70" />
        <SectionHeading eyebrow={eyebrow} title={title} align="center" accent={false} />
        <p className="font-body text-deep-brown-soft leading-relaxed">{blurb}</p>
        <p className="font-heading italic text-sm text-deep-brown-soft/70">
          Arriving on a later feature branch
        </p>
        <ButtonLink to={to} variant="outline" size="sm" className="mt-2">
          {cta}
        </ButtonLink>
        <Link
          to="/"
          className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors"
        >
          ← Return to homepage
        </Link>
      </div>
    </div>
  )
}
