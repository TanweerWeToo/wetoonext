"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Testimonial from "@/pages/Home/Testimonial";

const ProgramImpact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const impactStats = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Highest Success Rate",
      description:
        "Many candidates have successfully cleared RCA interviews with WeToo Media's guidance.",
      value: "98%",
      color: "from-primary to-primary/70",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Candidates Selected",
      description:
        "Proven track record of success with multiple testimonials in 2024.",
      value: "17+",
      color: "from-secondary to-secondary/70",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Aspirants Benefited",
      description:
        "Students have relied on WeToo Media for interview preparation and expert coaching.",
      value: "1000+",
      color: "from-accent to-accent/70",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Comprehensive Guidance",
      description:
        "Supporting candidates from written exams to interview success for RCA & UPSC.",
      value: "100%",
      color: "from-primary/80 to-secondary/80",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      position: "RCA Selected Candidate",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "WeToo Media's guidance was instrumental in my RCA interview success. Their mock interviews were exactly like the real thing!",
    },
    {
      name: "Rahul Verma",
      position: "UPSC Selected Candidate",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The comprehensive preparation material and expert coaching helped me secure my dream position. Highly recommended!",
    },
    {
      name: "Ananya Patel",
      position: "RCA Selected Candidate",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "From written exam to final interview, WeToo Media provided exceptional support at every step of my journey.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-background/90">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-accent/10 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">Proven Results</span>
              <Star className="h-4 w-4 fill-primary text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Our Program Impact
          </h2>
          <p className="text-text text-lg max-w-2xl mx-auto">
            Join thousands of successful candidates who have transformed their
            careers with WeToo Media's expert guidance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card className="border-none overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center text-center">
                    {/* <div
                      className={`mb-6 rounded-full p-4 bg-gradient-to-br ${stat.color} text-white`}
                    >
                      {stat.icon}
                    </div> */}
                    <div className="text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <h3 className="text-xl font-bold text-primary/90 mb-3">
                      {stat.title}
                    </h3>
                    <p className="text-text/80">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-16"
        >
          <Testimonial />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl transform rotate-1 scale-[1.03] opacity-20"></div>
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-10 md:p-12 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join Our Success Story?
              </h3>
              <p className="mb-8 max-w-2xl mx-auto text-white/90 text-lg">
                Take the first step towards your dream career. Our proven
                methodology and expert guidance will help you ace your
                interviews and secure your desired position.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Personalized Coaching</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Mock Interviews</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Study Materials</span>
                </div>
              </div>

              <a href="#programs">
                <Button className="bg-accent hover:bg-accent/90 text-white font-bold py-6 px-10 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                  Enroll Now <ArrowRight className="h-5 w-5" />
                </Button>
              </a>

              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="flex -space-x-2">
                  {["jack", "jill", "jane", "john"].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={`https://avatar.vercel.sh/${i + 1}`}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/80">
                  Join <span className="font-bold">1,000+</span> successful
                  students
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-medium mb-2">
            Limited Time Offer
          </div>
          <p className="text-lg font-semibold text-primary">
            Only <span className="text-accent font-bold">few seats</span>{" "}
            remaining for our next batch!
          </p>
          <p className="text-text/80 mt-2">
            Enrollment closes on 30th April, 2025. Don't miss this opportunity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramImpact;
