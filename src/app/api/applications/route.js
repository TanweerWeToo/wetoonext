// Public API route for submitting applications (Registration Form)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();

    const {
      fullName,
      fatherName,
      email,
      mobile,
      dob,
      state,
      degree,
      subject,
      gradYear,
      optionalPaper,
      comments,
      courseName,
      paid
    } = data;

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
      (full_name, father_name, email, mobile, dob, state, degree, subject, grad_year, optional_paper, comments, course_name, paid) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, fatherName, email, mobile, dob, state, degree, subject, gradYear, optionalPaper, comments || '', courseName, paid || false]
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

