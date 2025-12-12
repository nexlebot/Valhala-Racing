import Link from 'next/link';
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
export function HorseCard({
    name,
    age,
    breed,
    sharePrice,
    sharePercentage,
    image,
    description
}: HorseCardProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 items-start ">
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
                <h2 className="text-xl lg:text-2xl font-semibold text-[#1ADB04] mb-2">
                    {name}
                </h2>

                <div className="mb-1">
                    <span className="text-gray-700 font-medium text-sm lg:text-base">Age: </span>
                    <span className="text-gray-900 font-semibold text-sm lg:text-base">{age}</span>
                </div>

                <div className="mb-1">
                    <span className="text-gray-700 font-medium text-sm lg:text-base">Breed: </span>
                    <span className="text-gray-900 font-semibold text-sm lg:text-base">{breed}</span>
                </div>

                <div className="mb-2">
                    <span className="text-[#1ADB04] font-semibold text-md lg:text-lg">
                        Share Price: {sharePrice} (per {sharePercentage})
                    </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm lg:text-base">
                    {description}
                </p>

                <Button label='View Details' className='max-w-32 py-3' />
            </div>
        </div>
    );
}
