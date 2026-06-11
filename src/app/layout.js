import { Inter, Inter_Tight, Anton } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-regular",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
});

const anton = Anton({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-anton",
});

export const viewport = {
  themeColor: '#1B3A2D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: 'Harshil Raj | Making Sense of AI — Systems, Product & GTM',
  description: 'Harshil Raj helps founders and operators make sense of AI. Building real AI systems, integrating AI into products, and scaling GTM without adding headcount. 9K+ on LinkedIn.',
  keywords: [
    'Harshil Raj',
    'AI systems consultant India',
    'AI automation',
    'product and GTM consulting',
    'AI workflows',
    'cloud infrastructure India',
    'Make n8n automation',
    'AI for startups India',
  ],
  authors: [{ name: 'Harshil Raj', url: 'https://harshilraj.vercel.app' }],
  creator: 'Harshil Raj',
  metadataBase: new URL('https://harshilraj.vercel.app'),
  alternates: {
    canonical: 'https://harshilraj.vercel.app',
  },
  openGraph: {
    type: 'website',
    url: 'https://harshilraj.vercel.app',
    title: 'Harshil Raj | Making Sense of AI — Systems, Product & GTM',
    description: 'AI systems, product consulting, and GTM for founders who want to use AI properly. 9K+ on LinkedIn.',
    siteName: 'Harshil Raj',
    locale: 'en_IN',
    images: [
      {
        url: 'https://harshilraj.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harshil Raj — Making Sense of AI for Founders and Operators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@harshilraj',
    creator: '@harshilraj',
    title: 'Harshil Raj | Making Sense of AI',
    description: 'AI systems, product consulting, and GTM for founders who want to use AI properly.',
    images: ['https://harshilraj.vercel.app/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/harshil.jpg' },
      { url: '/harshil.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/harshil.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/harshil.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'language': 'English',
    'revisit-after': '7 days',
    'category': 'Technology, AI, Consulting, Growth Strategy',
    'format-detection': 'telephone=no',
  },
  verification: {
    // TODO: paste GSC token here
    google: 'REPLACE_WITH_GSC_TOKEN',
    other: { 
      // TODO: paste Bing token here
      'msvalidate.01': 'REPLACE_WITH_BING_TOKEN' 
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${anton.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        {/* TODO: Update schema URLs to https://harshilraj.com when custom domain migration is completed */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://harshilraj.vercel.app/#person",
                  "name": "Harshil Raj",
                  "jobTitle": "AI Systems, Product & GTM Consultant",
                  "url": "https://harshilraj.vercel.app",
                  "image": "https://harshilraj.vercel.app/harshil.jpg",
                  "description": "Harshil Raj helps founders and operators make sense of AI — building real systems, integrating AI into products, and building GTM engines that scale.",
                  "knowsAbout": [
                    "AI Systems",
                    "AI Automation",
                    "Product Strategy",
                    "Go-To-Market",
                    "Cloud Infrastructure",
                    "AWS",
                    "Google Cloud",
                    "Make",
                    "n8n",
                    "OpenAI",
                    "Retell AI"
                  ],
                  "nationality": "IN",
                  "sameAs": [
                    "https://linkedin.com/in/harshilraj",
                    "https://twitter.com/harshilraj"
                  ]
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://harshilraj.vercel.app/#service",
                  "name": "Harshil Raj — AI Consulting",
                  "url": "https://harshilraj.vercel.app",
                  "founder": { "@id": "https://harshilraj.vercel.app/#person" },
                  "description": "AI systems, product consulting, and GTM engine building for founders and operators. Based in India.",
                  "areaServed": "IN",
                  "serviceType": [
                    "AI Systems Design",
                    "AI Automation",
                    "Product Consulting",
                    "GTM Strategy",
                    "Cloud Infrastructure"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "sales",
                    "availableLanguage": "English"
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://harshilraj.vercel.app/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What does making sense of AI actually mean?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most people are either ignoring AI or implementing it randomly. Making sense of it means knowing which tools actually solve your problem, how to build systems that work in production, and how to integrate AI into your product or GTM without creating more complexity than you started with."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Who does Harshil Raj work with?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Founders building AI into their product, operators who want to automate real workflows, and startup teams who need someone to think clearly about their AI strategy."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What does an engagement with Harshil Raj look like?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Usually starts with a 30-minute discovery call. From there it's either a defined project (build a specific system or workflow), a consulting retainer, or a strategy session. Scope depends on what you actually need."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How is this different from hiring a freelance developer?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A developer builds what you spec. Harshil helps you figure out what to spec, whether the approach makes sense, and then builds it or directs the build. The strategic thinking is part of the service."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Does Harshil Raj only do technical AI builds?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. About half the work is strategic: figuring out what to build, what to ignore, and how AI fits into the business. The technical build often follows but it doesn't have to."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
