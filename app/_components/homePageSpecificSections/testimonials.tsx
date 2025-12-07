// Testimonials.jsx
import React from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

const DATA = [
  {
    text: `Vahala Racing turned my dream of horse ownership into reality. The team’s dedication to both horses and owners is outstanding. Every race, update, and milestone feels personal.`,
    name: "Sheikh Owais",
    role: "Owner",
    image: '/imageSlider1.jpg',
  },
  {
    text: `Being part of Vahala’s ownership syndicate has been incredible. The team’s clear communication, expert management, and genuine passion for racing made the whole process enjoyable. From stable visits to race-day excitement, I always felt connected, informed, and proud to be part of something truly professional and special. Being part of Vahala’s ownership syndicate has been incredible...`,
    name: "James Carter",
    role: "Syndicate Member",
    image: '/imageSlider1.jpg',
  },
  {
    text: `Vahala Racing’s professionalism and passion make ownership truly rewarding.`,
    name: "Emma Rodriguez",
    role: "Investor",
    image: '/imageSlider1.jpg',
  },
  {
    text: `I've worked with many stables, but none match Vahala Racing's standard of excellence. Their transparency, training quality, and communication are outstanding. They make every owner feel valued and involved. Watching our horses perform under their care fills me with pride — a true partnership built on trust and success.`,
    name: "Michael Roberts",
    role: "Long-term Partner",
    image: '/imageSlider1.jpg',
  },
  {
    text: `Joining Vahala Racing as a partner has been nothing short of amazing. The team combines professionalism with genuine passion, keeping owners engaged at every step.`,
    name: "Olivia Bennett",
    role: "Partner & Supporter",
    image: '/imageSlider1.jpg',
  },
  {
    text: `Vahala Racing turned my dream of horse ownership into reality. The team's dedication to both horses and owners is outstanding. Every race, update, and milestone feels personal. Their knowledge, communication, and integrity give owners confidence and pride — it's an experience that captures the true spirit of racing.`,
    name: "Daniel Hughes",
    role: "Co-Owner",
    image: '/imageSlider1.jpg',
  },
];

interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
}

interface AvatarProps {
  image: string;
}

const Avatar = ({ image }: AvatarProps) => {
  return (
    <div className="flex-none w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
      <Image
        src={image}
        alt={"image"}
        height={120}
        width={120}
        className="rounded-full"
      />
    </div>
  );
};

const TestimonialCard = ({ item }: { item: Testimonial }) => (
  // break-inside-avoid prevents the card from being split across columns
  <figure className="break-inside-avoid mb-6 p-6 border-2 border-[#FCFFFB] rounded-2xl bg-white shadow-sm">
    <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
      <div className="flex items-start gap-3">
        <span className="text-primary text-5xl">"</span>
        <p className="grow">{item.text}</p>
      </div>
    </blockquote>

    <figcaption className="mt-4 flex items-center gap-3">
      <Avatar image={item.image} />
      <div>
        <div className="text-sm font-semibold text-gray-800">{item.name}</div>
        <div className="text-xs text-gray-500">{item.role}</div>
      </div>
    </figcaption>
  </figure>
);

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="sr-only">Testimonials</h2>

      {/* Masonry-like columns: 1 / 2 / 3 columns at breakpoints */}
      <div
        className="columns-1 md:columns-2 lg:columns-3"
        style={{ columnGap: "1.5rem" }}
      >
        {DATA.map((d, i) => (
          <TestimonialCard key={i} item={d} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
