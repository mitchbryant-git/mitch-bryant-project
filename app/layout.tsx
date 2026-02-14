import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  // 1. Google & Browser Tab
  title: "Mitch Bryant | Tools & Frameworks for 16-19 Year Olds",
  description: "Building tools and frameworks to help 16-19 year olds design their future. Free calculators, planners, and resources for teens who want to own their future.",

  // 2. SEO Keywords
  keywords: [
    'life design for teens',
    'career planning tools',
    'teen financial literacy',
    'student loan calculator',
    'life planning 16-19',
    'future planning teens',
    'Mitch Bryant'
  ],

  // 3. Social Media Cards (Facebook, LinkedIn, iMessage)
  openGraph: {
    title: "Mitch Bryant | Tools & Frameworks for 16-19 Year Olds",
    description: "Building tools and frameworks to help 16-19 year olds design their future. Free calculators, planners, and resources.",
    url: 'https://www.mitchbryant.com',
    siteName: 'Mitch Bryant',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mitch Bryant - Tools and frameworks for designing your future',
      }
    ],
  },

  // 4. Favicon
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // 5. Canonical URL
  alternates: {
    canonical: 'https://www.mitchbryant.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mitch Bryant",
              "description": "Building tools and frameworks to help 16-19 year olds design their future",
              "url": "https://www.mitchbryant.com",
              "sameAs": [
                "https://www.tiktok.com/@itsmitchbryant",
                "https://www.instagram.com/itsmitchbryant"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${lato.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
