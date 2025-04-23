import { sql } from '../db.server';

export async function load() {
	const response = await sql`SELECT version()`;
	const { result } = response[0];
	return {
		result
	};
}
