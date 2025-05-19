import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { email } = body;

		console.log('Updating user query count', email);

		const [{ queries, s_max }] = await sql`
  SELECT queries, s_max FROM users WHERE email = ${email}
`;

		if (queries + 1 > s_max) {
			console.log('Query limit hit!!');
			return json({ error: 'Query limit exceeded' }, { status: 403 });
		}

		await sql`
  UPDATE users SET queries = queries + 1 WHERE email = ${email}
`;

		return json({ error: 'NULL' }, { status: 200 });
	} catch {
		console.log('Failed to update user query count');
		return json({ error: 'Fail :(' }, { status: 500 });
	}
}
