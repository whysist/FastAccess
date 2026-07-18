import { NextRequest, NextResponse } from 'next/server';
import { computeRoute } from '@/lib/venue/routing';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const from = sp.get('from');
  const to   = sp.get('to');
  const profiles = sp.getAll('profiles');

  if (!from || !to) {
    return NextResponse.json({ error: '"from" and "to" query params are required.' }, { status: 400 });
  }

  const result = computeRoute(from, to, profiles);

  if (!result.found) {
    return NextResponse.json(
      { error: `No accessible route from "${from}" to "${to}" with the selected profiles.` },
      { status: 404 },
    );
  }

  return NextResponse.json(result);
}
