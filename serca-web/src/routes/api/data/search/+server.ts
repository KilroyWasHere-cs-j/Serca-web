import { json } from '@sveltejs/kit';
import 'dotenv/config';

export async function POST({ request }) {
	console.log('Got request');
	try {

		let rawQuery = 'music';
		let base_url = 'https://serca-backend.onrender.com/search?q=';
		console.log('Base URL:', base_url);
		let full_url = base_url + rawQuery;
		console.log('Full URL:', full_url);
		const response = await fetch(full_url);
		const data = await response.json();


		return json({ results: data || [], error: null });
	} catch (err: any) {
		console.error('DB Error:', err?.message || err);
		return json({ results: [], error: 'Internal Server Error' }, { status: 500 });
	}
}
