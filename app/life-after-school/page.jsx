import { ArticlePage } from '@/components/ArticlePage';
const article = {
  "slug": "life-after-school",
  "label": "Life after school",
  "blocks": [
    {
      "heading": "School ends. Then what?",
      "paragraphs": [
        "You do not need a perfect ten-year plan. You need a clearer picture and one move you can try.",
        "Start here."
      ]
    },
    {
      "heading": "Picture your Ideal Tuesday",
      "paragraphs": [
        "Imagine a Tuesday in a life you'd be excited to build.",
        "Where do you wake up? What fills your day? Who are you around? How much freedom do you have? What's left of your energy when you get home?",
        "Write down three things you want more of. Making things? Working with people? Time outdoors? A steady rhythm? Room to explore?",
        "[Find your Tuesday Type](https://allthatsnext.com/tuesday-type) to go deeper. Answer 27 questions, explore the direction your choices point towards and leave with one experiment to try. The free beta is open."
      ]
    },
    {
      "heading": "Find Your Number",
      "paragraphs": [
        "Now picture the costs. Your place. Food. Transport. The things you want to do. Money you want to put aside.",
        "You do not have to guess everything perfectly. A rough first version gives you something to work with.",
        "[Find Your Number](https://allthatsnext.com/your-number). Build the lifestyle, see what it could cost and explore the income that might support it. Use Australian income tax rates or choose your own flat tax percentage for a rough estimate elsewhere.",
        "Thinking about uni? Check your actual course fees and [explore your HECS repayment path](https://allthatsnext.com/hecs-debt-calculator). Before enrolling, know your provider's deadlines and what you would owe if you changed direction."
      ]
    },
    {
      "heading": "Test a direction",
      "paragraphs": [
        "Pick one thing you can try this week.",
        "Make a small project. Talk to someone doing work you're curious about. Try an introductory session. Give yourself a real glimpse of the day, not just the job title.",
        "Afterwards, ask: What gave me energy? What was harder than I expected? Do I want more of this?",
        "That answer gives you something useful for your next choice."
      ]
    },
    {
      "heading": "Make your next move",
      "paragraphs": [
        "Uni, training, work or time to explore can each be part of your path. Compare what the next step costs, what it lets you learn and which deadlines matter.",
        "Choose one move. Set a date. Try it. Come back to what you learned.",
        "Your future gets clearer when you start building it.",
        "[Start with your Ideal Tuesday](https://allthatsnext.com/tuesday-type)",
        "Prepared by All That’s Next"
      ]
    }
  ],
  "metadata": {
    "title": "Life After School | Where Do You Start?",
    "description": "Picture your Ideal Tuesday, find what your life could cost and try one small move before your next big decision."
  }
};
const shareImage = 'https://allthatsnext.com/assets/console/mb01-console-empty-three-quarter-v1.webp';
export const metadata = { ...article.metadata, alternates: { canonical: '/life-after-school' }, openGraph: { ...article.metadata, url: '/life-after-school', siteName: "All That's Next", locale: 'en_AU', type: 'website', images: [{ url: shareImage, width: 1280, height: 653, alt: "The All That's Next MB-01 Life Console" }] }, twitter: { ...article.metadata, card: 'summary_large_image', images: [shareImage] } };
export default function Page() { return <ArticlePage article={article} />; }
