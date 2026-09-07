const calculatorOrigin =
  process.env.HECS_CALCULATOR_ORIGIN ||
  (process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3001'
    : 'https://help-loan-calculator.vercel.app');

const growthLabOrigin =
  process.env.GROWTH_LAB_ORIGIN ||
  (process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3400'
    : 'https://all-thats-next-growth-lab.vercel.app');

const tuesdayTypeOrigin =
  process.env.TUESDAY_TYPE_ORIGIN ||
  (process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3002'
    : 'https://tuesday-type-platform.vercel.app');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/growth-lab-static/:path*',
        destination: `${growthLabOrigin}/growth-lab-static/:path*`,
      },
      {
        source: '/growth-lab-assets/:path*',
        destination: `${growthLabOrigin}/growth-lab-assets/:path*`,
      },
      {
        source: '/growth-lab',
        destination: `${growthLabOrigin}/growth-lab`,
      },
      {
        source: '/growth-lab/:path*',
        destination: `${growthLabOrigin}/growth-lab/:path*`,
      },
      {
        source: '/tuesday-type',
        destination: `${tuesdayTypeOrigin}/tuesday-type`,
      },
      {
        source: '/tuesday-type/:path*',
        destination: `${tuesdayTypeOrigin}/tuesday-type/:path*`,
      },
      {
        source: '/hecs-debt-calculator-static/:path*',
        destination: `${calculatorOrigin}/hecs-debt-calculator-static/:path*`,
      },
      {
        source: '/hecs-debt-calculator',
        destination: `${calculatorOrigin}/hecs-debt-calculator`,
      },
      {
        source: '/hecs-debt-calculator/:path*',
        destination: `${calculatorOrigin}/hecs-debt-calculator/:path*`,
      },
    ];
  },
};

export default nextConfig;
