import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Harshil Raj | AI Systems & Product Consultant",
  description: "Discover the background, credentials, and engineering philosophy of Harshil Raj, a computer science graduate specializing in production-ready AI systems.",
  alternates: {
    canonical: "https://harshilraj.vercel.app/about",
  }
};

export default function AboutPage() {
  return (
    <main className="bg-[#E9E7E0] selection:bg-[#1B3A2D] selection:text-white min-h-screen font-inter text-[#1B3A2D] pb-16">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-6 md:px-[6vw] md:py-8 flex justify-between items-center bg-[#E9E7E0]/80 backdrop-blur-md">
        <Link href="/" className="nav-pill hover:bg-[#1B3A2D] hover:text-[#E9E7E0] transition-colors font-bold">
          ← HARSHIL RAJ
        </Link>
        <div className="flex gap-2">
          <Link href="/ai-systems-consulting" className="nav-pill text-[12px] md:text-sm">
            AI Systems
          </Link>
          <Link href="/product-gtm-consulting" className="nav-pill text-[12px] md:text-sm">
            Product & GTM
          </Link>
          <Link href="/automation-revenue-engine" className="nav-pill text-[12px] md:text-sm">
            Revenue Engine
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-[6vw]">
        <div className="max-w-[1200px] mx-auto">
          <span className="font-mono text-xs text-[#6B6B60] uppercase tracking-[0.2em] mb-4 block">
            BIOGRAPHY & PHILOSOPHY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Engineering AI systems that compound value.
          </h1>
          <div className="w-full h-[1px] bg-[#1B3A2D]/10 my-8" />
        </div>
      </section>

      {/* Content */}
      <section className="px-4 md:px-[6vw]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Column */}
          <div className="space-y-8 text-body text-[#4A4A40] leading-relaxed max-w-[800px]">
            <p className="text-lg text-[#1B3A2D] font-medium leading-relaxed">
              I am Harshil Raj, an independent consultant and systems builder based in India. I bridge the gap between academic AI/ML theory and high-performing business operations. With a background in Computer Science and a specialized minor in Artificial Intelligence and Machine Learning, I build automation infrastructures that run on autopilot to solve actual bottlenecks.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">The Philosophy: Practicality Over Hype</h2>
            <p>
              Most organizations today are failing silently with their AI integrations. They hire freelance developers to assemble disconnected API calls, or they pay high-priced agencies for generic strategy reports. The result is almost always the same: a fragile demo that breaks in production, introduces massive maintenance debt, and fails to impact top-line revenue or bottom-line efficiency.
            </p>
            <p>
              My approach is built on structural engineering principles. I believe AI should only be deployed where it compounds value. A successful system requires a deep understanding of multi-model logic (knowing when to use lightweight models versus frontier LLMs), structured database integrations, error-handling retry states, and seamless user experiences. I don't build toys. I build operations software designed to last.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">The Journey & Experience</h2>
            <p>
              Before consulting independently, I served as a Project Manager at an IT startup. Inside a fast-moving, high-pressure environment, I learned how software products get shipped under constraints and how operational drag can destroy a startup’s momentum. This experience defined my instinct for what ships and what stays on the drawing board.
            </p>
            <p>
              Driven by the desire to build rather than just manage, I founded <strong>Livo</strong>, an AI-native technology services firm. At Livo, we delivered customized web platforms, automation workflows, and specialized e-commerce setups for SMBs across India. Running Livo taught me the unit economics of business operations. I realized that business owners do not care about the underlying technology stack; they care about lead velocity, margin expansion, and response times.
            </p>
            <p>
              Today, I operate independently to offer founders and startup operators direct access to my engineering and product frameworks. I limit my client list to a handful of partners at any given time to ensure I can embed deeply into their workflows, write custom clean code, and design high-impact architectures.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Academic Credentials</h2>
            <p>
              My technical foundation is rooted in a formal Computer Science engineering degree with an academic focus on Artificial Intelligence and Machine Learning. This gives me a mathematical and algorithmic understanding of the models we deploy. I don't treat neural networks as magic black boxes. I understand prompt engineering constraints, token optimizations, retrieval-augmented generation (RAG) vector math, and context window mechanics. This allows me to architect systems that minimize latency, prevent hallucinations, and control API compute costs.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Why Work With Me?</h2>
            <p>
              The combination of software product management, entrepreneurial operations, and rigorous AI engineering is rare. When you hire me, you aren't getting a developer who blindly follows a ticket queue. You are getting a partner who helps you figure out what to build, what to ignore, and how to execute. I maintain full ownership of the lifecycle—from discovery call and system diagramming to coding, deployment, and testing.
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#1B3A2D]/10">
              <Image
                src="/harshil.webp"
                alt="Harshil Raj Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover object-center"
              />
            </div>
            
            <div className="border border-[#1B3A2D]/10 rounded-2xl p-6 space-y-4 bg-white/20">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#1B3A2D] font-bold">
                Quick Facts
              </h3>
              <ul className="space-y-3 font-mono text-xs text-[#6B6B60]">
                <li><strong className="text-[#1B3A2D]">Focus:</strong> AI Systems, GTM, Product</li>
                <li><strong className="text-[#1B3A2D]">Education:</strong> B.Tech CSE (AI/ML Minor)</li>
                <li><strong className="text-[#1B3A2D]">HQ:</strong> India (Remote Worldwide)</li>
                <li><strong className="text-[#1B3A2D]">LinkedIn:</strong> 9,400+ Followers</li>
                <li><strong className="text-[#1B3A2D]">Contact:</strong> harshilraj.growth@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-10 border-t border-[#1B3A2D]/10 text-center text-xs text-[#6B6B60] max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center flex-col md:flex-row gap-4">
          <p>2026 © Harshil Raj. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/harshilraj" className="hover:underline">LinkedIn</a>
            <a href="mailto:harshilraj.growth@gmail.com" className="hover:underline">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
