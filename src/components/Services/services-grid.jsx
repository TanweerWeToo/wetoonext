import ServiceCard from "@/components/Services/service-card";
import {
  Briefcase,
  Users,
  Newspaper,
  Mic,
  Video,
  Building,
  Laptop,
  PenTool,
  GraduationCap,
} from "lucide-react";

const services = [
  {
    id: "faculty-provider",
    title: "UPSC CSE Faculties",
    description:
      "We provide the best and most experienced CSE faculties for your coaching institute.",
    icon: <Users className="w-8 h-8 text-white" />,
    type: "form",
    formType: "faculty-request",
    cta: "Register Now",
  },
  {
    id: "faculty-join",
    title: "Join as UPSC CSE Faculty",
    description:
      "An opportunity for experienced educators to join our network of esteemed CSE teachers.",
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    type: "form",
    formType: "faculty-join",
    cta: "Apply to Teach",
  },
  {
    id: "test-series",
    title: "UPSC CSE Test Series",
    description:
      "Subject-wise or full-length test series material, branded with your name or coaching name.",
    icon: <Newspaper className="w-8 h-8 text-white" />,
    type: "contact",
  },
  {
    id: "mock-interview",
    title: "UPSC CSE Mock Interview",
    description:
      "Panellists include distinguished serving and retired IAS/IPS officers and bureaucrats.",
    icon: <Briefcase className="w-8 h-8 text-white" />,
    type: "contact",
  },
  {
    id: "studio-setup",
    title: "Studio Setup for Mock Test",
    description:
      "A complete, professional studio setup at your location for high-quality recordings.",
    icon: <Video className="w-8 h-8 text-white" />,
    type: "contact",
  },
  {
    id: "podcast-services",
    title: "Podcast Services",
    description:
      "Engage your audience with our professional podcast interview and production services.",
    icon: <Mic className="w-8 h-8 text-white" />,
    type: "contact",
  },
  {
    id: "coaching-promotion",
    title: "IAS Coaching Promotion",
    description:
      "Promotion on YouTube, Instagram, Telegram & Facebook with professional video shoots.",
    icon: <PenTool className="w-8 h-8 text-white" />,
    type: "contact",
  },
  {
    id: "rca-management",
    title: "RCA Setup & Management",
    description:
      "End-to-end setup and management services for your Residential Coaching Academy (RCA).",
    icon: <Building className="w-8 h-8 text-white" />,
    type: "contact",
  },
  {
    id: "website-lms",
    title: "Website Designing & LMS",
    description:
      "Development of modern, responsive business websites and Learning Management Systems (LMS).",
    icon: <Laptop className="w-8 h-8 text-white" />,
    type: "contact",
  },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div className="relative">
          <ServiceCard key={service.id} service={service} />
        </div>
      ))}
    </div>
  );
}
