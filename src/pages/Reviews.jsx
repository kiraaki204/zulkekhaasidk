import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, MessageSquare, Star } from 'lucide-react'
import { placeholderReviewMessage, reviews } from '../data/reviews'
import { useReveal } from '../hooks/useUi'
import { BotanicalSprig } from '../components/common/BrandMarks'
import { Button } from '../components/common/Button'
import { ButtonLink } from '../components/common/Button'

const ratingLabels = { 5: '5 stars', 4: '4 stars', 3: '3 stars', 2: '2 stars', 1: '1 star' }

function Stars({ value = 0, size = 14 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.4}
          className={i < value ? 'fill-butter text-butter' : 'text-parchment'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

const filters = [
  { id: 'all', label: 'All reviews' },
  { id: 'recent', label: 'Most recent' },
  { id: 'photos', label: 'With photos' },
  { id: '5', label: '5 stars' },
  { id: '4', label: '4 stars' },
  { id: '3', label: '3 stars' },
]

export default function Reviews() {
  const ref = useReveal()
  const [filter, setFilter] = useState('all')

  const list = useMemo(() => {
    let out = [...reviews]
    if (filter === 'photos') out = out.filter((r) => r.photo)
    else if (['5', '4', '3'].includes(filter)) out = out.filter((r) => r.rating === Number(filter))
    if (filter === 'recent') out.sort((a, b) => new Date(b.date) - new Date(a.date))
    return out
  }, [filter])

  const hasReviews = reviews.length > 0

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8 md:pt-20">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">Voices</p>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] text-deep-brown mt-4 text-balance">
            Customer <span className="italic text-rosewood">Reviews</span>
          </h1>
          <BotanicalSprig className="w-28 h-auto text-botanical/70 mt-5" />
          <p className="mt-5 font-body text-deep-brown-soft leading-relaxed max-w-2xl">
            Only customers who have completed a purchase can submit a review, and every
            published review is tied to a verified order. We moderate carefully and respond in
            our own voice.
          </p>
        </div>

        {hasReviews && (
          <div className="mt-8 flex flex-wrap gap-2 reveal" role="group" aria-label="Filter reviews">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={[
                  'font-body text-[0.68rem] uppercase tracking-[0.14em] px-4 py-2 border transition-colors',
                  filter === f.id
                    ? 'bg-deep-brown text-ivory border-deep-brown'
                    : 'bg-cream text-deep-brown-soft border-parchment hover:border-rosewood hover:text-rosewood',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {!hasReviews ? (
          <div className="reveal bg-cream border border-parchment/70 px-8 py-16 md:px-16 text-center max-w-3xl mx-auto flex flex-col items-center gap-5">
            <MessageSquare size={28} strokeWidth={1.2} className="text-botanical" aria-hidden="true" />
            <p className="font-heading italic text-[clamp(1.5rem,3.5vw,2.25rem)] text-deep-brown text-balance">
              “{placeholderReviewMessage}”
            </p>
            <p className="font-body text-sm text-deep-brown-soft max-w-md leading-relaxed">
              After your order arrives, you will receive an invitation to share a rating and a
              note — optionally with a photograph. Verified purchases only, always.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <ButtonLink to="/product" variant="solid" size="sm">Shop the Oil</ButtonLink>
              <ButtonLink to="/about" variant="outline" size="sm">Our Story</ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <p className="font-body text-sm text-deep-brown-soft mb-6" aria-live="polite">
              {list.length} review{list.length === 1 ? '' : 's'}
              {filter !== 'all' && ratingLabels[filter] ? ` · ${ratingLabels[filter]}` : ''}
            </p>

            {list.length === 0 ? (
              <div className="bg-cream border border-parchment/60 px-8 py-14 text-center">
                <p className="font-heading text-2xl text-deep-brown">Nothing matches this filter.</p>
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className="mt-4 font-body text-[0.72rem] uppercase tracking-[0.16em] text-rosewood border-b border-rosewood/40 pb-1 hover:text-deep-brown transition-colors"
                >
                  Show all reviews
                </button>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((r) => (
                  <li key={r.id} className="reveal bg-cream border border-parchment/60 px-6 py-7 flex flex-col gap-4">
                    <Stars value={r.rating} />
                    <blockquote className="font-body text-sm text-deep-brown-soft leading-relaxed flex-1">
                      {r.text}
                    </blockquote>
                    {r.photo && (
                      <img
                        src={r.photo}
                        alt=""
                        className="w-full aspect-video object-cover border border-parchment/60"
                        loading="lazy"
                      />
                    )}
                    <footer className="flex items-baseline justify-between gap-3 pt-3 border-t border-parchment/50">
                      <cite className="font-heading italic text-sm text-deep-brown not-italic">
                        {r.author}
                      </cite>
                      {r.verified && (
                        <span className="font-body text-[0.6rem] uppercase tracking-[0.14em] text-botanical-deep inline-flex items-center gap-1">
                          <Star size={10} className="fill-botanical text-botanical" aria-hidden="true" />
                          Verified purchase
                        </span>
                      )}
                    </footer>
                    {r.sellerResponse && (
                      <div className="bg-ivory border-l-2 border-botanical px-4 py-3 mt-1">
                        <p className="font-body text-[0.6rem] uppercase tracking-[0.14em] text-botanical-deep mb-1">
                          From Zulfe Khaas
                        </p>
                        <p className="font-body text-sm text-deep-brown-soft leading-relaxed">
                          {r.sellerResponse}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Submit prompt — real submission unlocks with backend */}
        <div className="reveal mt-14 bg-parchment-light/50 border border-parchment/70 px-6 py-10 md:px-12 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Purchased already?</p>
            <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mt-2">
              Share your story with the next reader
            </h2>
            <p className="font-body text-sm text-deep-brown-soft mt-3 leading-relaxed">
              Reviews open for verified orders. Your rating, words, and an optional photograph
              help the brand — and everyone reading — stay honest.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Button variant="solid" size="md" disabled title="Opens once order-linked reviews go live">
              Write a Review
            </Button>
            <Link
              to="/contact"
              className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors text-center"
            >
              Need help with an order?
            </Link>
          </div>
          <span className="hidden md:flex items-center gap-2 text-botanical/70" aria-hidden="true">
            <Camera size={18} strokeWidth={1.2} />
          </span>
        </div>
      </div>
    </div>
  )
}
