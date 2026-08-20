import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  if (!process.env.SMTP_HOST) return NextResponse.json({ error: 'SMTP not configured' }, { status: 500 });

  const body = await req.json();
  const { to, subject, text, html } = body;
  if (!to) return NextResponse.json({ error: 'Recipient required' }, { status: 400 });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({ from: process.env.SMTP_FROM || 'no-reply@qupid.app', to, subject, text, html });
    return NextResponse.json({ accepted: info.accepted });
  } catch (err) {
    console.error('Email send failed', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
