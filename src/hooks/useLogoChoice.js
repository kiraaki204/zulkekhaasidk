import { useEffect, useState } from 'react'
import { resolveLogoChoice, setLogoChoice, subscribeLogoChoice } from '../lib/logoChoice'

export function useLogoChoice() {
  const [choice, setChoice] = useState(resolveLogoChoice)

  useEffect(() => subscribeLogoChoice(setChoice), [])

  return [choice, setLogoChoice]
}
