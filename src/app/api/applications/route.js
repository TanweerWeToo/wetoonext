// Public API route for submitting applications (Registration Form)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();

    // Support both camelCase and snake_case field names for backward compatibility
    const fullName = data.fullName || data.full_name;
    const fatherName = data.fatherName || data.father_name;
    const email = data.email;
    const mobile = data.mobile;
    const dob = data.dob;
    const state = data.state;
    const degree = data.degree;
    const medium = data.medium;
    const batchYear = data.batchYear || data.batch_year;
    const optionalPaper = data.optionalPaper || data.optional_paper;
    const previousCleared = data.previousCleared || data.previous_cleared;
    const courseName = data.courseName || data.course_name;
    const paid = data.paid;

    // Validation
    if (!fullName || !email || !mobile || !courseName) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Check if mobile number already registered for this course
    const existing = await query(
      'SELECT id FROM applications WHERE mobile = ? AND course_name = ?',
      [mobile, courseName]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'This mobile number is already registered for this course' },
        { status: 400 }
      );
    }

    // Insert application
    const result = await query(
      `INSERT INTO applications 
      (full_name, father_name, email, mobile, dob, state, degree, medium, batch_year, optional_paper, previous_cleared, course_name, paid) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, fatherName, email, mobile, dob, state, degree, medium || '', batchYear || '', optionalPaper || '', previousCleared || '', courseName, paid || false]
    );

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: result.insertId
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

