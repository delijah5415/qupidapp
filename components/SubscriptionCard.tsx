import React from 'react';

export default function SubscriptionCard({ subscription }: { subscription: any }) {
  const planName = subscription?.plan || 'Free';
  const nextBilling = subscription?.next_billing_at ? new Date(subscription.next_billing_at).toLocaleDateString() : '—';

  async function changePlan(priceId: string) {
    const res = await fetch('/api/subscriptions/change-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: subscription.user_id, priceId })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="p-4 bg-muted border rounded">
      <h3 className="font-semibold">Plan</h3>
      <p className="text-sm">{planName}</p>
      <p className="text-sm mt-2">Next billing: {nextBilling}</p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => changePlan(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_PRO || '')} className="px-3 py-1 bg-accent text-stark rounded">Upgrade</button>
        <button onClick={() => changePlan(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_STARTER || '')} className="px-3 py-1 border rounded">Downgrade</button>
      </div>
    </div>
  );
}
