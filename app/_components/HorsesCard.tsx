import React from 'react';
import Button from './Button';

interface HorseCardProps {
    name: string;
    age: string;
    breed: string;
    sharePrice: string;
    sharePercentage: string;
    image: string;
    description: string;
}

// Horse Card Component
function HorseCard({
    name,
    age,
    breed,
    sharePrice,
    sharePercentage,
    image,
    description
}: HorseCardProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start ">
            {/* Horse Image */}
            <div className="max-w-[600px] w-full ">
                <img
                    src={image}
                    alt={name}
                    className="max-w-[600px] w-full max-h-[400px] rounded-2xl object-cover shadow-lg"
                />
            </div>

            {/* Horse Details */}
            <div className="w-full  flex flex-col justify-center py-3">
                <h2 className="text-2xl font-semibold text-[#1ADB04] mb-2">
                    {name}
                </h2>

                <div className="mb-1">
                    <span className="text-gray-700 font-medium">Age: </span>
                    <span className="text-gray-900 font-semibold">{age}</span>
                </div>

                <div className="mb-1">
                    <span className="text-gray-700 font-medium">Breed: </span>
                    <span className="text-gray-900 font-semibold">{breed}</span>
                </div>

                <div className="mb-2">
                    <span className="text-[#1ADB04] font-semibold text-lg">
                        Share Price: {sharePrice} (per {sharePercentage})
                    </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                    {description}
                </p>

                <Button label='View Details' className='max-w-32 py-3' />
            </div>
        </div>
    );
}

// Example Usage
export default function App() {
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
        <div className="min-h-screen py-12 ">
            <div className="space-y-8 lg:space-y-10">
                {horses.map((horse) => (
                    <HorseCard key={horse.id} {...horse} />
                ))}
            </div>
        </div>
    );
}
