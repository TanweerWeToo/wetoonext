-- WeTooMedia Admin Panel Database Schema
-- Run this SQL file to create all required tables

CREATE DATABASE IF NOT EXISTS u181984996_adminwetoo;
USE u181984996_adminwetoo;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Applications Table (Registration Form Submissions)
CREATE TABLE IF NOT EXISTS applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    dob VARCHAR(50) NOT NULL,
    state VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    grad_year VARCHAR(10) NOT NULL,
    optional_paper VARCHAR(255) NOT NULL,
    comments TEXT,
    course_name VARCHAR(255) NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    status ENUM('Pending', 'Reviewed', 'Accepted', 'Rejected') DEFAULT 'Pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_course_name (course_name),
    INDEX idx_mobile (mobile),
    INDEX idx_submitted_at (submitted_at)
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    start_date VARCHAR(50),
    year VARCHAR(10),
    fee VARCHAR(100),
    image_url VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default courses
INSERT INTO courses (title, level, start_date, year, fee, image_url, category) VALUES
('New Batch', 'RCA Preparation', '01-05-2025', '2025', '299/-', '/Landing/Jamia logo.png', 'rca'),
('New Batch', 'UPSC Preparation', '—', '2025', '—', '/Landing/UPSC logo.webp', 'upsc'),
('New Batch', 'BPSC Preparation', '—', '2025', '—', '/Landing/BPSC logo img.jpg', 'bpsc')
ON DUPLICATE KEY UPDATE title = title;

-- 4. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(500),
    display_order INT DEFAULT 0,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_uploaded_at (uploaded_at),
    INDEX idx_display_order (display_order)
);

-- Insert default gallery images
INSERT INTO gallery (image_url, caption, display_order) VALUES
('/Landing/about1.webp', 'WeToo Media Event', 1),
('/Landing/about4.webp', 'Student Success', 2),
('/Landing/about2.webp', 'Coaching Session', 3),
('/Landing/about5.webp', 'Group Learning', 4),
('/Landing/jamia.webp', 'Jamia Millia Islamia', 5),
('/Landing/about3.webp', 'Interview Preparation', 6)
ON DUPLICATE KEY UPDATE image_url = image_url;

-- 5. Testimonials Table (YouTube Shorts)
CREATE TABLE IF NOT EXISTS testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    video_id VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order)
);

-- Insert default testimonials
INSERT INTO testimonials (title, video_id, display_order) VALUES
('Testimonial 1', 'CzIH8M0a3SI', 1),
('Testimonial 2', 'syX-jb7zS1E', 2),
('Testimonial 5', 'UiNWj3vWwzo', 3),
('Testimonial 6', 'NrCTgYbihwc', 4),
('Testimonial 8', 'hg328rKXDlM', 5),
('Testimonial 9', 'YuYHGi12QQs', 6),
('Testimonial 10', 'mAIFrJKN-p8', 7),
('Testimonial 12', 'Ilnpbp_npHY', 8),
('Testimonial 13', 'LpELoPdVeTM', 9),
('Testimonial 14', 'fpPwX9ELngE', 10),
('Testimonial 15', 'OMnoj9xFqSM', 11),
('Testimonial 16', '_yHYX-hgjDA', 12)
ON DUPLICATE KEY UPDATE title = title;

-- 6. Program Impact Metrics Table
CREATE TABLE IF NOT EXISTS program_impact (
    id INT PRIMARY KEY AUTO_INCREMENT,
    metric_name VARCHAR(255) UNIQUE NOT NULL,
    metric_value VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default program impact metrics
INSERT INTO program_impact (metric_name, metric_value, display_order) VALUES
('Students Mentored', '500+', 1),
('Courses Offered', '10+', 2),
('Success Stories', '150+', 3),
('Years of Experience', '5+', 4)
ON DUPLICATE KEY UPDATE metric_value = metric_value;

-- Insert default admin user (password: Admin@123)
-- Password hash for 'Admin@123'
INSERT INTO admin_users (email, password, name) VALUES
('admin@wetoomedia.com', '$2b$10$oxtNTvPUYRNcGsh0cX3EYOCE4nPPv4kF6kxlnTMl3OVGXse9ALhLi', 'Admin')
ON DUPLICATE KEY UPDATE email = email;

