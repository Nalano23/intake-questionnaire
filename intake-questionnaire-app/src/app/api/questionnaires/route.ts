import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

// GET Questionnaires table + calculated column for completed questionnaire
export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        const response = await sql`
            SELECT q.*, 
                   EXISTS (
                       SELECT 1 
                       FROM responses r 
                       WHERE r.user_id = ${userId} 
                       AND r.questionnaire_id = q.id
                   ) AS completed
            FROM questionnaire q
        `;
        const questionnaires = response.rows;
        return NextResponse.json(questionnaires);
    } catch (error) {
        return NextResponse.error();
    }
}
