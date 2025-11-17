"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Youtube, TrendingUp, Eye, Video, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function YouTubeStatsPage() {
  const [stats, setStats] = useState({
    subscribers: "",
    totalViews: "",
    videosCount: "",
    highestSingleVideoViews: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/youtube-stats");
      const data = await response.json();

      if (data.success && data.stats) {
        setStats({
          subscribers: data.stats.subscribers,
          totalViews: data.stats.total_views,
          videosCount: data.stats.videos_count,
          highestSingleVideoViews: data.stats.highest_single_video_views,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch YouTube stats");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/youtube-stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("YouTube stats updated successfully");
      } else {
        toast.error(data.message || "Failed to update stats");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setStats((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-600 mx-auto mb-3" />
          <p className="text-slate-600">Loading YouTube stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Youtube className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">YouTube Stats</h1>
            <p className="text-red-100 text-sm">Manage your YouTube channel statistics</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none shadow-md bg-gradient-to-br from-red-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Youtube className="w-5 h-5 text-red-600" />
                <span className="text-xs font-medium text-slate-500">Subscribers</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.subscribers || "N/A"}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-slate-500">Total Views</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.totalViews || "N/A"}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none shadow-md bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Video className="w-5 h-5 text-purple-600" />
                <span className="text-xs font-medium text-slate-500">Videos Count</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.videosCount || "N/A"}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-none shadow-md bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-medium text-slate-500">Top Video Views</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.highestSingleVideoViews || "N/A"}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Update YouTube Statistics</CardTitle>
            <CardDescription>
              Enter your latest YouTube channel statistics (e.g., "10K+", "1M+", "500+")
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subscribers" className="text-slate-700 font-medium">
                    Subscribers
                  </Label>
                  <Input
                    id="subscribers"
                    value={stats.subscribers}
                    onChange={(e) => handleChange("subscribers", e.target.value)}
                    placeholder="e.g., 10K+"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalViews" className="text-slate-700 font-medium">
                    Total Views
                  </Label>
                  <Input
                    id="totalViews"
                    value={stats.totalViews}
                    onChange={(e) => handleChange("totalViews", e.target.value)}
                    placeholder="e.g., 1M+"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videosCount" className="text-slate-700 font-medium">
                    Videos Count
                  </Label>
                  <Input
                    id="videosCount"
                    value={stats.videosCount}
                    onChange={(e) => handleChange("videosCount", e.target.value)}
                    placeholder="e.g., 150+"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highestViews" className="text-slate-700 font-medium">
                    Highest Single Video Views
                  </Label>
                  <Input
                    id="highestViews"
                    value={stats.highestSingleVideoViews}
                    onChange={(e) => handleChange("highestSingleVideoViews", e.target.value)}
                    placeholder="e.g., 50K+"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-6"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Update Stats"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={fetchStats}
                  disabled={isSaving}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Youtube className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Formatting Tips</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Use formats like "10K+", "1M+", "500+" for better readability</li>
                  <li>• Keep numbers consistent across your website</li>
                  <li>• Update these stats regularly to show growth</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

