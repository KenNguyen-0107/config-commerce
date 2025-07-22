import Image from "next/image";
import Link from "next/link";

interface Category {
  title: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    title: "GARDEN FENCING",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/garden-fencing",
  },
  {
    title: "AGRICULTURAL FENCING",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/agricultural-fencing",
  },
  {
    title: "METAL FENCING",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/metal-fencing",
  },
  {
    title: "ACOUSTIC FENCING",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/acoustic-fencing",
  },
  {
    title: "GARDEN GATES",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/garden-gates",
  },
  {
    title: "ENTRANCE GATES",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/entrance-gates",
  },
  {
    title: "GATE AUTOMATION",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/gate-automation",
  },
  {
    title: "DECKING & PERGOLAS",
    image: "/placeholder.svg?height=300&width=400",
    href: "/categories/decking-pergolas",
  },
];

export default function CategoryGrid() {
  return (
    <div className=" bg-light-gray-background ">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-x-6 lg:gap-y-10 px-4 max-w-[1120px] mx-auto relative top-[-32px] lg:top-[-80px]">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group block overflow-hidden rounded-sm bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] p-2 pt-4 pb-8 lg:p-6 lg:py-10"
          >
            <div className="relative aspect-[4/3] w-full h-auto overflow-hidden">
              <Image
                // src={category.image}
                src="/images/HeroBanner.jpg"
                alt={`${category.title} category image`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </div>
            <div className="pt-4 lg:pb-3 lg:px-3">
              <h3 className="text-center font-bold text-blue text-xl lg:text-2xl leading-tight">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
