import { useEffect, useState } from 'react'
import { useMediaQuery } from '../../hooks/useUi'
import SpreadBook from './SpreadBook'
import PadBook from './PadBook'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

const FLIP_MS = { next: 680, prev: 600 }

export default function BookStage({ concept, herbs }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [anim, setAnim] = useState(null)

  const busy = Boolean(anim)

  const go = (dir) => {
    if (busy) return
    const target = index + dir
    if (target < 0 || target >= herbs.length) return
    if (reduced) {
      setIndex(target)
      return
    }
    setAnim({ dir: dir > 0 ? 'next' : 'prev', from: index, to: target })
  }

  useEffect(() => {
    if (!anim) return undefined
    const timer = setTimeout(() => {
      setIndex(anim.to)
      setAnim(null)
    }, FLIP_MS[anim.dir])
    return () => clearTimeout(timer)
  }, [anim])

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target
      if (
        el instanceof HTMLElement &&
        (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)
      ) {
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const current = herbs[index]

  return (
    <section aria-label="Botanical book" className="w-full">
      <p className="sr-only" aria-live="polite">
        {`Entry ${index + 1} of ${herbs.length}: ${current.name}. ${current.botanicalName}`}
      </p>

      <div className="mx-auto w-full max-w-5xl">
        {isDesktop ? (
          <SpreadBook
            herbs={herbs}
            index={index}
            anim={anim}
            renderSpread={concept.renderSpread}
            boardClass={concept.boardClass}
            surfaceClass={concept.surfaceClass}
          />
        ) : (
          <div className="mx-auto w-full max-w-md">
            <PadBook
              herbs={herbs}
              index={index}
              anim={anim}
              renderPage={concept.renderPage}
              renderBack={concept.renderBack}
              boardClass={concept.padBoardClass}
              onSwipeUp={() => go(1)}
              onSwipeDown={() => go(-1)}
            />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0 || busy}
          aria-label="Previous herb"
          className="inline-flex items-center gap-2 rounded-sm border border-parchment bg-cream px-4 py-2.5 font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown transition-colors hover:border-botanical hover:text-deep-brown-soft disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosewood"
        >
          <span aria-hidden="true">←</span> Prev
        </button>

        <div className="flex items-center gap-3" role="tablist" aria-label="Herb entries">
          {herbs.map((h, i) => (
            <button
              key={h.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to entry ${i + 1}: ${h.name}`}
              onClick={() => {
                if (busy || i === index) return
                if (reduced) {
                  setIndex(i)
                  return
                }
                setAnim({ dir: i > index ? 'next' : 'prev', from: index, to: i })
              }}
              className={[
                'h-2.5 w-2.5 rounded-full border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-rosewood',
                i === index ? 'scale-110 border-deep-brown bg-deep-brown' : 'border-parchment bg-parchment/50 hover:border-botanical-deep hover:bg-botanical/70',
              ].join(' ')}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === herbs.length - 1 || busy}
          aria-label="Next herb"
          className="inline-flex items-center gap-2 rounded-sm border border-parchment bg-cream px-4 py-2.5 font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown transition-colors hover:border-botanical hover:text-deep-brown-soft disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosewood"
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="mt-3 text-center font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">
        {`Entry ${index + 1} / ${herbs.length} · ${current.name}`}
      </p>
    </section>
  )
}
