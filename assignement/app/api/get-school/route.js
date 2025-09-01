import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getPool();
    const [rows] = await pool.query(
      `SELECT id, name, address, city, image FROM schools ORDER BY id DESC`
    );
    return NextResponse.json({ schools: rows });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
