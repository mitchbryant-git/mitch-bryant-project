import DreamLifeCalculatorClient from './DreamLifeCalculatorClient';

export const metadata = {
  title: "Your Number | Lifestyle Cost Calculator",
  description: "Picture your ideal life. Price it. See what you need to earn. This is YOUR Number.",
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
    title: "Your Number | Lifestyle Cost Calculator",
    description: "Picture your ideal life. Price it. See what you need to earn. This is YOUR Number.",
    url: 'https://allthatsnext.com/your-number',
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
    title: "Your Number | Lifestyle Cost Calculator",
    description: "Picture your ideal life. Price it. See what you need to earn. This is YOUR Number.",
    images: ['/assets/console/mb01-console-your-number-loaded-v1.jpg'],
  },
  alternates: {
    canonical: 'https://allthatsnext.com/your-number',
  },
};

export default function DreamLifeCalculatorPage() {
  return <DreamLifeCalculatorClient />;
}
