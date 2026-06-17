import { User, ShieldCheck, CreditCard, RefreshCw } from "lucide-react";

export default function ClientPortal() {
  // Simulating typical high-end dashboard structural elements
  return (
    <main className="min-h-screen py-16 max-w-7xl mx-auto px-6">
      <div className="border-b border-[#262624] pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase">// CONTROL ENVIRONMENT</span>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Enterprise Client Hub</h1>
        </div>
        <div className="bg-[#1A1A19] border border-[#262624] px-4 py-2 font-mono text-[11px] text-zinc-400 flex items-center gap-2">
          <span>Client ID: <strong className="text-white">usr_9821_x</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile/Identity Pillar */}
        <div className="border border-[#262624] p-6 space-y-6">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-[#00FF66]" />
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider">Operational Entity</h3>
          </div>
          <div className="space-y-3 font-mono text-xs text-zinc-400">
            <div><span className="text-zinc-600 block">ORGANIZATION</span> <span className="text-white font-bold">Bistro Analytics International</span></div>
            <div><span className="text-zinc-600 block">SYSTEM ROUTING LINK</span> <span className="text-white underline">bistro-analytics.smartinvestsi.com</span></div>
          </div>
        </div>

        {/* Real-time Schedule Tracker Window */}
        <div className="border border-[#262624] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-400" />
              <h3 className="font-mono text-xs uppercase font-bold tracking-wider">Active Bookings & Orders</h3>
            </div>
            <span className="bg-blue-950 text-blue-400 font-mono text-[9px] px-2 py-0.5 uppercase">LIVE</span>
          </div>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-zinc-950 border border-[#262624] flex justify-between items-center">
              <span>Order #9021 (Pending)</span>
              <span className="text-yellow-500 font-bold">Processing</span>
            </div>
            <div className="p-3 bg-zinc-950 border border-[#262624] flex justify-between items-center">
              <span>Slot Reservation #41</span>
              <span className="text-[#00FF66]">Confirmed</span>
            </div>
          </div>
        </div>

        {/* Subscription Mandate / Vault Management */}
        <div className="border border-[#262624] p-6 space-y-6 bg-zinc-950">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-purple-400" />
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider">Vault & Automated Billing</h3>
          </div>
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between border-b border-[#262624] pb-2 text-zinc-400">
              <span>Trial Status</span>
              <span className="text-[#00FF66] font-bold">14 Days Remaining</span>
            </div>
            <div className="flex justify-between border-b border-[#262624] pb-2 text-zinc-400">
              <span>Next Invoicing Point</span>
              <span className="text-white">Day 15 (Automatic Cycle)</span>
            </div>
            <div className="flex justify-between border-b border-[#262624] pb-2 text-zinc-400">
              <span>Amount Due</span>
              <span className="text-white">$35.00 USD / mo</span>
            </div>
            <button className="w-full text-center border border-red-900/50 bg-red-950/20 text-red-400 hover:bg-red-950 hover:text-white transition-colors py-2 text-[10px] uppercase tracking-widest font-mono">
              Revoke Authorization Agreement
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
