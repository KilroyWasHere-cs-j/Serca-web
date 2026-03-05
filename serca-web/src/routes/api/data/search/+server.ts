import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const rawQuery = typeof body.query === 'string' ? body.query.trim() : null;
		console.log('Raw query:', rawQuery);

		if (!rawQuery || rawQuery.length > 200) {
			return new Response('Invalid or missing query', { status: 400 });
		}

		let base_url = 'https://serca-backend.onrender.com/search?q=';
		console.log('Base URL:', base_url);
		let full_url = base_url + encodeURIComponent(rawQuery);
		console.log('Full URL:', full_url);
		const response = await fetch(full_url);
		const data = await response.json();
		console.log('API Response:', data);


		return json({ results: data || [], error: null });
	} catch (err: any) {
		console.error('DB Error:', err?.message || err);
		return json({ results: [], error: 'Internal Server Error' }, { status: 500 });
	}
}
