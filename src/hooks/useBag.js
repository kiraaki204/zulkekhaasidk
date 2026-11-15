import { useContext } from 'react'
import { BagContext } from './bagContext'

export function useBag() {
  const ctx = useContext(BagContext)
  if (!ctx) throw new Error('useBag must be used within BagProvider')
  return ctx
}
