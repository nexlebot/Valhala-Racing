import ContactForm from '@/app/_components/ContactForm'
import { InfoShowCase } from '@/app/_components/InfoShowCase'
import Navbar from '@/app/_components/navbar'
import PageIntro from '@/app/_components/PageIntro'
import Slider from '@/app/_components/Slider'
import VideoPlayer from '@/app/_components/VideoPlayer'

// Example usage with structured data
const exampleData = {
    name: "SAVABEEL X LET IT ROC",
    age: "2 Years Old Boy Filly",
    breed: "Premium Thoroughbred",
    purchasePrice: "$280,000",
    location: {
        lot: "288",
        venue: "Melbourne Inglis Premier Yearling Sale"
    },
    saleYear: "2025",
    pedigree: {
        title: "Elite Pedigree, Proven Performance",
        description: "This filly is a rare gem, combining the influence of two of the Southern Hemisphere's most influential bloodlines. Her sire, Savabeel, is a Cox Plate-winning champion and the crown jewel of Zabeel's legacy. With 145 stakes winners and 30 Group I champions, Savabeel continues to dominate the breeding scene. Her dam, Let It Rock, brings the power of Fastnet Rock, Australia's leading broodmare sire. His daughters have produced 64 stakes winners, including 16 Group I victors, making this filly a genetic powerhouse."
    },
    familyOfChampions: {
        title: "Family of Champion",
        description: "This filly's maternal line is stacked with black-type success:",
        relatives: [
            {
                relation: "Half-sister to Absolutely",
                details: "(AJC Oaks, Gr.1)"
            },
            {
                relation: "Half-sister to Abbey Marie",
                details: "(Australasian Oaks, Gr.1)"
            },
            {
                relation: "Related to Rumaasy",
                details: "(Geelong Cup, Gr.3)"
            },
            {
                relation: "Close kin to the dam of Mood Swings",
                details: "(Quantum Mechanic (Gr.2 winners))"
            }
        ],
        note: "Her younger sibling, Let It Reel, is already showing promise under the guidance of Peter Moody & Katherine Coleman, placing well in his early starts."
    },
    presenceAndPotential: {
        title: "Presence, Poise, and Potential",
        physical: "From the moment she stepped into the ring, this filly commanded attention. Her athletic walk, balanced conformation, and calm demeanor made her an irresistible prospect. She's not just bred to win—she looks the part too.",
        temperament: "Her temperament is ideal for training, showing early signs of responsiveness and focus. With her pedigree and physicality, she's expected to excel in both sprint and middle-distance races."
    },
    investmentOpportunity: {
        title: "Investment Opportunity",
        description: "This filly represents a rare chance to be part of a premium racing journey. Whether you're a seasoned owner or a first-time investor, her profile offers both racing excitement and long-term broodmare value."
    },
    expressionOfInterest: {
        title: "Expression of Interest",
        question: "Want to be part of her story?",
        callToAction: "Click the link below to connect with our team and learn how you can get involved."
    }
};

const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading="Ownership" intro='At Vahala Racing, ownership is more than a title — it’s an invitation to become part of a legacy built on passion, precision, and purpose. Every experience brings you closer to the heart of the sport, from early-morning training sessions to thrilling race-day victories. With Vahala, you step into a world where dedication, teamwork, and the pursuit of excellence define every stride.' />
            <Slider />
            <InfoShowCase data={exampleData} />
            <VideoPlayer url="https://www.youtube.com/embed/dQw4w9WgXcQ" />
            <div className='py-6 lg:py-14'>
                <ContactForm />
            </div>
        </div>
    )
}

export default page