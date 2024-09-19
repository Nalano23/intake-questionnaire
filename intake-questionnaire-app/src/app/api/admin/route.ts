
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; 
import { UserData } from '@/models/user-data';

// GET Username and User's count of questionnaires completed
export async function GET(req: NextRequest) {
    try {
        const role = req.nextUrl.searchParams.get('role');
        const { rows } = await sql<UserData>`
            SELECT u.id, u.username, (COUNT(DISTINCT r.questionnaire_id)) AS questionnaires_completed
            FROM users u
            LEFT JOIN responses r ON u.id = r.user_id AND r.questionnaire_id IS NOT NULL
            WHERE u.role = ${role}
            GROUP BY u.id, u.username
            ORDER BY u.id;
        `;
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch previous answers' }, { status: 500 });
    }
}
