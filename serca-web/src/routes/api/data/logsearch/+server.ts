import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { search } = body;

		const result = await sql`
  INSERT INTO searches (search)
  VALUES (${search})
  RETURNING *;
`;

		return json({ error: 'Search logged' }, { status: 200 });
	} catch {}
}
