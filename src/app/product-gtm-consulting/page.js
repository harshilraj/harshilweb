import Link from "next/link";

export const metadata = {
  title: "Product & GTM Consulting | Harshil Raj",
  description: "Strategic consulting for AI product integration, feature scoping, LLM evaluation, and building automated, signal-based Go-To-Market pipelines.",
  alternates: {
    canonical: "https://harshilraj.vercel.app/product-gtm-consulting",
  }
};

export default function ProductGTMPage() {
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
          <Link href="/automation-revenue-engine" className="nav-pill text-[12px] md:text-sm">
            Revenue Engine
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-[6vw]">
        <div className="max-w-[1200px] mx-auto">
          <span className="font-mono text-xs text-[#6B6B60] uppercase tracking-[0.2em] mb-4 block">
            CORE PRACTICE AREA // 02
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Product Strategy & GTM Engine Consulting
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
              We help software teams scope, build, and deploy user-facing AI features while helping founders launch automated, signal-based Go-To-Market engines. Our approach ensures your product benefits from AI natively, rather than treating it as an afterthought.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Scoping the AI Product Layer</h2>
            <p>
              Adding an AI chatbot or a generic summary button is no longer a product differentiator. In fact, it often hurts the user experience by increasing visual clutter and token-related latency. True product strategy means identifying where AI can solve a core human friction point natively.
            </p>
            <p>
              I help product teams transition from theory to deployment. We map the product lifecycle, establish strict model evaluation frameworks (using tools like LangSmith or custom assertions), design context-aware prompts, and select the optimal model mix (e.g., using lightweight fine-tuned models for repetitive tasks and high-tier models only when reasoning is required). This keeps user latency low and cloud server margins high.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Designing for Non-Deterministic Software</h2>
            <p>
              Standard software development assumes inputs lead to predictable outputs. AI changes this paradigm: LLMs are non-deterministic, meaning they can behave unexpectedly even under identical parameters.
            </p>
            <p>
              We design product UX/UI that accounts for this variance. This includes designing elegant loading states to mask generation delay, establishing inline user feedback loops (thumbs up/down to continuously train models), building fallback modes when outputs fail schema checks, and structuring user permissions to protect database integrity.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">GTM Engine: Scaling Pipeline on Autopilot</h2>
            <p>
              A premium product is useless without a steady pipeline of qualified buyers. For early-stage and mid-market companies, hiring a large team of Sales Development Representatives (SDRs) is often cost-prohibitive.
            </p>
            <p>
              We solve this by building customized, automated Go-To-Market engines. These systems run continuously in the background to handle the work of an entire sales team:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Signal Tracking:</strong> Scanning public registers, news releases, LinkedIn profile changes, job postings, and funding rounds to find companies with immediate purchasing triggers.</li>
              <li><strong>Data Enrichment:</strong> Pulling corporate data, verifying executive emails, and scraping company websites to build a detailed target profile.</li>
              <li><strong>Contextual Outreach:</strong> Using LLMs to analyze corporate challenges and draft personalized messages that reference specific achievements, rather than sending generic blast templates.</li>
              <li><strong>CRM Routing:</strong> Syncing qualified responses straight to HubSpot or Salesforce, alerting founders via Slack so they only jump in when a buyer is ready to talk.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">The Result: Compound Leverage</h2>
            <p>
              By aligning your product structure with an automated distribution engine, you create compound leverage. Your engineering team focuses on building core features, while your sales pipeline operates independently. No cold calling, no manual list scraping, and no bloated payroll overhead.
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-[#1B3A2D]/10 rounded-2xl p-6 space-y-4 bg-white/20">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#1B3A2D] font-bold">
                Engagement Model
              </h3>
              <ul className="space-y-3 font-mono text-xs text-[#6B6B60]">
                <li><strong className="text-[#1B3A2D]">Focus:</strong> AI Scoping, LLM Evaluation, Outbound Flow</li>
                <li><strong className="text-[#1B3A2D]">Engagement:</strong> Strategy retainer or fixed-project</li>
                <li><strong className="text-[#1B3A2D]">Collaboration:</strong> Weekly sprints, Slack channel access</li>
                <li><strong className="text-[#1B3A2D]">Outcome:</strong> Scoping docs, custom outreach setups</li>
              </ul>
            </div>

            <div className="border border-[#1B3A2D]/10 rounded-2xl p-6 bg-[#1B3A2D] text-[#E9E7E0] space-y-4">
              <h3 className="font-bold text-lg">Scale your GTM</h3>
              <p className="text-xs text-[#E9E7E0]/80">
                Book a discovery call to audit your current product roadmap and outbound sales workflows. We will design a custom automation plan.
              </p>
              <a href="https://cal.com/harshil-raj/30min" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#E9E7E0] text-[#1B3A2D] rounded-full py-2 font-medium text-xs hover:bg-[#E9E7E0]/90 transition-colors">
                Book scoping call
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
