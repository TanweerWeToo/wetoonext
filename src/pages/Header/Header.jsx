"use client";

import MainNav from "@/pages/Header/MainNav";
import Drawer from "@/pages/Header/Drawer";
import TopBar from "@/pages/Header/TopBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Marquee from "./Marquee";

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're on the services page or resume-payment page
  const isServicesPage = pathname === "/services";
  const isResumePaymentPage = pathname === "/resume-payment";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const heroHeight = window.innerHeight / 2; // Half of viewport height

      // Add delay using setTimeout
      setTimeout(() => {
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setIsScrolled(currentScrollPos > heroHeight);
        setPrevScrollPos(currentScrollPos);
      }, 100); // 100ms delay
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Determine navbar styling based on route and scroll state
  const getNavbarStyling = () => {
    if (isServicesPage || isResumePaymentPage) {
      return "bg-white text-black shadow-md";
    }
    if (isScrolled) {
      return "bg-white/70 text-black";
    }
    return "bg-transparent text-white";
  };

  return (
    <>
      <Marquee />
      <header
        className={`shadow-sm z-50 backdrop-blur-sm transition-all duration-500 fixed w-full ${
          isVisible ? "top-8 translate-y-0" : "-translate-y-full"
        } ${getNavbarStyling()}`}
      >
        <TopBar />
        <div className="sm:container md:max-w-6xl lg:max-w-[1400px] mx-auto py-1">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center overflow-hidden">
              <img
                src="/wetoo-logo.jpg"
                alt="Wetoo Logo"
                className="p-2 rounded-full h-[70px]"
              />
              <span
                className={`text-base font-bold ${
                  isServicesPage || isResumePaymentPage ? "text-black" : ""
                }`}
              >
                WETOO MEDIA <br /> FOUNDATION
              </span>
            </Link>
            <MainNav
              isScrolled={isScrolled}
              isServicesPage={isServicesPage}
              isResumePaymentPage={isResumePaymentPage}
            />
            <Drawer
              isScrolled={isScrolled}
              isServicesPage={isServicesPage}
              isResumePaymentPage={isResumePaymentPage}
            />
          </div>
        </div>
      </header>
    </>
  );
}
