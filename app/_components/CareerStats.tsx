export default function StatsComponent() {
    const seasonStats = {
        overview: '4:0-1-0',
        '1stUp': '1:0-0-0',
        '2ndUp': '1:0-0-0',
        firm: '0:0-0-0',
        good: '4:0-1-0',
        soft: '0:0-0-0',
        heavy: '0:0-0-0'
    };

    const careerStats = {
        overview: '29:7-6-2',
        '1stUp': '6:1-1-0',
        '2ndUp': '5:2-0-0',
        firm: '0:0-0-0',
        good: '21:4-4-1',
        soft: '8:3-2-1',
        heavy: '0:0-0-0'
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div
                className="px-6 py-3 font-semibold text-lg"
                style={{ color: '#1ADB04' }}
            >
                Season / Career Stats
            </div>
            <div
                className="rounded-lg overflow-hidden"
                style={{
                    border: '2px solid #1ADB04',
                    background: '#1ADB0405'
                }}
            >
                {/* Header */}


                {/* Season Stats Section */}
                <div className="px-6 py-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                        Season Stats (2025/2026)
                    </h3>

                    <div className="grid grid-cols-7 gap-4 mb-2">
                        <div className="text-sm font-medium text-gray-600">Overview</div>
                        <div className="text-sm font-medium text-gray-600">1st Up</div>
                        <div className="text-sm font-medium text-gray-600">2nd Up</div>
                        <div className="text-sm font-medium text-gray-600">Firm</div>
                        <div className="text-sm font-medium text-gray-600">Good</div>
                        <div className="text-sm font-medium text-gray-600">Soft</div>
                        <div className="text-sm font-medium text-gray-600">Heavy</div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        <div className="text-sm text-gray-800">{seasonStats.overview}</div>
                        <div className="text-sm text-gray-800">{seasonStats['1stUp']}</div>
                        <div className="text-sm text-gray-800">{seasonStats['2ndUp']}</div>
                        <div className="text-sm text-gray-800">{seasonStats.firm}</div>
                        <div className="text-sm text-gray-800">{seasonStats.good}</div>
                        <div className="text-sm text-gray-800">{seasonStats.soft}</div>
                        <div className="text-sm text-gray-800">{seasonStats.heavy}</div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="h-px mx-6"
                    style={{ backgroundColor: '#1ADB0420' }}
                ></div>

                {/* Career Form Section */}
                <div className="px-6 py-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                        Career Form
                    </h3>

                    <div className="grid grid-cols-7 gap-4 mb-2">
                        <div className="text-sm font-medium text-gray-600">Overview</div>
                        <div className="text-sm font-medium text-gray-600">1st Up</div>
                        <div className="text-sm font-medium text-gray-600">2nd Up</div>
                        <div className="text-sm font-medium text-gray-600">Firm</div>
                        <div className="text-sm font-medium text-gray-600">Good</div>
                        <div className="text-sm font-medium text-gray-600">Soft</div>
                        <div className="text-sm font-medium text-gray-600">Heavy</div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        <div className="text-sm text-gray-800">{careerStats.overview}</div>
                        <div className="text-sm text-gray-800">{careerStats['1stUp']}</div>
                        <div className="text-sm text-gray-800">{careerStats['2ndUp']}</div>
                        <div className="text-sm text-gray-800">{careerStats.firm}</div>
                        <div className="text-sm text-gray-800">{careerStats.good}</div>
                        <div className="text-sm text-gray-800">{careerStats.soft}</div>
                        <div className="text-sm text-gray-800">{careerStats.heavy}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}