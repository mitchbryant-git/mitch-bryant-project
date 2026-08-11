export default function sitemap() {
    const calculatorRoutes = [
        '',
        '/hecs-repayment-thresholds-2026-27',
        '/hecs-indexation-2026',
        '/how-hecs-indexation-works',
        '/hecs-debt-and-home-loans',
        '/real-cost-of-starting-uni-before-youre-ready',
        '/hecs-help-vs-fee-help',
        '/help-borrowing-limit',
    ].map((path) => ({
        url: `https://allthatsnext.com/hecs-debt-calculator${path}`,
        lastModified: new Date(),
        changeFrequency: path ? 'monthly' : 'weekly',
        priority: path ? 0.7 : 0.9,
    }));

    return [
        {
            url: 'https://allthatsnext.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://allthatsnext.com/dream-life-calculator',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...calculatorRoutes,
    ]
}
