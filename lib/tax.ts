export const TAX_YEAR = '2026–27';
export const SUPER_RATE = 0.12;
export const MEDICARE_RATE = 0.02;
export const HELP_LOWER = 69_528;
export const HELP_SECOND = 129_717;

export const TAX_BRACKETS = [
  { min: 0, max: 18200, rate: 0, base: 0 },
  { min: 18201, max: 45000, rate: 0.15, base: 0 },
  { min: 45001, max: 135000, rate: 0.30, base: 4020 },
  { min: 135001, max: 190000, rate: 0.37, base: 31020 },
  { min: 190001, max: Infinity, rate: 0.45, base: 51370 },
] as const;

export const calculateTaxATO = (gross: number) => {
  for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
    const b = TAX_BRACKETS[i];
    if (gross >= b.min) return b.base + (gross - (b.min - 1)) * b.rate;
  }
  return 0;
};

export const calculateMedicare = (gross: number) => gross * MEDICARE_RATE;

export const calculateHECS = (gross: number) => {
  if (gross <= HELP_LOWER) return 0;
  const firstBand = (Math.min(gross, HELP_SECOND) - HELP_LOWER) * 0.15;
  const secondBand = gross > HELP_SECOND ? (gross - HELP_SECOND) * 0.17 : 0;
  return Math.min(firstBand + secondBand, gross * 0.10);
};

export const grossFromNet = (targetNet: number, includeHECS = false) => {
  let lo = targetNet, hi = Math.max(targetNet * 2.5, 50_000);
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    let ded = calculateTaxATO(mid) + calculateMedicare(mid);
    if (includeHECS) ded += calculateHECS(mid);
    if (mid - ded < targetNet) lo = mid; else hi = mid;
  }
  return Math.round((lo + hi) / 2);
};

export const grossFromNetSimple = (targetNet: number, rate: number) =>
  Math.round(targetNet / (1 - rate / 100));
