import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export interface QuestionAnswers {
    id: number;
    type: string; 
    question: string; 
    options: string[];
    priority: number; 
    answers: string | null;
}

// GET Questions of specified questionaire and previous answers if they were already answered.
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const questionnaireId = url.pathname.split('/').pop();
        const userId = request.nextUrl.searchParams.get('userId');
        const questionsWithAnswers = await sql`
            SELECT DISTINCT q.id, q.type, q.question, qo.option_text, qq.priority, temp.answers
            FROM questionnaire_questions qq
            JOIN questions q ON qq.question_id = q.id
            LEFT JOIN question_options qo ON q.id = qo.question_id
            LEFT JOIN (SELECT DISTINCT ON (question_id) question_id, answers
                        FROM responses
                        WHERE user_id = ${userId}
                        ORDER BY question_id
                      ) AS temp ON temp.question_id = q.id
            WHERE qq.questionnaire_id = ${questionnaireId}
            ORDER BY qq.priority;`;
        const questionsWithOptions = questionsWithAnswers.rows.reduce((acc, row) => {
            const { id, type, question, option_text, priority, answers } = row;
            if (!acc[id]) {
                acc[id] = { id, type, question, options: [], priority, answers };
            }
            if (option_text) {
                acc[id].options.push(option_text);
            }
            return acc;
        }, {} as Record<number, QuestionAnswers>);
        return NextResponse.json({
            questions: Object.values(questionsWithOptions),
        });
    } catch (error) {
        return NextResponse.error();
    }
}

