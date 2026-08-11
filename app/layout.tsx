import type { Metadata, Viewport } from "next";
import {
  Anybody,
  Archivo_Black,
  IBM_Plex_Mono,
  Instrument_Sans,
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

export const metadata: Metadata = {
  metadataBase: new URL("https://allthatsnext.com"),
  title: "All That’s Next | Tools for Life After School",
  description:
    "Practical tools that help young people understand themselves, price their choices and start shaping what comes next.",
  keywords: [
    "life design for teens",
    "career planning tools",
    "teen financial literacy",
    "future planning teens",
    "All That’s Next",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "School ends. Then what? | All That’s Next",
    description:
      "You do not need your whole life figured out. Start with a practical tool that makes one part of what comes next clearer.",
    url: "/",
    siteName: "All That’s Next",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/assets/console/mb01-console-empty-three-quarter-v1.webp",
        width: 1280,
        height: 653,
        alt: "The All That's Next MB-01 Life Console",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School ends. Then what? | All That’s Next",
    description: "Practical tools to help you start shaping all that's next.",
    images: ["/assets/console/mb01-console-empty-three-quarter-v1.webp"],
  },
  icons: {
    icon: "/favicon-atn-cream-v1.png",
    shortcut: "/favicon-atn-cream-v1.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f8f1eb",
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
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://allthatsnext.com/#organization",
                  name: "All That’s Next",
                  description:
                    "Practical tools that help young people approach the future with greater clarity, agency and optimism.",
                  url: "https://allthatsnext.com",
                  logo: "https://allthatsnext.com/icon-512.png",
                  founder: {
                    "@type": "Person",
                    name: "Mitch Bryant",
                  },
                  sameAs: [
                    "https://www.tiktok.com/@itsmitchbryant",
                    "https://www.instagram.com/itsmitchbryant",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://allthatsnext.com/#website",
                  name: "All That’s Next",
                  url: "https://allthatsnext.com",
                  publisher: {
                    "@id": "https://allthatsnext.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${anybody.variable} ${archivoBlack.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
