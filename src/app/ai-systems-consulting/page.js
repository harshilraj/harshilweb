import Link from "next/link";

export const metadata = {
  title: "AI Systems Consulting | Harshil Raj",
  description: "Specialized engineering and integration of production-grade AI pipelines, multi-model orchestrations, and workflow automation for modern companies.",
  alternates: {
    canonical: "https://harshilraj.vercel.app/ai-systems-consulting",
  }
};

export default function AISystemsPage() {
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
            CORE PRACTICE AREA // 01
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            AI Systems Consulting & Custom Architecture
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
              We design and construct production-ready AI pipelines that convert raw language models into highly reliable operational assets. By automating repetitive decision-making processes, syncing multi-platform workflows, and implementing robust error handling, we build infrastructure that eliminates operational drag.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Moving Beyond Simple API Wrappers</h2>
            <p>
              Most automated workflows fail because they are built as straight-line scripts with no contingency planning. If an API endpoint times out, a model returns improperly structured JSON, or a rate limit is reached, the entire pipeline crashes, leaving your team with broken data or manual cleanup.
            </p>
            <p>
              My consulting practice treats AI systems with the rigors of standard software engineering. We build decentralized, event-driven workflows that incorporate auto-retries, model-fallback mechanisms (e.g., falling back to a local model or another provider if OpenAI goes offline), and rigorous schema validation using tools like Zod and TypeChat. Every system is logged, monitored, and fully auditable.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">The Stack: Tools Selected for Production</h2>
            <p>
              We don't get attached to specific software vendors; we select tools based on security, speed, and maintainability. Our typical integrations combine visual automation tools with custom backend nodes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Orchestration:</strong> Custom Node.js or Python backend servers for complex state logic, combined with <strong>n8n</strong> or <strong>Make</strong> for rapid visual flow maintenance.</li>
              <li><strong>Models:</strong> Orchestration across OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google (Gemini 1.5 Pro), and open-weight models via Groq or local hosting.</li>
              <li><strong>Vector Databases:</strong> Pinecone, pgvector (PostgreSQL), or Qdrant for semantic data matching and Retrieval-Augmented Generation (RAG).</li>
              <li><strong>Voice Integrations:</strong> Real-time voice agents built on <strong>Retell AI</strong>, Twilio SIP trunking, and Deepgram.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">What We Build: Core Capabilities</h2>
            <p>
              Our engagements result in custom-built, fully owned software properties. Some of our core systems include:
            </p>
            
            <h3 className="text-xl font-bold text-[#1B3A2D] mt-4">1. Multi-Agent Workflows</h3>
            <p>
              We build systems where specialized AI agents collaborate to solve complex problems. For example, a research agent scrapes a list of prospects, a summarization agent extracts key metadata, and an engineering agent drafts custom code or proposals. This division of labor reduces hallucinations and speeds up processing time.
            </p>

            <h3 className="text-xl font-bold text-[#1B3A2D] mt-4">2. Semantic Search & Intelligent Document Processing</h3>
            <p>
              We implement custom RAG pipelines to let your team query internal databases, PDF contracts, or wikis in plain English. We optimize chunking strategies, use cross-encoders for reranking, and build clean interfaces so your staff gets precise answers with citations.
            </p>

            <h3 className="text-xl font-bold text-[#1B3A2D] mt-4">3. Automated Customer Operations</h3>
            <p>
              We build voice and text intake systems that respond to client inquiries, qualify requests based on custom heuristics, write responses in your brand's voice, and schedule calendar slots—24/7/365, without human oversight.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A2D] pt-4">Our Engagement Process</h2>
            <p>
              Every consulting project starts with an audit of your current tech stack and manual processes. We draft a system blueprint that maps data flows, inputs, fallback conditions, and expected latency. Once approved, I build the core systems, write the custom code, deploy to production, and train your internal teams.
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-[#1B3A2D]/10 rounded-2xl p-6 space-y-4 bg-white/20">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#1B3A2D] font-bold">
                Consulting Details
              </h3>
              <ul className="space-y-3 font-mono text-xs text-[#6B6B60]">
                <li><strong className="text-[#1B3A2D]">Deliverable:</strong> Custom code, n8n workflows, API schemas</li>
                <li><strong className="text-[#1B3A2D]">Timeline:</strong> Typically 4-8 weeks per system</li>
                <li><strong className="text-[#1B3A2D]">Retainer Options:</strong> Post-build support available</li>
                <li><strong className="text-[#1B3A2D]">Target Audience:</strong> Startups, B2B SaaS, and Agencies</li>
              </ul>
            </div>

            <div className="border border-[#1B3A2D]/10 rounded-2xl p-6 bg-[#1B3A2D] text-[#E9E7E0] space-y-4">
              <h3 className="font-bold text-lg">Ready to build?</h3>
              <p className="text-xs text-[#E9E7E0]/80">
                Book a 30-minute scoping call. We'll map out your database, flow, and discuss if a custom AI system makes sense for your business.
              </p>
              <a href="https://cal.com/harshil-raj/30min" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#E9E7E0] text-[#1B3A2D] rounded-full py-2 font-medium text-xs hover:bg-[#E9E7E0]/90 transition-colors">
                Schedule Call
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
