import DreamLifeCalculatorClient from './DreamLifeCalculatorClient';

export const metadata = {
  title: "Your Number | All That’s Next",
  description: 'Design the lifestyle you want, work out what it could cost, and explore the income that might support it using current Australian planning settings.',
  keywords: [
    'your number calculator',
    'dream life calculator',
    'lifestyle cost calculator',
    'what salary do I need',
    'income needed calculator',
    'Australian salary calculator',
    'life design tool',
    "All That’s Next",
  ],
  openGraph: {
    title: "Your Number | All That’s Next",
    description: 'Design the lifestyle you want, work out what it could cost, and explore the income that might support it.',
    url: 'https://allthatsnext.com/dream-life-calculator',
    siteName: "All That’s Next",
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/assets/console/mb01-console-your-number-loaded-v1.jpg',
        width: 1280,
        height: 960,
        alt: 'The MB-01 Life Console with the Your Number module loaded',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Your Number | All That’s Next",
    description: 'Design the lifestyle you want, work out what it could cost, and explore the income that might support it.',
    images: ['/assets/console/mb01-console-your-number-loaded-v1.jpg'],
  },
  alternates: {
    canonical: 'https://allthatsnext.com/dream-life-calculator',
  },
};

export default function DreamLifeCalculatorPage() {
  return <DreamLifeCalculatorClient />;
}
