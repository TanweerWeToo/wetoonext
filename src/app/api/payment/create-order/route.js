import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { applicationId } = await request.json();

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Fixed application fee (in paise - ₹499 = 49900 paise)
    const amount = 100; // ₹499
    const currency = 'INR';

    // Create Razorpay order
    const options = {
      amount: amount,
      currency: currency,
      receipt: `app_${applicationId}_${Date.now()}`,
      notes: {
        applicationId: applicationId,
        purpose: 'Course Application Fee',
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}

