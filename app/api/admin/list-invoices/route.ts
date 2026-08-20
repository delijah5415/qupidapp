import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const adminKey = req.headers.get('x-admin-key');
  if (!process.env.ADMIN_API_KEY || adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status = 'all', limit = 100 } = body;

    let query = supabaseAdmin.from('invoices').select('*').order('created_at', { ascending: false }).limit(limit);
    if (status && status !== 'all') query = query.eq('status', status);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ invoices: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to list invoices' }, { status: 500 });
  }
}
