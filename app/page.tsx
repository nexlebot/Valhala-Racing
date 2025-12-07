import HeroSection from "./_components/heroBanner"
import ImageSlider from "./_components/homePageSpecificSections/imageSlider"
import OwnerShipAndSyndication from "./_components/homePageSpecificSections/ownerShipAndSyndication"
import RecentResultSection from "./_components/homePageSpecificSections/recentResultSection"
import Testimonials from "./_components/homePageSpecificSections/testimonials"
import Navbar from "./_components/navbar"


const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection title="Own, Race, Win The Vahala Racing Way" description="Join a professional stable delivering high-performance horses, expert care, and exceptional ownership opportunities in every race." backgroundImage="/heroImage.png" />
      {/* <UpComingRaceListView /> */}
      <RecentResultSection />
      <ImageSlider />
      <OwnerShipAndSyndication />
      <Testimonials />
    </>
  )
}

export default page