import { NextResponse } from "next/server";
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-11' });

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn('No STRIPE_WEBHOOK_SECRET set - skipping signature verification');
  }

  let event: Stripe.Event;
  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(payload);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // Mark invoice created earlier as paid
        const provider_ref = session.id;
        await supabaseAdmin.from('invoices').update({ status: 'paid', updated_at: new Date().toISOString() }).eq('id', provider_ref);
        // create payments record
        await supabaseAdmin.from('payments').insert({
          invoice_id: provider_ref,
          provider: 'stripe',
          provider_ref,
          method: 'card',
          amount_cents: (session.amount_total ?? 0),
          fee_cents: 0,
          net_amount_cents: (session.amount_total ?? 0),
          status: 'completed'
        });
        break;
      }
      case 'payment_intent.succeeded': {
        const intent = event.data.object as Stripe.PaymentIntent;
        const provider_ref = intent.id;
        // Try to find invoice linked to this payment via metadata or provider_ref
        await supabaseAdmin.from('payments').insert({
          invoice_id: provider_ref,
          provider: 'stripe',
          provider_ref,
          method: 'card',
          amount_cents: intent.amount ?? 0,
          fee_cents: 0,
          net_amount_cents: intent.amount ?? 0,
          status: 'completed'
        });
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error('Failed processing webhook event', err);
  }

  return NextResponse.json({ received: true });
}
