-- Update applications table to use lowercase payment status values
-- This migration updates the payment_status field to use lowercase values as per new requirements
-- Values: 'pending', 'paid', 'cancelled', 'expired'

USE u181984996_adminwetoo;

-- First, update existing records to lowercase
UPDATE applications 
SET payment_status = CASE 
    WHEN payment_status = 'PENDING_PAYMENT' THEN 'pending'
    WHEN payment_status = 'PAID' THEN 'paid'
    WHEN payment_status = 'FAILED' THEN 'cancelled'
    WHEN payment_status = 'CANCELLED' THEN 'cancelled'
    ELSE 'pending'
END
WHERE payment_status IS NOT NULL;

-- Drop the old ENUM and recreate with lowercase values
ALTER TABLE applications 
MODIFY COLUMN payment_status ENUM('pending', 'paid', 'cancelled', 'expired') DEFAULT 'pending';

-- Ensure razorpay_order_id exists (should already exist from previous migration)
-- If not, add it
SET @col_exists = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'u181984996_adminwetoo' 
    AND TABLE_NAME = 'applications' 
    AND COLUMN_NAME = 'razorpay_order_id'
);

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE applications ADD COLUMN razorpay_order_id VARCHAR(255) NULL AFTER payment_status',
    'SELECT "Column razorpay_order_id already exists" AS message'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ensure updated_at exists (should already exist, but verify)
-- The updated_at field should already exist from the original schema
-- If not, it will be added automatically by MySQL's ON UPDATE CURRENT_TIMESTAMP

-- Show updated structure
DESCRIBE applications;

