-- Add video_url column to testimonials table
-- This allows storing full YouTube URLs instead of just video IDs

USE u181984996_adminwetoo;

-- Add video_url column
ALTER TABLE testimonials 
ADD COLUMN video_url VARCHAR(500) AFTER video_id;

-- Migrate existing video_id data to video_url format
UPDATE testimonials 
SET video_url = CONCAT('https://www.youtube.com/watch?v=', video_id)
WHERE video_url IS NULL AND video_id IS NOT NULL;

-- video_id column is kept for backward compatibility
-- New entries will store full URL in video_url and extracted ID in video_id

