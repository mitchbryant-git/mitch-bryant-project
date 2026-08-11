import DreamLifeCalculatorClient from './DreamLifeCalculatorClient';

export const metadata = {
  title: "Dream Life Calculator | All That’s Next",
  description: 'Build the lifestyle you want, estimate what it could cost, and explore the income that might support it using current Australian planning settings.',
  keywords: [
    'dream life calculator',
    'lifestyle cost calculator',
    'what salary do I need',
    'income needed calculator',
    'Australian salary calculator',
    'life design tool',
    "All That’s Next",
  ],
  openGraph: {
    title: "Dream Life Calculator | All That’s Next",
    description: 'Build the lifestyle you want, estimate what it could cost, and explore the income that might support it.',
    url: 'https://allthatsnext.com/dream-life-calculator',
    siteName: "All That’s Next",
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/assets/console/mb01-console-dream-life-loaded-v1.webp',
        width: 1280,
        height: 653,
        alt: 'The MB-01 Life Console with the Dream Life Calculator module loaded',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dream Life Calculator | All That’s Next",
    description: 'Build the lifestyle you want, estimate what it could cost, and explore the income that might support it.',
    images: ['/assets/console/mb01-console-dream-life-loaded-v1.webp'],
  },
  alternates: {
    canonical: 'https://allthatsnext.com/dream-life-calculator',
  },
};

export default function DreamLifeCalculatorPage() {
  return <DreamLifeCalculatorClient />;
}
