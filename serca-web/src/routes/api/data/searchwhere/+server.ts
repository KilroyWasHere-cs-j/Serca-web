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

		for (const condition of conditions) {
			values.push(condition));
		}

		console.log('Values:', values);

		// SELECT url, meta_data
		// FROM urls
		// WHERE meta_data ILIKE ANY (ARRAY[
		//   '%people and cats playing outdoors%',
		//   '%outdoor play between humans and cats%',
		//   '%cats interacting with humans%',
		//   '%playful cats%',
		//   '%outdoor setting%',
		//   '%casual%',
		//   '%fun%',
		//   '%chasing%',
		//   '%running%',
		//   '%cuddling%',
		//   '%backyard%',
		//   '%park%',
		//   '%sunlight%',
		//   '%nature%',
		//   '%children playing with cats%',
		//   '%pet interaction%',
		//   '%leash%',
		//   '%frisbee%',
		//   '%fetch%'
		// ])

		const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
		const queryText = `SELECT url, meta_data, mature, child, flag FROM urls ${whereClause} LIMIT 20`;

		console.log('QUERY:', queryText);

		const result = await sql.query(queryText, values);
		return json({ results: result.rows, error: null });
	} catch (err) {
		console.error('DB query error:', err);
		return json({ results: [], error: 'Internal Server Error' }, { status: 500 });
	}
}
