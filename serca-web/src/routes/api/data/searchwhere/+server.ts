import { json } from '@sveltejs/kit';
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { sql as baseSql } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL as string;
const sql = baseSql(connectionString);

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { filters } = body;

		if (!filters) {
			return json({ results: [], error: 'No filters provided.' }, { status: 400 });
		}

		let conditions = [];
		let values: any[] = [];

		if (Array.isArray(filters.keywords) && filters.keywords.length > 0) {
			const keywordConditions = filters.keywords.map(
				(_, i) => `meta_data ILIKE $${values.length + i + 1}`
			);
			conditions.push(`(${keywordConditions.join(' OR ')})`);
			values.push(...filters.keywords.map((kw) => `%${kw}%`));
		}

		if (typeof filters.child === 'boolean') {
			conditions.push(`child = $${values.length + 1}`);
			values.push(filters.child);
		}

		if (typeof filters.mature === 'boolean') {
			conditions.push(`mature = $${values.length + 1}`);
			values.push(filters.mature);
		}

		// Always require flag = 'green'
		conditions.push(`flag = $${values.length + 1}`);
		values.push('green');

		const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
		const queryText = `SELECT url, meta_data, mature, child, flag FROM urls ${whereClause} LIMIT 20`;

		// Use sql.query for dynamic queries with parameters
		const result = await sql.query(queryText, values);

		return json({ results: result.rows, error: null });
	} catch (err) {
		console.error('DB query error:', err);
		return json({ results: [], error: 'Internal Server Error' }, { status: 500 });
	}
}
