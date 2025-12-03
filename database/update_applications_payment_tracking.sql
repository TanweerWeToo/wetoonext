-- Update applications table to add payment tracking fields
-- This enables PENDING_PAYMENT / PAID status tracking and resume payment functionality

USE u181984996_adminwetoo;

-- Add payment status field (if not exists)
ALTER TABLE applications
ADD COLUMN payment_status ENUM('PENDING_PAYMENT', 'PAID', 'FAILED', 'CANCELLED') DEFAULT 'PENDING_PAYMENT' AFTER paid;

-- Add Razorpay order ID for tracking
ALTER TABLE applications
ADD COLUMN razorpay_order_id VARCHAR(255) NULL AFTER payment_status;

-- Add Razorpay payment ID for reference
ALTER TABLE applications
ADD COLUMN razorpay_payment_id VARCHAR(255) NULL AFTER razorpay_order_id;

-- Add unique enrollment ID (generated after successful payment)
ALTER TABLE applications
ADD COLUMN enrollment_id VARCHAR(50) NULL UNIQUE AFTER razorpay_payment_id;

-- Add payment link expiry timestamp (kept for audit/tracking purposes only - not used for expiry checks)
-- Note: Links never expire - this field is maintained for historical tracking
ALTER TABLE applications
ADD COLUMN payment_link_expires_at DATETIME NULL AFTER enrollment_id;

-- Add flag to track if FOMO email was sent
ALTER TABLE applications
ADD COLUMN fomo_email_sent TINYINT(1) DEFAULT 0 AFTER payment_link_expires_at;

-- Add flag to track if welcome email was sent
ALTER TABLE applications
ADD COLUMN welcome_email_sent TINYINT(1) DEFAULT 0 AFTER fomo_email_sent;

-- Add index for faster queries
CREATE INDEX idx_payment_status ON applications(payment_status);
CREATE INDEX idx_razorpay_order_id ON applications(razorpay_order_id);
CREATE INDEX idx_enrollment_id ON applications(enrollment_id);

-- Update existing records: Set payment_status based on 'paid' field
UPDATE applications 
SET payment_status = CASE 
    WHEN paid = 1 THEN 'PAID'
    ELSE 'PENDING_PAYMENT'
END
WHERE payment_status IS NULL;

-- Show updated structure
DESCRIBE applications;

