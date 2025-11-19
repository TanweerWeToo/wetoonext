-- Insert all text testimonials from the static data
-- Run this SQL in phpMyAdmin or MySQL client to populate the text_testimonials table

USE u181984996_adminwetoo;

-- Clear existing data if needed (optional, comment out if you want to keep existing data)
-- TRUNCATE TABLE text_testimonials;

INSERT INTO text_testimonials (name, subtitle, rating, testimonial, avatar_color) VALUES
('Aman', 'Aman, RCA Selected 2024', 5, 'Selected! Thank you so much to @Tanweer Ahmad Sir for all your help. Also thanks to all my friends who shared their transcripts', '#3B82F6'),

('Akansha Biswas', 'Akansha Biswas, RCA Selected 2024', 4, 'Selected! Thank you to all for sharing your interview transcripts and @Wetoo Media for sharing previous transcripts because I did get questions from those! Very grateful!', '#10B981'),

('Rozy Parveen', 'Rozy Parveen, RCA Selected 2024', 5, 'Selected! 🤩... Thanks @Tanweer Ahmad sir.', '#F59E0B'),

('Naved', 'Naved, RCA Selected 2024', 4, 'Selected!! Thank you sir, for interview guidance.', '#EF4444'),

('ANA Musharraf', 'ANA Musharraf, RCA selected 2024', 4, 'WeToo''s RCA interview guidance program was really helpful in giving the direction in which the interview prep should be done, specially the transcript were really useful. Thank you Tanweer sir for the initiative.', '#8B5CF6'),

('Ruksar', 'Ruksar, RCA Selected 2024', 4, 'Selected! Thank You Sir, your guidance and fellow candidate''s transcripts ere of great help. Thank you🌸', '#EC4899'),

('Kritika', 'Kritika, RCA Selected 2024', 4, 'Thank you so much @Tanweer Ahmad @Wetoo Media. It''s all because of your help.', '#06B6D4'),

('Saquib', 'Saquib, RCA Selected 2024', 5, 'Thank You very much, Tanweer sir and Wetoo Media, for the ''RCA Interview Guidance Program''. It helped me a lot and gave me a roadmap for the practice, which aided me get on the list.', '#F97316'),

('Dawood', 'Dawood, RCA Selected 2024', 5, 'Alhamdulillah selected! Thanks for sharing insightful informations @Tanweer Ahmad sir', '#14B8A6'),

('Dr. A. R. Rajah', 'Dr. A. R. Rajah, RCA', 5, 'First time while checking I used find and couldn''t see my number, now it is there 😂 Thanks to @Tanweer Ahmad for the guidance and also ppl who put up transcripts😇 Got through both HSC and Jamia😇', '#6366F1'),

('MD Tauseef', 'MD Tauseef', 5, 'My name is MD Tausif. I am preparing for UPSC CSE. Previously I used to be confused regarding admission RCAs. But now, I would like to thanks TANWEER SIR and his platform WE TOO MEDIA IAS for continuously guiding me. The interview guidance program of Sir helped me to secure a seat in JAMIA RCA (2024-25).', '#84CC16'),

('Unknown', 'Unknown', 5, 'Thanks a ton @Tanweer Ahmad Sir for this platform and guidance at every stage. Immense gratitude towards @Ghulam Jilani @Dr A R Rajah RCA Written Qualified 2023 Imran sir for interview related guidance.', '#A855F7'),

('Unknown', 'Unknown', 5, 'Thank you so much sir for your all efforts 😊😊 A big thank you for Tanweer sir 😊.', '#22C55E'),

('Unknown', 'Unknown', 5, 'Thank you @Tanweer Ahmad, @Dr A R Rajah Rca Written Qualified 2023 bhai and everyone who have been through this journey.. Got through! Congratulations to everyone who have been selected and to those who couldn''t don''t give up. Life doesn''t stop here. Keep hustling.', '#F43F5E');

-- Verify the inserted data
SELECT * FROM text_testimonials ORDER BY id;

