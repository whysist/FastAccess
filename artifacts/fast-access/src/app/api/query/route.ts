import { NextRequest, NextResponse } from 'next/server';
import { queryAi } from '@/lib/ai';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.text !== 'string' || body.text.trim() === '') {
    return NextResponse.json({ error: '"text" field is required.' }, { status: 400 });
  }
  const result = await queryAi(body.text, body.context ?? undefined);
  return NextResponse.json({ echo: body.text, stub: result.stub, message: result.answer });
}