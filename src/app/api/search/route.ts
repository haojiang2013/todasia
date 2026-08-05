import { NextRequest, NextResponse } from 'next/server';
import { TOOLS } from '@/lib/tools';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';
  const cat = request.nextUrl.searchParams.get('cat') || '';
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20');

  let results = TOOLS.filter(Boolean);

  if (q.length >= 1) {
    const lower = q.toLowerCase();
    results = results.filter((t: any) =>
      t.name.toLowerCase().includes(lower) ||
      t.desc.toLowerCase().includes(lower) ||
      t.domain.toLowerCase().includes(lower) ||
      t.categories?.some((c: string) => c.toLowerCase().includes(lower))
    );
  }

  if (cat) {
    results = results.filter((t: any) =>
      t.categories?.some((c: string) =>
        c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === cat
      )
    );
  }

  const total = results.length;
  const paged = results.slice(0, limit).map((t: any) => ({
    id: t.id, name: t.name, domain: t.domain,
    originTag: t.originTag, originLabel: t.originLabel,
    categories: t.categories, stars: t.stars, rating: t.rating,
    price: t.price, lang: t.lang, free: t.free, desc: t.desc,
  }));

  return NextResponse.json({ tools: paged, total });
}
