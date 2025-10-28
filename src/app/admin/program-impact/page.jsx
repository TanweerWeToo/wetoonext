"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, TrendingUp, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgramImpactPage() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  const [formData, setFormData] = useState({
    metricName: "",
    metricValue: "",
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

  const handleEdit = (metric) => {
    setEditingMetric(metric);
    setFormData({
      metricName: metric.metric_name,
      metricValue: metric.metric_value,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingMetric) return;

    try {
      const response = await fetch("/api/admin/program-impact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingMetric.id,
          metricName: formData.metricName,
          metricValue: formData.metricValue,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Metric updated successfully");
        fetchMetrics();
        setIsDialogOpen(false);
        setEditingMetric(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update metric");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Program Impact</h1>
        <p className="text-gray-600 mt-2">
          Update success metrics displayed on the website
        </p>
      </div>

      {/* Metrics Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading metrics...</p>
        </div>
      ) : metrics.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No metrics found</p>
            <p className="text-sm text-gray-500 mt-2">
              Run the database schema to create default metrics
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    {metric.metric_name}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(metric)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {metric.metric_value}
                  </div>
                  <p className="text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(metric.updated_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                About Program Impact Metrics
              </h3>
              <p className="text-sm text-blue-700">
                These metrics are displayed on your website's Program Impact
                section. Update them regularly to showcase your latest achievements
                and success stories. Click the edit icon on any card to modify the
                values.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Metric</DialogTitle>
            <DialogDescription>
              Update the metric name and value
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metricName">Metric Name *</Label>
              <Input
                id="metricName"
                value={formData.metricName}
                onChange={(e) =>
                  setFormData({ ...formData, metricName: e.target.value })
                }
                placeholder="e.g., Students Mentored"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metricValue">Metric Value *</Label>
              <Input
                id="metricValue"
                value={formData.metricValue}
                onChange={(e) =>
                  setFormData({ ...formData, metricValue: e.target.value })
                }
                placeholder="e.g., 500+"
                required
              />
              <p className="text-xs text-gray-500">
                You can use numbers with + symbol (e.g., 1000+, 98%)
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Preview:</strong>
              </p>
              <div className="mt-2">
                <div className="text-3xl font-bold text-primary">
                  {formData.metricValue || "500+"}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {formData.metricName || "Metric Name"}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

