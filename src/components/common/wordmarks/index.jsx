import { useLogoChoice } from '../../../hooks/useLogoChoice'
import WordmarkBodoni from './WordmarkBodoni'
import WordmarkEditorial from './WordmarkEditorial'

export function Wordmark({ className = '', size = 'nav', force }) {
  const [choice] = useLogoChoice()
  const id = force ?? choice

  if (id === 'editorial') {
    return <WordmarkEditorial className={className} size={size} />
  }
  return <WordmarkBodoni className={className} size={size} />
}

export { WordmarkBodoni, WordmarkEditorial }
export default Wordmark
