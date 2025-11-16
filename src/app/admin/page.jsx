"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Image as ImageIcon, MessageSquare, TrendingUp, Users, ArrowUpRight, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

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
      href: "/admin/applications",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: stats.courses,
      icon: BookOpen,
      href: "/admin/courses",
      gradient: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Gallery Images",
      value: stats.gallery,
      icon: ImageIcon,
      href: "/admin/gallery",
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      href: "/admin/testimonials",
      gradient: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const quickActions = [
    {
      title: "View Applications",
      description: "Manage student registrations",
      icon: FileText,
      href: "/admin/applications",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Manage Courses",
      description: "Add or edit courses",
      icon: BookOpen,
      href: "/admin/courses",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Update Gallery",
      description: "Manage website images",
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Testimonials",
      description: "Manage YouTube videos",
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Program Impact",
      description: "Update success metrics",
      icon: TrendingUp,
      href: "/admin/program-impact",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, Admin! 👋</h1>
            <p className="text-slate-300 text-sm">Here's what's happening with your website today.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link href={card.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-none bg-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${card.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${card.iconColor}`} />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      {isLoading ? (
                        <div className="h-8 w-20 bg-slate-200 animate-pulse rounded mb-2"></div>
                      ) : (
                        <div className="text-3xl font-bold text-slate-800 mb-1">
                          {card.value}
                        </div>
                      )}
                      <p className="text-sm text-slate-500 font-medium">{card.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Quick Actions</CardTitle>
            <p className="text-sm text-slate-500">Manage your content efficiently</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <Link href={action.href}>
                      <div className="group flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                        <div className={`${action.bgColor} p-2.5 rounded-lg group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-800 text-sm mb-0.5">{action.title}</h3>
                          <p className="text-xs text-slate-500">{action.description}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Activity tracking coming soon</p>
              <p className="text-slate-400 text-xs mt-1">Monitor your admin actions and changes</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

