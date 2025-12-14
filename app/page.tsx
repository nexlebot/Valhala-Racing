import HeroSection from "./_components/HeroSection"
import ImageSlider from "./_components/homePageSpecificSections/imageSlider"
import OwnerShipAndSyndication from "./_components/homePageSpecificSections/ownerShipAndSyndication"
import RecentResultSection from "./_components/homePageSpecificSections/recentResultSection"
import Testimonials from "./_components/homePageSpecificSections/testimonials"
import UpComingRaceListView from "./_components/homePageSpecificSections/upComingRaceListView"
import Navbar from "./_components/navbar"
import OurFacility from "./_components/OurFacility"
import UpcomingRacesMobile from "./_components/UpcomingRacesMobile"
import { Trophy, Users } from 'lucide-react';

const racingData = [
  {
    "name": "Thunder Blaze",
    "race": "Race #12",
    "location": "Melbourne Racecourse, Australia",
    "date": "October 18, 2025"
  },
  {
    "name": "Golden Stride",
    "race": "Race #7",
    "location": "Sydney Park Arena, Australia",
    "date": "October 20, 2025"
  },
  {
    "name": "Midnight Charger",
    "race": "Race #3",
    "location": "Adelaide Downs, Australia",
    "date": "October 28, 2025"
  },
  {
    "name": "Silver Arrow",
    "race": "Race #9",
    "location": "Brisbane Grand Track, Australia",
    "date": "November 2, 2025"
  }
]

const page = () => {
  return (
    <div className="">
      <Navbar />
      <HeroSection title="Own, Race, Win The Vahala Racing Way" description="Join a professional stable delivering high-performance horses, expert care, and exceptional ownership opportunities in every race." backgroundImage="/heroImage.png" buttons={[
        {
          text: "View Ownership Opportunities",
          href: "/ownership",
          icon: <Trophy className="w-5 h-5" />,
          variant: "primary",
        },
        {
          text: "Upcoming Races",
          href: "/upcoming-races",
          icon: <Users className="w-5 h-5" />,
          variant: "secondary",
        }
      ]} />
      <OwnerShipAndSyndication />
      <ImageSlider />
      <div className="mx-6 lg:mx-12">
        <div className="hidden lg:block">
          <UpComingRaceListView />
        </div>
        <div className="block mb-8 lg:mb-0 my-6 lg:hidden "><UpcomingRacesMobile items={racingData} /></div>
      </div>
      <div className="my-3 lg:my-0">
        <RecentResultSection />
      </div>
      <OurFacility />
      <Testimonials />
    </div>
  )
}

export default page