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
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    caption: "",
    displayOrder: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/admin/gallery");
      const data = await response.json();

      if (data.success) {
        setImages(data.images);
      } else {
        toast.error("Failed to fetch gallery");
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
      imageUrl: "",
      caption: "",
      displayOrder: 0,
    });
    setSelectedFile(null);
    setEditingImage(null);
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
        uploadFormData.append('folder', 'gallery');

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

      // Check if we have an image URL
      if (!imageUrl) {
        toast.error('Please provide an image URL or upload a file');
        return;
      }

      const payload = {
        imageUrl: imageUrl,
        caption: formData.caption,
        displayOrder: parseInt(formData.displayOrder) || 0,
      };

      const url = "/api/admin/gallery";
      const method = editingImage ? "PUT" : "POST";

      if (editingImage) {
        payload.id = editingImage.id;
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          editingImage ? "Image updated successfully" : "Image added successfully"
        );
        fetchImages();
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

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      imageUrl: image.image_url,
      caption: image.caption || "",
      displayOrder: image.display_order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      const response = await fetch(`/api/admin/gallery?id=${imageToDelete.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Image deleted successfully");
        fetchImages();
        setIsDeleteDialogOpen(false);
        setImageToDelete(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-2">Manage website gallery images</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </Button>
      </div>

      {/* Gallery Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading gallery...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No images found</p>
              <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
                Add Your First Image
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                >
                  <img
                    src={image.image_url}
                    alt={image.caption || "Gallery image"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(image)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setImageToDelete(image);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                      {image.caption}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs">
                    #{image.display_order}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingImage ? "Edit Image" : "Add New Image"}
            </DialogTitle>
            <DialogDescription>
              {editingImage
                ? "Update image information"
                : "Add a new image to the gallery"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Upload Image or Enter URL</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="fileUpload" className="text-sm font-medium">
                      Upload Image File
                    </Label>
                    <Input
                      id="fileUpload"
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
                      placeholder="https://example.com/image.jpg"
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
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
                placeholder="Image description"
              />
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
                Lower numbers appear first in the gallery
              </p>
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
                {isUploading ? "Uploading..." : editingImage ? "Update Image" : "Add Image"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {imageToDelete && (
            <div className="my-4">
              <img
                src={imageToDelete.image_url}
                alt={imageToDelete.caption}
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}
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

