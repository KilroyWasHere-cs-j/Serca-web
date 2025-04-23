// src/routes/api/data/+server.ts
import { neon } from '@neondatabase/serverless';
import { json } from '@sveltejs/kit';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
	const result = await sql`SELECT * FROM your_table LIMIT 10`;
	return json(result);
}
