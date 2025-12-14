// Testimonials.jsx
import Image from "next/image";
import SectionHeader from "../sectionHeader";

const DATA = [
  {
    text: `Vahala Racing turned my dream of horse ownership into reality. The teams dedication to both horses and owners is outstanding. Every race, update, and milestone feels personal.`,
    name: "Sheikh Owais",
    role: "Owner",
    image: '/profile1.jpg',
  },
  {
    text: `Being part of Vahalas ownership syndicate has been incredible. The teams clear communication, expert management, and genuine passion for racing made the whole process enjoyable.
    From stable visits to race-day excitement.
    I always felt connected, informed, and proud to be part of something truly professional and special.
    `,
    name: "James Carter",
    role: "Syndicate Member",
    image: '/profile1.jpg',
  },
  {
    text: `Being part of Vahalas ownership syndicate has been incredible. The teams clear communication, expert management, and genuine passion for racing made the whole process enjoyable.
    From stable visits to race-day excitement.
    I always felt connected, informed, and proud to be part of something truly professional and special.`,
    name: "James Carter",
    role: "Syndicate Member",
    image: '/profile1.jpg',
  },
  {
    text: `Joining Vahala Racing as a partner has been nothing short of amazing. The team combines professionalism with genuine passion, keeping owners engaged at every step.`,
    name: "Michael Roberts",
    role: "Long-term Partner",
    image: '/profile1.jpg',
  },
  {
    text: `Joining Vahala Racing as a partner has been nothing short of amazing. The team combines professionalism with genuine passion, keeping owners engaged at every step.`,
    name: "Emma Rodriguez",
    role: "Investor",
    image: '/profile1.jpg',
  },
  {
    text: `Vahala Racing turned my dream of horse ownership into reality. The team's dedication to both horses and owners is outstanding. Every race, update, and milestone feels personal. Their knowledge, communication, and integrity give owners confidence and pride — it's an experience that captures the true spirit of racing.`,
    name: "Daniel Hughes",
    role: "Co-Owner",
    image: '/profile1.jpg',
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
    <div className="flex-none w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
      <Image
        src={image}
        alt="avatar"
        width={44}
        height={44}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};


const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <figure className="break-inside-avoid mb-6 p-6 bg-[#FCFFFB] border border-[#1aff0080] rounded-2xl shadow-sm">
    <blockquote className="text-gray-700 text-xs lg:text-sm leading-relaxed mb-4">
      <p className="relative">
        <span className="text-2xl text-[#1ADB04]">&ldquo;</span> {item.text} <span className="text-2xl text-[#1ADB04]">&rdquo;</span>
      </p>
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
    <section className="mt-6 lg:mt-0 mx-6 lg:mx-12 lg:py-14 ">
      {/* <h2 className="sr-only">Testimonials</h2> */}
      <SectionHeader
        title="Testimonials & Highlights"
        subtitle="Hear from our partners and discover the champions who define Vahala Racing."
        buttonText="Success Story"
        buttonVariant="secondary"
      />

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
