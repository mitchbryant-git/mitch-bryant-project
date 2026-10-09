import { ArticlePage } from '@/components/ArticlePage';
const article = {
  "slug": "about",
  "label": "About All That’s Next",
  "blocks": [
    {
      "heading": "Build a life you want to live",
      "paragraphs": [
        "School ends. The questions get bigger.",
        "What should you study? Which job should you choose? How much do you need to earn?",
        "Start with you. The days you want. The people around you. The freedom, work and experiences you want to make room for.",
        "All That's Next helps you turn that picture into choices you can actually test."
      ]
    },
    {
      "heading": "Why I built this",
      "paragraphs": [
        "I'm Mitch Bryant, the founder of All That's Next.",
        "I chose the sensible degree and became a tax accountant. From the outside, the path looked right. From the inside, it wasn't the life I wanted.",
        "I changed direction and rebuilt. Now I'm making the tools I wish I had at 16, before years and money were tied to someone else's idea of success.",
        "You get to choose what you're building towards. My job is to help you see the options and the trade-offs clearly enough to start."
      ]
    },
    {
      "heading": "Design it. Price it. Start building it.",
      "paragraphs": [
        "**Design.** Picture your Ideal Tuesday. How do you want your days to work? [Tuesday Type](https://allthatsnext.com/tuesday-type) helps you explore a direction and gives you one experiment to try. The free beta is open.",
        "**Price.** Put numbers behind the life. [Your Number](https://allthatsnext.com/your-number) helps you explore what it could cost and the income that might support it. If you're weighing up uni, the [HECS Calculator](https://allthatsnext.com/hecs-debt-calculator) lets you explore repayment scenarios.",
        "**Build.** Try a small move. Notice what fits. Use what you learn to choose the next one. [Growth Lab](https://allthatsnext.com/growth-lab) is being tested in an invite-only beta to help turn daily action into Evidence.",
        "You can start with the tool that answers your next question."
      ]
    },
    {
      "heading": "Clear choices. Real limits.",
      "paragraphs": [
        "Tuesday Type reflects what you choose, and your direction can change. It does not diagnose your personality or choose your career.",
        "Your Number offers two ways to estimate income. Use Australian income tax rates or choose your own flat tax percentage for a rough estimate elsewhere. The HECS Calculator uses Australian repayment settings. These tools help you explore possibilities, not predict your exact future. Check the assumptions and current official rules before making a financial decision.",
        "The guides are prepared by All That's Next, with sources you can check. If you spot something wrong or unclear, [email Mitch](mailto:hello@mitchbryant.com)."
      ]
    },
    {
      "heading": "Your next move",
      "paragraphs": [
        "Start with the life you want to build. Find one useful thing to try today.",
        "[Explore the tools](https://allthatsnext.com/#modules)"
      ]
    }
  ],
  "metadata": {
    "title": "About All That's Next | Meet Mitch Bryant",
    "description": "Meet Mitch and see how All That's Next helps you design your life, understand the costs and take your next step."
  }
};
const shareImage = 'https://allthatsnext.com/assets/console/mb01-console-empty-three-quarter-v1.webp';
export const metadata = { ...article.metadata, alternates: { canonical: '/about' }, openGraph: { ...article.metadata, url: '/about', siteName: "All That's Next", locale: 'en_AU', type: 'website', images: [{ url: shareImage, width: 1280, height: 653, alt: "The All That's Next MB-01 Life Console" }] }, twitter: { ...article.metadata, card: 'summary_large_image', images: [shareImage] } };
export default function Page() { return <ArticlePage article={article} />; }
