export default function sitemap() {
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
    ]
}
