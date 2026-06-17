"use client";

import { useState, useEffect } from "react";
import { Check, ShieldAlert, CreditCard, BellRing, Smartphone } from "lucide-react";

export default function PricingPage() {
  const [paymentRoute, setPaymentRoute] = useState<"paypal" | "mpesa">("paypal");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Custom states to handle the simulated push messaging architecture layers
  const [pushNotifications, setPushNotifications] = useState<Array<{id: number, text: string, type: 'info' | 'success'}>>([]);
  const [isTrialActivated, setIsTrialActivated] = useState(false);

  const addSystemNotification = (text: string, type: 'info' | 'success' = 'info') => {
    const id = Date.now();
    setPushNotifications(prev => [...prev, { id, text, type }]);
    
    // Automatically dismiss push alerts after 5 seconds
    setTimeout(() => {
      setPushNotifications(prev => prev.filter(item => item.id !== id));
    }, 5000);
  };

  const handlePaymentInitiation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // AUTOMATIC USER ACTION PUSH SIGNAL: Trigger immediately on form interaction submission
    addSystemNotification(`🚨 Payment Initiated via ${paymentRoute.toUpperCase()}! Securing device line...`, 'info');

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route: paymentRoute, phone: phoneNumber }),
      });
      const data = await response.json();
      
      if (data.success) {
        // AUTOMATIC SUCCESS PUSH SIGNAL: Trigger when gateway hands off token execution successfully
        setTimeout(() => {
          addSystemNotification(`✅ Token Agreement Established! 14-Day trial applied to Qupid profile.`, 'success');
          setIsTrialActivated(true);
        }, 1200);
      }
    } catch (err) {
      addSystemNotification(`❌ Connectivity system error during deployment routing configuration.`, 'info');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-20 max-w-7xl mx-auto px-6 relative">
      
      {/* REAL-TIME DYNAMIC PUSH NOTIFICATION ALERT WINDOWS */}
      <div className="fixed top-24 right-6 z-50 space-y-3 w-full max-w-sm pointer-events-none">
        {pushNotifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`pointer-events-auto p-4 border font-mono text-xs shadow-2xl flex items-start gap-3 transition-all transform animate-slide-in ${
              notif.type === 'success' 
                ? 'bg-[#0A1F10] border-[#00FF66] text-white' 
                : 'bg-zinc-950 border-[#E53E3E] text-white'
            }`}
          >
            <BellRing className={`w-4 h-4 flex-shrink-0 mt-0.5 ${notif.type === 'success' ? 'text-[#00FF66]' : 'text-[#E53E3E] animate-pulse'}`} />
            <div>
              <span className="block font-bold tracking-tight uppercase">{notif.type === 'success' ? 'System Success' : 'Transaction Signal'}</span>
              <p className="text-zinc-300 mt-1 text-[11px] leading-snug">{notif.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs text-[#E53E3E] uppercase tracking-widest block mb-2">// ONBOARDING PIPELINE</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Unified Ecosystem Pricing.</h1>
        <p className="text-zinc-400 text-sm font-mono">14 DAYS TRIAL METRICS • INTERACTIVE DISPATCH SYSTEMS ENABLED</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Core Value Pillar Definition */}
        <div className="lg:col-span-5 border border-[#262624] bg-black p-8">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">// DEPLOYMENT TIER</span>
          <h2 className="text-2xl font-bold uppercase tracking-tight mt-2 mb-6">Unified Operational Stack</h2>
          
          <div className="flex items-baseline gap-2 mb-8 border-b border-[#262624] pb-6">
            <span className="text-5xl font-mono font-black text-[#E53E3E]">$35</span>
            <span className="text-zinc-400 text-xs uppercase font-mono">USD / month</span>
          </div>

          <ul className="space-y-4 mb-8 font-mono text-xs text-zinc-300">
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#E53E3E] flex-shrink-0" /> Unlimited Merchant Scheduling Pipelines</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#E53E3E] flex-shrink-0" /> Automated Product Ordering Corridors</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#E53E3E] flex-shrink-0" /> Native App Payment Push Broadcast Layer</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#E53E3E] flex-shrink-0" /> Central Management Access Keys</li>
          </ul>

          <div className="bg-[#1A1A19] border border-[#262624] p-4 text-xs text-zinc-400 space-y-2">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white">Automated Account Mandate:</strong> Your linked validation account automatically shifts to the $35/mo tracking cycle on day 15. Revoke or stop anytime directly inside the operations interface.
              </p>
            </div>
          </div>
        </div>

        {/* Form Validation Context Container */}
        <div className="lg:col-span-7 border border-[#262624] p-8 bg-[#0D0D0C]">
          <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-6">// DIRECT SETTLE AGREEMENT MODALITY</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setPaymentRoute("paypal")}
              className={`p-4 font-mono text-xs uppercase tracking-wider text-center border transition-all ${paymentRoute === 'paypal' ? 'border-[#E53E3E] bg-red-950/10 text-white' : 'border-[#262624] text-zinc-400 hover:border-zinc-500'}`}
            >
              PayPal Vault Billing
            </button>
            <button 
              onClick={() => setPaymentRoute("mpesa")}
              className={`p-4 font-mono text-xs uppercase tracking-wider text-center border transition-all ${paymentRoute === 'mpesa' ? 'border-[#E53E3E] bg-red-950/10 text-white' : 'border-[#262624] text-zinc-400 hover:border-zinc-500'}`}
            >
              M-Pesa / KCB STK Push
            </button>
          </div>

          {isTrialActivated ? (
            <div className="border border-[#00FF66] bg-[#0A1F10] p-8 text-center space-y-4">
              <Smartphone className="w-8 h-8 text-[#00FF66] mx-auto animate-bounce" />
              <h4 className="font-mono text-sm uppercase text-[#00FF66] font-bold">Registration Verification Active</h4>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                Qupid verification complete. Check your device push streams for account access token records.
              </p>
              <a href="/portal" className="inline-block bg-white text-black font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 mt-2 hover:bg-zinc-200">
                Go To Operations Hub
              </a>
            </div>
          ) : (
            <form onSubmit={handlePaymentInitiation} className="space-y-6">
              {paymentRoute === "paypal" ? (
                <div className="p-6 bg-zinc-950 border border-[#262624] space-y-3">
                  <div className="flex items-center gap-3 text-zinc-300 font-mono text-xs">
                    <CreditCard className="w-5 h-5 text-red-500" />
                    <span>Global Card & Direct Debit Vault Authentication</span>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Processes an automated merchant vault link. Verification step will transmit a deployment check notification to your screen layout instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-6 bg-zinc-950 border border-[#262624] space-y-2">
                    <span className="font-mono font-bold text-xs text-red-500 block">DIRECT EAST-AFRICA ROUTING CORRIDOR</span>
                    <p className="text-zinc-500 text-xs">
                      Initiates a live secure STK pop-up prompt window straight to your wallet terminal interface.
                    </p>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-zinc-400 uppercase mb-2">Target Mobile Identity Number (Format: 254...)</label>
                    <input 
                      type="text" 
                      placeholder="2547XXXXXXXX"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#1A1A19] border border-[#262624] text-white font-mono p-4 text-sm focus:outline-none focus:border-[#E53E3E]"
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black font-mono font-bold text-xs uppercase tracking-widest py-4 hover:bg-[#E53E3E] hover:text-white transition-colors disabled:opacity-50"
              >
                {loading ? "COMMUNICATING DATA HOOKS..." : "INITIALIZE INSTANT PAYMENT DISPATCH"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
