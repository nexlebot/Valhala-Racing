import HeroSection from "./_components/HeroSection"
import ImageSlider from "./_components/homePageSpecificSections/imageSlider"
import OwnerShipAndSyndication from "./_components/homePageSpecificSections/ownerShipAndSyndication"
import RecentResultSection from "./_components/homePageSpecificSections/recentResultSection"
import UpComingRaceListView, { Column } from "./_components/homePageSpecificSections/upComingRaceListView"
import Navbar from "./_components/navbar"
import OurFacility from "./_components/OurFacility"
import UpcomingRacesMobile from "./_components/UpcomingRacesMobile"
import { getJSON } from "@/lib/storage"
import { getUpcomingRaces, getScrapedAt } from "@/lib/getTrainerRaces"

export const dynamic = 'force-dynamic'

type Syndication = { id: number; name: string; age: string; breed: string; sharePrice: string; description?: string; url: string; }

const columns: Column[] = [
  { key: "name", label: "Horse Name", grow: 1 },
  { key: "race", label: "Race Number", grow: 1 },
  { key: "location", label: "Race Position", grow: 1 },
  { key: "date", label: "Date", grow: 1, align: "left" },
];

const page = async () => {
  const [syndications, races, scrapedAt] = await Promise.all([
    getJSON('syndications', 'list').then((d: unknown) => (d as Syndication[]) ?? []),
    getUpcomingRaces(),
    getScrapedAt(),
  ]);

  const raceData = races.map(r => ({
    name: r.horse_name,
    race: `Race #${r.race_number}`,
    location: r.track,
    date: r.date,
  }));

  return (
    <div className="">
      <Navbar />
      <HeroSection title="Own, Race, Win The Vahala Racing Way" description="Join a professional stable delivering high-performance horses, expert care, and exceptional ownership opportunities in every race." backgroundImage="/heroImage.png" buttons={[
        {
          text: "View Ownership Opportunities",
          href: "/ownership",
          icon: <img src={"/horse.png"} className="w-5 h-5" />,
          variant: "primary",
        },
        {
          text: "Upcoming Races",
          href: "/upcoming-races",
          icon: <img src={"/flag.png"} className="w-5 h-5" />,
          variant: "secondary",
        }
      ]} />
      <OwnerShipAndSyndication />
      <ImageSlider syndications={syndications} />
      <div className="mx-6 lg:mx-12">
        <div className="hidden lg:block">
          <UpComingRaceListView items={raceData} header={{
            title: "Upcoming Races",
            subtitle: "Stay ahead of the action — explore the latest horse racing events happening soon across Australia.",
            updatedAt: scrapedAt ?? undefined,
            buttonText: "view all races",
            buttonLink: "/upcoming-races",
            buttonVariant: "secondary",
          }}
            columns={columns}
          />
        </div>
        <div className="block mb-8 lg:mb-0 my-6 lg:hidden"><UpcomingRacesMobile items={raceData} /></div>
      </div>
      <div className="my-3 lg:my-0">
        <RecentResultSection />
      </div>
      <OurFacility />
    </div>
  )
}

export default page
