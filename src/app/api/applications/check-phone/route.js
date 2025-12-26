// API endpoint to check if phone number is already registered
// Returns payment status and existing data if found
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const { mobile, courseName } = await request.json();

    if (!mobile || !courseName) {
      return NextResponse.json(
        { success: false, message: 'Mobile number and course name are required' },
        { status: 400 }
      );
    }

    // Check if mobile number exists for this course
    const existing = await query(
      'SELECT id, payment_status, full_name, father_name, email, dob, state, degree, medium, batch_year, optional_paper, prelims_cleared, mains_cleared FROM applications WHERE mobile = ? AND course_name = ?',
      [mobile, courseName]
    );

    if (existing.length === 0) {
      return NextResponse.json({
        success: true,
        exists: false,
        message: 'Phone number is available'
      });
    }

    const existingApp = existing[0];

    // If payment status is 'paid', return error
    if (existingApp.payment_status === 'paid') {
      return NextResponse.json({
        success: false,
        exists: true,
        paymentStatus: 'paid',
        message: 'This mobile number is already registered for this course'
      });
    }

    // If payment status is 'pending', 'cancelled', or 'expired', return existing data
    return NextResponse.json({
      success: true,
      exists: true,
      paymentStatus: existingApp.payment_status,
      applicationId: existingApp.id,
      existingData: {
        full_name: existingApp.full_name,
        father_name: existingApp.father_name,
        email: existingApp.email,
        dob: existingApp.dob,
        state: existingApp.state,
        degree: existingApp.degree,
        medium: existingApp.medium,
        batch_year: existingApp.batch_year,
        optional_paper: existingApp.optional_paper,
        prelims_cleared: existingApp.prelims_cleared,
        mains_cleared: existingApp.mains_cleared,
      },
      message: `You have a ${existingApp.payment_status} payment. You can resume your application.`
    });
  } catch (error) {
    console.error('Phone check error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check phone number' },
      { status: 500 }
    );
  }
}

