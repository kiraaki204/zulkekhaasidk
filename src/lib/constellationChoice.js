const STORAGE_KEY = 'zk-constellation-direction'
const VALID = ['orbit', 'chart']

const listeners = new Set()

function fromUrl() {
  if (typeof window === 'undefined') return null
  const value = new URLSearchParams(window.location.search).get('constellation')
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

export function resolveConstellationChoice() {
  return fromUrl() ?? fromStorage() ?? 'orbit'
}

export function setConstellationChoice(id) {
  if (!VALID.includes(id)) return
  try {
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* storage unavailable — the URL param still carries the choice */
  }
  const url = new URL(window.location.href)
  url.searchParams.set('constellation', id)
  window.history.replaceState({}, '', url)
  listeners.forEach((fn) => fn(id))
}

export function subscribeConstellationChoice(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const constellationDirections = [
  {
    id: 'orbit',
    letter: 'A',
    label: 'Orbit ring',
    hint: 'Names set evenly around a ring, centre mark held in the middle',
  },
  {
    id: 'chart',
    letter: 'B',
    label: 'Star chart',
    hint: 'Serpentine star field joined by a hairline figure on deep cocoa',
  },
]
