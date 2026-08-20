import { NextResponse } from 'next/server';
import html_to_pdf from 'html-pdf-node';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: Request, { params }: any) {
  const id = params?.id;
  if (!id) return NextResponse.json({ error: 'Invoice id required' }, { status: 400 });

  try {
    const { data } = await supabaseAdmin.from('invoices').select('*').eq('id', id).limit(1);
    const invoice = data?.[0];
    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

    // Basic HTML invoice template
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Invoice ${invoice.id}</title>
          <style>body{font-family: Arial, sans-serif; padding:24px;} .header{display:flex;justify-content:space-between;align-items:center;} .items{margin-top:24px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;text-align:left;} </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2>Qupid</h2>
              <div>Invoice: ${invoice.id}</div>
            </div>
            <div>
              <div>${invoice.created_at}</div>
            </div>
          </div>
          <div class="items">
            <table>
              <thead><tr><th>Description</th><th>Amount</th></tr></thead>
              <tbody>
                ${(invoice.invoice_line_items || []).map((li: any) => `<tr><td>${li.description || ''}</td><td>${((li.amount||0)/100).toFixed(2)}</td></tr>`).join('')}
                <tr><td>Subtotal</td><td>KES ${(invoice.amount_cents/100).toFixed(2)}</td></tr>
                <tr><td>Fee</td><td>KES ${(invoice.fee_cents/100).toFixed(2)}</td></tr>
                <tr><td>Total</td><td>KES ${(invoice.net_amount_cents/100).toFixed(2)}</td></tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    const options = { format: 'A4' };
    const file = { content: html };
    const pdfBuffer = await html_to_pdf.generatePdf(file, options);

    // Optionally store PDF in Supabase Storage and update invoice_pdf_url
    const filename = `invoices/${invoice.id}.pdf`;
    try {
      await supabaseAdmin.storage.from('receipts').upload(filename, pdfBuffer, { contentType: 'application/pdf', upsert: true });
      const { data: urlData } = supabaseAdmin.storage.from('receipts').getPublicUrl(filename);
      await supabaseAdmin.from('invoices').update({ invoice_pdf_url: urlData.publicUrl }).eq('id', invoice.id);
    } catch (e) {
      console.warn('Failed to store invoice PDF', e);
    }

    return new Response(pdfBuffer, { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="invoice_${invoice.id}.pdf"` } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate invoice PDF' }, { status: 500 });
  }
}
