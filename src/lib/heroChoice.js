const STORAGE_KEY = 'zk-hero-direction'
const VALID = ['still-life', 'atmosphere']

const listeners = new Set()

function fromUrl() {
  if (typeof window === 'undefined') return null
  const value = new URLSearchParams(window.location.search).get('hero')
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

export function resolveHeroChoice() {
  return fromUrl() ?? fromStorage() ?? 'still-life'
}

export function setHeroChoice(id) {
  if (!VALID.includes(id)) return
  try {
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* storage unavailable — the URL param still carries the choice */
  }
  const url = new URL(window.location.href)
  url.searchParams.set('hero', id)
  window.history.replaceState({}, '', url)
  listeners.forEach((fn) => fn(id))
}

export function subscribeHeroChoice(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const heroDirections = [
  {
    id: 'still-life',
    letter: 'A',
    label: 'Product still life',
    hint: 'The real bottle photographed on cream cloth — the default',
  },
  {
    id: 'atmosphere',
    letter: 'B',
    label: 'Botanical atmosphere',
    hint: 'CC0 dried-flower flat lay behind an ink scrim — mood over product',
  },
]
