-- Update applications table to match new form fields
-- Removes: subject, grad_year
-- Adds: medium, batch_year
-- Renames: comments -> previous_cleared

USE u181984996_adminwetoo;

-- Remove 'subject' column
ALTER TABLE applications
DROP COLUMN IF EXISTS subject;

-- Remove 'grad_year' column
ALTER TABLE applications
DROP COLUMN IF EXISTS grad_year;

-- Add 'medium' column (for English/Hindi selection)
ALTER TABLE applications
ADD COLUMN medium VARCHAR(50) NULL AFTER degree;

-- Add 'batch_year' column (for CSE Prelims Mentorship Batch: 2026, 2027, 2028)
ALTER TABLE applications
ADD COLUMN batch_year VARCHAR(10) NULL AFTER medium;

-- Rename 'comments' to 'previous_cleared'
-- Note: Using CHANGE COLUMN for compatibility (works in all MySQL versions)
ALTER TABLE applications
CHANGE COLUMN comments previous_cleared TEXT NULL;

-- Show updated structure
DESCRIBE applications;

