"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ApplicationPopup from "./ApplicationPopup";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAppPopupOpen, setIsAppPopupOpen] = useState(false);

  useEffect(() => {
    // Show after 6 seconds on every visit/reload
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Signal to other popups that a promo is active
      // This helps coordinate with ApplyNowButton
      sessionStorage.setItem("promo_popup_active", "true");
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.removeItem("promo_popup_active");
  };

  const handleImageClick = () => {
    setIsOpen(false);
    setIsAppPopupOpen(true);
    sessionStorage.removeItem("promo_popup_active");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-20 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all duration-300"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Content */}
              <div 
                className="cursor-pointer group relative overflow-hidden"
                onClick={handleImageClick}
              >
                <img
                  src="/image-popup.jpeg"
                  alt="RCA Guidance Program"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <span className="bg-white text-primary px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Register Now
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ApplicationPopup
        isOpen={isAppPopupOpen}
        onClose={() => setIsAppPopupOpen(false)}
        courseName="RCA Guidance Program"
        courseFee="2999"
      />
    </>
  );
}
