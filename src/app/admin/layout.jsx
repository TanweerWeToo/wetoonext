"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Menu,
  X,
  LogOut,
  User,
  ChevronRight,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    title: "Video Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    title: "Text Testimonials",
    href: "/admin/text-testimonials",
    icon: MessageSquare,
  },
  {
    title: "Program Impact",
    href: "/admin/program-impact-new",
    icon: TrendingUp,
  },
  {
    title: "YouTube Stats",
    href: "/admin/youtube-stats",
    icon: Youtube,
  },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/auth/me");
      const data = await response.json();

      if (data.success) {
        setAdmin(data.user);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  // If on login page, render without layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-lg font-semibold text-slate-800">WeToo Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hover:bg-gray-100"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={false}
          animate={{
            x: isDesktop || isSidebarOpen ? 0 : "-100%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 lg:translate-x-0"
        >
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">W</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">WeToo Admin</h1>
                  <p className="text-xs text-slate-500">Management Panel</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-slate-800 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                          <span className="font-medium text-sm">{item.title}</span>
                        </div>
                        {isActive && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-slate-800 text-white text-sm font-semibold">
                    {admin?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{admin?.name || "Admin"}</p>
                  <p className="text-xs text-slate-500 truncate">{admin?.email || ""}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 hidden lg:block">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {menuItems.find(item => item.href === pathname)?.title || "Dashboard"}
              </h2>
              <p className="text-sm text-slate-500">Manage your website content</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-slate-600">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 pt-20 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

