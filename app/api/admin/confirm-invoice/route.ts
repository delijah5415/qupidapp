import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const adminKey = req.headers.get('x-admin-key');
  if (!process.env.ADMIN_API_KEY || adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { invoiceId } = body;
    if (!invoiceId) return NextResponse.json({ error: 'invoiceId required' }, { status: 400 });

    // Fetch invoice
    const { data: invoices } = await supabaseAdmin.from('invoices').select('*').eq('id', invoiceId).limit(1);
    const invoice = invoices?.[0];
    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

    // Mark paid and insert payment record
    await supabaseAdmin.from('invoices').update({ status: 'paid', updated_at: new Date().toISOString() }).eq('id', invoiceId);
    await supabaseAdmin.from('payments').insert({
      invoice_id: invoiceId,
      provider: 'manual',
      provider_ref: invoice.provider_ref,
      method: 'bank',
      amount_cents: invoice.amount_cents,
      fee_cents: invoice.fee_cents,
      net_amount_cents: invoice.net_amount_cents,
      status: 'completed'
    });

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to confirm invoice' }, { status: 500 });
  }
}
