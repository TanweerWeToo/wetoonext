-- Update applications table to replace previous_cleared with prelims_cleared and mains_cleared
-- Removes: previous_cleared
-- Adds: prelims_cleared, mains_cleared

USE u181984996_adminwetoo;

-- Remove 'previous_cleared' column (if it exists)
ALTER TABLE applications
DROP COLUMN IF EXISTS previous_cleared;

-- Add 'prelims_cleared' column (for Number of Prelims Cleared: 0-6)
ALTER TABLE applications
ADD COLUMN prelims_cleared VARCHAR(10) NULL AFTER optional_paper;

-- Add 'mains_cleared' column (for Number of Mains Cleared: 0-6)
ALTER TABLE applications
ADD COLUMN mains_cleared VARCHAR(10) NULL AFTER prelims_cleared;

-- Show updated structure
DESCRIBE applications;

