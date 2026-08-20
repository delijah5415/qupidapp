import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { applyFee } from '@/lib/payments';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-11' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode = 'payment', priceId, quantity = 1, userId, metadata = {} } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'priceId is required' }, { status: 400 });
    }

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing`;

    const session = await stripe.checkout.sessions.create({
      mode: mode as 'payment' | 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity }],
      metadata: { userId: userId || 'anonymous', ...metadata },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    // Create invoice record in Supabase
    try {
      await supabaseAdmin.from('invoices').insert({
        id: session.id,
        user_id: userId,
        amount_cents: (session.amount_total ?? 0),
        currency: (session.currency ?? 'KES'),
        method: 'card',
        status: 'pending',
        provider: 'stripe',
        provider_ref: session.id,
        metadata: { checkout: true, ...metadata },
      });
    } catch (e) {
      console.error('Failed to insert invoice into Supabase', e);
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
