"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Image as ImageIcon, MessageSquare, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    applications: 0,
    courses: 0,
    gallery: 0,
    testimonials: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [applicationsRes, coursesRes, galleryRes, testimonialsRes] = await Promise.all([
        fetch("/api/admin/applications"),
        fetch("/api/admin/courses"),
        fetch("/api/admin/gallery"),
        fetch("/api/admin/testimonials"),
      ]);

      const [applicationsData, coursesData, galleryData, testimonialsData] = await Promise.all([
        applicationsRes.json(),
        coursesRes.json(),
        galleryRes.json(),
        testimonialsRes.json(),
      ]);

      setStats({
        applications: applicationsData.success ? applicationsData.applications.length : 0,
        courses: coursesData.success ? coursesData.courses.length : 0,
        gallery: galleryData.success ? galleryData.images.length : 0,
        testimonials: testimonialsData.success ? testimonialsData.testimonials.length : 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Applications",
      value: stats.applications,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Courses",
      value: stats.courses,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Gallery Images",
      value: stats.gallery,
      icon: ImageIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.bgColor} ${card.color} p-3 rounded-full`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {isLoading ? (
                      <div className="h-9 w-16 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      card.value
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/applications"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium">View Applications</h3>
                <p className="text-sm text-gray-600">Manage student registrations</p>
              </div>
            </a>

            <a
              href="/admin/courses"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium">Manage Courses</h3>
                <p className="text-sm text-gray-600">Add or edit courses</p>
              </div>
            </a>

            <a
              href="/admin/gallery"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium">Update Gallery</h3>
                <p className="text-sm text-gray-600">Manage website images</p>
              </div>
            </a>

            <a
              href="/admin/testimonials"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium">Testimonials</h3>
                <p className="text-sm text-gray-600">Manage YouTube videos</p>
              </div>
            </a>

            <a
              href="/admin/program-impact"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium">Program Impact</h3>
                <p className="text-sm text-gray-600">Update success metrics</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

