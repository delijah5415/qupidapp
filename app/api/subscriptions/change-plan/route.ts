import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-11' });

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, priceId, successUrl, cancelUrl } = body;
  if (!priceId) return NextResponse.json({ error: 'priceId required' }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId },
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/portal?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    // create a pending subscription record (will be reconciled by webhook)
    await supabaseAdmin.from('subscriptions').insert({
      user_id: userId,
      plan: priceId,
      stripe_subscription_id: null,
      status: 'pending',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('create subscription checkout error', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
