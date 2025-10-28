"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Youtube, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    videoId: "",
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
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

  const resetForm = () => {
    setFormData({
      title: "",
      videoId: "",
      displayOrder: 0,
      isActive: true,
    });
    setEditingTestimonial(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      videoId: formData.videoId,
      displayOrder: parseInt(formData.displayOrder) || 0,
      isActive: formData.isActive,
    };

    try {
      const url = "/api/admin/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      if (editingTestimonial) {
        payload.id = editingTestimonial.id;
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          editingTestimonial
            ? "Testimonial updated successfully"
            : "Testimonial added successfully"
        );
        fetchTestimonials();
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred");
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      title: testimonial.title,
      videoId: testimonial.video_id,
      displayOrder: testimonial.display_order || 0,
      isActive: testimonial.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;

    try {
      const response = await fetch(
        `/api/admin/testimonials?id=${testimonialToDelete.id}`,
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

  const extractVideoId = (input) => {
    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?]+)/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }

    // If no pattern matches, assume it's already a video ID
    return input;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-2">
            Manage YouTube video testimonials
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <Youtube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No testimonials found</p>
              <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
                Add Your First Testimonial
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Video ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">
                        {testimonial.id}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://www.youtube.com/watch?v=${testimonial.video_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative w-24 h-16 rounded overflow-hidden group"
                        >
                          <img
                            src={`https://img.youtube.com/vi/${testimonial.video_id}/mqdefault.jpg`}
                            alt={testimonial.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </a>
                      </TableCell>
                      <TableCell>{testimonial.title}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {testimonial.video_id}
                        </code>
                      </TableCell>
                      <TableCell>{testimonial.display_order}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            testimonial.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {testimonial.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(testimonial)}
                          >
                            <Pencil className="w-4 h-4" />
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {editingTestimonial
                ? "Update testimonial information"
                : "Add a new YouTube testimonial video"}
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
                placeholder="Testimonial 1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoId">YouTube Video ID or URL *</Label>
              <Input
                id="videoId"
                value={formData.videoId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    videoId: extractVideoId(e.target.value),
                  })
                }
                placeholder="CzIH8M0a3SI or full YouTube URL"
                required
              />
              <p className="text-xs text-gray-500">
                Enter the video ID or paste the full YouTube URL
              </p>
              {formData.videoId && (
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${formData.videoId}/mqdefault.jpg`}
                    alt="Video preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({ ...formData, displayOrder: e.target.value })
                }
                placeholder="0"
              />
              <p className="text-xs text-gray-500">
                Lower numbers appear first in the carousel
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active (visible on website)
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
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
              Are you sure you want to delete "{testimonialToDelete?.title}"?
              This action cannot be undone.
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

