import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // Adjust import if needed
import { UserData } from '@/models/user-data';

// GET Username and User's count of questionnaires completed
export async function GET() {
    try {
        const { rows } = await sql<UserData>`
            SELECT u.id, u.username, 
                COALESCE(COUNT(DISTINCT r.questionnaire_id), 0) AS questionnaires_completed
            FROM users u
            LEFT JOIN responses r ON u.id = r.user_id AND r.questionnaire_id IS NOT NULL
            WHERE u.role = 'user'
            GROUP BY u.id, u.username
            ORDER BY u.id;
        `;
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch previous answers' }, { status: 500 });
    }
}
