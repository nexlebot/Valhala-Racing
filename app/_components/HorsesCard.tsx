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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start min-w-0">
            {/* Horse Image */}
            <div className="w-full lg:max-w-[500px] shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-[220px] sm:h-[300px] lg:h-[380px] rounded-2xl object-cover shadow-lg"
                />
            </div>

            {/* Horse Details */}
            <div className="w-full min-w-0 flex flex-col justify-center py-2">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#1ADB04] mb-2">
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
                    <span className="text-[#1ADB04] font-semibold text-sm lg:text-lg">
                        Share Price: {sharePrice}{sharePercentage ? ` (per ${sharePercentage})` : ''}
                    </span>
                </div>

                <div className="text-gray-700 leading-relaxed mb-4 text-sm lg:text-base prose prose-sm max-w-none break-words overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: description }}
                />

                <Button label='View Details' className='w-full sm:max-w-[160px] py-3' />
            </div>
        </div>
    );
}
