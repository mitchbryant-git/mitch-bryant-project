export const metadata = {
  title: "Alyssa and Mitch's Baby Shower",
  description: "You're invited to celebrate with us!",
  openGraph: {
    title: "Alyssa and Mitch's Baby Shower",
    description: "You're invited to celebrate with us!",
    type: "website",
    images: [
      {
        url: "https://www.mitchbryant.com/belly2-compressed.jpg",
        width: 1200,
        height: 900,
        alt: "Baby Shower Invitation",
      },
    ],
  },
};

export default function BabyShowerLayout({ children }) {
  return children;
}
