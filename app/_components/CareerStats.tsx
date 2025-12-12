// types.ts
interface Stats {
    overview: string;
    '1stUp': string;
    '2ndUp': string;
    firm: string;
    good: string;
    soft: string;
    heavy: string;
}

interface StatSection {
    title: string;
    stats: Stats;
}

interface StatLabel {
    key: keyof Stats;
    label: string;
}

interface StatsData {
    sections: StatSection[];
    labels: StatLabel[];
}

// statsData.json structure
const statsData: StatsData = {
    sections: [
        {
            title: "Season Stats (2025/2026)",
            stats: {
                overview: '4:0-1-0',
                '1stUp': '1:0-0-0',
                '2ndUp': '1:0-0-0',
                firm: '0:0-0-0',
                good: '4:0-1-0',
                soft: '0:0-0-0',
                heavy: '0:0-0-0'
            }
        },
        {
            title: "Career Form",
            stats: {
                overview: '29:7-6-2',
                '1stUp': '6:1-1-0',
                '2ndUp': '5:2-0-0',
                firm: '0:0-0-0',
                good: '21:4-4-1',
                soft: '8:3-2-1',
                heavy: '0:0-0-0'
            }
        }
    ],
    labels: [
        { key: 'overview', label: 'Overview' },
        { key: '1stUp', label: '1st Up' },
        { key: '2ndUp', label: '2nd Up' },
        { key: 'firm', label: 'Firm' },
        { key: 'good', label: 'Good' },
        { key: 'soft', label: 'Soft' },
        { key: 'heavy', label: 'Heavy' }
    ]
};

interface StatItemProps {
    label: string;
    value: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
    <div>
        <div className="w-24 text-sm font-medium text-gray-700">{label}</div>
        <div className="flex-1 text-sm text-gray-800">{value}</div>
    </div>
);

interface StatsSectionProps {
    title: string;
    stats: Stats;
    labels: StatLabel[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ title, stats, labels }) => (
    <div
        className="rounded-xl mb-4 last:mb-0"
        style={{
            border: '1px solid #1ADB04',
            background: '#1ADB0405'
        }}
    >
        <div className="px-3 py-2 lg:px-6 lg:py-4 w-full overflow-x-scroll lg:overflow-x-hidden">
            <h3 className="font-medium text-lg lg:text-xl text-gray-800 mb-4 border-b-[0.5px] border-b-[#1ADB04] pb-1 lg:pb-2">
                {title}
            </h3>
            <div className="flex justify-between space-y-3">
                {labels.map(({ key, label }) => (
                    <StatItem key={key} label={label} value={stats[key]} />
                ))}
            </div>
        </div>
    </div>
);

export default function StatsComponent(): React.ReactElement {
    return (
        <div className="my-14 md:my-14">
            <div
                className="font-semibold text-2xl md:text-3xl mb-4"
                style={{ color: '#1ADB04' }}
            >
                Season / Career Stats
            </div>

            {statsData.sections.map((section, index) => (
                <StatsSection
                    key={index}
                    title={section.title}
                    stats={section.stats}
                    labels={statsData.labels}
                />
            ))}
        </div>
    );
}