"use client";
import { memo, useEffect, useState } from "react";
import Heading from "@/components/Heading";
import NumberTicker from "@/components/ui/number-ticker";
const youtube = "/Landing/wetooyt.webp";

const statsData = [
  { data: 2.61, displayUnit: "L", title: "Subscribers" },
  { data: 4.03, displayUnit: "Cr", title: "Total Views" },
  { data: 610, displayUnit: "", title: "Educational Videos" },
  { data: 2, displayUnit: "M", title: "Highest Single Video Views" },
];

const StatItem = memo(({ data, displayUnit, title }) => (
  <div className="flex flex-col items-center p-4">
    <div className="text-5xl font-bold text-white sm:text-6xl">
      <NumberTicker
        value={data}
        className="xs:text-3xl text-2xl font-bold text-white sm:text-5xl"
      />
      {displayUnit && (
        <span className="ml-1 xs:text-3xl text-2xl font-bold text-white sm:text-5xl">
          {displayUnit}
        </span>
      )}
      <span className="ml-1 xs:text-3xl text-2xl font-bold text-white sm:text-5xl">
        +
      </span>
    </div>
    <div className="mt-3 xs:text-sm text-xs font-medium text-center sm:text-start text-gray-400 sm:text-xl">
      {title}
    </div>
  </div>
));

// Set display name for the component
StatItem.displayName = "StatItem";

const Stats = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = youtube;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <section
      id="youtube"
      className="relative sm:min-h-screen px-0 py-16 lg:py-20 sm:px-0"
    >
      {imageLoaded && (
        <img
          src={youtube}
          alt="stats"
          className="absolute top-0 left-0 object-cover w-full h-full -z-10 blur-sm"
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 z-20 bg-black opacity-70" />
      <div className="relative z-30 max-w-screen-xl px-4 mx-auto md:px-8">
        <Heading
          title="WETOO MEDIA - IAS"
          titleClassName="mb-8 xs:text-4xl text-3xl font-bold text-center text-white md:text-6xl sm:font-bold md:font-extrabold sm:text-5xl lg:text-6xl"
          subtitle="Your trusted digital mentor for UPSC, SSC & competitive exam success - empowering aspirants through free guidance, resources, and inspiration."
          subtitleClassName="text-gray-300 xs:text-base text-sm md:text-lg"
        />
        <div className="grid grid-cols-2 xs:gap-8 gap-1 md:grid-cols-4 md:gap-0 md:divide-x-2 md:divide-secondary">
          {statsData.map((item, index) => (
            <StatItem
              key={index}
              data={item.data}
              displayUnit={item.displayUnit}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Stats.displayName = "Stats";
export default memo(Stats);
