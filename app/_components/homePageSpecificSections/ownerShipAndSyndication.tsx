import SectionHeader from '../sectionHeader'
import Button from '../Button'
import Link from 'next/link'

const OwnerShipAndSyndication = () => {
    return (
        <div className='mx-6 lg:mx-12 py-8 lg:pt-14'>
            <SectionHeader
                title="Vahala Thoroughbred Ownership"
                subtitle="Current Racehorse Ownership Opportunities"
                buttonText='See ownership'
                buttonLink='/ownership'
                buttonVariant='secondary'
            />
            <section className="max-w-none lg:max-w-[68%] mx-auto px-6 text-center relative">
                {/* Left Quote */}
                <span className="text-gray-300 text-[40px] lg:text-[80px] font-bold absolute -top-3 lg:-top-10 -left-2 lg:-left-6 select-none">
                    &ldquo;
                </span>

                <p className="text-gray-800 mt-4 lg:mt-0 text-sm lg:text-xl leading-relaxed mb-6 relative z-10">
                    Experience the thrill of ownership and become part of the{" "}
                    <span className="text-primary font-medium italic">Vahala Racing</span> family.
                    Through our <span className="text-primary font-medium italic">Ownership and syndication programs</span>, you can invest in a racehorse and share in the excitement, prestige, and rewards of professional horse racing.
                </p>

                <p className="text-gray-800 text-sm lg:text-xl leading-relaxed mb-6 relative z-10">
                    Whether you’re a passionate racing fan or a first-time investor, Vahala provides a transparent, well-managed path to ownership.
                    Our team handles training, care, and race preparation, ensuring your horse performs at its best — while you enjoy exclusive updates, events, and race-day experiences.
                </p>

                <p className="text-gray-800 text-sm lg:text-xl leading-relaxed mb-8 relative z-10">
                    Join us to <span className="text-primary italic font-medium">own, celebrate, and win</span> with confidence.
                </p>

                {/* Right Quote */}
                <span className="text-gray-300 text-[40px] lg:text-[80px] font-bold absolute -bottom-10 -right-2 lg:-right-6 select-none">
                    &rdquo;
                </span>

            </section>
            <Link href={"/ownership"}>
                <Button label="View available ownership opportunities" className="mt-8 mx-auto block lg:text-sm lg:py-3 lg:px-6" />
            </Link>
        </div>
    )
}

export default OwnerShipAndSyndication