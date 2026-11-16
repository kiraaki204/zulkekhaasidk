import { useEffect, useState } from 'react'

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

export default function SpreadBook({ herbs, index, anim, renderSpread, boardClass = '', surfaceClass = '' }) {
  const turned = useTurned(anim)

  const from = anim ? herbs[anim.from] : null
  const to = anim ? herbs[anim.to] : null

  let spreadLeft
  let spreadRight
  let leafFront
  let leafBack
  let leafDir = null

  if (!anim) {
    const s = renderSpread(herbs[index])
    spreadLeft = s.left
    spreadRight = s.right
  } else if (anim.dir === 'next') {
    const sFrom = renderSpread(from)
    const sTo = renderSpread(to)
    spreadLeft = sFrom.left
    spreadRight = sTo.right
    leafFront = sFrom.right
    leafBack = sTo.left
    leafDir = 'next'
  } else {
    const sFrom = renderSpread(from)
    const sTo = renderSpread(to)
    spreadLeft = sTo.left
    spreadRight = sFrom.right
    leafFront = sFrom.left
    leafBack = sTo.right
    leafDir = 'prev'
  }

  return (
    <div className={`book-shadow rounded-sm ${boardClass}`}>
      <div
        className={`book-perspective relative grid grid-cols-2 overflow-hidden rounded-[2px] ${surfaceClass}`}
      >
        <div className="relative overflow-hidden gutter-left">{spreadLeft}</div>
        <div className="relative overflow-hidden gutter-right">{spreadRight}</div>

        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-12 -translate-x-1/2"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to right, rgba(46,37,30,0) 0%, rgba(46,37,30,0.14) 46%, rgba(46,37,30,0.26) 50%, rgba(46,37,30,0.14) 54%, rgba(46,37,30,0) 100%)',
          }}
        />

        {anim && (
          <div className={`leaf leaf--${leafDir} ${turned ? 'is-turned' : ''}`}>
            <div className="leaf-face">{leafFront}</div>
            <div className="leaf-face leaf-face--back">{leafBack}</div>
            <div className="leaf-shade" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}
