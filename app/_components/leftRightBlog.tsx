import Image from "next/image";
import Link from "next/link";

export interface BlogPost {
  id: number;
  excerpt: string;
  image: string;
  slug: string
}

interface LeftRightBlogProps {
  blogPosts: BlogPost[];
}

const LeftRightBlog = ({ blogPosts }: LeftRightBlogProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {blogPosts.map((post, index) => {
        const isEven = index % 2 === 0;

        // image left on even indices, image right on odd indices (for lg+)
        const imageOrderClass = isEven ? "lg:order-2" : "lg:order-1";
        const textOrderClass = isEven ? "lg:order-1" : "lg:order-2";

        return (
          <div
            key={post.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Image */}
            <div className={`${imageOrderClass}`}>
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={post.image}
                  alt={"image"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className={`${textOrderClass}`}>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block px-6 py-2 bg-primary text-white rounded-full font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default LeftRightBlog;
