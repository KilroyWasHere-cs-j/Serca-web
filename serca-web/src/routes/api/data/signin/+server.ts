import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { email, ekey } = body;

		const result = await sql`SELECT email, key FROM users WHERE email = ${email} AND key = ${ekey}`;

		if (result.length === 0) {
			return json({ error: "Can't find user" }, { status: 409 });
		}
		return json({ validuser: true }, { status: 200 });
	} catch (err: any) {
		console.error('DB Error:', err?.message || err);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
