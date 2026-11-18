import { useEffect, useState } from 'react'
import { resolveHeroChoice, setHeroChoice, subscribeHeroChoice } from '../lib/heroChoice'

export function useHeroChoice() {
  const [choice, setChoice] = useState(resolveHeroChoice)

  useEffect(() => subscribeHeroChoice(setChoice), [])

  return [choice, setHeroChoice]
}
