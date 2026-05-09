import React from 'react'
import PageIntro from '../_components/PageIntro'
import Navbar from '../_components/navbar'
import WinsCard from '../_components/WinsCard'
import ResultsClient from '../_components/homePageSpecificSections/ResultsClient'
import { getMajorWins, getPreviousRunners, getScrapedAt } from '../../lib/getTrainerRaces'

export const dynamic = 'force-dynamic'

const page = async () => {
    const [majorWins, previousRunners, scrapedAt] = await Promise.all([getMajorWins(), getPreviousRunners(), getScrapedAt()]);

    // Handle empty data states
    const hasData = (majorWins && majorWins.length > 0) || (previousRunners && previousRunners.length > 0);
    
    if (!hasData) {
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
                <div className="py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Race Results Available</h2>
                    <p className="text-gray-600">Check back soon for the latest race results and major wins.</p>
                    {scrapedAt && (
                        <p className="text-sm text-gray-500 mt-2">Last updated: {new Date(scrapedAt).toLocaleString()}</p>
                    )}
                </div>
            </div>
        )
    }

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

            {majorWins && majorWins.length > 0 && (
                <WinsCard wins={majorWins} updatedAt={scrapedAt} />
            )}

            {previousRunners && previousRunners.length > 0 && (
                <ResultsClient runners={previousRunners} scrapedAt={scrapedAt} />
            )}
        </div>
    )
}

export default page
