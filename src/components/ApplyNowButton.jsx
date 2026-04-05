"use client";

import { useState, useEffect } from "react";
import ApplicationPopup from "./ApplicationPopup";

export default function ApplyNowButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    let timer;
    
    const checkAndShow = () => {
      // Check if the PromoPopup is currently active
      const isPromoActive = sessionStorage.getItem("promo_popup_active");
      
      if (isPromoActive) {
        // If promo is active, check again in 5 seconds
        timer = setTimeout(checkAndShow, 5000);
      } else {
        setIsPopupOpen(true);
      }
    };

    // Auto-open popup after 30 seconds (as requested)
    timer = setTimeout(checkAndShow, 30000);

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
