import SectionHeader from '../sectionHeader'
import Button from '../Button'

const OwnerShipAndSyndication = () => {
    return (
        <div className='mx-12'>
            <SectionHeader
                title="Ownership & Syndication"
                subtitle="Partner with us – own your share of a racehorse with Vahala Racing."
                buttonText='See about ownership'
                buttonVariant='secondary'
            />
            <section className="max-w-3xl mx-auto px-6 text-center relative">
                {/* Left Quote */}
                <span className="text-gray-300 text-[80px] font-bold absolute -top-10 -left-6 select-none">
                    &ldquo;
                </span>

                <p className="text-gray-800 text-base lg:text-xl leading-relaxed mb-6 relative z-10">
                    Experience the thrill of ownership and become part of the{" "}
                    <span className="text-[#1ADB04] font-medium">Vahala Racing</span> family.
                    Through our <span className="text-[#1ADB04] font-medium">Ownership and syndication programs</span>, you can invest in a racehorse and share in the excitement, prestige, and rewards of professional horse racing.
                </p>

                <p className="text-gray-800 text-base lg:text-xl leading-relaxed mb-6 relative z-10">
                    Whether you’re a passionate racing fan or a first-time investor, Vahala provides a transparent, well-managed path to ownership.
                    Our team handles training, care, and race preparation, ensuring your horse performs at its best — while you enjoy exclusive updates, events, and race-day experiences.
                </p>

                <p className="text-gray-800 text-base lg:text-xl leading-relaxed mb-8 relative z-10">
                    Join us to <span className="text-[#1ADB04] font-medium">own, celebrate, and win</span> with confidence.
                </p>

                {/* Right Quote */}
                <span className="text-gray-300 text-[80px] font-bold absolute -bottom-10 -right-6 select-none">
                    &rdquo;
                </span>

            </section>
            <Button label="Learn More About Ownership" className="mt-8 mx-auto block lg:text-sm lg:py-3 lg:px-6" />
        </div>
    )
}

export default OwnerShipAndSyndication