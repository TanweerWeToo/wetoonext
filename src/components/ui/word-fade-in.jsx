"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function WordFadeIn({
  words,
  delay = 0.15,

  variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },

  className,
}) {
  const _words = words.split(" ");
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-5% 0px -20% 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.h2
      ref={ref} // Attach the ref to the motion.h1 element
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate based on inView state
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]",
        className
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={i} variants={variants} custom={i}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.h2>
  );
}
