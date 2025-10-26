"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  GraduationCap,
  Handshake,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
const hero = "/TanveerSir.webp";
import Link from "next/link";
const about1 = "/Landing/about1.webp";
const about2 = "/Landing/about2.webp";
const about3 = "/Landing/about3.webp";
const about4 = "/Landing/about4.webp";
const about5 = "/Landing/about5.webp";
const about6 = "/Landing/about5+md.webp";
const jamia = "/Landing/jamia.webp";

// Compact CountUp component
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const startVal = 0;
    const endVal = end;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(
        progress * (endVal - startVal) + startVal
      );

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const videoSectionRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate testimonial highlights
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);

    // Detect when stats section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      clearInterval(interval);
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Animated stats
  const stats = [
    {
      number: "5",
      label: "Years Guiding Dreams",
      delay: "0",
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      number: "250",
      label: "Students Empowering Futures",
      delay: "150",
      icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      number: "100",
      label: "Partners Building Trust",
      delay: "300",
      icon: <Handshake className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const [lightboxImage, setLightboxImage] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImage("");
  };

  // Close lightbox when clicking outside the image
  const handleLightboxClick = (e) => {
    if (e.target.classList.contains("lightbox")) {
      closeLightbox();
    }
  };

  return (
    <section
      id="hero"
      className="bg-primary text-white px-5 md:px-8 pb-10 pt-[164px] md:pb-16 md:pt-[188px] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 flex flex-wrap gap-1.5 md:gap-12 lg:gap-16 sm:justify-center">
          {[
            // "RCA",
            { label: "COACHING & CLASSES", link: "/academy" },
            { label: "WETOOMEDIA SERVICES", link: "/services" },
            { label: "CIVIL SERVANT MATRIMONIAL", link: "/matrimonial" },
            // "MORE"
          ].map((item, idx) => (
            <Link key={idx} href={item.link}>
              <Button
                className="relative overflow-hidden bg-gradient-to-br from-accent px-4 sm:px-8 lg:px-20 via-accent to-accent/80 hover:from-secondary hover:via-secondary/90 hover:to-secondary/70 text-white rounded py-0 h-9 sm:h-12 text-xs sm:text-lg  font-medium group transition-all duration-300 shadow-md shadow-accent/20 hover:shadow-secondary/30 hover:shadow-lg border border-accent/20 hover:border-secondary/20"
                style={{
                  transitionDelay: `${idx * 100}ms`,
                  animation: `fadeSlideIn 0.5s ease-out ${
                    idx * 100 + 600
                  }ms both`,
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
        {/* Main Content - Responsive layout with entrance animations */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-16 mb-10 md:mb-14">
          {/* Left Column */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 md:mb-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></div>
              <p className="text-white/90 text-xs font-medium group-hover:text-white transition-colors">
                Taiyari Karo, Sarkari Bano!
              </p>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6">
              WeToo Media{" "}
              <span className="text-secondary relative inline-block">
                Empower Futures!
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary/30 rounded-full transition-all duration-1000"
                  style={{ width: isVisible ? "100%" : "0%" }}
                ></span>
                <span className="absolute top-0 -right-5 w-5 h-5 text-secondary">
                  <Star className="w-full h-full fill-secondary hidden md:block animate-spin-slow" />
                </span>
              </span>
              {/* <br className="hidden md:block" />
              <span className="relative">
                {" "}
                Digital Agency
                <span
                  className="absolute -bottom-1 right-0 w-0 h-0.5 bg-white/30 rounded-full transition-all duration-1000"
                  style={{
                    width: isVisible ? "52%" : "0%",
                    transitionDelay: "0.5s",
                  }}
                ></span>
              </span> */}
            </h1>

            {/* Sleeker buttons with reduced height and width */}
            <div className="flex flex-wrap gap-3 items-center">
              <a href="#programs">
                <Button className="relative overflow-hidden bg-gradient-to-br from-accent via-accent to-accent/80 hover:from-accent hover:via-accent/90 hover:to-accent/70 text-white rounded-full px-5 py-0 h-9 text-sm font-medium group transition-all duration-300 shadow-md shadow-accent/20 hover:shadow-accent/30 hover:shadow-lg border border-accent/20">
                  <span className="relative z-10 flex items-center">
                    Register Now
                    <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Button>
              </a>

              <Link href="/services">
                <Button
                  variant="outline"
                  className="relative overflow-hidden bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-full px-5 py-0 h-9 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:border-white/40 group"
                >
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="mr-1.5 w-3 h-3 text-secondary/80 group-hover:text-secondary transition-colors duration-300" />
                    Our Services
                    <span className="relative ml-1.5 w-3.5 h-3.5 overflow-hidden">
                      <ArrowRight className="absolute transform translate-x-0 group-hover:translate-x-8 transition-transform duration-300" />
                      <ArrowRight className="absolute transform -translate-x-8 group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                  </span>
                </Button>
              </Link>
            </div>

            {/* Animated testimonial highlights - more compact */}
            <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 overflow-hidden relative h-12">
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {[
                  {
                    text: "WeToo Media's guidance was a game-changer—helped me crack RCA with confidence.",
                    author: "Tauheed Siddiqui, RCA Selected",
                  },
                  {
                    text: "Immense gratitude to WeToo Media for providing the right direction and resources!",
                    author: "Rozi Parveen, RCA Selected",
                  },
                  {
                    text: "Thanks to WeToo Media’s interview guidance, I secured my dream selection!",
                    author: "Dawood Shaikh, RCA Selected",
                  },
                ].map((testimonial, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 h-12">
                    <CheckCircle className="text-secondary w-4 h-4 flex-shrink-0" />
                    <div>
                      <p className="text-white/90 text-xs">
                        {testimonial.text}
                      </p>
                      <p className="text-white/60 text-[10px]">
                        {testimonial.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicator dots */}
              <div className="absolute bottom-1 right-2 flex gap-1">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "bg-secondary w-2" : "bg-white/30"
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            className={`w-full lg:w-1/2 sm:mt-6 lg:mt-0 transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-white/90 text-base md:text-[17px] leading-relaxed mb-6 max-w-xl">
              Our journey began with a passion for{" "}
              <span className="text-secondary font-medium">
                supporting underprivileged students
              </span>{" "}
              marginalized communities. Over the years, we have worked
              tirelessly to provide{" "}
              <span className="text-secondary font-medium">
                guidance, resources, and support
              </span>{" "}
              to help students gain admission to prestigious institutions and
              prepare for competitive exams like{" "}
              <span className="text-secondary font-medium">
                UPSC CSE,NEET & Judiciary examinations.
              </span>
            </p>

            {/* Compact statistics section with reduced height */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 ${
                    statsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-secondary">{stat.icon}</div>
                    <span className="text-2xl sm:text-3xl font-bold flex items-center justify-center">
                      <CountUp
                        end={Number.parseInt(
                          stat.number.replace(/[^0-9]/g, "")
                        )}
                      />
                      <span className="text-secondary text-2xl">+</span>
                    </span>
                  </div>
                  <p className="text-xs text-center text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Animated skill tags - more compact */}
            {/* <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                "RCA",
                "BPSC",
                "UPSC",
                "CIVIL SERVANT MATRIMONIAL",
                // "MORE"
              ].map((skill, idx) => (
                <a key={idx} href="#programs">
                  <Button
                    className="relative overflow-hidden bg-gradient-to-br from-secondary px-5 sm:px-8 lg:px-9 via-secondary to-secondary/80 hover:from-secondary hover:via-secondary/90 hover:to-secondary/70 text-white rounded-full py-0 h-9 text-xs sm:text-sm  font-medium group transition-all duration-300 shadow-md shadow-secondary/20 hover:shadow-secondary/30 hover:shadow-lg border border-secondary/20"
                    style={{
                      transitionDelay: `${idx * 100}ms`,
                      animation: `fadeSlideIn 0.5s ease-out ${
                        idx * 100 + 600
                      }ms both`,
                    }}
                  >
                    {skill}
                  </Button>
                </a>
              ))}
            </div> */}
          </div>
        </div>

        {/* Team Image Section - Positioned to be partially visible */}
        <style>
          {`
                  .lightbox {
                    display: none;
                    position: fixed;
                    z-index: 999;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    background-color: rgba(0, 0, 0, 0.8);
                  }
                  .lightbox.active {
                    display: flex;
                  }
                  .lightbox-image {
                    display: block;
                    margin: auto;
                    max-width: 100%;
                    max-height: 100%;
                  }
                  .close {
                    color: #fff;
                    font-size: 3em;
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    cursor: pointer;
                  }
                  .gallery {
                    width: 90vw;
                    // max-width: 1200px;
                    margin: 0 auto;
                    grid-template-rows: 1fr;
                    grid-column-gap: 30px;
                    grid-row-gap: 30px;
                  }
                  .gallery img {
                    max-width: 100%;
                    cursor: pointer;
                  }
                  .gallery img:hover {
                    max-width: 100%;
                    cursor: pointer;
                  }
                `}
        </style>
        <section className="">
          <div className="gallery max-w-7xl mx-auto">
            <div className="flex flex-col mb-10">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:mb-11 mb-7">
                <div className="aspect-square w-full rounded-xl">
                  <img
                    src={about1}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(about1)}
                  />
                </div>
                <div className="aspect-square w-full rounded-xl">
                  <img
                    src={about4}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(about4)}
                  />
                </div>
                <div className="aspect-square w-full rounded-xl">
                  <img
                    src={about2}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(about2)}
                  />
                </div>
                <div className="block sm:hidden aspect-square w-full rounded-xl">
                  <img
                    src={about5}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(about5)}
                  />
                </div>
                <div className="block sm:hidden aspect-square w-full rounded-xl">
                  <img
                    src={jamia}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(jamia)}
                  />
                </div>
                <div className="block sm:hidden aspect-square w-full rounded-xl">
                  <img
                    src={about3}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(about3)}
                  />
                </div>
              </div>
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="aspect-square w-full rounded-xl">
                  <img
                    src={about5}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(about5)}
                  />
                </div>
                <div className="aspect-square w-full rounded-xl">
                  <img
                    src={jamia}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(jamia)}
                  />
                </div>
                <div className="aspect-square w-full rounded-xl">
                  <img
                    src={about3}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                    onClick={() => openLightbox(about3)}
                  />
                </div>
              </div>
              {/* <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 md:h-[404px] aspect-square w-full rounded-xl">
                  <img
                    src={about2}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full"
                    onClick={() => openLightbox(about2)}
                  />
                </div>
                <div className="md:col-span-8 md:h-[404px] aspect-square w-full rounded-xl">
                  <img
                    src={about3}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full block md:hidden"
                    onClick={() => openLightbox(about3)}
                  />
                  <img
                    src={about6}
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-xl transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full md:block hidden"
                    onClick={() => openLightbox(about6)}
                  />
                </div>
              </div> */}
            </div>
          </div>

          <div
            className={`lightbox ${isLightboxOpen ? "active" : ""}`}
            onClick={handleLightboxClick}
          >
            <span className="close" onClick={closeLightbox}>
              &times;
            </span>
            <img src={lightboxImage} alt="" className="lightbox-image" />
          </div>
        </section>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-ripple {
          animation: ripple 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
