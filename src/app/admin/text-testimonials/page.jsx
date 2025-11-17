"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { MessageSquare, Plus, Edit, Trash2, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const AVATAR_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#8B5CF6", // Purple
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#F97316", // Orange
];

export default function TextTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    rating: 5,
    testimonial: "",
    avatarColor: "#3B82F6",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/text-testimonials");
      const data = await response.json();

      if (data.success) {
        setTestimonials(data.testimonials);
      } else {
        toast.error("Failed to fetch testimonials");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        subtitle: testimonial.subtitle || "",
        rating: testimonial.rating,
        testimonial: testimonial.testimonial,
        avatarColor: testimonial.avatar_color,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: "",
        subtitle: "",
        rating: 5,
        testimonial: "",
        avatarColor: "#3B82F6",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = "/api/admin/text-testimonials";
      const method = editingTestimonial ? "PUT" : "POST";
      const body = editingTestimonial
        ? { ...formData, id: editingTestimonial.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          editingTestimonial
            ? "Testimonial updated successfully"
            : "Testimonial created successfully"
        );
        setIsDialogOpen(false);
        fetchTestimonials();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;

    try {
      const response = await fetch(
        `/api/admin/text-testimonials?id=${testimonialToDelete.id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Testimonial deleted successfully");
        fetchTestimonials();
        setIsDeleteDialogOpen(false);
        setTestimonialToDelete(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete testimonial");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Text Testimonials</h1>
              <p className="text-purple-100 text-sm">Manage student reviews and feedback</p>
            </div>
          </div>
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-white text-purple-700 hover:bg-purple-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Testimonials</p>
                <p className="text-3xl font-bold text-slate-800">{testimonials.length}</p>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>All Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-600 mx-auto mb-3" />
                <p className="text-slate-600">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 mb-2">No testimonials yet</p>
                <Button onClick={() => handleOpenDialog()} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Testimonial
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subtitle</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Testimonial</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback
                                style={{ backgroundColor: testimonial.avatar_color }}
                                className="text-white font-semibold"
                              >
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{testimonial.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {testimonial.subtitle || "-"}
                        </TableCell>
                        <TableCell>{renderStars(testimonial.rating)}</TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm text-slate-600 truncate">
                            {testimonial.testimonial}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {new Date(testimonial.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDialog(testimonial)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => {
                                setTestimonialToDelete(testimonial);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {editingTestimonial
                ? "Update the testimonial details below"
                : "Fill in the details to create a new testimonial"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="e.g., Priya Sharma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="e.g., RCA Selected Candidate 2024"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Select
                  value={String(formData.rating)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, rating: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <SelectItem key={rating} value={String(rating)}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatarColor">Avatar Color</Label>
                <Select
                  value={formData.avatarColor}
                  onValueChange={(value) =>
                    setFormData({ ...formData, avatarColor: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVATAR_COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                          {color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial">Testimonial *</Label>
              <Textarea
                id="testimonial"
                value={formData.testimonial}
                onChange={(e) =>
                  setFormData({ ...formData, testimonial: e.target.value })
                }
                required
                placeholder="Enter the testimonial text..."
                rows={5}
              />
            </div>

            {/* Preview */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-medium text-slate-500 mb-3">Preview</p>
              <div className="flex gap-3">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback
                    style={{ backgroundColor: formData.avatarColor }}
                    className="text-white font-semibold text-lg"
                  >
                    {formData.name.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{formData.name || "Name"}</div>
                  <div className="text-sm text-slate-500 mb-2">
                    {formData.subtitle || "Subtitle"}
                  </div>
                  {renderStars(formData.rating)}
                  <p className="text-sm text-slate-600 mt-2">
                    {formData.testimonial || "Testimonial text will appear here..."}
                  </p>
                </div>
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
                ) : editingTestimonial ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

