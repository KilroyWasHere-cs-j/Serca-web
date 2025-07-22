import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	console.log('Got request');
	try {
		const body = await request.json();
		const { filters } = body;
		const { keywords, ...remaining } = filters;
		console.log(keywords);
		console.log(remaining);

		if (!filters) {
			return json({ results: [], error: 'No filters provided.' }, { status: 400 });
		}

		const queryHead = `SELECT url, meta_data, mature, child, flag FROM urls`;
		const whereClause =
			keywords.length > 0
				? ` WHERE meta_data ILIKE ANY (ARRAY[' %${keywords.join("%', '%")}% '])`
				: '';
		// const flags = 'AND'

		const query = queryHead + whereClause;
		console.log('Built query: ', query);

		const result = await sql.query(query);
		console.log(result);
		return json({ results: result, error: null });
	} catch (err) {
		console.error('DB query error:', err);
		return json({ results: [], error: 'Internal Server Error' }, { status: 500 });
	}
}
