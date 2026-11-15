import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { placeholderReviewMessage, reviews } from '../../data/reviews'
import SectionHeading from '../common/SectionHeading'
import { ButtonLink } from '../common/Button'
import { useReveal } from '../../hooks/useUi'

function Stars({ count = 5, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.4}
          className={i < count ? 'fill-butter text-butter' : 'text-parchment'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function ReviewsPreview() {
  const ref = useReveal()
  const hasReviews = reviews.length > 0

  return (
    <section
      ref={ref}
      aria-labelledby="reviews-preview"
      className="py-20 md:py-28 bg-parchment-light/50 texture-parchment"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <SectionHeading
            eyebrow="Customer Voices"
            title="Stories from the ritual"
            titleAs="h2"
            id="reviews-preview"
          />
          <Link
            to="/reviews"
            className="font-body text-[0.72rem] uppercase tracking-[0.18em] text-deep-brown-soft hover:text-rosewood transition-colors border-b border-parchment hover:border-rosewood pb-1 self-start md:self-end"
          >
            All reviews →
          </Link>
        </div>

        {!hasReviews ? (
          <div
            className="mt-12 reveal bg-ivory border border-parchment/70 px-8 py-14 md:px-14 md:py-18 text-center max-w-3xl mx-auto"
            style={{ '--reveal-delay': '80ms' }}
          >
            <p className="font-heading italic text-[clamp(1.4rem,3vw,2rem)] text-deep-brown text-balance">
              “{placeholderReviewMessage}”
            </p>
            <p className="font-body text-sm text-deep-brown-soft mt-5 max-w-md mx-auto leading-relaxed">
              Verified purchasers can share ratings and notes after their order arrives.
              Until then, we are building something worth writing home about.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <ButtonLink to="/product" variant="solid" size="sm">
                Shop the Oil
              </ButtonLink>
              <ButtonLink to="/reviews" variant="outline" size="sm">
                Reviews Page
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
            {reviews.slice(0, 3).map((r) => (
              <figure key={r.id} className="bg-ivory border border-parchment/60 px-6 py-7 flex flex-col gap-4">
                <Stars count={r.rating} />
                <blockquote className="font-body text-sm text-deep-brown-soft leading-relaxed flex-1">
                  {r.text}
                </blockquote>
                <figcaption className="font-heading italic text-sm text-deep-brown">
                  — {r.author}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
