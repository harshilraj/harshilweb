import Link from "next/link";

export const metadata = {
  title: "Automation Revenue Engine | Harshil Raj",
  description: "Accelerate pipeline acquisition using custom automation engines, multi-source lead enrichment systems, and automated target scoring pipelines.",
  alternates: {
    canonical: "https://harshilraj.vercel.app/automation-revenue-engine",
  }
};

export default function RevenueEnginePage() {
  return (
    <main className="bg-[#E9E7E0] selection:bg-[#1B3A2D] selection:text-white min-h-screen font-inter text-[#1B3A2D] pb-16">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-6 md:px-[6vw] md:py-8 flex justify-between items-center bg-[#E9E7E0]/80 backdrop-blur-md">
        <Link href="/" className="nav-pill hover:bg-[#1B3A2D] hover:text-[#E9E7E0] transition-colors font-bold">
          ← HARSHIL RAJ
        </Link>
        <div className="flex gap-2">
          <Link href="/about" className="nav-pill text-[12px] md:text-sm">
            About
          </Link>
          <Link href="/ai-systems-consulting" className="nav-pill text-[12px] md:text-sm">
            AI Systems
          </Link>
          <Link href="/product-gtm-consulting" className="nav-pill text-[12px] md:text-sm">
            Product & GTM
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-[6vw]">
        <div className="max-w-[1200px] mx-auto">
          <span className="font-mono text-xs text-[#6B6B60] uppercase tracking-[0.2em] mb-4 block">
            CORE PRACTICE AREA // 03
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            The Automation Revenue Engine (SYS-01)
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
              The Automation Revenue Engine is a customized, programmatic prospecting workflow that runs 24/7 in the background. It finds, enriches, filters, and initiates contact with your target market automatically, delivering a consistent stream of qualified pipeline without adding manual overhead.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">The Problem with Traditional Outbound</h2>
            <p>
              Traditional B2B outbound is slow, inconsistent, and extremely expensive. Usually, it requires hiring a coordinator to build lists from databases like Apollo, verify emails using validation APIs, research companies individually, write template outreach messages, and sync statuses with a CRM.
            </p>
            <p>
              Because this process is manual, it lacks consistency. List quality fluctuates, outreach is delayed, and tracking data across sheets is a chore. The Automation Revenue Engine replaces this operational bottleneck with a connected, self-healing software pipeline.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">How the Engine Operates</h2>
            <p>
              The engine operates as a multi-stage data orchestration pipeline. It runs autonomously through scheduled cron triggers:
            </p>

            <h3 className="text-xl font-bold text-[#1B3A2D] mt-4">Stage 1: Dynamic Prospect Discovery</h3>
            <p>
              We connect custom scrapers and API queries to data providers (e.g., Apollo, Clay, Crunchbase, built-in directory scrapers). The system runs queries to target companies meeting specific thresholds: location, head-count, tech stack, job openings, or recent funding rounds.
            </p>

            <h3 className="text-xl font-bold text-[#1B3A2D] mt-4">Stage 2: Multi-Source Enrichment</h3>
            <p>
              A single database often has stale details. The engine runs cascading logic: if target details are missing, it queries a second provider, then a third. It resolves social URLs, extracts corporate landing pages, scrapes relevant headings, and verifies emails using multi-step SMTP handshakes to protect domain reputation.
            </p>

            <h3 className="text-xl font-bold text-[#1B3A2D] mt-4">Stage 3: LLM Intent Filtering</h3>
            <p>
              Rather than emailing every contact, the system uses LLMs to score leads. The model reads the prospect's website content and job postings to answer questions like: *Does this company build in-house automation? Are they experiencing operational drag?* Only leads with a score above 8.5 are routed to the outreach stage.
            </p>

            <h3 className="text-xl font-bold text-[#1B3A2D] mt-4">Stage 4: Programmatic Outreach & Routing</h3>
            <p>
              The engine generates personalized, context-aware email hooks based on the scraped content (e.g., mentioning specific tools they run or recent news). It delivers the message through specialized sending pools (e.g., Instantly or Smartlead), tracks responses, and automatically moves interested replies to your CRM, notifying you via Slack.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Core Technology Stack</h2>
            <p>
              The Automation Revenue Engine uses a hybrid architecture built for scale:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Workflows:</strong> Programmatic loops in <strong>n8n</strong> or <strong>Make</strong> combined with custom Node.js modules.</li>
              <li><strong>Enrichment:</strong> Cascading API bridges to <strong>Clay</strong>, Apollo, and Hunter.io.</li>
              <li><strong>Language Layer:</strong> Structured prompts running on OpenAI's GPT-4o-mini to filter targets cost-efficiently.</li>
              <li><strong>CRM Integration:</strong> Direct webhook syncs into <strong>HubSpot</strong>, Salesforce, or Pipedrive.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Expected Metrics & Output</h2>
            <p>
              While individual results depend on your offer and target market, typical engine installations process between <strong>5,000 and 10,000 leads monthly</strong>. It drops manual prospect research time by 90%, reduces CRM administration errors to zero, and allows founders to focus entirely on closing deals instead of searching for leads.
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-[#1B3A2D]/10 rounded-2xl p-6 space-y-4 bg-white/20">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#1B3A2D] font-bold">
                System Specs
              </h3>
              <ul className="space-y-3 font-mono text-xs text-[#6B6B60]">
                <li><strong className="text-[#1B3A2D]">ID:</strong> SYS-01</li>
                <li><strong className="text-[#1B3A2D]">Throughput:</strong> Up to 10k leads/mo</li>
                <li><strong className="text-[#1B3A2D]">Setup Time:</strong> 3-4 Weeks</li>
                <li><strong className="text-[#1B3A2D]">License:</strong> You own the code</li>
              </ul>
            </div>

            <div className="border border-[#1B3A2D]/10 rounded-2xl p-6 bg-[#1B3A2D] text-[#E9E7E0] space-y-4">
              <h3 className="font-bold text-lg">Deploy the Engine</h3>
              <p className="text-xs text-[#E9E7E0]/80">
                Want a dedicated outbound engine working for you? Book a discovery call to check if your offer is suitable for programmatic prospecting.
              </p>
              <a href="https://cal.com/harshil-raj/30min" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#E9E7E0] text-[#1B3A2D] rounded-full py-2 font-medium text-xs hover:bg-[#E9E7E0]/90 transition-colors">
                Book a Scoping Call
              </a>
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
