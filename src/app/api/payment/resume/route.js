// API Route to resume payment for pending applications
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('id');

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Fetch application details
    const applications = await query(
      `SELECT 
        id, 
        full_name, 
        email, 
        mobile, 
        course_name, 
        payment_status, 
        razorpay_order_id,
        payment_link_expires_at
       FROM applications 
       WHERE id = ?`,
      [applicationId]
    );

    if (applications.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    const application = applications[0];

    // Check if payment link has expired
    if (application.payment_link_expires_at) {
      const expiryDate = new Date(application.payment_link_expires_at);
      const now = new Date();
      
      if (now > expiryDate) {
        return NextResponse.json(
          { success: false, message: 'Payment link has expired', expired: true },
          { status: 410 }
        );
      }
    }

    // Check if payment is already completed
    if (application.payment_status === 'PAID') {
      return NextResponse.json(
        { success: false, message: 'Payment already completed', alreadyPaid: true },
        { status: 400 }
      );
    }

    // Return application details for resume payment
    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        fullName: application.full_name,
        email: application.email,
        mobile: application.mobile,
        courseName: application.course_name,
        paymentStatus: application.payment_status,
        razorpayOrderId: application.razorpay_order_id,
      },
    });
  } catch (error) {
    console.error('Resume payment fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch application details' },
      { status: 500 }
    );
  }
}

