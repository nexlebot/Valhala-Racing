import SectionHeader from "../sectionHeader";

export interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  image?: string;
}

const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <figure className="break-inside-avoid mb-6 p-6 bg-[#FCFFFB] border border-[#1aff0080] rounded-2xl shadow-sm">
    <blockquote className="text-gray-700 text-xs lg:text-sm leading-relaxed mb-4">
      <p className="relative">
        <span className="text-2xl text-[#1ADB04]">&ldquo;</span> {item.text} <span className="text-2xl text-[#1ADB04]">&rdquo;</span>
      </p>
    </blockquote>
    <figcaption className="mt-4 flex items-center gap-3">
      <div className="flex-none w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <img src={item.image || "/profile1.jpg"} alt="avatar" className="w-full h-full object-cover rounded-full" />
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-800">{item.name}</div>
        <div className="text-xs text-gray-500">{item.role}</div>
      </div>
    </figcaption>
  </figure>
);

const Testimonials = ({ items }: { items: Testimonial[] }) => {
  if (!items.length) return null;
  return (
    <section className="mt-6 lg:mt-0 mx-6 lg:mx-12 lg:py-14">
      <SectionHeader
        title="Testimonials & Highlights"
        subtitle="Hear from our partners and discover the champions who define Vahala Racing."
      />
      <div className="columns-1 md:columns-2 lg:columns-3" style={{ columnGap: "1.5rem" }}>
        {items.map((d) => <TestimonialCard key={d.id} item={d} />)}
      </div>
    </section>
  );
};

export default Testimonials;
