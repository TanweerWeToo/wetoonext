const logo = "/wetoo-logo.jpg";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const telegram = "/telegram.png";
const whatsapp = "/whatsapp.png";
// import { Link } from "react-router-dom"
// import aicteapprovals from "@/assets/footer/SSIM-AICTE-EOA-1992-2023.pdf"
import { Input } from "@/components/ui/input";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const footerSections = [
    // {
    //   label: "Blog/News",
    //   items: [
    //     { name: "UPSC Preparation Strategy", path: "/#" },
    //     {
    //       name: "Syllabus & Study Techniques",
    //       path: "/#",
    //     },
    //     {
    //       name: "Current Affairs & Government Schemes",
    //       path: "/#",
    //     },
    //     {
    //       name: "Success & Interview Guidance",
    //       path: "/#",
    //     },
    //   ],
    // },
    {
      label: "Quick Links",
      items: [
        { name: "Home", path: "#hero", isScroll: true },
        { name: "About", path: "#about", isScroll: true },
        { name: "Programs", path: "#programs", isScroll: true },
        { name: "Testimonials", path: "#testimonials", isScroll: true },
        { name: "YouTube", path: "#youtube", isScroll: true },
        { name: "Contact", path: "#contact", isScroll: true },
      ],
    },
    {
      label: "Upcomings",
      items: [
        { name: "Upcoming Event 1", path: "/#" },
        { name: "Upcoming Event 2", path: "/#" },
        { name: "Upcoming Event 3", path: "/#" },
        { name: "Upcoming Event 4", path: "/#" },
        { name: "Upcoming Event 5", path: "/#" },
      ],
    },
    {
      label: "Matrimonial",
      items: [
        { name: "Create Profile", path: "/#" },
        { name: "Browse Profiles", path: "/#" },
        { name: "Success Stories", path: "/#" },
        { name: "Premium Membership", path: "/#" },
      ],
    },
    {
      label: "Contact Us",
      items: [
        { name: "Head Office - Delhi", path: "/#" },
        { name: "+91 9773573083", path: "tel:+919773573083" },
        { name: "www.wetoomedia.com", path: "https://www.wetoomedia.com" },
        { name: "wetoo.media@gmail.com", path: "mailto:wetoo.media@gmail.com" },
      ],
    },
  ];

  return (
    <footer className="relative bg-primary pt-16 pb-10 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
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

      <div className="sm:container relative mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Logo and Social Section */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <a
                href="/"
                className="flex items-center gap-3 group rounded-full overflow-hidden"
                onClick={scrollToTop}
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Wetoo Logo"
                  className="h-14 cursor-pointer rounded-full w-auto transition-transform group-hover:scale-95"
                />
                <span className="text-base text-white font-bold">
                  We Too Media
                </span>
              </a>
              <div className="flex gap-3">
                {[
                  {
                    icon: telegram,
                    // bgColor: "bg-blue-600",
                    label: "Telegram",
                    href: "https://t.me/sfwm786",
                  },
                  {
                    icon: Instagram,
                    bgColor: "bg-pink-600",
                    label: "Instagram",
                    href: "https://www.instagram.com/wetoomedia/",
                  },
                  {
                    icon: whatsapp,
                    bgColor: "bg-green-600",
                    label: "WhatsApp",
                    href: "https://whatsapp.com/channel/0029VaEhTCNHrDZknwlN5p0F",
                  },
                  // {
                  //   icon: Linkedin,
                  //   bgColor: "bg-blue-700",
                  //   label: "LinkedIn",
                  //   href: "#",
                  // },
                  {
                    icon: Youtube,
                    bgColor: "bg-red-600",
                    label: "YouTube",
                    href: "www.youtube.com/@WeTooMedia-IAS",
                  },
                ].map((social, index) => (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      key={index}
                      size="icon"
                      className={`rounded-full transition-all hover:scale-110 text-white ${social.bgColor} hover:bg-${social.bgColor}/80`}
                      aria-label={social.label}
                    >
                      {social.label === "Telegram" ||
                      social.label === "WhatsApp" ? (
                        <img
                          src={
                            social.label === "Telegram" ? telegram : whatsapp
                          }
                          alt={social.label}
                          className="h-10 w-10"
                        />
                      ) : (
                        <social.icon className="h-5 w-5" />
                      )}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-white font-medium mb-3">
                24/7 Helpline Number
              </p>
              <a href="tel:+919773573083">
                <Button className="gap-2 bg-secondary text-white rounded-full hover:bg-secondary/80 hover:text-white/80 transition-colors">
                  <Phone className="h-4 w-4" />
                  +919773573083
                </Button>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.label} className="space-y-6">
                <h3 className="text-lg font-semibold text-secondary tracking-wide">
                  {section.label}
                </h3>
                <ul className="space-y-3 text-base">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      {item.path.startsWith("https:") ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-white/90 hover:text-white/80 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      ) : item.path.startsWith("mailto:") ||
                        item.path.startsWith("tel:") ? (
                        <a
                          href={item.path}
                          className="group inline-flex items-center gap-1 text-white/90 hover:text-white/80 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      ) : item.isScroll ? (
                        <a
                          href={item.path}
                          onClick={(e) => {
                            e.preventDefault();
                            const sectionId = item.path.replace("#", "");
                            scrollToSection(sectionId);
                          }}
                          className="group inline-flex items-center gap-1 text-white/90 hover:text-white/80 transition-colors duration-200 cursor-pointer"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <a
                          href={item.path}
                          onClick={scrollToTop}
                          className="group inline-flex items-center gap-1 text-white/90 hover:text-white/80 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-secondary/10 hover:border-secondary/80 transition-all duration-300 transform  border-secondary shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <h3 className="text-xl font-semibold text-white mb-2">
                Stay Updated with SSIM
              </h3>
              <p className="text-white/60">
                Stay updated with our latest news and events
              </p>
            </div>
            <div className="lg:col-span-4">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 border-accent/80 focus:border-accent focus:ring-accent"
                  required
                />
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-white font-medium"
                >
                  Subscribe
                </Button>
              </form>
              {/* <p className="text-xs text-[#293794]/70 mt-2">
                By subscribing, you agree to our privacy policy. We respect your privacy and will never share your
                information.
              </p> */}
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-secondary" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-base text-muted-foreground">
          <p className="text-white/80">
            Copyright © SSIM {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="hover:text-secondary text-white/80 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="hover:text-secondary text-white/80 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
