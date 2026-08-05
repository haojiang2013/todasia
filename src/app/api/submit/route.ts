import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.domain) return NextResponse.json({ error: 'Name and domain required' }, { status: 400 });
    // MVP: just log and return success
    console.log('Submission:', JSON.stringify(body));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 500 });
  }
}
