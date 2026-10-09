import { ArticlePage } from '@/components/ArticlePage';
const article = {
  "slug": "about",
  "label": "About All That’s Next",
  "blocks": [
    {
      "heading": "School Ends. Then What?",
      "paragraphs": [
        "What should you study? Which job should you choose? How much do you need to earn?",
        "Start with you. The days you want. The people around you. The freedom, work and experiences you want to make room for.",
        "All That's Next helps you turn that picture into choices you can actually test."
      ]
    },
    {
      "heading": "Why I built this",
      "pullQuote": ["Not knowing what you want at 17 isn’t expensive.", "Pretending you know can be."],
      "paragraphs": [
        "Hi, I’m Mitch.",
        "At 17, everyone kept asking me what I wanted to do. I had no idea.",
        "I was good at maths. People said accounting was stable. Stable sounded sensible.",
        "So I studied Commerce, took on the massive debt that came with it, and landed a job as a tax accountant.",
        "I hated it.",
        "I dreaded every Monday. I watched the clock all day. I felt stuck in a life I’d never actually chosen.",
        "Three years in, I quit and started again at the bottom, in sales. Today I sell software to some of the biggest companies in the world, and I love it.",
        "Same guy. Different Tuesday.",
        "Here’s what gets me. I spent years working towards that first job and not one minute finding out what a normal Tuesday in it would feel like. If I had, I’d have known it wasn’t for me, and I could have skipped the debt and the wasted years.",
        "Choosing accounting wasn’t the mistake. Choosing blind was.",
        "That’s why I’m building All That’s Next. The tools I wish someone had handed me at 17.",
        "Picture the days you actually want. Put real numbers behind them. Test-drive a path before you sign up for it.",
        "I’m not here to tell you what to be. If you leave knowing one thing school never taught you, I’ve done my job.",
        "You don’t need certainty. You need evidence."
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
