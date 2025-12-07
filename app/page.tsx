import HeroSection from "./_components/heroBanner"
import HeroBanner from "./_components/heroBanner"
import ImageSlider from "./_components/homePageSpecificSections/imageSlider"
import OwnerShipAndSyndication from "./_components/homePageSpecificSections/ownerShipAndSyndication"
import RecentResultSection from "./_components/homePageSpecificSections/recentResultSection"
import Testimonials from "./_components/homePageSpecificSections/testimonials"
import UpComingRaceListView from "./_components/homePageSpecificSections/upComingRaceListView"
import LeftRightBlog from "./_components/leftRightBlog"


const blogPosts = [
  {
    id: 1,
    excerpt:
      "Discover the key strategies our trainers use to ensure every thoroughbred is in peak condition before a major race.",
    image:
      "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=600&h=400&fit=crop",
    slug: ''
  },
  {
    id: 2,
    excerpt:
      "Learn how proper nutrition plays a crucial role in developing strength, stamina, and overall health in racing horses.",
    image:
      "https://images.unsplash.com/photo-1588864721034-4afdb05a5799?w=600&h=400&fit=crop",
    slug: ''

  },
  {
    id: 3,
    excerpt:
      "Get to know the remarkable journey of Thunder Strike, from a young colt to a winning thoroughbred at Vahala Racing.",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop",
    slug: ''
  },
];

const page = () => {
  return (
    <>
      <HeroSection title="Own, Race, Win The Vahala Racing Way" description="Join a professional stable delivering high-performance horses, expert care, and exceptional ownership opportunities in every race." backgroundImage="/heroImage.png" />
      <UpComingRaceListView />
      <RecentResultSection />
      <ImageSlider />
      <OwnerShipAndSyndication />
      <Testimonials />
    </>
  )
}

export default page