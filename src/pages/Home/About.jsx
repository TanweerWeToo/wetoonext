"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Handshake, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Custom color palette
const colors = {
  text: "#333333",
  background: "#F8F9FA",
  primary: "#2A4E6E",
  secondary: "#8A9A5B",
  accent: "#CC5500",
};

const metrics = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    value: "6",
    label: "Years of Digital Education",
    color: colors.primary,
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "250",
    suffix: "K",
    label: "Students Mentored",
    color: colors.secondary,
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    value: "3",
    label: "Partner Universities",
    color: colors.primary,
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    value: "100",
    suffix: "%",
    label: "Free Resources Access",
    color: colors.secondary,
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: "1",
    label: "UPSC AIR 3 Success Story",
    color: colors.accent,
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      id="about"
      className="w-full py-10 sm:py-20"
      ref={sectionRef}
      style={{ backgroundColor: colors.background }}
    >
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute opacity-5">
          <pattern
            id="diagonalHatch"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              style={{ stroke: colors.primary, strokeWidth: 1 }}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>

        <div
          className="absolute top-1/4 left-0 w-64 h-64 rounded-full"
          style={{
            backgroundColor: `${colors.primary}05`,
            filter: "blur(60px)",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full"
          style={{
            backgroundColor: `${colors.secondary}10`,
            filter: "blur(80px)",
          }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full"
          style={{
            backgroundColor: `${colors.accent}08`,
            filter: "blur(70px)",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10 px-5 sm:px-5 sm:space-y-20 z-10">
        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start z-10"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Text Content */}
          <div className="space-y-6">
            <motion.div className="mb-8" variants={itemVariants}>
              <motion.div
                className="inline-block px-3 py-1 rounded-full mb-2"
                style={{
                  backgroundColor: `${colors.secondary}20`,
                  border: `1px solid ${colors.secondary}40`,
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.secondary }}
                >
                  About Us
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold mt-2 leading-tight"
                style={{ color: colors.text }}
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                A Unique Platform For All The{" "}
                <span style={{ color: colors.primary }}>Aspirant-Students</span>
              </motion.h1>

              <div
                className="h-1 w-40 mt-4 rounded-full"
                style={{ backgroundColor: colors.accent }}
              ></div>
            </motion.div>

            <motion.p
              className="leading-relaxed text-[17px]"
              style={{ color: colors.text }}
              variants={itemVariants}
            >
              <span className="font-medium" style={{ color: colors.secondary }}>
                Wetoo Media
              </span>{" "}
              was born out of a deep-rooted passion for{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                supporting underprivileged students
              </span>{" "}
              and marginalized communities. Our founder's journey began with
              volunteer work alongside NGOs and local organizations, focusing on{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                uplifting society through education.
              </span>{" "}
              Despite facing numerous challenges and a lack of initial support,
              the vision to create change remained unwavering. Leveraging the
              power of social media, Wetoo Media emerged as a platform to make a
              tangible impact.{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                Starting in Delhi,
              </span>{" "}
              we assisted students from slum areas in gaining admissions to
              prestigious institutions like Kendriya Vidyalaya (KVS), Jamia
              Millia Islamia, and Aligarh Muslim University (AMU) under the
              Economically Weaker Section (EWS) quota. Beyond admissions, we
              provided books, stationery, and financial aid to students in need,
              reinforcing our commitment to making{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                quality education accessible to all.
              </span>
            </motion.p>

            <motion.p
              className="leading-relaxed text-[17px]"
              style={{ color: colors.text }}
              variants={itemVariants}
            >
              Inspired by a transformative encounter with{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                Junaid Ahmad,
              </span>{" "}
              who secured All India Rank 3 in the UPSC Civil Services
              Examination (CSE) 2018, Wetoo Media expanded its focus to include{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                civil services preparation.
              </span>{" "}
              Over the past five to six years, our channel,{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                Wetoo Media - IAS
              </span>
              , has mentored over 250,000 students, particularly from
              marginalized communities. We provide free coaching{" "}
              <span className="font-medium" style={{ color: colors.secondary }}>
                guidance, exam resources, and counseling
              </span>{" "}
              for UPSC aspirants, with a special emphasis on programs like Jamia
              RCA. Looking ahead, we aim to extend our support to SSC, NEET,
              Judiciary exams, and more, while collaborating with NGOs and
              coaching institutes to offer free coaching through CSR
              initiatives. Our mission is to empower students nationwide through
              affordable, accessible, and impactful digital education.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <div
                className="inline-flex items-center px-5 py-3 rounded-full cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: colors.primary,
                  border: `1px solid ${colors.primary}30`,
                  color: "white",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                }}
              >
                <span className="mr-2 font-medium">
                  Learn more about our services
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16667 10H15.8333"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8333 5L15.8333 10L10.8333 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Metrics Grid - Centered horizontally */}
          <motion.div
            className="flex sm:sticky top-20"
            variants={containerVariants}
          >
            <div className="grid sm:grid-cols-2 gap-5 sticky top-0 auto-rows-min w-full">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="flex justify-center"
                >
                  <Card
                    className={cn(
                      "flex gap-4 p-4 items-center flex-row rounded-lg transition-all duration-300 w-full",
                      "transform-gpu relative overflow-hidden"
                    )}
                    style={{
                      backgroundColor: "white",
                      borderColor:
                        hoveredCard === index
                          ? `${metric.color}50`
                          : "transparent",
                      boxShadow:
                        hoveredCard === index
                          ? `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 2px ${metric.color}30`
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    {/* Decorative corner accent */}
                    <div
                      className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rotate-45"
                      style={{
                        backgroundColor: metric.color,
                        opacity: hoveredCard === index ? 0.15 : 0.05,
                        transition: "opacity 0.3s ease",
                      }}
                    ></div>

                    <motion.div
                      className="rounded-lg p-3 relative z-10"
                      style={{
                        backgroundColor: `${metric.color}15`,
                        color: metric.color,
                      }}
                      animate={
                        hoveredCard === index
                          ? {
                              backgroundColor: `${metric.color}25`,
                              scale: 1.05,
                              rotate: [0, 5, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {metric.icon}
                    </motion.div>

                    <div className="relative z-10">
                      <div
                        className="text-xl font-bold flex items-baseline"
                        style={{ color: metric.color }}
                      >
                        {isVisible ? (
                          <>
                            <CountUpValue
                              value={metric.value}
                              isVisible={isVisible}
                            />
                            {metric.suffix && (
                              <div className="ml-0.5">{metric.suffix}</div>
                            )}
                          </>
                        ) : (
                          <>
                            {metric.value}
                            {metric.suffix && (
                              <div className="ml-0.5">{metric.suffix}</div>
                            )}
                          </>
                        )}
                      </div>
                      <div
                        className="font-medium text-sm"
                        style={{ color: colors.text }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Separate component for count-up animation
function CountUpValue({ value, isVisible }) {
  const [count, setCount] = useState(0);
  const finalValue = Number.parseInt(value, 10) || 0;

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const counterIncrement = finalValue / totalFrames;

    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      const currentCount = Math.floor(progress * finalValue);

      setCount(currentCount);

      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [finalValue, isVisible]);

  return <>{count}</>;
}
