import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invoiceId, receiptUrl, confirmedByAdmin = false } = body;
    if (!invoiceId || !receiptUrl) return NextResponse.json({ error: 'invoiceId and receiptUrl required' }, { status: 400 });

    // Attach receipt and set status to under_review or paid depending on admin flag
    const status = confirmedByAdmin ? 'paid' : 'under_review';

    const { data, error } = await supabaseAdmin.from('invoices').update({
      receipt_url: receiptUrl,
      status,
      updated_at: new Date().toISOString(),
    }).eq('id', invoiceId).select();

    if (error) {
      console.error('Supabase update error', error);
      return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }

    // If admin confirmed, make a payment record
    if (confirmedByAdmin) {
      const invoice = data?.[0];
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
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to confirm bank invoice' }, { status: 500 });
  }
}
