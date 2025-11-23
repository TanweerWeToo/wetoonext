import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
// import { navlinks } from "./navData";
// import { Link } from "react-router-dom";
import { useRouter } from "next/navigation";

const navlinks = [
  {
    name: "Home",
    path: "/",
    isRoute: true,
  },
  {
    name: "About",
    path: "#about",
    isRoute: false,
  },
  {
    name: "Programs",
    path: "#programs",
    isRoute: false,
  },
  {
    name: "Services",
    path: "/services",
    isRoute: true,
  },
  {
    name: "Testimonials",
    path: "#testimonials",
    isRoute: false,
  },
  {
    name: "Youtube",
    path: "#youtube",
    isRoute: false,
  },
  {
    name: "Contact",
    path: "#contact",
    isRoute: false,
  },
];

const Drawer = ({ isScrolled, isServicesPage, isResumePaymentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
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

    setIsOpen(false);
  };

  // Determine button text color based on services page, resume payment page, or scroll state
  const getButtonTextColor = () => {
    if (isServicesPage || isResumePaymentPage) return "text-black";
    if (isScrolled) return "text-black";
    return "text-white";
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden block">
        <button className={`p-2 rounded lg:hidden ${getButtonTextColor()}`}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="bg-primary/50 backdrop-blur-sm overflow-auto border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl font-bold text-left">
            We Too Media
          </SheetTitle>
          <SheetDescription className="text-white text-left pt-5">
            <nav>
              <ul className="space-y-1">
                {navlinks.map((item, index) => (
                  <li key={index}>
                    {item.isRoute ? (
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-4 font-semibold text-white tracking-wider hover:bg-white/10 rounded transition-colors"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.path}
                        onClick={(e) => handleClick(e, item.path)}
                        className="block py-2 px-4 font-semibold text-white tracking-wider hover:bg-white/10 rounded transition-colors"
                      >
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
