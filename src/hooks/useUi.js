import { useEffect, useRef, useSyncExternalStore } from 'react'

/**
 * Adds `is-visible` to elements with class `reveal` when they enter the viewport.
 * Class toggling only — no React state, so reduced-motion CSS still applies cleanly.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const threshold = options.threshold ?? 0.12
  const rootMargin = options.rootMargin ?? '0px 0px -40px 0px'

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined

    const targets = root.querySelectorAll('.reveal')
    if (!targets.length) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

const scrollSnapshots = new Map()

function scrollSnapshot(threshold) {
  const next = typeof window !== 'undefined' ? window.scrollY > threshold : false
  scrollSnapshots.set(threshold, next)
  return next
}

function subscribeScroll(threshold, fn) {
  const onScroll = () => {
    const next = window.scrollY > threshold
    if (scrollSnapshots.get(threshold) !== next) {
      scrollSnapshots.set(threshold, next)
      fn()
    }
  }
  scrollSnapshots.set(threshold, window.scrollY > threshold)
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24) {
  return useSyncExternalStore(
    (fn) => subscribeScroll(threshold, fn),
    () => scrollSnapshot(threshold),
    () => false,
  )
}

/** True when viewport matches the media query. */
export function useMediaQuery(query) {
  const subscribe = (fn) => {
    const mql = window.matchMedia(query)
    const onChange = () => fn()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
