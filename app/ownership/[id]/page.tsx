import ContactForm from '@/app/_components/ContactForm'
import { InfoShowCase } from '@/app/_components/InfoShowCase'
import Navbar from '@/app/_components/navbar'
import PageIntro from '@/app/_components/PageIntro'
import Slider from '@/app/_components/Slider'
import VideoPlayer from '@/app/_components/VideoPlayer'

// Example usage with structured data
const exampleData = {
  name: "SAVABEEL X LET IT ROCK Filly",
  age: "", // Not clearly visible in image
  breed: "", // Not visible in image
  purchasePrice: "$280,000.00",
  location: {
    lot: "268",
    venue: "Melbourne Inglis Premier Yearling Sale"
  },
  saleYear: "2025",

  pedigree: {
    title: "", // Section exists but title not visible
    description: "There is no other way to describe Savabeel than superstar! The W.S Cox Plate hero is the mighty Zabeel's best sire son; earning multiple Championship titles with his 149 stakes winners and 35 Gr.1 winners. And what a influence Danehill's dual Gr.1 winning son Fastnet Rock is. Australia's current leading broodmare sire, his daughters have done a superlative job producing 144 stakes winners, 16 of whom have been successful at the elite level."
  },

  familyOfChampions: {
    title: "", // Section exists but title not clearly visible
    description: "Fourteen of Savabeel's 17 runners out of Fastnet Rock mares are winners with three of those being stakes winners and another five metropolitan winners.",
    relatives: [
      {
        relation: "This filly has family on her side too, her dam being a half-sister to the Gr.1 fillies",
        details: "Absolutely (AJC Oaks) and Abbey Marie (Australasian Oaks) and to the Gr.3 Geelong Cup winner Runaway"
      },
      {
        relation: "as well as to the dam of the Gr.2 winners",
        details: "Mount Pleasant and Quantum Mechanic"
      }
    ],
    note: "Let It Rock's two-year-old Let It Beel is showing nice potential; close up at his first two starts for the Peter Moody & Katherine Coleman stable."
  },

  presenceAndPotential: {
    title: "", // Not visible
    physical: "This Filly had the walk and looks to match here supreme pedigree and we were simply not leaving the sale without her!",
    temperament: "" // Not visible in image
  },

  investmentOpportunity: {
    title: "", // Not visible
    description: "" // Not visible
  },

  expressionOfInterest: {
    title: "Expression Of Interest:",
    question: "", // Not visible
    callToAction: "Click the link below to get in contact and more information on how you can get involved with this young Colt."
  }
};

const page = () => {
  return (
    <div className='mx-6 lg:mx-12'>
      <Navbar hasBackgroundImage={false} />
      <PageIntro mainHeading="Ownership" intro='At Vahala Racing, ownership is more than a title — it’s an invitation to become part of a legacy built on passion, precision, and purpose. Every experience brings you closer to the heart of the sport, from early-morning training sessions to thrilling race-day victories. With Vahala, you step into a world where dedication, teamwork, and the pursuit of excellence define every stride.' />
      <Slider images={[]} />
      <InfoShowCase data={exampleData} />
      <div className='flex justify-center'>
        <VideoPlayer url="https://www.youtube.com/embed/dQw4w9WgXcQ" />
      </div>
      <div className='py-6 lg:py-14'>
        <ContactForm />
      </div>
    </div>
  )
}

export default page