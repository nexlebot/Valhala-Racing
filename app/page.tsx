import HeroSection from "./_components/HeroSection"
import ImageSlider from "./_components/homePageSpecificSections/imageSlider"
import OwnerShipAndSyndication from "./_components/homePageSpecificSections/ownerShipAndSyndication"
import RecentResultSection from "./_components/homePageSpecificSections/recentResultSection"
import Testimonials from "./_components/homePageSpecificSections/testimonials"
import UpComingRaceListView from "./_components/homePageSpecificSections/upComingRaceListView"
import Navbar from "./_components/navbar"
import OurFacility from "./_components/OurFacility"


const page = () => {
  return (
    <div className="">
      <Navbar />
      <HeroSection title="Own, Race, Win The Vahala Racing Way" description="Join a professional stable delivering high-performance horses, expert care, and exceptional ownership opportunities in every race." backgroundImage="/heroImage.png" />
      <div className="mx-6 lg:mx-12">
        <UpComingRaceListView />
      </div>
      <RecentResultSection />
      <ImageSlider />
      <OurFacility />
      <OwnerShipAndSyndication />
      <Testimonials />
    </div>
  )
}

export default page