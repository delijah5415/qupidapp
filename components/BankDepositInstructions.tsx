'use client';
import React, { useState } from 'react';

export default function BankDepositInstructions() {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('IM');
  const [invoice, setInvoice] = useState<any>(null);

  async function createInvoice(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/payments/bank-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount_cents: Math.round(parseFloat(amount) * 100), userId: 'user-id-placeholder', bank }),
    });
    const data = await res.json();
    setInvoice(data);
  }

  return (
    <div className="p-4 border rounded">
      <form onSubmit={createInvoice} className="space-y-2">
        <div>
          <label>Amount (KES)</label>
          <input value={amount} onChange={e => setAmount(e.target.value)} className="ml-2 border px-2" />
        </div>
        <div>
          <label>Bank</label>
          <select value={bank} onChange={e => setBank(e.target.value)} className="ml-2 border px-2">
            <option value="IM">I&amp;M Bank</option>
            <option value="KCB">KCB</option>
          </select>
        </div>
        <button className="px-3 py-1 bg-gray-800 text-white rounded">Create Bank Invoice</button>
      </form>

      {invoice && (
        <div className="mt-4 bg-gray-50 p-3 rounded">
          <h4 className="font-semibold">Payment Instructions</h4>
          <p>Reference: <strong>{invoice.reference}</strong></p>
          <p>Amount (KES): {(invoice.amount_cents / 100).toFixed(2)}</p>
          <div className="mt-2">
            <p>Bank: {invoice.bankDetails.bank_name}</p>
            <p>Account name: {invoice.bankDetails.account_name}</p>
            <p>Account number: {invoice.bankDetails.account_number}</p>
            <p>Till / Paybill: {invoice.bankDetails.till_number}</p>
          </div>
          <p className="text-sm text-gray-600 mt-2">Upload your receipt via the portal to confirm payment.</p>
        </div>
      )}
    </div>
  );
}
