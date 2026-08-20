export function applyFee(amountCents: number) {
  const feePercent = parseFloat(process.env.PAYMENT_FEE_PERCENT || '2.5');
  const feeCents = Math.round((amountCents * feePercent) / 100);
  const netCents = amountCents - feeCents;
  return { feeCents, netCents };
}
