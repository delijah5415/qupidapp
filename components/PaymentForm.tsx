'use client';
import React from 'react';

export default function PaymentForm({ priceId, mode = 'subscription' }: { priceId: string, mode?: 'subscription'|'payment' }) {
  async function startCheckout() {
    const res = await fetch('/api/payments/checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, mode, userId: 'user-id-placeholder' }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert('Failed to start checkout');
  }

  return (
    <button onClick={startCheckout} className="px-4 py-2 bg-red-600 text-white rounded">
      Pay / Subscribe
    </button>
  );
}
