import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-11' });

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;
  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(payload);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message || err);
    return new Response('Webhook Error', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const checkoutSessionId = session.id;

        // If this was a subscription checkout, the subscription will be present
        if (session.subscription) {
          const subscriptionId = String(session.subscription);

          // Update subscriptions table linking the stripe_subscription_id
          await supabaseAdmin.from('subscriptions').update({
            stripe_subscription_id: subscriptionId,
            status: 'active',
            updated_at: new Date().toISOString(),
          }).eq('user_id', userId).is('stripe_subscription_id', null);

          // Optionally fetch subscription details to set next_billing_at
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId as string);
            const nextBilling = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
            await supabaseAdmin.from('subscriptions').update({ next_billing_at: nextBilling }).eq('stripe_subscription_id', subscriptionId);
          } catch (e) {
            console.warn('Failed to retrieve subscription details', e);
          }
        }

        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const stripeInvoiceId = invoice.id;
        const stripeSubscriptionId = invoice.subscription as string | null;
        const customerId = invoice.customer;

        // Map invoice to our user via metadata or via subscription record
        // If subscription id exists, find our subscription row
        let userId: string | null = null;
        if (stripeSubscriptionId) {
          const { data } = await supabaseAdmin.from('subscriptions').select('user_id').eq('stripe_subscription_id', stripeSubscriptionId).limit(1);
          userId = data?.[0]?.user_id || null;
        }

        // Create invoice record in DB
        const amountCents = invoice.amount_paid ?? invoice.amount_due ?? 0;
        const currency = invoice.currency ?? 'KES';

        const feePercent = parseFloat(process.env.PAYMENT_FEE_PERCENT || '2.5');
        const feeCents = Math.round((Number(amountCents) * feePercent) / 100);
        const netCents = Number(amountCents) - feeCents;

        const ourInvoiceId = invoice.id; // use stripe invoice id as reference

        await supabaseAdmin.from('invoices').upsert({
          id: ourInvoiceId,
          user_id: userId,
          amount_cents: amountCents,
          currency,
          fee_cents: feeCents,
          net_amount_cents: netCents,
          method: 'card',
          status: 'paid',
          provider: 'stripe',
          provider_ref: stripeInvoiceId,
          invoice_line_items: invoice.lines?.data?.map(i => ({ description: i.description, amount: i.amount, quantity: i.quantity })) || [],
          updated_at: new Date().toISOString(),
        });

        // Insert payment record
        await supabaseAdmin.from('payments').insert({
          invoice_id: ourInvoiceId,
          provider: 'stripe',
          provider_ref: stripeInvoiceId,
          method: 'card',
          amount_cents: amountCents,
          fee_cents: feeCents,
          net_amount_cents: netCents,
          status: 'completed'
        });

        // Update subscription next billing if applicable
        if (stripeSubscriptionId) {
          const sub = await stripe.subscriptions.retrieve(stripeSubscriptionId as string);
          const nextBilling = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
          await supabaseAdmin.from('subscriptions').update({ next_billing_at: nextBilling }).eq('stripe_subscription_id', stripeSubscriptionId);
        }

        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = sub.id;
        const priceId = sub.items.data[0]?.price.id || null;
        const userId = sub.metadata?.userId || null;

        await supabaseAdmin.from('subscriptions').upsert({
          stripe_subscription_id: stripeSubscriptionId,
          user_id: userId,
          plan: priceId,
          status: sub.status,
          trial_ends_at: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
          next_billing_at: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'stripe_subscription_id' });

        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await supabaseAdmin.from('subscriptions').update({ status: 'canceled', updated_at: new Date().toISOString() }).eq('stripe_subscription_id', sub.id);
        break;
      }
      default:
        console.log('Unhandled stripe event', event.type);
    }
  } catch (err) {
    console.error('Failed processing webhook', err);
  }

  return NextResponse.json({ received: true });
}
