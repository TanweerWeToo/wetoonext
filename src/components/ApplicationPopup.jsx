"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ApplicationPopup({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    father_name: "",
    email: "",
    mobile: "",
    dob: "",
    state: "",
    degree: "",
    subject: "",
    grad_year: "",
    optional_paper: "",
    comments: "",
    course_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (applicationId) => {
    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        return;
      }

      // Create Razorpay order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        toast.error(orderData.message || "Failed to create payment order");
        return;
      }

      // Configure Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "WeToo Media",
        description: "Course Application Fee",
        order_id: orderData.orderId,
        handler: async function (response) {
          // Verify payment
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              applicationId: applicationId,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            toast.success("Payment successful! Application submitted.");
            onClose();
            // Reset form
            setFormData({
              full_name: "",
              father_name: "",
              email: "",
              mobile: "",
              dob: "",
              state: "",
              degree: "",
              subject: "",
              grad_year: "",
              optional_paper: "",
              comments: "",
              course_name: "",
            });
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#10b981",
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
            setIsSubmitting(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit application
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Initiate payment
        await handlePayment(data.applicationId);
      } else {
        toast.error(data.message || "Failed to submit application");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Registration Form
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Please fill in your details to register for{" "}
            <span className="text-emerald-600 font-medium">
              {formData.course_name || "your selected course"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Course Selection */}
          <div className="space-y-2">
            <Label htmlFor="course_name" className="text-sm font-medium text-gray-700">
              Select Course <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.course_name}
              onValueChange={(value) => handleSelectChange("course_name", value)}
              required
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
                <SelectItem value="RCA Preparation">RCA Preparation</SelectItem>
                <SelectItem value="IAS Mentorship">IAS Mentorship</SelectItem>
                <SelectItem value="CSE Foundation">CSE Foundation</SelectItem>
                <SelectItem value="RCA Guidance Program">RCA Guidance Program</SelectItem>
                <SelectItem value="CSE & RCA Essay Master Class">CSE & RCA Essay Master Class</SelectItem>
                <SelectItem value="CSE & RCA CSAT Master Class">CSE & RCA CSAT Master Class</SelectItem>
                <SelectItem value="Communication Enhancement Program">Communication Enhancement Program</SelectItem>
                <SelectItem value="Analytical Enhancement Program">Analytical Enhancement Program</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Father's Name */}
          <div className="space-y-2">
            <Label htmlFor="father_name" className="text-sm font-medium text-gray-700">
              Father's Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="father_name"
              name="father_name"
              type="text"
              value={formData.father_name}
              onChange={handleChange}
              placeholder="Enter your father's name"
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Valid mobile number (10 digits)"
              pattern="[0-9]{10}"
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleSelectChange("state", value)}
              required
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
                <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                <SelectItem value="Assam">Assam</SelectItem>
                <SelectItem value="Bihar">Bihar</SelectItem>
                <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                <SelectItem value="Goa">Goa</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
                <SelectItem value="Haryana">Haryana</SelectItem>
                <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Kerala">Kerala</SelectItem>
                <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Manipur">Manipur</SelectItem>
                <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                <SelectItem value="Mizoram">Mizoram</SelectItem>
                <SelectItem value="Nagaland">Nagaland</SelectItem>
                <SelectItem value="Odisha">Odisha</SelectItem>
                <SelectItem value="Punjab">Punjab</SelectItem>
                <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                <SelectItem value="Sikkim">Sikkim</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                <SelectItem value="Telangana">Telangana</SelectItem>
                <SelectItem value="Tripura">Tripura</SelectItem>
                <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                <SelectItem value="West Bengal">West Bengal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recent Degree/Course Completed */}
          <div className="space-y-2">
            <Label htmlFor="degree" className="text-sm font-medium text-gray-700">
              Recent Degree/Course Completed <span className="text-red-500">*</span>
            </Label>
            <Input
              id="degree"
              name="degree"
              type="text"
              value={formData.degree}
              onChange={handleChange}
              placeholder="e.g., B.Tech, BA, BSc"
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Major subject"
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Year of Passing */}
          <div className="space-y-2">
            <Label htmlFor="grad_year" className="text-sm font-medium text-gray-700">
              Year of Passing <span className="text-red-500">*</span>
            </Label>
            <Input
              id="grad_year"
              name="grad_year"
              type="text"
              value={formData.grad_year}
              onChange={handleChange}
              placeholder="e.g., 2024"
              pattern="[0-9]{4}"
              required
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Optional Paper */}
          <div className="space-y-2">
            <Label htmlFor="optional_paper" className="text-sm font-medium text-gray-700">
              Optional Paper (if applicable)
            </Label>
            <Input
              id="optional_paper"
              name="optional_paper"
              type="text"
              value={formData.optional_paper}
              onChange={handleChange}
              placeholder="Optional subject"
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Additional Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments" className="text-sm font-medium text-gray-700">
              Additional Comments
            </Label>
            <Textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Any additional information..."
              rows={3}
              className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-gray-600">
              Application Fee:{" "}
              <span className="font-semibold text-lg text-emerald-600">₹499</span>
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
