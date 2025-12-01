"use client";

import { useState, useEffect } from "react";
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

export default function ApplicationPopup({
  isOpen,
  onClose,
  courseName = "",
  courseFee = "2999",
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    father_name: "",
    email: "",
    mobile: "",
    dob: "",
    state: "",
    degree: "",
    medium: "",
    batch_year: "",
    optional_paper: "",
    prelims_cleared: "",
    mains_cleared: "",
    course_name: courseName,
  });

  // Update course_name in formData when courseName prop changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, course_name: courseName }));
  }, [courseName]);

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
              medium: "",
              batch_year: "",
              optional_paper: "",
              prelims_cleared: "",
              mains_cleared: "",
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

      // Close the ApplicationPopup before opening Razorpay
      onClose();
      
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
            Please fill in your details to register for the course
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Course Selection */}
          <div className="space-y-2">
            <Label
              htmlFor="course_name"
              className="text-sm font-medium text-gray-700"
            >
              Select Course <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.course_name}
              onValueChange={(value) =>
                handleSelectChange("course_name", value)
              }
              required
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-[300px] overflow-y-auto"
              >
                <SelectItem value="IAS Mentorship">IAS Mentorship</SelectItem>
                <SelectItem disabled value="RCA Preparation">
                  RCA Preparation
                </SelectItem>
                <SelectItem disabled value="CSE Foundation">
                  CSE Foundation
                </SelectItem>
                <SelectItem disabled value="RCA Guidance Program">
                  RCA Guidance Program
                </SelectItem>
                <SelectItem disabled value="CSE & RCA Essay Master Class">
                  CSE & RCA Essay Master Class
                </SelectItem>
                <SelectItem disabled value="CSE & RCA CSAT Master Class">
                  CSE & RCA CSAT Master Class
                </SelectItem>
                <SelectItem disabled value="Communication Enhancement Program">
                  Communication Enhancement Program
                </SelectItem>
                <SelectItem disabled value="Analytical Enhancement Program">
                  Analytical Enhancement Program
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="full_name"
              className="text-sm font-medium text-gray-700"
            >
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
            <Label
              htmlFor="father_name"
              className="text-sm font-medium text-gray-700"
            >
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
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
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
            <Label
              htmlFor="mobile"
              className="text-sm font-medium text-gray-700"
            >
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
            <Label
              htmlFor="state"
              className="text-sm font-medium text-gray-700"
            >
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
              <SelectContent
                position="popper"
                className="max-h-[300px] overflow-y-auto"
              >
                <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                <SelectItem value="Arunachal Pradesh">
                  Arunachal Pradesh
                </SelectItem>
                <SelectItem value="Assam">Assam</SelectItem>
                <SelectItem value="Bihar">Bihar</SelectItem>
                <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                <SelectItem value="Goa">Goa</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
                <SelectItem value="Haryana">Haryana</SelectItem>
                <SelectItem value="Himachal Pradesh">
                  Himachal Pradesh
                </SelectItem>
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
            <Label
              htmlFor="degree"
              className="text-sm font-medium text-gray-700"
            >
              Recent Degree/Course Completed{" "}
              <span className="text-red-500">*</span>
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

          {/* Your Medium */}
          <div className="space-y-2">
            <Label
              htmlFor="medium"
              className="text-sm font-medium text-gray-700"
            >
              Your Medium <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.medium}
              onValueChange={(value) => handleSelectChange("medium", value)}
              required
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select your medium" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-[300px] overflow-y-auto"
              >
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applying for CSE Prelims Mentorship Batch */}
          <div className="space-y-2">
            <Label
              htmlFor="batch_year"
              className="text-sm font-medium text-gray-700"
            >
              Applying for CSE Prelims Mentorship Batch{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.batch_year}
              onValueChange={(value) => handleSelectChange("batch_year", value)}
              required
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select batch year" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-[300px] overflow-y-auto"
              >
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="2028">2028</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Optional Paper */}
          <div className="space-y-2">
            <Label
              htmlFor="optional_paper"
              className="text-sm font-medium text-gray-700"
            >
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

          {/* Number of Prelims Cleared */}
          <div className="space-y-2">
            <Label
              htmlFor="prelims_cleared"
              className="text-sm font-medium text-gray-700"
            >
              Number of Prelims Cleared (0–6)
            </Label>
            <Select
              value={formData.prelims_cleared}
              onValueChange={(value) => handleSelectChange("prelims_cleared", value)}
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select number of prelims cleared" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-[300px] overflow-y-auto"
              >
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Mains Cleared */}
          <div className="space-y-2">
            <Label
              htmlFor="mains_cleared"
              className="text-sm font-medium text-gray-700"
            >
              Number of Mains Cleared (0–6)
            </Label>
            <Select
              value={formData.mains_cleared}
              onValueChange={(value) => handleSelectChange("mains_cleared", value)}
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select number of mains cleared" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-[300px] overflow-y-auto"
              >
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-gray-600">
              Platform Charge:{"  "}
              <span className="font-semibold text-lg text-emerald-600">
                ₹{courseFee}/-
              </span>
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
