"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import ApplicationPopup from "@/components/ApplicationPopup";

export default function Marquee() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("IAS Mentorship");
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const programs = [
    { text: "JAMIA RCA 30 DAYS GUIDANCE PROGRAM", value: "RCA Guidance Program" },
    { text: "IAS MENTORSHIP, UPSC CSE 2027 (PRELIMS & MAINS)", value: "IAS Mentorship" },
  ];

  if (!isVisible) return null;

  const handleMarqueeClick = (courseValue = "IAS Mentorship") => {
    if (isHomepage) {
      setSelectedCourse(courseValue);
      setIsPopupOpen(true);
    }
  };

  return (
    <>
      <div 
        className={`bg-gradient-to-r from-yellow-500 to-green-600 text-white py-2 overflow-hidden sticky top-0 z-[60] relative ${isHomepage ? 'cursor-pointer' : ''}`}
        onClick={() => handleMarqueeClick()}
      >
        <div className="flex whitespace-nowrap [--gap:1rem]">
          <div className="flex shrink-0 animate-banner [gap:var(--gap)]">
            {[...programs, ...programs, ...programs].map((program, index) => (
              <span 
                key={index} 
                className="px-4 text-sm font-medium hover:text-yellow-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarqueeClick(program.value);
                }}
              >
                🔔 {program.text}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-banner [gap:var(--gap)]">
            {[...programs, ...programs, ...programs].map((program, index) => (
              <span 
                key={`dup-${index}`} 
                className="px-4 text-sm font-medium hover:text-yellow-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarqueeClick(program.value);
                }}
              >
                🔔 {program.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Application Popup - only show on homepage */}
      {isHomepage && (
        <ApplicationPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          courseName={selectedCourse}
          courseFee="2999"
        />
      )}
    </>
  );
}
