import { Layers, Calendar, ShoppingCart, ShieldCheck, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 border-b border-[#262624]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A19] border border-[#262624] rounded-none mb-6">
            <span className="w-1.5 h-1.5 bg-[#00FF66] animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">v2.1 Architecture Live</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase leading-none mb-8">
            One Platform.<br />Total Business Control.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
            Real-time booking engines, automated order pipelines, and direct customer billing layers built to scale infrastructure under an elegant high-contrast operational layout.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="/pricing" className="bg-[#00FF66] text-black text-center font-mono font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-white transition-colors flex items-center justify-center gap-2">
              Activate 14-Day Free Trial <ArrowRight className="w-4 h-4" />
            </a>
            <div className="font-mono text-[11px] text-zinc-500 uppercase flex items-center justify-center sm:justify-start px-4">
              🛡️ No initial deposit • Automatic Transition
            </div>
          </div>
        </div>
      </section>

      {/* Product Split View / Mockup Area */}
      <section className="bg-[#0A0A0A] border-b border-[#262624] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 border border-[#262624] p-8 flex flex-col justify-between bg-[#0D0D0C]">
            <span className="font-mono text-zinc-500 text-xs">// 01 / MERCHANT TERMINAL</span>
            <div className="my-8">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Dual Interface Management</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Manage system calendars and client fulfillment lines seamlessly from one centralized screen configuration.</p>
            </div>
            <div className="bg-zinc-900 h-24 w-full border border-dashed border-zinc-700 flex items-center justify-center font-mono text-zinc-600 text-xs">实时数据模拟器 ACTIVE</div>
          </div>
          <div className="lg:col-span-8 border border-[#262624] bg-zinc-950 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#262624] pb-4 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
              </div>
              <span className="font-mono text-[10px] text-zinc-600">HTTPS://SYSTEM.SMARTINVESTSI.COM/DASHBOARD</span>
            </div>
            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="p-3 bg-[#0D0D0C] border border-[#262624] flex justify-between items-center">
                <span>NEW BOOKING PLACEMENT // ROOM_4B</span>
                <span className="text-[#00FF66]">+ $35.00 APPROVED</span>
              </div>
              <div className="p-3 bg-[#0D0D0C] border border-[#262624] flex justify-between items-center">
                <span>INVENTORY UPDATE // SK-9182</span>
                <span className="text-blue-400">SYNC SUCCESSFUL</span>
              </div>
              <div className="p-3 bg-[#0D0D0C] border border-[#262624] flex justify-between items-center">
                <span>M-PESA DEBIT GATEWAY REGISTRATION</span>
                <span className="text-amber-500">MANDATE TOKENS VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Feature Matrix */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="font-mono text-xs text-[#00FF66] uppercase tracking-widest mb-4">// DEEP CAPABILITIES INTERFACE</div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">Engineered for Modern Operators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#262624]">
          <div className="border-r border-b border-[#262624] p-8 hover:bg-[#111110] transition-colors">
            <Calendar className="w-8 h-8 text-[#00FF66] mb-6" />
            <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Omnichannel Booking</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Embed custom self-service scheduling widgets direct onto social paths, native apps, or existing company websites seamlessly.
            </p>
          </div>
          <div className="border-r border-b border-[#262624] p-8 hover:bg-[#111110] transition-colors">
            <ShoppingCart className="w-8 h-8 text-[#00FF66] mb-6" />
            <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Instant Orders</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Accept downstream physical products, digital entries, downpayments or structural retainers without dealing with separate checkout flows.
            </p>
          </div>
          <div className="border-r border-b border-[#262624] p-8 hover:bg-[#111110] transition-colors">
            <Layers className="w-8 h-8 text-[#00FF66] mb-6" />
            <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Unified CRM Profile</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every appointment, ticket collection, tracking token, and balance run updates live inside shared administrative layouts instantly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
