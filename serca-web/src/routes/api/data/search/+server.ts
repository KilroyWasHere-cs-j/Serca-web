import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	const body = await request.json();
	const query = body.query;

	try {
		console.log('Query:', query);
		const rows = await sql`SELECT * FROM urls WHERE description ILIKE ${'%' + query + '%'}`;
		console.log('Returning');
		return json({ results: rows }); // Wrap the rows in a `results` object
	} catch (err) {
		console.error('DB Error:', err);
		return new Response('Database error', { status: 500 });
	}
}
