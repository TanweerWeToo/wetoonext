"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { TrendingUp, Edit, Loader2, Award, Users, Target, Clock } from "lucide-react";
import { motion } from "framer-motion";

const METRIC_ICONS = {
  1: Award,
  2: Users,
  3: Target,
  4: Clock,
};

const METRIC_COLORS = {
  1: { gradient: "from-emerald-500 to-emerald-600", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  2: { gradient: "from-blue-500 to-blue-600", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  3: { gradient: "from-purple-500 to-purple-600", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  4: { gradient: "from-orange-500 to-orange-600", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
};

export default function ProgramImpactPage() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    description: "",
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/admin/program-impact");
      const data = await response.json();

      if (data.success) {
        setMetrics(data.metrics);
      } else {
        toast.error("Failed to fetch metrics");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (metric) => {
    setEditingMetric(metric);
    setFormData({
      title: metric.title,
      value: metric.value,
      description: metric.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/program-impact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingMetric.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Metric updated successfully");
        setIsDialogOpen(false);
        fetchMetrics();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-600 mx-auto mb-3" />
          <p className="text-slate-600">Loading program impact metrics...</p>
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
        className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Program Impact</h1>
            <p className="text-indigo-100 text-sm">Manage your success metrics and achievements</p>
          </div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-indigo-200 bg-indigo-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-indigo-900 mb-1">Fixed Metrics Section</h3>
                <p className="text-sm text-indigo-700">
                  This section contains exactly 4 metrics that showcase your program's success. 
                  You can edit each metric's title, value, and description, but cannot add or delete metrics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = METRIC_ICONS[metric.id] || Award;
          const colors = METRIC_COLORS[metric.id] || METRIC_COLORS[1];

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${colors.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenDialog(metric)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-4xl font-bold text-slate-800 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-lg font-semibold text-slate-700">
                        {metric.title}
                      </div>
                    </div>
                    
                    {metric.description && (
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {metric.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>
              This is how your metrics will appear on the main website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-8 border border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.id} className="text-center">
                    <div className="text-3xl font-bold text-slate-800 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      {metric.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Metric</DialogTitle>
            <DialogDescription>
              Update the details for this program impact metric
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="e.g., Success Rate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                required
                placeholder="e.g., 98%, 1000+, 150+"
              />
              <p className="text-xs text-slate-500">
                Use formats like "98%", "1000+", or "5+" for better readability
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optional: Add a brief description"
                rows={3}
              />
            </div>

            {/* Preview in dialog */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-medium text-slate-500 mb-3">Preview</p>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {formData.value || "Value"}
                </div>
                <div className="text-sm font-medium text-slate-600 mb-2">
                  {formData.title || "Title"}
                </div>
                {formData.description && (
                  <p className="text-xs text-slate-500">
                    {formData.description}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Metric"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

