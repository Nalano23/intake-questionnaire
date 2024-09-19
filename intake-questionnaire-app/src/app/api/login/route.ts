import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { User } from '@/utils/users';

// GET all users for mock auth
export async function GET() {
    try {
        const { rows } = await sql<User>`
            SELECT u.id, u.username, u.password, u.role 
            FROM users u
        `;
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users to authenticate' }, { status: 500 });
    }
}
