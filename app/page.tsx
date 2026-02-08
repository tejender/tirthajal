import Hero from '@/components/home/Hero'
import Intro from '@/components/home/Intro'
import FeaturedRooms from '@/components/home/FeaturedRooms'
import ExperiencesPreview from '@/components/home/ExperiencesPreview'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedRooms />
      <ExperiencesPreview />
      <CTASection />
    </>
  )
}