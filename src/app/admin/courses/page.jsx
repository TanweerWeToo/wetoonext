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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    level: "",
    startDate: "",
    year: new Date().getFullYear().toString(),
    fee: "",
    imageUrl: "",
    category: "",
    isActive: true,
    connected: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses");
      const data = await response.json();

      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error("Failed to fetch courses");
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
      level: "",
      startDate: "",
      year: new Date().getFullYear().toString(),
      fee: "",
      imageUrl: "",
      category: "",
      isActive: true,
      connected: false,
    });
    setSelectedFile(null);
    setCustomCategory("");
    setShowCustomCategory(false);
    setEditingCourse(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      // Clear image URL if file is selected
      setFormData({ ...formData, imageUrl: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.imageUrl;

      // If file is selected, upload it first
      if (selectedFile) {
        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);
        uploadFormData.append('folder', 'courses');

        const uploadResponse = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadData.success) {
          toast.error(uploadData.message || 'Failed to upload image');
          setIsUploading(false);
          return;
        }

        imageUrl = uploadData.url;
        toast.success('Image uploaded successfully');
        setIsUploading(false);
      }

      // Use custom category if "others" is selected
      const finalCategory = formData.category === 'others' ? customCategory : formData.category;

      const payload = {
        title: formData.title,
        level: formData.level,
        startDate: formData.startDate,
        year: formData.year,
        fee: formData.fee,
        imageUrl: imageUrl,
        category: finalCategory,
        isActive: formData.isActive,
        connected: formData.connected,
      };

      const url = "/api/admin/courses";
      const method = editingCourse ? "PUT" : "POST";

      if (editingCourse) {
        payload.id = editingCourse.id;
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          editingCourse
            ? "Course updated successfully"
            : "Course created successfully"
        );
        fetchCourses();
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred");
      setIsUploading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    
    // Check if category is one of the predefined options
    const predefinedCategories = ['rca', 'upsc', 'bpsc'];
    const isPredefined = predefinedCategories.includes(course.category.toLowerCase());
    
    if (!isPredefined) {
      // If custom category, set to "others" and store the actual value
      setFormData({
        title: course.title,
        level: course.level,
        startDate: course.start_date || "",
        year: course.year || "",
        fee: course.fee || "",
        imageUrl: course.image_url || "",
        category: 'others',
        isActive: course.is_active,
        connected: course.connected === 1,
      });
      setCustomCategory(course.category);
      setShowCustomCategory(true);
    } else {
      setFormData({
        title: course.title,
        level: course.level,
        startDate: course.start_date || "",
        year: course.year || "",
        fee: course.fee || "",
        imageUrl: course.image_url || "",
        category: course.category,
        isActive: course.is_active,
        connected: course.connected === 1,
      });
      setCustomCategory("");
      setShowCustomCategory(false);
    }
    
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;

    try {
      const response = await fetch(`/api/admin/courses?id=${courseToDelete.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Course deleted successfully");
        fetchCourses();
        setIsDeleteDialogOpen(false);
        setCourseToDelete(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-2">Manage all courses and batches</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No courses found</p>
              <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
                Add Your First Course
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Form</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell>
                        <img
                          src={course.image_url || "/placeholder.svg"}
                          alt={course.level}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.level}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="uppercase">
                          {course.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.start_date}</TableCell>
                      <TableCell>₹{course.fee}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            course.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {course.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            course.connected
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {course.connected ? "New Popup" : "Old Form"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(course)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              setCourseToDelete(course);
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Course" : "Add New Course"}
            </DialogTitle>
            <DialogDescription>
              {editingCourse
                ? "Update course information"
                : "Fill in the details to create a new course"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level *</Label>
                <Input
                  id="level"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                  placeholder="e.g., RCA Preparation"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData({ ...formData, category: value });
                    if (value === 'others') {
                      setShowCustomCategory(true);
                    } else {
                      setShowCustomCategory(false);
                      setCustomCategory("");
                    }
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rca">RCA</SelectItem>
                    <SelectItem value="upsc">UPSC</SelectItem>
                    <SelectItem value="bpsc">BPSC</SelectItem>
                    <SelectItem value="others">Others (Custom)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showCustomCategory && (
                <div className="space-y-2">
                  <Label htmlFor="customCategory">Custom Category *</Label>
                  <Input
                    id="customCategory"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category name"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Enter a custom category name (e.g., "SSC", "Railway", etc.)
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  placeholder="e.g., 01-05-2025 or —"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">Fee</Label>
                <Input
                  id="fee"
                  value={formData.fee}
                  onChange={(e) =>
                    setFormData({ ...formData, fee: e.target.value })
                  }
                  placeholder="e.g., 299/- or —"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Course Image (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="courseFileUpload" className="text-sm font-medium">
                      Upload Image File
                    </Label>
                    <Input
                      id="courseFileUpload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max 5MB • JPEG, PNG, GIF, WebP
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  
                  <div>
                    <Label htmlFor="imageUrl" className="text-sm font-medium">
                      Image URL
                    </Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, imageUrl: e.target.value });
                        setSelectedFile(null);
                      }}
                      placeholder="https://example.com/course-image.jpg"
                      disabled={selectedFile !== null || isUploading}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-blue-800">
                    📎 Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                </div>
              )}
              
              {(formData.imageUrl || selectedFile) && (
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={selectedFile ? URL.createObjectURL(selectedFile) : formData.imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
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
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="connected"
                  checked={formData.connected}
                  onChange={(e) =>
                    setFormData({ ...formData, connected: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <Label htmlFor="connected" className="cursor-pointer">
                  Use ApplicationPopup (if unchecked, shows old registration form)
                </Label>
              </div>
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
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : editingCourse ? "Update Course" : "Create Course"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{courseToDelete?.level}"? This
              action cannot be undone.
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

