import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AuthForm from '@/components/AuthForm';
import PaymentForm from '@/components/PaymentForm';

export default function PortalPage() {
  const [session, setSession] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchInvoices(session.user.id);
      else setInvoices([]);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function fetchInvoices(userId?: string) {
    if (!userId) return;
    const { data, error } = await supabase.from('invoices').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) console.error('Failed to fetch invoices', error);
    else setInvoices(data || []);
  }

  useEffect(() => {
    if (session?.user?.id) fetchInvoices(session.user.id);
  }, [session]);

  if (loading) return <div className="p-8">Loading...</div>;

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <AuthForm />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Welcome, {session.user.user_metadata?.name || session.user.email}</h1>
          <div>
            <button onClick={async () => { await supabase.auth.signOut(); setSession(null); }} className="px-3 py-2 border rounded">Sign out</button>
          </div>
        </div>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="col-span-1 bg-muted p-4 rounded border">
            <h2 className="font-semibold mb-3">Account</h2>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>Phone:</strong> {session.user.user_metadata?.phone || '—'}</p>
            <p><strong>Country:</strong> {session.user.user_metadata?.country || '—'}</p>
            <p className="mt-3"><strong>Subscription</strong></p>
            <PaymentForm priceId={process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_PRO || ''} />
          </div>

          <div className="lg:col-span-2 bg-muted p-4 rounded border">
            <h2 className="font-semibold mb-3">Invoices</h2>
            {invoices.length === 0 ? (
              <p>No invoices yet. Make a payment to generate an invoice.</p>
            ) : (
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="p-3 bg-background border rounded flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Invoice {inv.id}</p>
                      <p className="text-sm text-muted">Amount: KES {(inv.amount_cents/100).toFixed(2)} • Fee: KES {(inv.fee_cents/100).toFixed(2)} • Status: {inv.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {inv.receipt_url && <a href={inv.receipt_url} target="_blank" rel="noreferrer" className="text-accent underline">View receipt</a>}
                      {inv.status !== 'paid' && (
                        <label className="btn">
                          <input type="file" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const path = `receipts/${session.user.id}/${inv.id}_${file.name}`;
                            const { data, error } = await supabase.storage.from('receipts').upload(path, file, { upsert: true });
                            if (error) return alert('Upload failed: ' + error.message);
                            const { data: urlData } = supabase.storage.from('receipts').getPublicUrl(path);
                            // Update invoice with receipt URL
                            const { error: updateErr } = await supabase.from('invoices').update({ receipt_url: urlData.publicUrl, status: 'under_review' }).eq('id', inv.id);
                            if (updateErr) alert('Failed to update invoice: ' + updateErr.message);
                            else alert('Receipt uploaded, awaiting verification');
                            fetchInvoices(session.user.id);
                          }} />
                          <span className="px-3 py-1 border rounded">Upload receipt</span>
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
