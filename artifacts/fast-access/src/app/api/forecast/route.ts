import { NextRequest, NextResponse } from 'next/server';
import { getSensoryEvents } from '@/lib/sensory/schedule';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const minuteRaw = sp.get('minute');
  const windowRaw = sp.get('window');

  const minute = Number(minuteRaw);
  if (minuteRaw === null || isNaN(minute)) {
    return NextResponse.json({ error: '"minute" must be a number.' }, { status: 400 });
  }

  const window = windowRaw !== null && !isNaN(Number(windowRaw)) ? Number(windowRaw) : 30;
  const events = getSensoryEvents(minute, window);
  return NextResponse.json(events);
}
