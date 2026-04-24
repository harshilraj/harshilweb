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
  title: "Harshil Raj | AI Builder, Consultant & GTM Strategist in India",
  description: "Harshil Raj is an AI systems builder, consultant, and GTM strategist based in India. Helping founders and companies grow faster with AI workflows, automation, and distribution strategy. 8.8K+ LinkedIn audience.",
  keywords: ["Harshil Raj", "AI builder India", "AI consultant India", "GTM strategist India", "AI systems expert", "AI workflow consultant", "growth consultant India", "AI automation expert", "LinkedIn creator AI India", "AI GTM strategy", "tech consultant India", "AI tools expert India", "growth hacker India", "AI distribution strategy", "startup consultant India", "AI content creator India", "Harshil Raj AI", "Harshil Raj consultant", "Harshil Raj LinkedIn", "AI freelancer India", "AI agency India"],
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
    title: 'Harshil Raj | AI Builder & GTM Strategist in India',
    description: 'AI systems, GTM strategy, and distribution for founders who want to grow fast. Based in India. 8.8K+ LinkedIn.',
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
    title: 'Harshil Raj | AI Builder & GTM Strategist in India',
    description: 'AI systems, GTM strategy, and distribution for founders who want to grow fast. 8.8K+ LinkedIn. Based in India.',
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
      "jobTitle": "AI Builder & GTM Strategist",
      "description": "AI systems builder, consultant and GTM strategist based in India. Helping founders grow with AI workflows, automation and distribution strategy.",
      "knowsAbout": [
        "Artificial Intelligence", "AI Workflows", "AI Automation", "Go-to-Market Strategy", "Growth Strategy", "Distribution Strategy", "LinkedIn Growth", "Content Strategy", "Tech Consulting", "AI Systems Design", "Startup Consulting"
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
      "name": "Harshil Raj | AI Consulting",
      "url": "https://harshilraj.vercel.app",
      "description": "AI systems consulting, GTM strategy, and growth advisory for startups and founders in India and globally.",
      "founder": { "@type": "Person", "name": "Harshil Raj" },
      "areaServed": ["India", "Global"],
      "serviceType": ["AI Consulting", "GTM Strategy", "Growth Advisory", "AI Workflow Design", "LinkedIn Growth Strategy", "Content Strategy"],
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
            "text": "Harshil Raj is an AI systems builder, GTM strategist, and consultant based in India. He helps founders and companies grow faster using AI workflows, automation, and distribution strategy. He has 8.8K+ followers on LinkedIn where he creates content around AI, GTM, and growth."
          }
        },
        {
          "@type": "Question",
          "name": "What does Harshil Raj do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harshil Raj builds AI systems, designs GTM strategies, and advises startups on growth and distribution. He works with founders who want to leverage AI as infrastructure, not just a tool, to achieve compounding returns in their business."
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
            "text": "Harshil Raj specializes in AI workflows, AI agents, automation systems, and go-to-market strategy for AI products. He understands the full AI stack and helps businesses implement AI as operational infrastructure rather than standalone tools."
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
