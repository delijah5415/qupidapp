import { Layers, Calendar, ShoppingCart, ArrowRight, BellRing } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 border-b border-[#262624]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A19] border border-[#262624] rounded-none mb-6">
            <span className="w-1.5 h-1.5 bg-[#E53E3E] animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">QUPID ENGINE ARCHITECTURE LIVE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase leading-none mb-8">
            Transactional Control.<br />Zero Friction.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
            Automated customer scheduling, immediate merchant orders, and instantaneous payment notifications engineered for high-growth operations.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="/pricing" className="bg-[#E53E3E] text-white text-center font-mono font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
              Start 14-Day Free Trial <ArrowRight className="w-4 h-4" />
            </a>
            <div className="font-mono text-[11px] text-zinc-500 uppercase flex items-center justify-center sm:justify-start px-4">
              ⚡ Instant STK Prompts & Push Notifications Enabled
            </div>
          </div>
        </div>
      </section>

      {/* Visual Workspace Presentation */}
      <section className="bg-[#0A0A0A] border-b border-[#262624] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 border border-[#262624] p-8 flex flex-col justify-between bg-[#0D0D0C]">
            <span className="font-mono text-zinc-500 text-xs">// SYSTEM MODULE 01</span>
            <div className="my-8">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Automated Billing Signals</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">The second an action occurs, Qupid fires an asynchronous push message to both user devices and merchant networks.</p>
            </div>
            <div className="bg-zinc-900 h-16 w-full border border-dashed border-zinc-700 flex items-center justify-center font-mono text-zinc-500 text-xs gap-2">
              <BellRing className="w-4 h-4 text-[#E53E3E] animate-bounce" /> PUSH SIGNAL WORKER ENGAGED
            </div>
          </div>
          <div className="lg:col-span-8 border border-[#262624] bg-zinc-950 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#262624] pb-4 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
              </div>
              <span className="font-mono text-[10px] text-zinc-600">HTTPS://CORE.QUPID.COM/METRICS_STREAM</span>
            </div>
            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="p-3 bg-[#0D0D0C] border border-l-2 border-[#262624] border-l-[#E53E3E] flex justify-between items-center">
                <span>[PUSH EVENT] INBOUND STK ATTEMPT // ACCT-254</span>
                <span className="text-[#E53E3E] font-bold">TRIGGER SENT</span>
              </div>
              <div className="p-3 bg-[#0D0D0C] border border-[#262624] flex justify-between items-center">
                <span>[PAYMENT REGISTER] AGREEMENT ID: PP-0912</span>
                <span className="text-zinc-500">MANDATE PRE-AUTH RECORDED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="font-mono text-xs text-[#E53E3E] uppercase tracking-widest mb-4">// ARCHITECTURE DEPLOYMENT SPECIFICATIONS</div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">Designed for Seamless Scalability</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#262624]">
          <div className="border-r border-b border-[#262624] p-8 hover:bg-[#111110] transition-colors">
            <Calendar className="w-8 h-8 text-[#E53E3E] mb-6" />
            <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Automated Bookings</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Clean, reliable customer appointment layouts that remove dropoffs from social profiles and native applications.
            </p>
          </div>
          <div className="border-r border-b border-[#262624] p-8 hover:bg-[#111110] transition-colors">
            <ShoppingCart className="w-8 h-8 text-[#E53E3E] mb-6" />
            <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Instant Order Pipelines</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Process customer selections, verify inventories, and secure downpayments inside single-step checkout sequences.
            </p>
          </div>
          <div className="border-r border-b border-[#262624] p-8 hover:bg-[#111110] transition-colors">
            <Layers className="w-8 h-8 text-[#E53E3E] mb-6" />
            <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Live Transaction Hooks</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Get immediate status tracking on transactions with automated database changes and push messages delivered without lag.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
