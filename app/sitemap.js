export default function sitemap() {
    return [
        {
            url: 'https://www.mitchbryant.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://www.mitchbryant.com/dream-life-calculator',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}
