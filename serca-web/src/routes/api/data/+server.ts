// src/routes/api/data/+server.ts
import { json, error } from '@sveltejs/kit';
import pg from 'pg';
import { DATABASE_URL } from '$env/static/private';

const pool = new pg.Pool({
	connectionString: DATABASE_URL
});

async function queryDatabase(query: string, values: any[] = []) {
	try {
		const client = await pool.connect();
		const result = await client.query(query, values);
		client.release();
		return result.rows; // Return the rows directly for API responses
	} catch (err) {
		console.error('Error querying database:', err);
		throw error(500, 'Failed to fetch data from the database');
	}
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const data = await queryDatabase('SELECT * FROM urls'); // Replace with your actual query
		return json(data);
	} catch (err: any) {
		// The error will be handled by the queryDatabase function
		// and a 500 response will be returned.
		return err;
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const body = await request.json();
		const { name, value } = body; // Example data

		const result = await queryDatabase(
			'INSERT INTO urls (name, value) VALUES ($1, $2) RETURNING *',
			[name, value]
		);

		return json(result);
	} catch (err: any) {
		console.error('Error inserting data:', err);
		throw error(500, 'Failed to insert data into the database');
	}
}

// You can add other HTTP methods (PUT, DELETE, etc.) as needed.
