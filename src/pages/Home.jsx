import Hero from '../components/home/Hero'
import BrandIntro from '../components/home/BrandIntro'
import ProductSpotlight from '../components/home/ProductSpotlight'
import HerbFeature from '../components/home/HerbFeature'
import Ritual from '../components/home/Ritual'
import Philosophy from '../components/home/Philosophy'
import ReviewsPreview from '../components/home/ReviewsPreview'
import ContactSection from '../components/home/ContactSection'
import { useReveal } from '../hooks/useUi'

export default function Home() {
  const ref = useReveal()

  return (
    <div ref={ref}>
      <Hero />
      <BrandIntro />
      <ProductSpotlight />
      <HerbFeature />
      <Ritual />
      <Philosophy />
      <ReviewsPreview />
      <ContactSection />
    </div>
  )
}
