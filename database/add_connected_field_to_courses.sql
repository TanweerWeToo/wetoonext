-- Add 'connected' field to courses table
-- This field determines which registration form to show
-- connected = 1 (true) -> ApplicationPopup.jsx
-- connected = 0 (false) -> registration-form.jsx dialog

USE u181984996_adminwetoo;

ALTER TABLE courses
ADD COLUMN connected TINYINT(1) DEFAULT 0 AFTER is_active;

-- Update existing courses or insert default courses
-- You can modify these as needed

