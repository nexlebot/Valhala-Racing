"use client";

import React from "react";

interface ContentBlock {
  heading?: string;
  subHeading?: string;
  paragraphs: string[];
}

interface PageIntroProps {
  mainHeading: string;
  intro?: string;
  blocks?: ContentBlock[];
}

const PageIntro: React.FC<PageIntroProps> = ({ mainHeading, intro, blocks = [] }) => {
  return (
    <div className="mt-28 lg:mt-44">
      {/* Main Header + First Paragraph */}
      <div>
        <h1 className="font-semibold text-4xl text-[#1ADB04]">{mainHeading}</h1>
        {intro && <p className="mt-2">{intro}</p>}
      </div>

      {/* Dynamic Content Blocks */}
      {blocks.map((block, index) => (
        <div key={index} className="mt-6">
          {block.heading && (
            <h3 className="font-medium text-2xl text-[#1ADB04]">{block.heading}</h3>
          )}

          {block.subHeading && (
            <p className="font-medium text-lg text-[#000000B2] mt-2">{block.subHeading}</p>
          )}

          {block.paragraphs?.map((text, idx) => (
            <p
              key={idx}
              className={`${idx === 0 ? "mt-2" : "mt-2"} text-[#000000CC]`}
            >
              {text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PageIntro;
