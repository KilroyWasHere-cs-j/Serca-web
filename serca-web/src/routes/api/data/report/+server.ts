import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { email, issueCategory, issueDescription } = body;

		if (
			typeof email !== 'string' ||
			typeof issueCategory !== 'string' ||
			typeof issueDescription !== 'string' ||
			email.trim().length === 0 ||
			issueCategory.trim().length === 0 ||
			issueDescription.trim().length === 0
		) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const result = await sql`
			INSERT INTO creports (email, report, type)
			VALUES (${email}, ${issueDescription}, ${issueCategory})
			RETURNING *;
		`;

		return json({ report: result.rows[0] });
	} catch (err: any) {
		console.error('DB Error:', err?.message || err);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
