import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = form.get('name');
    const address = form.get('address');
    const city = form.get('city');
    const state = form.get('state');
    const contact = form.get('contact');
    const email_id = form.get('email_id');
    const imageFile = form.get('image');

    let imageName = null;

    if (imageFile && typeof imageFile === 'object') {
      // save image in /public/schoolImages
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(process.cwd(), 'public/schoolImages', imageName);
      await fs.promises.writeFile(filePath, buffer);
    }

    const pool = await getPool();
    await pool.query(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imageName, email_id]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to save school' }, { status: 500 });
  }
}
