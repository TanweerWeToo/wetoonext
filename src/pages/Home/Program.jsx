"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import RegistrationForm from "@/components/registration-form";
import ApplicationPopup from "@/components/ApplicationPopup";

export default function Program() {
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isApplicationPopupOpen, setIsApplicationPopupOpen] = useState(false);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        
        if (data.success && data.courses) {
          // Transform API data to match component structure
          const transformedCourses = data.courses.map((course) => ({
            id: course.id,
            title: course.title,
            level: course.level,
            startDate: course.start_date || "—",
            year: course.year || "—",
            fee: course.fee || "—",
            image: course.image_url,
            category: course.category ? course.category.toLowerCase() : "other",
            connected: course.connected === 1,
          }));
          
          setCourses(transformedCourses);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(transformedCourses.map(c => c.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses =
    activeTab === "all"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  const handleRegisterClick = (course) => {
    setSelectedCourse(course);
    if (course.connected) {
      setIsApplicationPopupOpen(true);
    }
    // If not connected, RegistrationForm will handle its own dialog
  };

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

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-white text-xl font-medium">No courses available</p>
            <p className="text-white/60 mt-2">Check back soon for new batches!</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-8 relative z-20">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full max-w-3xl"
              >
                <TabsList 
                  className="bg-white/20"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${categories.length + 1}, minmax(0, 1fr))`
                  }}
                >
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-white data-[state=active]:text-[#2A4E6E] text-white"
                    >
                      {category.toUpperCase()}
                    </TabsTrigger>
                  ))}
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
                      {course.connected ? (
                        <Button 
                          className="w-full mt-3 max-[767.5px]:mt-0 gap-5! bg-accent hover:bg-accent/80 text-white"
                          onClick={() => handleRegisterClick(course)}
                        >
                          Register Now <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <RegistrationForm
                          courseName={course.level}
                          fee={course.fee}
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* ApplicationPopup for connected courses */}
      {selectedCourse && selectedCourse.connected && (
        <ApplicationPopup
          isOpen={isApplicationPopupOpen}
          onClose={() => {
            setIsApplicationPopupOpen(false);
            setSelectedCourse(null);
          }}
          courseName={selectedCourse.level}
          courseFee={selectedCourse.fee}
        />
      )}
    </section>
  );
}
