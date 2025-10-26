"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

// Sample YouTube Shorts data - replace with your actual data
const shortsData = [
  {
    id: 1,
    title: "Testimonial 1",
    videoId: "CzIH8M0a3SI",
  },
  {
    id: 2,
    title: "Testimonial 2",
    videoId: "syX-jb7zS1E",
  },
  {
    id: 5,
    title: "Testimonial 5",
    videoId: "UiNWj3vWwzo",
  },
  {
    id: 6,
    title: "Testimonial 6",
    videoId: "NrCTgYbihwc",
  },
  //   {
  //     id: 7,
  //     title: "Testimonial 7",
  //     videoId: "jE5A2c5dIBs",
  //   },
  {
    id: 8,
    title: "Testimonial 8",
    videoId: "hg328rKXDlM",
  },
  {
    id: 9,
    title: "Testimonial 9",
    videoId: "YuYHGi12QQs",
  },
  {
    id: 10,
    title: "Testimonial 10",
    videoId: "mAIFrJKN-p8",
  },
  //   {
  //     id: 11,
  //     title: "Testimonial 11",
  //     videoId: "gItm_vsMRl4",
  //   },
  {
    id: 12,
    title: "Testimonial 12",
    videoId: "Ilnpbp_npHY",
  },
  {
    id: 13,
    title: "Testimonial 13",
    videoId: "LpELoPdVeTM",
  },
  {
    id: 14,
    title: "Testimonial 14",
    videoId: "fpPwX9ELngE",
  },
  {
    id: 15,
    title: "Testimonial 15",
    videoId: "OMnoj9xFqSM",
  },
  {
    id: 16,
    title: "Testimonial 16",
    videoId: "_yHYX-hgjDA",
  },
  //   {
  //     id: 3,
  //     title: "Testimonial 3",
  //     videoId: "46m4t5dS3p8",
  //   },
  //   {
  //     id: 4,
  //     title: "Testimonial 4",
  //     videoId: "Jg0Ydw7uCMY",
  //   },
];

const YoutubeShortCard = ({ short, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-700 ease-out
        ${
          isActive
            ? "scale-100 z-10"
            : "scale-90 opacity-70 hover:opacity-90 hover:scale-95 z-0"
        }`}
    >
      <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[9/16] bg-black">
        {/* Thumbnail */}
        <img
          src={`https://img.youtube.com/vi/${short.videoId}/maxresdefault.jpg`}
          alt={short.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div> */}

        {/* Shimmer effect around play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer shimmer ring */}
          <div
            className={`absolute w-24 h-24 rounded-full ${
              isActive ? "animate-shimmer" : ""
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

          {/* Middle glow */}
          <div
            className={`absolute w-20 h-20 rounded-full bg-[#CC5500]/20 ${
              isActive ? "animate-pulse" : ""
            }`}
          ></div>

          {/* Play button (no animation) */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#CC5500] text-white transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#CC5500]/30">
            <Play size={30} fill="white" className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

const YoutubeTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 768) {
        setVisibleCount(3);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(5);
      } else {
        setVisibleCount(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure activeIndex is valid after visibleCount changes
  useEffect(() => {
    const maxIndex = shortsData.length - 1;
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [visibleCount, activeIndex]);

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const maxIndex = shortsData.length - 1;
    setActiveIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // Increased duration to match transition
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const maxIndex = shortsData.length - 1;
    setActiveIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // Increased duration to match transition
  };

  // Mouse and touch events for dragging
  const onDragStart = (e) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(e.clientX || e.touches[0].clientX);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX || e.touches[0].clientX);
  };

  const onDragEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  // Calculate visible items and their positions
  const getVisibleItems = () => {
    const items = [];
    const halfVisible = Math.floor(visibleCount / 2);

    for (let i = 0; i < shortsData.length; i++) {
      // Calculate position relative to active index
      let position = i - activeIndex;

      // Handle circular positioning
      if (position < -halfVisible) position += shortsData.length;
      if (position > shortsData.length - halfVisible - 1)
        position -= shortsData.length;

      // Only include items that should be visible
      if (Math.abs(position) <= halfVisible) {
        items.push({
          short: shortsData[i],
          position,
          isActive: position === 0,
        });
      }
    }

    // Sort by position for proper rendering order
    return items.sort((a, b) => a.position - b.position);
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#2A4E6E]/10 to-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#CC5500]/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#2A4E6E]/5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-[#8A9A5B]/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          {/* <span className="inline-block px-4 py-1 rounded-full bg-[#2A4E6E]/10 text-[#2A4E6E] font-medium text-sm mb-4 animate-fadeIn">
            YOUTUBE SHORTS
          </span> */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#2A4E6E] mb-6 animate-slideUp">
            What Our Students Say
          </h2>
          <div className="w-24 h-1.5 bg-[#CC5500] mx-auto mb-8 rounded-full animate-expand"></div>
          <p className="text-[#333333] max-w-2xl mx-auto text-lg mb-8 animate-fadeIn">
            Quick videos showcasing our students' success stories
          </p>
        </div>

        <div
          className="relative py-10 cursor-grab active:cursor-grabbing"
          ref={carouselRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 bg-white/90 p-4 rounded-full shadow-lg text-[#2A4E6E] hover:bg-[#2A4E6E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            aria-label="Previous short"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative mx-auto"
            style={{
              height: visibleCount === 1 ? "75vh" : "65vh",
              maxHeight: "750px",
            }}
          >
            {/* Center-focused carousel */}
            <div className="absolute inset-0 flex items-center justify-center perspective">
              {visibleItems.map(({ short, position, isActive }) => {
                // Calculate transform values based on position
                const xPercent = position * 65; // Increased spacing
                const zTranslate = Math.abs(position) * -100; // Z-axis depth
                const yRotate = position * -5; // Slight Y rotation for 3D effect
                const scale = isActive ? 1 : 0.85 - Math.abs(position) * 0.08; // Enhanced scaling
                const opacity = isActive ? 1 : 1 - Math.abs(position) * 0.25; // More pronounced opacity difference

                return (
                  <div
                    key={short.id}
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                      transform: `translateX(${xPercent}%) translateZ(${zTranslate}px) rotateY(${yRotate}deg) scale(${scale})`,
                      zIndex: 10 - Math.abs(position),
                      opacity,
                      width: visibleCount === 1 ? "100%" : "320px", // Slightly larger cards
                      maxWidth: visibleCount === 1 ? "100%" : "320px",
                      filter: isActive ? "none" : "brightness(0.9)",
                    }}
                  >
                    <YoutubeShortCard
                      short={short}
                      isActive={isActive}
                      onClick={() => openVideo(short.videoId)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 bg-white/90 p-4 rounded-full shadow-lg text-[#2A4E6E] hover:bg-[#2A4E6E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            aria-label="Next short"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Enhanced pagination dots */}
        <div className="flex justify-center mt-10 gap-3">
          {shortsData.map((_, index) => {
            const isActive = index === activeIndex;
            const isNearActive = Math.abs(index - activeIndex) <= 1;

            return (
              <button
                key={index}
                onClick={() => !isAnimating && setActiveIndex(index)}
                className={`transition-all duration-500 ${
                  isActive
                    ? "w-10 h-3 bg-[#CC5500] rounded-full scale-100"
                    : isNearActive
                    ? "w-3 h-3 bg-[#8A9A5B]/50 rounded-full scale-90"
                    : "w-3 h-3 bg-[#8A9A5B]/30 rounded-full scale-75"
                } hover:bg-[#8A9A5B]/70`}
                aria-label={`Go to short ${index + 1}`}
                disabled={isAnimating}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YoutubeTestimonials;
