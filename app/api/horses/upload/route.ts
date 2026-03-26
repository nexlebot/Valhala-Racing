import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = 'valhalla2024';

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    if (formData.get('password') !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || '.jpg';
    const filename = `${Date.now()}${ext}`;
    const savePath = path.join(process.cwd(), 'public', 'horses', filename);

    fs.writeFileSync(savePath, buffer);

    return NextResponse.json({ url: `/horses/${filename}` });
}
