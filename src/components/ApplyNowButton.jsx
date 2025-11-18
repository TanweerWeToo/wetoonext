"use client";

import { useState, useEffect } from "react";
import ApplicationPopup from "./ApplicationPopup";

export default function ApplyNowButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Auto-open popup after 3 seconds
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Application Popup */}
      <ApplicationPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
}
