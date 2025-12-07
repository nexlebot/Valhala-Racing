"use client"

import SectionHeader from "../sectionHeader";
import Image from "next/image";

export const RecentResults = () => {
  return (
    <section className=" mx-12 py-16">
      <SectionHeader
        title="Recent Results"
        subtitle="Explore the latest race winners and their moments of glory."
        buttonText="See full results"
        buttonVariant="secondary"
      />

      <div className="flex flex-col lg:flex-row gap-20 ">
        {/* Left content */}
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-gray-900">Race Day Success: Our Winning Commitment</h4>
          <p className="mt-3 text-gray-700">Witness the Consistent Performance That Defines Our Syndicates.</p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Every <span className="text-[#06b600] font-medium">race day</span> is a testament to the dedication of our trainers and the quality of our bloodlines. This section proudly
            highlights our history of outstanding <span className="text-[#06b600] font-medium">horse performance</span> across Australia’s elite tracks. While the victories change, our commitment to achieving
            <span className="text-[#06b600] font-medium"> winning form</span> does not. We focus on placing our horses for optimal success, giving our owners the ultimate thrill of
            <span className="text-[#06b600] font-medium"> ownership success</span> year after year.
          </p>

          <p className="mt-3 text-gray-600 leading-relaxed">
            Explore this snapshot of our recent achievements and discover the consistent results that make Vahala Racing a leader in
            <span className="text-[#06b600] font-medium"> racehorse syndicates</span>.
          </p>

          <div className="mt-6">
            <button className="inline-flex items-center gap-3 rounded-full bg-[#0ed12a] hover:bg-[#04b51b] text-white px-6 py-3 font-medium shadow-md transition">
              View All Results
            </button>
          </div>
        </div>

        {/* Right visual */}
        <div className="">
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
