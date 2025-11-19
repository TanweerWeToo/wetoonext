"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Star, Quote } from "lucide-react";

// Helper function to generate avatar URL based on color
const generateAvatar = (name, color) => {
  // Create a simple hash from name for consistent avatars
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://avatar.vercel.sh/${hash}`;
};

const ReviewCard = ({ img, name, username, body, rating }) => {
  return (
    <figure
      className={cn(
        "relative h-min w-96 bg-[#2a4f6f0d] cursor-pointer overflow-hidden rounded-xl border p-5",
        // light styles
        "border-secondary/30 bg-[#2a4f6f0d] hover:bg-[#2a4f6f0d]",
        // dark styles
        "dark:border-secondary/30 dark:bg-[#2a4f6f0d] dark:hover:bg-[#2a4f6f0d]"
      )}
    >
      <div className="absolute top-3 right-3 text-accent">
        <Quote size={18} className="opacity-40" />
      </div>
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <div className="flex mt-3 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              "mr-0.5",
              i < rating
                ? "fill-accent text-accent"
                : "fill-background text-secondary/30"
            )}
          />
        ))}
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Testimonial() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/text-testimonials');
        const data = await response.json();
        
        if (data.success && data.testimonials) {
          // Transform API data to match component structure
          const transformedData = data.testimonials.map((testimonial) => ({
            name: testimonial.name,
            username: testimonial.subtitle,
            body: testimonial.testimonial,
            img: generateAvatar(testimonial.name, testimonial.avatar_color),
            rating: testimonial.rating,
          }));
          
          setReviews(transformedData);
        }
      } catch (error) {
        console.error('Failed to fetch text testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Split reviews into two rows for marquee
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="px-5 md:px-8 py-10 md:py-16 relative overflow-hidden">
      <div className="relative flex w-full max-w-7xl mx-auto flex-col items-center justify-center overflow-hidden">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
            What Our Students Say
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-4"></div>
          <p className="text-text/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people are saying about
            our products and services.
          </p>
        </div> */}
        
        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text">Loading testimonials...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-text text-xl font-medium">No testimonials available</p>
            <p className="text-text/60 mt-2">Check back soon for student reviews!</p>
          </div>
        ) : (
          <>
            <Marquee pauseOnHover className="[--duration:20s] [--gap:2rem]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s] [--gap:2rem]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
          </>
        )}
      </div>
    </section>
  );
}
