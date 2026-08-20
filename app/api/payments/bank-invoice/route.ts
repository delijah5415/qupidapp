import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { applyFee } from '@/lib/payments';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount_cents, currency = 'KES', userId, bank = 'IM' } = body;
    if (!amount_cents) return NextResponse.json({ error: 'amount_cents is required' }, { status: 400 });

    const invoiceId = uuidv4();
    const { feeCents, netCents } = applyFee(amount_cents);
    const ref = `${process.env.BANK_PAYMENT_REFERENCE_PREFIX || 'QUPID'}-${invoiceId.slice(0,8)}`;

    const bankDetails = bank === 'KCB' ? {
      bank_name: 'KCB Bank',
      account_name: process.env.BANK_KCB_ACCOUNT_NAME,
      account_number: process.env.BANK_KCB_ACCOUNT_NUMBER,
      till_number: process.env.BANK_KCB_TILL_NUMBER,
    } : {
      bank_name: 'I&M Bank',
      account_name: process.env.BANK_IM_ACCOUNT_NAME,
      account_number: process.env.BANK_IM_ACCOUNT_NUMBER,
      till_number: process.env.BANK_IM_TILL_NUMBER,
    };

    // Insert invoice into Supabase
    const { data, error } = await supabaseAdmin.from('invoices').insert({
      id: invoiceId,
      user_id: userId,
      amount_cents,
      currency,
      fee_cents: feeCents,
      net_amount_cents: netCents,
      method: 'bank',
      status: 'pending',
      provider: 'manual',
      provider_ref: ref,
      bank_destination: bankDetails.bank_name,
      metadata: { bankDetails },
    }).select();

    if (error) {
      console.error('Supabase insert error', error);
      return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }

    return NextResponse.json({ invoiceId, amount_cents, fee_cents: feeCents, net_cents: netCents, reference: ref, bankDetails });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create bank invoice' }, { status: 500 });
  }
}
