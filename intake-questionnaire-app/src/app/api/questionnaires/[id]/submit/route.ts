import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // Adjust import if needed
import { QuestionnaireAnswers } from '@/models/questionnaire-questions';

// POST questionnaire answers
export async function POST(req: NextRequest) {
    try {
        const { userId, answers } = await req.json();
        const url = new URL(req.url);
        const pathSegments = url.pathname.split('/');
        const questionnaireId = parseInt(pathSegments[3]); // Extract questionnaire ID from URL

        // Connect to db
        const client = await sql.connect();

        // Begin transaction
        await client.query('BEGIN');

        try {
            const insertQueries = answers.map((answer: QuestionnaireAnswers) => {
                const questionId = answer.questionId;
                return client.sql`
                    INSERT INTO responses (user_id, questionnaire_id, question_id, answers)
                    VALUES (${userId}, ${questionnaireId}, ${questionId}, ${JSON.stringify(answer.answers)})
                    ON CONFLICT (user_id, questionnaire_id, question_id) 
                    DO UPDATE SET answers = EXCLUDED.answers
                `;
            });
            
            console.log(insertQueries);
            // Commit transaction
            await client.query('COMMIT');

            return NextResponse.json({ message: 'Submission successful' });
        } catch (error) {
            // Rollback transaction on error
            await client.query('ROLLBACK');
            throw error;
        } finally {
            // Close connection
            client.release();
        }
    } catch (error) {
        console.error('Error processing submission:', error);
        return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
    }
}
