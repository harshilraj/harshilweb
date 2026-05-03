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
  title: "Harshil Raj | AI Automation & Cloud Infrastructure Expert",
  description: "Harshil Raj builds AI-native automation systems and cloud infrastructure. Helping businesses scale operations without adding headcount. 9K+ on LinkedIn.",
  keywords: ["Harshil Raj", "AI automation expert", "cloud infrastructure", "AWS deployment", "Google Cloud architecture", "AI systems", "AI workflows", "growth consulting", "GTM engine", "AI-native operations", "Harshil Raj LinkedIn", "startup consultant India"],
  authors: [{ name: "Harshil Raj" }],
  creator: "Harshil Raj",
  publisher: "Harshil Raj",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://harshilraj.vercel.app/',
  },
  openGraph: {
    type: 'website',
    url: 'https://harshilraj.vercel.app/',
    title: 'Harshil Raj | AI Automation & Cloud Infrastructure Expert',
    description: 'AI-native automation systems and cloud infrastructure for businesses to scale operations without adding headcount. 9K+ on LinkedIn.',
    siteName: 'Harshil Raj',
    locale: 'en_IN',
    images: [
      {
        url: 'https://harshilraj.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harshil Raj - AI Builder and GTM Strategist India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@harshilraj',
    creator: '@harshilraj',
    title: 'Harshil Raj | AI Automation & Cloud Infrastructure Expert',
    description: 'AI-native automation systems and cloud infrastructure for businesses to scale operations without adding headcount. 9K+ on LinkedIn.',
    images: ['https://harshilraj.vercel.app/og-image.jpg'],
  },
  verification: {
    google: 'REPLACE_WITH_GSC_TOKEN',
    other: {
      'msvalidate.01': 'REPLACE_WITH_BING_TOKEN',
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
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Harshil Raj",
      "url": "https://harshilraj.vercel.app",
      "image": "https://harshilraj.vercel.app/og-image.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/harshilraj",
        "https://twitter.com/harshilraj"
      ],
      "jobTitle": "AI Automation & Cloud Infrastructure Expert",
      "description": "AI systems builder, cloud infrastructure expert, and consultant based in India. Helping founders scale operations with AI workflows and cloud architecture.",
      "knowsAbout": [
        "Artificial Intelligence", "AI Workflows", "AI Automation", "Cloud Infrastructure", "AWS", "Google Cloud", "Go-to-Market Strategy", "Operations Scaling", "Startup Consulting"
      ],
      "nationality": { "@type": "Country", "name": "India" },
      "address": { "@type": "PostalAddress", "addressCountry": "IN" },
      "email": "harshilraj.growth@gmail.com",
      "alumniOf": { "@type": "EducationalOrganization", "name": "Computer Science Engineering, AIML Specialization" }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Harshil Raj",
      "url": "https://harshilraj.vercel.app",
      "description": "Personal website of Harshil Raj | AI Builder, GTM Strategist and Consultant based in India.",
      "author": { "@type": "Person", "name": "Harshil Raj" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://harshilraj.vercel.app/?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Harshil Raj | AI & Cloud Consulting",
      "url": "https://harshilraj.vercel.app",
      "description": "AI systems automation, cloud infrastructure deployment, and growth advisory for startups and businesses globally.",
      "founder": { "@type": "Person", "name": "Harshil Raj" },
      "areaServed": ["India", "Global"],
      "serviceType": ["AI Consulting", "Cloud Infrastructure", "AI Automation", "AI Workflow Design", "Operations Scaling"],
      "priceRange": "Contact for pricing"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Harshil Raj?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harshil Raj is an AI systems builder and cloud infrastructure expert based in India. He helps businesses scale operations using AI-native automation and cloud architecture. He has 9K+ followers on LinkedIn where he shares operator-level insights."
          }
        },
        {
          "@type": "Question",
          "name": "What does Harshil Raj do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harshil Raj builds end-to-end AI automation workflows, deploys scalable cloud infrastructure (AWS/GCP), and designs GTM engines. He works with businesses to eliminate manual overhead and compound operations without adding headcount."
          }
        },
        {
          "@type": "Question",
          "name": "Is Harshil Raj available for consulting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Harshil Raj is open to consulting engagements, advisory board roles, and select full-time opportunities. You can reach him at harshilraj.growth@gmail.com or via LinkedIn."
          }
        },
        {
          "@type": "Question",
          "name": "What is Harshil Raj's expertise in AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harshil Raj specializes in AI workflows, multi-model workflows, automation systems, and cloud architecture. He treats AI as operational infrastructure rather than standalone tools, ensuring compounding returns."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Harshil Raj based?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harshil Raj is based in India and works remotely with clients and founders globally."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://harshilraj.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://harshilraj.vercel.app/#about" },
        { "@type": "ListItem", "position": 3, "name": "Expertise", "item": "https://harshilraj.vercel.app/#expertise" },
        { "@type": "ListItem", "position": 4, "name": "Contact", "item": "https://harshilraj.vercel.app/#contact" }
      ]
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${anton.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
      </head>
      <body className="antialiased">
        {jsonLd.map((schema, index) => (
          <Script
            key={index}
            id={`json-ld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}
