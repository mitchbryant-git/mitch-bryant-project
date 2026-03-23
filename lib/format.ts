export const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(val);

export const formatCurrencyShort = (val: number) => {
  const n = Math.round(val);
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
};

export const formatNumber = (val: number | string) => {
  const n = parseFloat(String(val));
  if (isNaN(n) || val === '' || val === 0) return '';
  return new Intl.NumberFormat('en-AU', { maximumFractionDigits: 2 }).format(n);
};
