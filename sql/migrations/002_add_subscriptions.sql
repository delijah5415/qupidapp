-- Supabase SQL migration: add subscriptions table and invoice enhancements

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  plan varchar(100),
  stripe_subscription_id text,
  status varchar(50),
  trial_ends_at timestamptz,
  next_billing_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add invoice_line_items and invoice_pdf_url to invoices
ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS invoice_line_items jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS invoice_pdf_url text;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
