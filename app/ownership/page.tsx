import Navbar from '../_components/navbar'
import { HorseCard } from '../_components/HorsesCard'
import PageIntro from '../_components/PageIntro'
import Link from 'next/link'

const page = () => {
    const horses = [
        {
            id: 1,
            name: "SAVABEEL X LET IT ROCK",
            age: "2 Years Old Bay Colt",
            breed: "Premium Thoroughbred",
            sharePrice: "$9,850",
            sharePercentage: "2.5%",
            image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            description: "Sired by champion Savabeel out of Let It Rock, this bay colt shows exceptional early speed and stride mechanics. With a strong shoulder angle and powerful hindquarters, he demonstrates the classic Savabeel acceleration. His dam's stamina lineage suggests versatility across distances. Early training shows quick gate work and natural balance through turns."
        },
        {
            id: 2,
            name: "NOT A SINGLE DOUBT X STORM QUEEN",
            age: "3 Years Old Chestnut Mare",
            breed: "Premium Thoroughbred",
            sharePrice: "$12,500",
            sharePercentage: "3%",
            image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800&q=80",
            description: "By champion sire Not A Single Doubt from Storm Queen bloodline. Proven track record with 3 wins from 8 starts including a Group 3 placing. Excels in 1200-1400m sprints with sectional times consistently under 11 seconds per furlong. Strong under wet track conditions with excellent recovery rates between races."
        },
        {
            id: 1,
            name: "SAVABEEL X LET IT ROCK",
            age: "2 Years Old Bay Colt",
            breed: "Premium Thoroughbred",
            sharePrice: "$9,850",
            sharePercentage: "2.5%",
            image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            description: "Sired by champion Savabeel out of Let It Rock, this bay colt shows exceptional early speed and stride mechanics. With a strong shoulder angle and powerful hindquarters, he demonstrates the classic Savabeel acceleration. His dam's stamina lineage suggests versatility across distances. Early training shows quick gate work and natural balance through turns."
        },
        {
            id: 2,
            name: "NOT A SINGLE DOUBT X STORM QUEEN",
            age: "3 Years Old Chestnut Mare",
            breed: "Premium Thoroughbred",
            sharePrice: "$12,500",
            sharePercentage: "3%",
            image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800&q=80",
            description: "By champion sire Not A Single Doubt from Storm Queen bloodline. Proven track record with 3 wins from 8 starts including a Group 3 placing. Excels in 1200-1400m sprints with sectional times consistently under 11 seconds per furlong. Strong under wet track conditions with excellent recovery rates between races."
        }, {
            id: 1,
            name: "SAVABEEL X LET IT ROCK",
            age: "2 Years Old Bay Colt",
            breed: "Premium Thoroughbred",
            sharePrice: "$9,850",
            sharePercentage: "2.5%",
            image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            description: "Sired by champion Savabeel out of Let It Rock, this bay colt shows exceptional early speed and stride mechanics. With a strong shoulder angle and powerful hindquarters, he demonstrates the classic Savabeel acceleration. His dam's stamina lineage suggests versatility across distances. Early training shows quick gate work and natural balance through turns."
        },
        {
            id: 2,
            name: "NOT A SINGLE DOUBT X STORM QUEEN",
            age: "3 Years Old Chestnut Mare",
            breed: "Premium Thoroughbred",
            sharePrice: "$12,500",
            sharePercentage: "3%",
            image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800&q=80",
            description: "By champion sire Not A Single Doubt from Storm Queen bloodline. Proven track record with 3 wins from 8 starts including a Group 3 placing. Excels in 1200-1400m sprints with sectional times consistently under 11 seconds per furlong. Strong under wet track conditions with excellent recovery rates between races."
        }, {
            id: 1,
            name: "SAVABEEL X LET IT ROCK",
            age: "2 Years Old Bay Colt",
            breed: "Premium Thoroughbred",
            sharePrice: "$9,850",
            sharePercentage: "2.5%",
            image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            description: "Sired by champion Savabeel out of Let It Rock, this bay colt shows exceptional early speed and stride mechanics. With a strong shoulder angle and powerful hindquarters, he demonstrates the classic Savabeel acceleration. His dam's stamina lineage suggests versatility across distances. Early training shows quick gate work and natural balance through turns."
        },
        {
            id: 2,
            name: "NOT A SINGLE DOUBT X STORM QUEEN",
            age: "3 Years Old Chestnut Mare",
            breed: "Premium Thoroughbred",
            sharePrice: "$12,500",
            sharePercentage: "3%",
            image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800&q=80",
            description: "By champion sire Not A Single Doubt from Storm Queen bloodline. Proven track record with 3 wins from 8 starts including a Group 3 placing. Excels in 1200-1400m sprints with sectional times consistently under 11 seconds per furlong. Strong under wet track conditions with excellent recovery rates between races."
        }, {
            id: 1,
            name: "SAVABEEL X LET IT ROCK",
            age: "2 Years Old Bay Colt",
            breed: "Premium Thoroughbred",
            sharePrice: "$9,850",
            sharePercentage: "2.5%",
            image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            description: "Sired by champion Savabeel out of Let It Rock, this bay colt shows exceptional early speed and stride mechanics. With a strong shoulder angle and powerful hindquarters, he demonstrates the classic Savabeel acceleration. His dam's stamina lineage suggests versatility across distances. Early training shows quick gate work and natural balance through turns."
        },
        {
            id: 2,
            name: "NOT A SINGLE DOUBT X STORM QUEEN",
            age: "3 Years Old Chestnut Mare",
            breed: "Premium Thoroughbred",
            sharePrice: "$12,500",
            sharePercentage: "3%",
            image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800&q=80",
            description: "By champion sire Not A Single Doubt from Storm Queen bloodline. Proven track record with 3 wins from 8 starts including a Group 3 placing. Excels in 1200-1400m sprints with sectional times consistently under 11 seconds per furlong. Strong under wet track conditions with excellent recovery rates between races."
        },
    ];

    return (
        <div className='mx-6 lg:mx-12'>
            <div>
                <Navbar hasBackgroundImage={false} />
            </div>
            <PageIntro
                mainHeading="Ownership"
                intro="At Vahala Racing, ownership is more than a title — it’s an invitation to become part of a legacy built on passion, precision, and purpose. Every experience brings you closer to the heart of the sport, from early-morning training sessions to thrilling race-day victories. With Vahala, you step into a world where dedication, teamwork, and the pursuit of excellence define every stride."
                blocks={[
                    {
                        heading: "Your Path Into the Vahala Experience",
                        subHeading: "Feel the pride, excitement, and fulfillment that come with owning a racehorse.",
                        paragraphs: [
                            "At Vahala Racing, we believe every owner should feel deeply connected — to the horses, the team, and the journey that shapes each athlete. Our ownership opportunities offer a fully immersive experience, giving you an inside look at the training, development, and care that turn young prospects into champions.",
                            "Through exclusive access, personalized updates, behind-the-scenes moments, and premium race-day hospitality, we ensure your ownership experience is both meaningful and unforgettable. You’ll witness the discipline, strategy, and passion that fuel our stable and strengthen the bond between horse, rider, and team.",
                            "With Vahala Racing, you’re not just investing in a horse — you’re becoming part of a community where excellence is the standard and every victory is shared."
                        ]
                    },
                    {
                        heading: "Step Into the Winner’s Circle",
                        subHeading: "Feel the pride, excitement, and fulfillment that come with owning a racehorse.",
                        paragraphs: [
                            "Join us and experience a partnership built on trust, transparency, and a shared love for the sport. At Vahala Racing, every stride reflects the commitment of the people who believe in our horses — owners who stand with us on the path to greatness."
                        ]
                    }
                ]}
            />

            <div className='flex flex-col gap-6 lg:gap-14 my-6 lg:mb-14'>
                {horses.map((horse) => (<Link href={`/ownership/${horse.id}`} key={horse.id}>
                    <HorseCard key={horse.id} {...horse} />
                </Link>
                ))}
            </div>
        </div>
    )
}

export default page