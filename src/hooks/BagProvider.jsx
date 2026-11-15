import { useCallback, useEffect, useMemo, useState } from 'react'
import { product } from '../data/product'
import { BagContext } from './bagContext'

const BAG_KEY = 'zulfe-khaas-bag'

function readBag() {
  try {
    const raw = localStorage.getItem(BAG_KEY)
    return raw ? JSON.parse(raw) : { quantity: 0 }
  } catch {
    return { quantity: 0 }
  }
}

export default function BagProvider({ children }) {
  const [bag, setBag] = useState(() => readBag())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(BAG_KEY, JSON.stringify(bag))
    } catch {
      /* ignore quota / private mode */
    }
  }, [bag])

  const openBag = useCallback(() => setIsOpen(true), [])
  const closeBag = useCallback(() => setIsOpen(false), [])

  const add = useCallback((qty = 1) => {
    setBag((prev) => ({ quantity: Math.min(prev.quantity + qty, 99) }))
    setIsOpen(true)
  }, [])

  const setQuantity = useCallback((qty) => {
    setBag({ quantity: Math.max(0, Math.min(qty, 99)) })
  }, [])

  const remove = useCallback(() => setBag({ quantity: 0 }), [])
  const clear = useCallback(() => setBag({ quantity: 0 }), [])

  const subtotal = useMemo(() => bag.quantity * product.price, [bag.quantity])

  const value = useMemo(
    () => ({
      quantity: bag.quantity,
      subtotal,
      isOpen,
      openBag,
      closeBag,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [bag.quantity, subtotal, isOpen, openBag, closeBag, add, setQuantity, remove, clear],
  )

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}
