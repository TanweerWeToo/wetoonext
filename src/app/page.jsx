import Hero from "@/pages/Home/Hero";
import About from "@/pages/Home/About";
import YoutubeTestimonial from "@/pages/Home/YoutubeTestimonial";
import Youtube from "@/pages/Home/Youtube";
import YoutubeVideos from "@/pages/Home/YoutubeVideos";
import ProgramImpact from "@/pages/Home/ProgramImpact";
import Program from "@/pages/Home/Program";
import Contact from "@/pages/Home/Contact";
import ApplyNowButton from "@/components/ApplyNowButton";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <YoutubeTestimonial />
      <Youtube />
      <YoutubeVideos />
      <Program />
      <ProgramImpact />
      <Contact />
      <ApplyNowButton />
    </>
  );
}
