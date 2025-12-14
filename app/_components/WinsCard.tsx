import React from 'react';

interface WinCard {
    id: number;
    raceName: string;
    date: string;
    location: string;
    horseName: string;
    jockeyName: string;
}

const MajorWins: React.FC = () => {
    const wins: WinCard[] = [
        {
            id: 1,
            raceName: "Perth Handicap",
            date: "Dec 13, 2025",
            location: "Ascot Pk",
            horseName: "Soldanelle",
            jockeyName: "Jockey: W. Pike"
        },
        {
            id: 2,
            raceName: "Electrical Consultancy Wa Maiden",
            date: "Dec 11, 2025",
            location: "Pinjarra",
            horseName: "Lady Kiki",
            jockeyName: "Jockey: C. Parnham"
        },
        {
            id: 3,
            raceName: "Indigenous Tennis & Learning / Rtsa",
            date: "Oct 15, 2025",
            location: "Ascot",
            horseName: "Vandoula Jet",
            jockeyName: "Jockey: S. Parnham"
        },
        {
            id: 4,
            raceName: "Tabtouch Share My Bet Mdn",
            date: "Oct 08, 2025",
            location: "Northam",
            horseName: "Hoya Destroyer",
            jockeyName: "Jockey: S. Parnham"
        }
    ];


    return (
        <div className="w-full mt-6 lg:mt-0">
            <div className="flex items-center gap-3 mb-5">
                <h1 className="text-2xl font-semibold" style={{ color: '#1ADB04CC' }}>
                    Major Wins
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {wins.map((win, index) => (
                    <div
                        key={win.id}
                        className="relative rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg"
                        style={{
                            backgroundColor: index === 0 ? '#1ADB04CC' : '#FFFFFF',
                            borderColor: '#1ADB04CC'
                        }}
                    >
                        <div className='flex  justify-between items-center'>


                            {/* Race Name */}
                            <h3 className={`text-base font-medium  leading-tight ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                                {win.raceName}
                            </h3>

                            {/* Badge */}
                            <div className="inline-flex items-center justify-center">
                                <span
                                    className="text-xs font-semibold px-3 py-1 rounded-full"
                                    style={{
                                        backgroundColor: index === 0 ? 'white' : '#1ADB04CC',
                                        color: index === 0 ? '#1ADB04CC' : 'white'
                                    }}
                                >
                                    1st
                                </span>
                            </div>
                        </div>

                        {/* Date and Location */}
                        <p className={`text-sm mt-1 mb-2 ${index === 0 ? 'text-white/90' : 'text-gray-600'}`}>
                            {win.date} - {win.location}
                        </p>

                        {/* Horse Name */}
                        <p className={`text-base font-semibold mb-1 ${index === 0 ? 'text-white' : 'text-gray-800'}`}>
                            {win.horseName}
                        </p>

                        {/* Jockey Name */}
                        <p className={`text-sm ${index === 0 ? 'text-white/90' : 'text-gray-600'}`}>
                            {win.jockeyName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MajorWins;