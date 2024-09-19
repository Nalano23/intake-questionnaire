-- Insert into questionnaire table
INSERT INTO questionnaire (name) 
VALUES ('Semaglutide'), ('Nad-Injection'), ('Metformin');

-- Insert into questions table
INSERT INTO questions (type, question) VALUES
('mcq', 'Why are you interested in this product? Select all that apply.'),
('input', 'Tell us anything else you’d like your provider to know when prescribing your medication.'),
('input', 'What is your current weight?'),
('mcq', 'Which of the following have you tried in the past? Select all that apply.'),
('mcq', 'What’s your weight loss goal?'),
('input', 'Please list any new medications you are taking.');

-- Insert into question_options table for question 1
INSERT INTO question_options (question_id, option_text) VALUES
(1, 'Improve blood pressure'),
(1, 'Reduce risk of future cardiac events'),
(1, 'Support lifestyle changes'),
(1, 'Longevity benefits');

-- Insert into question_options table for question 4
INSERT INTO question_options (question_id, option_text) VALUES
(4, 'Keto or low carb'),
(4, 'Plant-based'),
(4, 'Macro or calorie counting'),
(4, 'Weight Watchers'),
(4, 'Noom'),
(4, 'Calibrate'),
(4, 'Found'),
(4, 'Alpha'),
(4, 'Push Health');

-- Insert into question_options table for question 5
INSERT INTO question_options (question_id, option_text) VALUES
(5, 'Losing 1-15 pounds'),
(5, 'Losing 16-50 pounds'),
(5, 'Losing 51+ pounds'),
(5, 'Not sure, I just need to lose weight');

-- Insert into questionnaire_questions table (without id column)
INSERT INTO questionnaire_questions (question_id, questionnaire_id, priority) VALUES
(1, 1, 0),
(2, 1, 10),
(4, 1, 20),
(1, 2, 0),
(2, 2, 10),
(3, 2, 20),
(1, 3, 0),
(5, 3, 10),
(6, 3, 20);

