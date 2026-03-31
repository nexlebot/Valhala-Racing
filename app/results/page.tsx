import React from 'react'
import PageIntro from '../_components/PageIntro'
import Navbar from '../_components/navbar'
import WinsCard from '../_components/WinsCard'
import UpComingRaceListView, { Column } from '../_components/homePageSpecificSections/upComingRaceListView'
import UpcomingRacesMobile from '../_components/UpcomingRacesMobile'
import { getMajorWins, getPreviousRunners, getScrapedAt } from '../../lib/getTrainerRaces'

const columns: Column[] = [
    { key: "horse_name", label: "Horse Name", grow: 1 },
    { key: "position", label: "Position", grow: 1 },
    { key: "meeting", label: "Race Meeting", grow: 1 },
    { key: "event_name", label: "Event", grow: 1 },
    { key: "date", label: "Date", grow: 1, align: "left" },
];

const page = async () => {
    const [majorWins, previousRunners, scrapedAt] = await Promise.all([getMajorWins(), getPreviousRunners(), getScrapedAt()]);

    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />

            <PageIntro
                mainHeading='Winner Result'
                intro='Honoring race champions who earned glory through power, speed, and unforgettable victories.'
                blocks={[
                    {
                        heading: 'Where Legends Cross the Finish Line',
                        subHeading: 'Honoring the champions who defined victory.',
                        paragraphs: [
                            "Step into a world where greatness is not just achieved — it is earned through fearless spirit, relentless speed, and the desire to conquer the track. Witness champions who outran the odds, mastered every stride, and turned split-seconds into unforgettable history. Explore official race stats, winning times, and extraordinary performances that shaped legendary finishes. From the thunder of hooves to the roar of the crowd, every moment reflects pride, honor, and glory. Celebrate the finest racehorses, the brilliance of skilled jockeys, and the victories that will forever stand tall in the world of horse racing."
                        ]
                    },
                ]}
            />

            <WinsCard wins={majorWins} updatedAt={scrapedAt} />

            <div className='hidden lg:block'>
                <UpComingRaceListView
                    items={previousRunners as Record<string, unknown>[]}
                    header={{
                        title: "Previous Runner Results",
                        subHeading: "Vahala Racing — Season Race Winners",
                        updatedAt: scrapedAt ?? undefined,
                    }}
                    columns={columns}
                />
            </div>
            <div className='my-6 lg:my-0 lg:hidden'>
                <UpcomingRacesMobile items={previousRunners.map(r => ({
                    name: r.horse_name,
                    race: r.meeting,
                    location: r.event_name,
                    date: r.date,
                }))} />
            </div>
        </div>
    )
}

export default page
