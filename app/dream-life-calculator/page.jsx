import DreamLifeCalculatorClient from './DreamLifeCalculatorClient';

export const metadata = {
  title: 'Dream Life Calculator | Mitch Bryant',
  description: 'Design your dream lifestyle, add up what it actually costs, and find out exactly what you need to earn. Real ATO tax brackets, HECS, and super included.',
  keywords: [
    'dream life calculator',
    'lifestyle cost calculator',
    'what salary do I need',
    'income needed calculator',
    'Australian salary calculator',
    'life design tool',
    'Mitch Bryant',
  ],
  openGraph: {
    title: 'Dream Life Calculator | Mitch Bryant',
    description: 'Design your dream lifestyle and find out exactly what you need to earn. Real ATO tax brackets included.',
    url: 'https://www.mitchbryant.com/dream-life-calculator',
    siteName: 'Mitch Bryant',
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mitchbryant.com/dream-life-calculator',
  },
};

export default function DreamLifeCalculatorPage() {
  return <DreamLifeCalculatorClient />;
}
