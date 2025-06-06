import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString: string = process.env.DATABASE_URL as string;
export const sql = neon(connectionString);
