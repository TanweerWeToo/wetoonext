import React from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  GraduationCap,
  Sparkles,
  Contact,
  Play,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    trigger: "Home",
    path: "/",
    icon: <Home className="w-4 h-4 mr-2" />,
    isRoute: true,
  },
  {
    trigger: "About",
    path: "#about",
    icon: <Building2 className="w-4 h-4 mr-2" />,
    isRoute: false,
  },
  {
    trigger: "Programs",
    path: "#programs",
    icon: <GraduationCap className="w-4 h-4 mr-2" />,
    isRoute: false,
  },
  {
    trigger: "Services",
    path: "/services",
    icon: <Settings className="w-4 h-4 mr-2" />,
    isRoute: true,
  },
  {
    trigger: "Testimonials",
    path: "#testimonials",
    icon: <Sparkles className="w-4 h-4 mr-2" />,
    isRoute: false,
  },
  {
    trigger: "Youtube",
    path: "#youtube",
    icon: <Play className="w-4 h-4 mr-2" />,
    isRoute: false,
  },
  {
    trigger: "Contact",
    path: "#contact",
    icon: <Contact className="w-4 h-4 mr-2" />,
    isRoute: false,
  },
];

const MainNav = ({ isScrolled, isServicesPage, isResumePaymentPage }) => {
  const router = useRouter();

  const handleClick = (e, targetId) => {
    e.preventDefault();

    // If we're not on the home page, navigate there first
    if (window.location.pathname !== "/") {
      router.push("/");
      // Wait for navigation to complete, then scroll to target
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If already on home page, just scroll to target
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Determine text color based on services page, resume payment page, or scroll state
  const getTextColor = () => {
    if (isServicesPage || isResumePaymentPage) return "text-black";
    if (isScrolled) return "text-black";
    return "text-white";
  };

  return (
    <nav className="hidden lg:block">
      <ul className="relative z-20 flex space-x-6">
        {menuItems.map((menu) => (
          <li
            key={menu.trigger}
            className={`relative group text-sm hover:text-secondary duration-300 transition-all cursor-pointer hover:-translate-y-1`}
          >
            {menu.isRoute ? (
              <Link
                href={menu.path}
                className={`text-foreground hover:text-secondary ${getTextColor()}`}
              >
                <motion.div
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`flex items-center hover:text-secondary duration-100 transition-all cursor-pointer hover:-translate-y-1 p-2 rounded-md hover:bg-gray-100 font-serif text-base ${getTextColor()}`}
                >
                  {menu.icon}
                  {menu.trigger}
                </motion.div>
              </Link>
            ) : (
              <a
                href={menu.path}
                onClick={(e) => handleClick(e, menu.path)}
                className={`text-foreground hover:text-secondary ${getTextColor()}`}
              >
                <motion.div
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`flex items-center hover:text-secondary duration-100 transition-all cursor-pointer hover:-translate-y-1 p-2 rounded-md hover:bg-gray-100 font-serif text-base ${getTextColor()}`}
                >
                  {menu.icon}
                  {menu.trigger}
                </motion.div>
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
