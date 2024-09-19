-- Create table for questionnaire
CREATE TABLE questionnaire (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Create table for questions
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    question TEXT NOT NULL
);

-- Create table for question options
CREATE TABLE question_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL
);

-- Create table for questionnaire_questions (relationship table)
CREATE TABLE questionnaire_questions (
    id SERIAL PRIMARY KEY,
    questionnaire_id INTEGER REFERENCES questionnaire(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    priority INTEGER NOT NULL
);
