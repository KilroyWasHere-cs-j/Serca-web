import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = neon(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { filters } = body;
		console.log('Filters:', filters);

		if (!filters) {
			return json({ results: [], error: 'No filters provided.' }, { status: 400 });
		}

		let conditions: string[] = [];
		let values: any[] = [];

		// Keywords filter (meta_data ILIKE)
		if (Array.isArray(filters.keywords) && filters.keywords.length > 0) {
			const keywordConditions = filters.keywords.map((_, i) => `meta_data ILIKE $${i + 1}`);
			conditions.push(`(${keywordConditions.join(' OR ')})`);
			values.push(...filters.keywords.map((kw) => `%${kw}%`));
		}

		let paramIndex = values.length;

		// Boolean: child
		if (typeof filters.child === 'boolean') {
			paramIndex++;
			conditions.push(`child = $${paramIndex}`);
			values.push(filters.child);
		}

		// Boolean: mature
		if (typeof filters.mature === 'boolean') {
			paramIndex++;
			conditions.push(`mature = $${paramIndex}`);
			values.push(filters.mature);
		}

		// Always filter for flag = 'green'
		paramIndex++;
		conditions.push(`flag = $${paramIndex}`);
		values.push('green');

		const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
		const queryText = `SELECT url, meta_data, mature, child, flag FROM urls ${whereClause} LIMIT 20`;

		console.log('QUERY:', queryText);
		console.log('VALUES:', values);

		const result = await sql.query(queryText, values);
		return json({ results: result.rows, error: null });
	} catch (err) {
		console.error('DB query error:', err);
		return json({ results: [], error: 'Internal Server Error' }, { status: 500 });
	}
}
