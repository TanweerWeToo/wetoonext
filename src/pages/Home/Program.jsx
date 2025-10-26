"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
const rca = "/Landing/Jamia logo.png";
const upsc = "/Landing/UPSC logo.webp";
const bpsc = "/Landing/BPSC logo img.jpg";
import RegistrationForm from "@/components/registration-form";
export default function Program() {
  const [activeTab, setActiveTab] = useState("all");

  const courses = [
    {
      id: 1,
      title: "New Batch",
      level: "RCA Preparation",
      startDate: "01-05-2025",
      year: "2025",
      fee: "299/-",
      image: rca,
      category: "rca",
    },
    {
      id: 2,
      title: "New Batch",
      level: "UPSC Preparation",
      startDate: "—",
      year: "2025",
      fee: "—",
      image: upsc,
      category: "upsc",
    },
    {
      id: 3,
      title: "New Batch",
      level: "BPSC Preparation",
      startDate: "—",
      year: "2025",
      fee: "—",
      image: bpsc,
      category: "bpsc",
    },
    // {
    //   id: 4,
    //   title: "New Batch",
    //   level: "RCA Preparation",
    //   startDate: "01-04-2025",
    //   year: "2025",
    //   fee: "—",
    //   image: rca,
    //   category: "rca",
    // },
    // {
    //   id: 5,
    //   title: "New Batch",
    //   level: "UPSC/PSC Preparation",
    //   startDate: "—",
    //   year: "2025",
    //   fee: "—",
    //   image: upsc,
    //   category: "upsc",
    // },
    // {
    //   id: 6,
    //   title: "New Batch",
    //   level: "BPSC Preparation",
    //   startDate: "—",
    //   year: "2025",
    //   fee: "—",
    //   image: bpsc,
    //   category: "bpsc",
    // },
  ];

  const filteredCourses =
    activeTab === "all"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  return (
    <section
      id="programs"
      className="bg-primary text-white px-5 md:px-8 py-10 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: "#2A4E6E" }}
    >
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
      <div className="container mx-auto px-4 z-20">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">
          Join our latest batches
        </h2>

        <div className="flex justify-center mb-8 relative z-20">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl"
          >
            <TabsList className="grid grid-cols-4 bg-white/20">
              <TabsTrigger
                value="rca"
                className="data-[state=active]:bg-white data-[state=active]:text-[#2A4E6E] text-white"
              >
                RCA
              </TabsTrigger>
              <TabsTrigger
                value="upsc"
                className="data-[state=active]:bg-white data-[state=active]:text-[#2A4E6E] text-white"
              >
                UPSC
              </TabsTrigger>
              <TabsTrigger
                value="bpsc"
                className="data-[state=active]:bg-white data-[state=active]:text-[#2A4E6E] text-white"
              >
                BPSC
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-white data-[state=active]:text-[#2A4E6E] text-white"
              >
                Show All
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex flex-col xl:flex-row gap-5 sm:gap-10">
                <div className="w-full xl:w-1/2 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-full xl:w-1/2 flex flex-col text-white justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="font-medium mt-1 text-white/70">
                      {course.level}
                    </p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-white/70">
                        <span className="font-medium">Start Date:</span>{" "}
                        {course.startDate}
                      </p>
                      <p className="text-sm text-white/70">
                        <span className="font-medium">Year:</span> {course.year}
                      </p>
                      <p className="text-sm text-white/70">
                        <span className="font-medium">Fee:</span> ₹{course.fee}
                      </p>
                    </div>
                  </div>
                  <RegistrationForm
                    courseName={course.level}
                    fee={course.fee}
                    // courseColor={course.category === "rca" ? "blue" : course.category === "upsc" ? "emerald" : "orange"}
                  />
                  {/* <Button className="mt-4 bg-[#CC5500] hover:bg-[#CC5500]/80 text-white w-full">
                    Enroll <ArrowRight className="ml-2 h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
