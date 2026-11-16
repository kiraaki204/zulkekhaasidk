import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, MessageSquare, Star } from 'lucide-react'
import { placeholderReviewMessage } from '../data/reviews'
import { api } from '../lib/api'
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
  { id: 'all', label: 'All reviews', params: '' },
  { id: 'recent', label: 'Most recent', params: 'sort=recent' },
  { id: 'photos', label: 'With photos', params: 'photos=true' },
  { id: 'rating', label: 'Highest rated', params: 'sort=rating' },
]

function SubmitForm({ onDone }) {
  const [values, setValues] = useState({
    orderReference: '',
    email: '',
    authorName: '',
    rating: 5,
    body: '',
    photoUrl: '',
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setOk('')
    setBusy(true)
    try {
      const { review } = await api.post('/reviews', {
        orderReference: values.orderReference.trim(),
        email: values.email.trim(),
        authorName: values.authorName.trim(),
        rating: Number(values.rating),
        body: values.body.trim(),
        photoUrl: values.photoUrl.trim() || undefined,
      })
      setOk(review.message)
      onDone?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const inputCls =
    'bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown placeholder:text-parchment focus:border-rosewood focus:outline-none transition-colors w-full'

  return (
    <form onSubmit={submit} className="bg-cream border border-parchment/70 px-6 py-7 md:px-9 flex flex-col gap-4">
      <p className="eyebrow">Submit a review</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Order reference</span>
          <input required value={values.orderReference} onChange={set('orderReference')} placeholder="ZK-XXXXXXXX" className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Checkout email</span>
          <input required type="email" value={values.email} onChange={set('email')} placeholder="you@example.com" className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Display name</span>
          <input required value={values.authorName} onChange={set('authorName')} placeholder="Your name" className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Rating</span>
          <select value={values.rating} onChange={set('rating')} className={inputCls}>
            <option value={5}>5 — Exceptional</option>
            <option value={4}>4 — Very good</option>
            <option value={3}>3 — Good</option>
            <option value={2}>2 — Fair</option>
            <option value={1}>1 — Poor</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Your review</span>
        <textarea
          required
          rows={4}
          minLength={10}
          value={values.body}
          onChange={set('body')}
          placeholder="What did you notice about the oil and your ritual?"
          className={`${inputCls} resize-y min-h-[110px]`}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Photo URL (optional)</span>
        <input value={values.photoUrl} onChange={set('photoUrl')} placeholder="https://…" className={inputCls} />
      </label>

      {error && (
        <p className="font-body text-sm text-rosewood bg-rosewood-soft/15 border border-rosewood-soft/40 px-4 py-2.5" role="alert">
          {error}
        </p>
      )}
      {ok && (
        <p className="font-body text-sm text-botanical-deep bg-botanical/10 border border-botanical/30 px-4 py-2.5" role="status">
          {ok}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="solid" size="md" disabled={busy}>
          {busy ? 'Submitting…' : 'Submit for moderation'}
        </Button>
        <span className="font-body text-xs text-deep-brown-soft self-center">
          Verified orders only · published after moderation
        </span>
      </div>
    </form>
  )
}

export default function Reviews() {
  const ref = useReveal()
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  // result is tagged with the query it answers, so loading derives without effect-setState
  const [result, setResult] = useState({ params: null, list: [], error: '' })

  const activeParams = useMemo(
    () => filters.find((f) => f.id === filter)?.params ?? '',
    [filter],
  )

  const load = useCallback(async () => {
    const qs = activeParams ? `?${activeParams}` : ''
    try {
      const data = await api.get(`/reviews${qs}`)
      setResult({ params: activeParams, list: data.reviews, error: '' })
    } catch (err) {
      setResult({ params: activeParams, list: [], error: err.message })
    }
  }, [activeParams])

  useEffect(() => {
    let cancelled = false
    const qs = activeParams ? `?${activeParams}` : ''
    api
      .get(`/reviews${qs}`)
      .then((data) => {
        if (!cancelled) setResult({ params: activeParams, list: data.reviews, error: '' })
      })
      .catch((err) => {
        if (!cancelled) setResult({ params: activeParams, list: [], error: err.message })
      })
    return () => {
      cancelled = true
    }
  }, [activeParams])

  const loading = result.params !== activeParams
  const list = loading ? [] : result.list
  const loadError = loading ? '' : result.error
  const hasReviews = !loading && !loadError && list.length > 0

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
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {loading && (
          <p className="font-body text-sm text-deep-brown-soft py-8" aria-live="polite">
            Gathering stories…
          </p>
        )}

        {!loading && loadError && (
          <div className="bg-cream border border-parchment/60 px-8 py-12 text-center">
            <p className="font-heading text-2xl text-deep-brown">Stories are resting.</p>
            <p className="font-body text-sm text-deep-brown-soft mt-2">{loadError}</p>
            <button
              type="button"
              onClick={load}
              className="mt-4 font-body text-[0.72rem] uppercase tracking-[0.16em] text-rosewood border-b border-rosewood/40 pb-1 hover:text-deep-brown transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !loadError && !hasReviews ? (
          <div className="reveal bg-cream border border-parchment/70 px-8 py-16 md:px-16 text-center max-w-3xl mx-auto flex flex-col items-center gap-5">
            <MessageSquare size={28} strokeWidth={1.2} className="text-botanical" aria-hidden="true" />
            <p className="font-heading italic text-[clamp(1.5rem,3.5vw,2.25rem)] text-deep-brown text-balance">
              “{placeholderReviewMessage}”
            </p>
            <p className="font-body text-sm text-deep-brown-soft max-w-md leading-relaxed">
              After your order arrives, share a rating and a note — optionally with a photograph.
              Verified purchases only, always.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Button variant="solid" size="sm" onClick={() => setShowForm((v) => !v)}>
                {showForm ? 'Hide form' : 'Write a Review'}
              </Button>
              <ButtonLink to="/product" variant="outline" size="sm">Shop the Oil</ButtonLink>
            </div>
          </div>
        ) : (
          !loading && !loadError && (
            <>
              <p className="font-body text-sm text-deep-brown-soft mb-6" aria-live="polite">
                {list.length} review{list.length === 1 ? '' : 's'}
                {filter !== 'all' && ratingLabels[filter] ? ` · ${ratingLabels[filter]}` : ''}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((r) => (
                  <li key={r.id} className="reveal bg-cream border border-parchment/60 px-6 py-7 flex flex-col gap-4">
                    <Stars value={r.rating} />
                    <blockquote className="font-body text-sm text-deep-brown-soft leading-relaxed flex-1">
                      {r.body}
                    </blockquote>
                    {r.photoUrl && (
                      <img
                        src={r.photoUrl}
                        alt=""
                        className="w-full aspect-video object-cover border border-parchment/60"
                        loading="lazy"
                      />
                    )}
                    <footer className="flex items-baseline justify-between gap-3 pt-3 border-t border-parchment/50">
                      <cite className="font-heading italic text-sm text-deep-brown not-italic">
                        {r.authorName}
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
            </>
          )
        )}

        {/* Submit */}
        <div className="reveal mt-14 bg-parchment-light/50 border border-parchment/70 px-6 py-10 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Purchased already?</p>
              <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mt-2">
                Share your story with the next reader
              </h2>
              <p className="font-body text-sm text-deep-brown-soft mt-3 leading-relaxed">
                Enter your order reference and checkout email. Your review appears after
                moderation — honest, attributed, and verified.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 items-start md:items-end">
              <Button variant="solid" size="md" onClick={() => setShowForm((v) => !v)}>
                {showForm ? 'Close form' : 'Write a Review'}
              </Button>
              <Link
                to="/contact"
                className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors"
              >
                Need help with an order?
              </Link>
            </div>
            <span className="hidden md:flex items-center gap-2 text-botanical/70" aria-hidden="true">
              <Camera size={18} strokeWidth={1.2} />
            </span>
          </div>

          {showForm && (
            <div className="mt-8">
              <SubmitForm onDone={load} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
