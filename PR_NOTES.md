Updated subscription lifecycle, admin invoices UI, invoice PDF generation, and notification endpoint.

Files added/modified on branch feature/saas-subscriptions-admin:
- sql/migrations/002_add_subscriptions.sql (new)
- app/api/subscriptions/change-plan/route.ts (new)
- app/api/billing/webhook/route.ts (modified to handle subscription events & invoice.payment_succeeded)
- app/api/admin/list-invoices/route.ts (new)
- app/api/invoices/[id]/pdf/route.ts (new)
- app/api/notifications/email/route.ts (new)
- components/SubscriptionCard.tsx (new)
- app/admin/invoices/page.tsx (new)
- Package.json (updated dependencies)
- .env.example (expanded)

Notes:
- Please run the new SQL migration in Supabase to create the subscriptions table and alter invoices.
- Install new dependencies (html-pdf-node, nodemailer).
- Add new environment variables in Netlify (ADMIN_API_KEY, SMTP_*, NEXT_PUBLIC_STRIPE_PRICE_* etc.).

Next step: I will run a local sanity check of the routes and, when you're ready, open the PR so you can review it.
