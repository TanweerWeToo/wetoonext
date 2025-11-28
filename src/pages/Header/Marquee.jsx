"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import ApplicationPopup from "@/components/ApplicationPopup";

export default function Marquee() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  if (!isVisible) return null;

  const handleMarqueeClick = () => {
    if (isHomepage) {
      setIsPopupOpen(true);
    }
  };

  return (
    <>
      <div 
        className={`bg-gradient-to-r from-yellow-500 to-green-600 text-white py-2 overflow-hidden sticky top-0 z-[60] relative ${isHomepage ? 'cursor-pointer' : ''}`}
        onClick={handleMarqueeClick}
      >
        {/* <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 z-10 p-1 rounded-full transition-colors transform -translate-y-1/2 bg-yellow-500/80"
          aria-label="Close marquee"
        >
          <X className="w-4 h-4 text-green-600" />
        </button> */}
        <div className="flex pr-8 whitespace-nowrap animate-banner [--gap:1rem]">
        <div className="flex shrink-0 animate-banner [gap:var(--gap)]">
          <span className="px-4 text-sm font-medium">
            🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
          </span>
          <span className="px-4 text-sm font-medium">
            🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
          </span>
          <span className="px-4 text-sm font-medium">
            🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
          </span>
          <span className="px-4 text-sm font-medium">
            🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
          </span>
          <span className="px-4 text-sm font-medium">
            🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
          </span>
          <span className="px-4 text-sm font-medium">
            🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
          </span>
        </div>
        <div className="flex shrink-0 animate-banner [gap:var(--gap)]">
        <span className="px-4 text-sm font-medium">
          🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
        </span>
        <span className="px-4 text-sm font-medium">
          🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
        </span>
        <span className="px-4 text-sm font-medium">
          🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
        </span>
        <span className="px-4 text-sm font-medium">
          🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
        </span>
        <span className="px-4 text-sm font-medium">
          🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
        </span>
        <span className="px-4 text-sm font-medium">
          🔔 Register here for IAS MENTORSHIP PROGRAM, Starting from 15th Dec
        </span>
        </div>
        </div>
      </div>
      
      {/* Application Popup - only show on homepage */}
      {isHomepage && (
        <ApplicationPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          courseName="IAS Mentorship"
          courseFee="2999"
        />
      )}
    </>
  );
}
