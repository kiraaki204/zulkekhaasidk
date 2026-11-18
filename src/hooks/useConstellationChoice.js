import { useEffect, useState } from 'react'
import {
  resolveConstellationChoice,
  setConstellationChoice,
  subscribeConstellationChoice,
} from '../lib/constellationChoice'

export function useConstellationChoice() {
  const [choice, setChoice] = useState(resolveConstellationChoice)

  useEffect(() => subscribeConstellationChoice(setChoice), [])

  return [choice, setConstellationChoice]
}
