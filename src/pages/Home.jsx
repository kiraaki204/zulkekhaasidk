import Hero from '../components/home/Hero'
import BrandIntro from '../components/home/BrandIntro'
import ProductSpotlight from '../components/home/ProductSpotlight'
import HerbFeature from '../components/home/HerbFeature'
import Philosophy from '../components/home/Philosophy'
import ReviewsPreview from '../components/home/ReviewsPreview'
import { useReveal } from '../hooks/useUi'

export default function Home() {
  const ref = useReveal()

  return (
    <div ref={ref}>
      <Hero />
      <BrandIntro />
      <ProductSpotlight />
      <HerbFeature />
      <Philosophy />
      <ReviewsPreview />
    </div>
  )
}
