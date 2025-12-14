"use client"

import Link from "next/link";
import Button from "../Button";
import SectionHeader from "../sectionHeader";
import Image from "next/image";

export const RecentResults = () => {
  return (
    <section className="mx-6 lg:mx-12 lg:pb-14">
      <SectionHeader
        title="Recent Results"
        subtitle="Explore the latest race winners and their moments of glory."
        buttonText="See results"
        buttonLink="/results"
        buttonVariant="secondary"
      />

      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 ">
        {/* Left content */}
        <div className="flex-1 text-sm lg:text-base">
          <h4 className="text-xl lg:text-2xl font-semibold text-gray-900">Race Day Success: Our Commitment to Winning Form</h4>
          <p className="mt-2 text-gray-700 text-base lg:text-[18px] font-medium">Witness the Consistent Performance That Defines Our Successful Horse Ownership.</p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Every <span className="text-[#06b600] font-medium">race day</span>  is a testament to the dedication of our trainers and the quality of our bloodlines. This section proudly highlights our history of outstanding <span className="text-[#06b600] font-medium">horse performance</span>  across Australia&apos;s elite tracks. While the victories change, our commitment to achieving
            <span className="text-[#06b600] font-medium"> winning form</span> does not. We focus on placing our horses for optimal success, giving the member of our part-ownership group the ultimate thrill of
            <span className="text-[#06b600] font-medium"> ownership success</span> year after year.
          </p>

          <p className="mt-3 text-gray-600 leading-relaxed">
            Explore this snapshot of our recent achievements and discover the consistent results that make Vahala Racing a leader in
            <span className="text-[#06b600] font-medium"> racehorse ownership</span>  opportunities and <span className="text-[#06b600] font-medium">partnerships.</span>
          </p>

          <div className="mt-6">
            <Link href={"/results"}>
              <Button label="View All Results" variant="primary" className="py-3 px-5" />
            </Link>
          </div>
        </div>

        {/* Right visual */}
        <div className="mt-4 lg:mt-0">
          <Image
            src={"/recentResultsImage.png"}
            alt="Horse Racing"
            width={500}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default RecentResults;
