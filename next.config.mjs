const calculatorOrigin =
  process.env.HECS_CALCULATOR_ORIGIN ||
  (process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3001'
    : 'https://help-loan-calculator.vercel.app');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
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
