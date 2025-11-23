"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumePaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicationId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [expired, setExpired] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  useEffect(() => {
    if (!applicationId) {
      setError("Invalid payment link");
      setIsLoading(false);
      return;
    }

    fetchApplicationDetails();
  }, [applicationId]);

  const fetchApplicationDetails = async () => {
    try {
      const response = await fetch(`/api/payment/resume?id=${applicationId}`);
      const data = await response.json();

      if (data.success) {
        setApplication(data.application);
      } else {
        if (data.expired) {
          setExpired(true);
        } else if (data.alreadyPaid) {
          setAlreadyPaid(true);
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load application details");
    } finally {
      setIsLoading(false);
    }
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

  const handleResumePayment = async () => {
    setIsProcessing(true);

    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        setIsProcessing(false);
        return;
      }

      // If no existing order, create new one
      let orderId = application.razorpayOrderId;
      
      if (!orderId) {
        const orderResponse = await fetch("/api/payment/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationId: application.id }),
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          toast.error(orderData.message || "Failed to create payment order");
          setIsProcessing(false);
          return;
        }

        orderId = orderData.orderId;
      }

      // Configure Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 299900, // ₹2999 in paise
        currency: "INR",
        name: "WeToo Media",
        description: "Course Application Fee",
        order_id: orderId,
        handler: async function (response) {
          // Verify payment
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              applicationId: application.id,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            toast.success("Payment successful! Welcome to WeToo Media.");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          } else {
            toast.error("Payment verification failed. Please contact support.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: application.fullName,
          email: application.email,
          contact: application.mobile,
        },
        theme: {
          color: "#10b981",
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment");
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Clock className="w-16 h-16 text-orange-500" />
            </div>
            <CardTitle className="text-center text-2xl">Payment Link Expired</CardTitle>
            <CardDescription className="text-center">
              This payment link has expired for security reasons.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Please contact our support team to generate a new payment link.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (alreadyPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">Payment Already Completed</CardTitle>
            <CardDescription className="text-center">
              Your payment has already been processed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Check your email for the welcome message with enrollment details.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <CardTitle className="text-center text-2xl">Error</CardTitle>
            <CardDescription className="text-center">{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-white px-4 py-12 pt-[170px]">
      <Card className="max-w-lg w-full shadow-xl">
        <CardHeader className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
          <CardTitle className="text-center text-3xl">Complete Your Payment</CardTitle>
          <CardDescription className="text-center text-emerald-50 mt-2">
            You're just one step away from joining the course!
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">Application Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{application?.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{application?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium">{application?.courseName} </span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Amount to Pay:</span>
                <span className="text-3xl font-bold text-emerald-600">₹2,999/-</span>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-sm text-yellow-800">
                <strong>⚡ Limited Time Offer!</strong> Secure your seat now before the batch fills up.
              </p>
            </div>
          </div>

          <Button
            onClick={handleResumePayment}
            disabled={isProcessing}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "💳 Pay Now"
            )}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            🔒 Secure payment powered by Razorpay
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

