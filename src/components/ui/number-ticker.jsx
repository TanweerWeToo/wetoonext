import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 2,
}) {
  const ref = useRef(null);
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const motionValue = useMotionValue(direction === "down" ? numericValue : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      // Added a delay to start the animation
      const animationDelay = 0.5; // Delay in seconds
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : numericValue);
      }, (delay + animationDelay) * 1000);

      return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
    }
  }, [motionValue, isInView, delay, numericValue, direction]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimalPlaces);
      }
    });
  }, [springValue, decimalPlaces]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black dark:text-white tracking-wider",
        className
      )}
      ref={ref}
    />
  );
}
