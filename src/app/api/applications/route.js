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
    const prelimsCleared = data.prelimsCleared || data.prelims_cleared;
    const mainsCleared = data.mainsCleared || data.mains_cleared;
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
      'SELECT id, payment_status, full_name, father_name, email, dob, state, degree, medium, batch_year, optional_paper, prelims_cleared, mains_cleared FROM applications WHERE mobile = ? AND course_name = ?',
      [mobile, courseName]
    );

    if (existing.length > 0) {
      const existingApp = existing[0];
      
      // If payment status is 'paid', show error
      if (existingApp.payment_status === 'paid') {
        return NextResponse.json(
          { success: false, message: 'This mobile number is already registered for this course' },
          { status: 400 }
        );
      }
      
      // If payment status is 'pending' or 'cancelled', update existing record and return it
      if (existingApp.payment_status === 'pending' || existingApp.payment_status === 'cancelled') {
        // Update the existing application with new form data
        await query(
          `UPDATE applications 
          SET full_name = ?, father_name = ?, email = ?, dob = ?, state = ?, degree = ?, medium = ?, batch_year = ?, optional_paper = ?, prelims_cleared = ?, mains_cleared = ?, payment_status = 'pending', updated_at = NOW()
          WHERE id = ?`,
          [fullName, fatherName, email, dob, state, degree, medium || '', batchYear || '', optionalPaper || '', prelimsCleared || '', mainsCleared || '', existingApp.id]
        );
        
        return NextResponse.json({
          success: true,
          message: 'Application updated successfully. Please proceed with payment.',
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
          isResume: true
        });
      }
      
      // For 'expired' status, treat as new application but update existing record
      if (existingApp.payment_status === 'expired') {
        await query(
          `UPDATE applications 
          SET full_name = ?, father_name = ?, email = ?, dob = ?, state = ?, degree = ?, medium = ?, batch_year = ?, optional_paper = ?, prelims_cleared = ?, mains_cleared = ?, payment_status = 'pending', updated_at = NOW()
          WHERE id = ?`,
          [fullName, fatherName, email, dob, state, degree, medium || '', batchYear || '', optionalPaper || '', prelimsCleared || '', mainsCleared || '', existingApp.id]
        );
        
        return NextResponse.json({
          success: true,
          message: 'Application updated successfully. Please proceed with payment.',
          applicationId: existingApp.id,
          isResume: true
        });
      }
    }

    // Insert new application
    const result = await query(
      `INSERT INTO applications 
      (full_name, father_name, email, mobile, dob, state, degree, medium, batch_year, optional_paper, prelims_cleared, mains_cleared, course_name, paid, payment_status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [fullName, fatherName, email, mobile, dob, state, degree, medium || '', batchYear || '', optionalPaper || '', prelimsCleared || '', mainsCleared || '', courseName, paid || false]
    );

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: result.insertId,
      isResume: false
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

