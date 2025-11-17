-- New Admin Panel Sections Schema
-- Run this to add YouTube Stats, Text Testimonials, and Program Impact tables

USE u181984996_adminwetoo;

-- 1. YouTube Stats Table (Single Row)
CREATE TABLE IF NOT EXISTS youtube_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subscribers VARCHAR(50) NOT NULL,
    total_views VARCHAR(50) NOT NULL,
    videos_count VARCHAR(50) NOT NULL,
    highest_single_video_views VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default YouTube stats
INSERT INTO youtube_stats (subscribers, total_views, videos_count, highest_single_video_views) VALUES
('10K+', '1M+', '150+', '50K+')
ON DUPLICATE KEY UPDATE subscribers = subscribers;

-- 2. Text Testimonials Table (Full CRUD)
CREATE TABLE IF NOT EXISTS text_testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    avatar_color VARCHAR(50) DEFAULT '#3B82F6',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
);

-- Insert sample text testimonials
INSERT INTO text_testimonials (name, subtitle, rating, testimonial, avatar_color) VALUES
('Priya Sharma', 'RCA Selected Candidate 2024', 5, 'WeToo Media\'s guidance was instrumental in my RCA interview success. Their mock interviews were exactly like the real thing!', '#3B82F6'),
('Rahul Verma', 'UPSC Aspirant', 5, 'The comprehensive preparation material and expert coaching helped me secure my dream position. Highly recommended!', '#10B981'),
('Ananya Patel', 'RCA Selected 2024', 4, 'From written exam to final interview, WeToo Media provided exceptional support at every step of my journey.', '#8B5CF6')
ON DUPLICATE KEY UPDATE name = name;

-- 3. Program Impact Table (4 Fixed Entries - Edit Only)
-- Drop the old program_impact table if it exists and recreate with new structure
DROP TABLE IF EXISTS program_impact_old;
RENAME TABLE program_impact TO program_impact_old;

CREATE TABLE IF NOT EXISTS program_impact (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    value VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert the 4 fixed program impact entries
INSERT INTO program_impact (id, title, value, description, display_order) VALUES
(1, 'Success Rate', '98%', 'Highest success rate in RCA interview preparation', 1),
(2, 'Students Mentored', '1000+', 'Aspirants benefited from our expert guidance', 2),
(3, 'Candidates Selected', '150+', 'Successful selections in RCA, UPSC & other exams', 3),
(4, 'Years of Experience', '5+', 'Years of dedicated mentoring and coaching', 4)
ON DUPLICATE KEY UPDATE title = title;

