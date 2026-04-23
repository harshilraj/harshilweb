import { Inter, Inter_Tight, Anton } from "next/font/google";
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

export const metadata = {
  title: "Harshil Raj | AI × Growth × GTM",
  description: "AI Systems expert, ex-founder, and growth-focused technologist. The go-to person at the intersection of AI × Growth × GTM.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${anton.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
