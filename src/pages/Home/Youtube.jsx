"use client";
import { memo, useEffect, useState } from "react";
import Heading from "@/components/Heading";
import NumberTicker from "@/components/ui/number-ticker";
const youtube = "/Landing/wetooyt.webp";

// Helper function to parse stats string (e.g., "2.61L" → { data: 2.61, displayUnit: "L" })
const parseStatValue = (value) => {
  if (!value) return { data: 0, displayUnit: "" };
  
  const match = value.match(/^([\d.]+)(.*)$/);
  if (match) {
    return {
      data: parseFloat(match[1]),
      displayUnit: match[2].trim(),
    };
  }
  return { data: 0, displayUnit: "" };
};

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
      {/* <span className="ml-1 xs:text-3xl text-2xl font-bold text-white sm:text-5xl">
        +
      </span> */}
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
  const [statsData, setStatsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch YouTube stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/youtube-stats');
        const data = await response.json();
        
        if (data.success && data.stats) {
          const { subscribers, total_views, videos_count, highest_single_video_views } = data.stats;
          
          // Parse and transform data to match component structure
          const transformedStats = [
            { ...parseStatValue(subscribers), title: "Subscribers" },
            { ...parseStatValue(total_views), title: "Total Views" },
            { ...parseStatValue(videos_count), title: "Educational Videos" },
            { ...parseStatValue(highest_single_video_views), title: "Highest Single Video Views" },
          ];
          
          setStatsData(transformedStats);
        }
      } catch (error) {
        console.error('Failed to fetch YouTube stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

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
      <div className="relative z-30 max-w-7xl px-4 mx-auto md:px-8">
        <Heading
          title="WETOO MEDIA - IAS"
          titleClassName="mb-8 xs:text-4xl text-3xl font-bold text-center text-white md:text-6xl sm:font-bold md:font-extrabold sm:text-5xl lg:text-6xl"
          subtitle="Your trusted digital mentor for UPSC, SSC & competitive exam success - empowering aspirants through free guidance, resources, and inspiration."
          subtitleClassName="text-gray-300 xs:text-base text-sm md:text-lg"
        />
        
        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/50 mx-auto"></div>
            <p className="mt-4 text-white/70">Loading stats...</p>
          </div>
        ) : statsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70">No stats available</p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

Stats.displayName = "Stats";
export default memo(Stats);
