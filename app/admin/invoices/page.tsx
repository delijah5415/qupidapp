'use client';
import React, { useEffect, useState } from 'react';

export default function AdminInvoicesPage() {
  const [adminKey, setAdminKey] = useState('');
  const [invoices, setInvoices] = useState<any[]>([]);

  async function loadInvoices() {
    const res = await fetch('/api/admin/list-invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ status: 'all', limit: 200 })
    });
    const data = await res.json();
    if (data.invoices) setInvoices(data.invoices);
    else alert('Failed to load: ' + (data.error || 'unknown'));
  }

  async function confirmInvoice(id: string) {
    const res = await fetch('/api/admin/confirm-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ invoiceId: id })
    });
    const data = await res.json();
    if (data.status === 'ok') loadInvoices();
    else alert('Failed to confirm: ' + (data.error || 'unknown'));
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Admin — Invoices</h1>
      <div className="mb-4">
        <input placeholder="Admin Key" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} className="px-3 py-2 border mr-2" />
        <button onClick={loadInvoices} className="px-3 py-2 bg-accent text-stark rounded">Load Invoices</button>
      </div>

      <div className="space-y-3">
        {invoices.map(inv => (
          <div key={inv.id} className="p-3 bg-muted border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{inv.id}</p>
              <p className="text-sm text-muted">User: {inv.user_id} • Amount: KES {(inv.amount_cents/100).toFixed(2)} • Status: {inv.status}</p>
            </div>
            <div className="flex gap-2">
              {inv.receipt_url && <a href={inv.receipt_url} target="_blank" rel="noreferrer" className="underline text-accent">View receipt</a>}
              {inv.status !== 'paid' && <button onClick={() => confirmInvoice(inv.id)} className="px-3 py-1 bg-green-600 text-white rounded">Mark paid</button>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
