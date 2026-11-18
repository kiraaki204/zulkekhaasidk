import { useConstellationChoice } from '../../../hooks/useConstellationChoice'
import OrbitRing from './OrbitRing'
import StarChart from './StarChart'

export default function Constellation({ activeId, onSelect, force }) {
  const [choice] = useConstellationChoice()
  const id = force ?? choice

  if (id === 'chart') {
    return <StarChart activeId={activeId} onSelect={onSelect} />
  }
  return <OrbitRing activeId={activeId} onSelect={onSelect} />
}

export { OrbitRing, StarChart }
