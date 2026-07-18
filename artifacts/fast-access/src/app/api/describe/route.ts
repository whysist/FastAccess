import { NextRequest, NextResponse } from 'next/server';
import { describeNode } from '@/lib/ai';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.nodeId !== 'string') {
    return NextResponse.json({ error: '"nodeId" field is required.' }, { status: 400 });
  }
  const result = describeNode(body.nodeId, body.profiles ?? undefined);
  return NextResponse.json({ nodeId: body.nodeId, description: result.description, stub: result.stub });
}
