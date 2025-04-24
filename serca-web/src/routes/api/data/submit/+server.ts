import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { username, email, key } = body;

		if (
			typeof username !== 'string' ||
			typeof email !== 'string' ||
			typeof key !== 'string' ||
			username.length === 0 ||
			email.length === 0 ||
			key.length === 0
		) {
			return json({ error: 'Invalid input' }, { status: 400 });
		}

		const result = await sql`
  INSERT INTO users (username, email, key)
  VALUES (${username}, ${email}, ${key})
  ON CONFLICT (email, key) DO NOTHING
  RETURNING *;
`;

		if (result.rowCount === 0) {
			return json({ error: 'User with this email or key already exists.' }, { status: 409 });
		}

		return json({ user: result.rows[0] });
		console.log(result.rows[0]);
		console.log('Sent to db');
	} catch (err: any) {
		console.error('DB Error:', err?.message || err);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
