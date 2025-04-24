import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const rawQuery = typeof body.query === 'string' ? body.query.trim() : null;

		if (!rawQuery || rawQuery.length > 200) {
			return new Response('Invalid or missing query', { status: 400 });
		}

		const keywords = Array.isArray(body.query)
			? body.query.map((q) => q.toLowerCase().trim()).filter(Boolean)
			: typeof body.query === 'string'
				? body.query.toLowerCase().split(/\s+/).filter(Boolean)
				: [];

		const conditions = keywords.map((kw) => sql`description ILIKE ${`%${kw}%`}`);
		const whereClause = conditions.reduce((acc, cond, i) =>
			i === 0 ? cond : sql`${acc} OR ${cond}`
		);

		const rows = await sql`SELECT * FROM urls WHERE ${whereClause} AND mature=false`;

		return json({ results: rows || [], error: null });
	} catch (err: any) {
		console.error('DB Error:', err?.message || err);
		return json({ results: [], error: 'Internal Server Error' }, { status: 500 });
	}
}
