const STORAGE_KEY = 'zk-logo-direction'
const VALID = ['bodoni', 'editorial']

const listeners = new Set()

function fromUrl() {
  if (typeof window === 'undefined') return null
  const value = new URLSearchParams(window.location.search).get('logo')
  return VALID.includes(value) ? value : null
}

function fromStorage() {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return VALID.includes(value) ? value : null
  } catch {
    return null
  }
}

export function resolveLogoChoice() {
  return fromUrl() ?? fromStorage() ?? 'bodoni'
}

export function setLogoChoice(id) {
  if (!VALID.includes(id)) return
  try {
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* storage unavailable — the URL param still carries the choice */
  }
  const url = new URL(window.location.href)
  url.searchParams.set('logo', id)
  window.history.replaceState({}, '', url)
  listeners.forEach((fn) => fn(id))
}

export function subscribeLogoChoice(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const logoDirections = [
  { id: 'bodoni', letter: 'A', label: 'Bodoni-inspired', hint: 'Structured didone caps, high stroke contrast' },
  { id: 'editorial', letter: 'B', label: 'Custom editorial', hint: 'Bespoke lockup, drawn swash, optical spacing' },
]
