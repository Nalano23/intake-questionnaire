import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

// GET Questions of specified questionnaire and previous answers if they were already answered.
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const userId = url.pathname.split('/').pop();

        // Query to get user answers
        const { rows: userAnswers } = await sql`
            SELECT r.user_id, q.name, r.question_id, qs.question, r.answers
            FROM responses r
            LEFT JOIN questionnaire q ON r.questionnaire_id = q.id
            LEFT JOIN questions qs ON r.question_id = qs.id
            WHERE r.user_id = ${userId}
            ORDER BY q.name, r.question_id;
        `;

        // Initialize the result object
        const result = {
            user_id: userId,
            questionnaires: {}
        };

        // Process each row in the userAnswers
        userAnswers.forEach(({ name, question_id, question, answers }) => {
            if (!result.questionnaires[name]) {
                result.questionnaires[name] = {};
            }
            result.questionnaires[name][question_id] = {
                question: question,
                answers: answers
            };
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching user answers:', error);
        return NextResponse.json({ error: 'Failed to fetch user answers' }, { status: 500 });
    }
}
