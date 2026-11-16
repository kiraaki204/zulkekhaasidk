import { useEffect, useRef, useSyncExternalStore } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Trap Tab focus inside `containerRef` while active, focus `initialFocusRef`
 * (or the first focusable) on open, and restore focus on close.
 * Escape calls `onEscape` when provided.
 */
export function useFocusTrap(containerRef, { active = true, initialFocusRef, onEscape } = {}) {
  const escapeRef = useRef(onEscape)
  useEffect(() => {
    escapeRef.current = onEscape
  }, [onEscape])

  useEffect(() => {
    if (!active) return undefined
    const container = containerRef.current
    if (!container) return undefined

    const prev = document.activeElement

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )

    const target = initialFocusRef?.current ?? getFocusable()[0] ?? container
    // Defer so entrance animation / paint doesn't fight focus
    const raf = requestAnimationFrame(() => target.focus({ preventScroll: true }))

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        escapeRef.current?.()
        return
      }
      if (e.key !== 'Tab') return
      const nodes = getFocusable()
      if (!nodes.length) {
        e.preventDefault()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const current = document.activeElement
      if (e.shiftKey && (current === first || !container.contains(current))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (current === last || !container.contains(current))) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown, true)
      if (prev instanceof HTMLElement && document.contains(prev)) {
        prev.focus({ preventScroll: true })
      }
    }
  }, [active, containerRef, initialFocusRef])
}

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
