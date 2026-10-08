import type { Metadata } from 'next';
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://allthatsnext.com/baby-shower' },
};
export default function PersonalEventLayout({ children }: { children: React.ReactNode }) { return children; }
