import { useEffect, useRef, useState } from 'react'

function useTurned(anim) {
  const [turnedFor, setTurnedFor] = useState(null)

  useEffect(() => {
    if (!anim) return undefined
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setTurnedFor(anim))
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [anim])

  return Boolean(anim) && turnedFor === anim
}

export default function PadBook({
  herbs,
  index,
  anim,
  renderPage,
  renderBack,
  boardClass = '',
  onSwipeUp,
  onSwipeDown,
}) {
  const turned = useTurned(anim)
  const touchStart = useRef(null)

  const from = anim ? herbs[anim.from] : null
  const to = anim ? herbs[anim.to] : null

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStart.current == null) return
    const delta = e.changedTouches[0].clientY - touchStart.current
    touchStart.current = null
    if (delta < -56) onSwipeUp?.()
    else if (delta > 56) onSwipeDown?.()
  }

  return (
    <div
      className={boardClass}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pad-binding h-3.5 rounded-t-[3px]" aria-hidden="true" />
      <div className="pad-perspective relative book-shadow">
        {!anim && <div className="relative">{renderPage(herbs[index], { index })}</div>}

        {anim?.dir === 'next' && (
          <>
            <div className="absolute inset-0 z-0 overflow-hidden">
              {renderPage(to, { index: anim.to })}
            </div>
            <div className={`sheet sheet--next ${turned ? 'is-turned' : ''} relative z-10`}>
              <div className="sheet-face sheet-face--front">
                {renderPage(from, { index: anim.from })}
              </div>
              <div className="sheet-face sheet-face--back">{renderBack()}</div>
              <div className="sheet-shade" aria-hidden="true" />
            </div>
          </>
        )}

        {anim?.dir === 'prev' && (
          <>
            <div className="relative z-0">{renderPage(from, { index: anim.from })}</div>
            <div className={`sheet sheet--prev ${turned ? 'is-turned' : ''} absolute inset-0 z-10`}>
              <div className="sheet-face sheet-face--fill">
                {renderPage(to, { index: anim.to })}
              </div>
              <div className="sheet-face sheet-face--back">{renderBack()}</div>
              <div className="sheet-shade" aria-hidden="true" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
