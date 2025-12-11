import React from 'react'
import HorseRacingGallery from '../_components/HorseRacingGallery'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'

const page = () => {
  return (
    <div className="mx-6 lg-mx:12">
      <Navbar hasBackgroundImage={false} />
      <PageIntro
        mainHeading="Our Gallery"
        intro="At Vahala Racing, our gallery captures the power, elegance, and spirit of the horses that define our legacy. Every image showcases the dedication, training, and heart that go into creating champions. From dynamic action shots to quiet moments of connection, our gallery reflects the soul of Vahala."
        blocks={[
          {
            heading: "A Visual Journey Through Vahala",
            subHeading: "Experience the strength, beauty, and passion behind every ride.",
            paragraphs: [
              "At Vahala Racing, each photograph tells a story — of growth, triumph, and the unbreakable bond between horse and rider. Our curated collection highlights training sessions, race day excitement, and everyday moments that define our commitment to excellence.",
              "From the intensity of race day excitement to the natural grace of our athletes. Through these images, you'll witness the discipline, care, and resilience that shape our horses every day.",
              "With every shot, we invite you to step into our world — a world where dedication meets artistry, and where every moment becomes a memory worth preserving."
            ]
          }
        ]}
      />
      <HorseRacingGallery />
    </div>
  )
}

export default page