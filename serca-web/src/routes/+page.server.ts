// src/routes/+page.server.ts (assuming this is a server load function for a page)
import { queryDatabase } from '../routes/api/data/+server'; // Assuming your database logic is in this file
import { error } from '@sveltejs/kit'; // For more specific error responses

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		const result = await queryDatabase('SELECT * FROM urls');
		return {
			data: result.rows
		};
	} catch (err) {
		console.error('Error fetching data:', err);
		// You can provide a more specific error message based on 'err' if needed
		throw error(500, 'Failed to fetch data from the database.');
	}
}
