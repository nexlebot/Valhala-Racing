import Image from 'next/image'
import React from 'react'

interface CurvedLineProps {
    className?: string;
}


const CurvedLine: React.FC<CurvedLineProps> = ({ className }) => {
    return <svg
        className={`${className} absolute w-full`}
        height="64"
        viewBox="0 0 1341 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <path
            d="M1339.75 62.75H302.886C292.463 62.75 282.301 59.4929 273.82 53.4342L213.116 10.0658C204.635 4.00707 194.473 0.75 184.05 0.75H146.657H0.75"
            stroke="#1ADB04"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
        />
    </svg>
}

const HorseProfile = () => {

    const firstRowData = {
        age: "6",
        rating: "m102",
        sex: "Gelding",
        class: "Open",
        color: "Bay",
        prizeMoney: "$608,915",
        bonus: "$157,300",
        win: "24%",
        place: "52%"
    };

    const secondRowData = {
        sire: "UNIVERSAL RULER",
        dam: "I LOVE RUBIES",
        trainer: "Quanah Park Thoroughbreds",
        breeder: "Stefan Vahala"
    };

    return (
        <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#1ADB04] my-14 mb-10">Profile</h1>
            <div className=" flex flex-col gap-16 mb-8">
                {/* First Row */}
                <div className="relative">
                    <CurvedLine className='-top-6 hidden lg:block' />
                    <div className="flex justify-between gap-0 overflow-x-scroll lg:overflow-hidden">
                        {Object.entries(firstRowData).map(([key, value]) => (
                            <div key={key} className="flex flex-col gap-4">
                                <span className="text-lg font-medium capitalize w-24 min-w-max">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-base mt-2 text-gray-900">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second Row */}
                <div className='relative'>
                    <CurvedLine className='-top-6 hidden lg:block' />
                    <div className="flex justify-between gap-0 flex-wrap">
                        {Object.entries(secondRowData).map(([key, value]) => (
                            <div key={key} className="flex flex-col gap-8 text-center flex-1">
                                <span className="text-lg font-medium capitalize min-w-max">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-base mt-2 text-gray-900  lg:border-x lg:border-[#1ADB04]">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>



            </div>


        </div>
    )
}

export default HorseProfile