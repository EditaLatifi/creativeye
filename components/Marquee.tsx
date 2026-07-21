import Image from "next/image";

// Pure-CSS infinite scroll strip. The image set is rendered twice so the
// track can loop seamlessly (translateX -50%).
export default function Marquee({
  images,
  reverse = false,
}: {
  images: string[];
  reverse?: boolean;
}) {
  const row = [...images, ...images];
  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div className={`animate-marquee flex gap-3 ${reverse ? "reverse" : ""}`}>
        {row.map((src, i) => (
          <div
            key={src + i}
            className="relative aspect-square h-40 shrink-0 overflow-hidden bg-neutral-100 sm:h-52 dark:bg-neutral-900"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
