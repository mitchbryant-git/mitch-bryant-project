import type { Metadata } from "next";
import {
  Anybody,
  Archivo_Black,
  IBM_Plex_Mono,
  Instrument_Sans,
  Lato,
  Montserrat,
} from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// Temporary compatibility fonts for the existing Dream Life Calculator route.
// Remove these when that tool receives its own Life Console visual migration.
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mitchbryant.com"),
  title: "Mitch Bryant | Design the life first",
  description:
    "Sharp tools and straight answers to help young people design the life first, then work out the career and money needed to build it.",
  keywords: [
    "life design for teens",
    "career planning tools",
    "teen financial literacy",
    "future planning teens",
    "Mitch Bryant",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "School ends. Then what? | Mitch Bryant",
    description:
      "Figure out who you're becoming, what your life could look like, and how to fund it. Sharp tools, straight answers, no lectures.",
    url: "/",
    siteName: "Mitch Bryant",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/assets/console/mb01-console-empty-three-quarter-v1.webp",
        width: 1280,
        height: 653,
        alt: "The MB-01 Life Console",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School ends. Then what? | Mitch Bryant",
    description: "Design the life first. Then work out the career and money needed to build it.",
    images: ["/assets/console/mb01-console-empty-three-quarter-v1.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mitch Bryant",
              description: "Building practical life-design and financial tools for young people",
              url: "https://www.mitchbryant.com",
              sameAs: [
                "https://www.tiktok.com/@itsmitchbryant",
                "https://www.instagram.com/itsmitchbryant",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${anybody.variable} ${archivoBlack.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} ${lato.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
