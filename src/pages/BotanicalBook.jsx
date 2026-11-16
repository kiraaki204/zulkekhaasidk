import { Link, Navigate, useParams } from 'react-router-dom'
import { concepts, bookHerbs, DEFAULT_CONCEPT, isConcept } from '../data/book'
import BookStage from './book/BookStage'
import vintageConcept from './book/VintageConcept'
import editorialConcept from './book/EditorialConcept'
import hybridConcept from './book/HybridConcept'
import { BotanicalSprig } from '../components/common/BrandMarks'
import './book/book.css'

const conceptMap = {
  vintage: vintageConcept,
  editorial: editorialConcept,
  hybrid: hybridConcept,
}

export default function BotanicalBook() {
  const { concept: param } = useParams()

  if (param && !isConcept(param)) {
    return <Navigate to={`/botanical-book/${DEFAULT_CONCEPT}`} replace />
  }

  const conceptId = param ?? DEFAULT_CONCEPT
  const concept = conceptMap[conceptId]

  return (
    <div className="bg-ivory texture-parchment min-h-screen">
      <header className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-2">
        <p className="eyebrow">Prototype · Phase One</p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-heading text-[clamp(2.4rem,5vw,3.7rem)] leading-[1.04] text-deep-brown text-balance">
              The Zulfe Khaas <span className="italic">Botanical Book</span>
            </h1>
            <p className="mt-4 font-body text-deep-brown-soft leading-relaxed">
              One book for all twenty-seven herbs — a single reading experience in place of the
              separate Garden and Journal. Three design directions, each carrying the same three
              sample herbs, so the pages can be compared honestly before a direction is chosen.
            </p>
          </div>
          <BotanicalSprig className="w-28 h-auto text-botanical/70 hidden sm:block" />
        </div>

        <nav aria-label="Book concepts" className="mt-7 border-t border-parchment/70 pt-5">
          <p className="book-label">Choose a concept</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-2.5">
            {concepts.map((c) => {
              const active = c.id === conceptId
              return (
                <Link
                  key={c.id}
                  to={`/botanical-book/${c.id}`}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex w-full items-center gap-3 rounded-sm border px-4 py-3 text-left transition-colors duration-300 sm:w-auto sm:flex-1',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosewood',
                    active
                      ? 'border-deep-brown bg-cream shadow-[0_2px_0_rgba(46,37,30,0.08)]'
                      : 'border-parchment bg-cream/50 hover:border-botanical-deep hover:bg-cream',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-heading text-lg',
                      active ? 'border-deep-brown bg-deep-brown text-ivory' : 'border-parchment text-deep-brown-soft',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {c.letter}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-body text-[0.78rem] font-semibold text-deep-brown">{c.label}</span>
                    <span className="block font-body text-[0.7rem] text-deep-brown-soft">{c.hint}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 page-enter">
        <BookStage concept={concept} herbs={bookHerbs} />
      </main>

      <footer className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="border-t border-parchment/70 pt-5 flex flex-wrap gap-x-10 gap-y-2 justify-between font-body text-xs text-deep-brown-soft">
          <p>Desktop · an open book with facing pages — turn with the controls, the dots, or ← →</p>
          <p>Mobile · a top-bound flip pad — swipe up to lift a page, or use the controls</p>
          <p>Same three herbs in every concept · the remaining herbs follow once a direction is chosen</p>
        </div>
      </footer>
    </div>
  )
}
