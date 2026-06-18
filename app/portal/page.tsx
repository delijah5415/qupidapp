'use client';

import Link from "next/link";
import { LogOut, Settings, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function PortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4 space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-stark text-2xl">Q</span>
            </div>
            <h1 className="text-3xl font-bold text-stark">Qupid Portal</h1>
            <p className="text-muted mt-2">Access your investment dashboard</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
            }}
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-muted border border-borderDark rounded-lg text-stark placeholder-muted focus:outline-none focus:border-accent"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-muted border border-borderDark rounded-lg text-stark placeholder-muted focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="w-full bg-accent text-stark py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <p className="text-muted">
              Don't have an account?{" "}
              <a href="#" className="text-accent hover:underline">
                Create one
              </a>
            </p>
          </div>

          <Link
            href="/"
            className="block text-center text-muted hover:text-stark transition"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-borderDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-stark">Q</span>
              </div>
              <span className="font-bold text-stark text-lg">Qupid Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-muted hover:text-stark transition">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-muted hover:text-accent transition flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-stark mb-8">Welcome back!</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Portfolio Value" value="$124,580" change="+12.5%" />
          <StatCard label="Today's Gain" value="$2,840" change="+2.3%" />
          <StatCard label="Total Return" value="+28.4%" change="YTD" />
          <StatCard label="Investments" value="24" change="Active" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-muted border border-borderDark rounded-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-stark">Portfolio Performance</h2>
            </div>
            <div className="h-64 bg-background rounded-lg flex items-center justify-center text-muted">
              Chart will be rendered here
            </div>
          </div>

          <div className="bg-muted border border-borderDark rounded-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-stark">Asset Allocation</h2>
            </div>
            <div className="h-64 bg-background rounded-lg flex items-center justify-center text-muted">
              Chart will be rendered here
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="mt-12 bg-muted border border-borderDark rounded-lg p-8">
          <h2 className="text-xl font-semibold text-stark mb-6">Recent Trades</h2>
          <div className="space-y-4">
            <TradeItem symbol="AAPL" type="BUY" shares={10} price="$182.50" total="$1,825.00" />
            <TradeItem symbol="GOOGL" type="SELL" shares={5} price="$138.20" total="$691.00" />
            <TradeItem symbol="MSFT" type="BUY" shares={8} price="$378.90" total="$3,031.20" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-borderDark py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-muted">© 2024 Qupid. All rights reserved.</p>
            <div className="flex gap-6 text-muted">
              <a href="#" className="hover:text-stark transition">
                Privacy
              </a>
              <a href="#" className="hover:text-stark transition">
                Terms
              </a>
              <a href="#" className="hover:text-stark transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="bg-muted border border-borderDark rounded-lg p-6">
      <p className="text-muted text-sm mb-2">{label}</p>
      <h3 className="text-2xl font-bold text-stark mb-2">{value}</h3>
      <p className="text-accent text-sm">{change}</p>
    </div>
  );
}

function TradeItem({
  symbol,
  type,
  shares,
  price,
  total,
}: {
  symbol: string;
  type: "BUY" | "SELL";
  shares: number;
  price: string;
  total: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-borderDark">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-semibold text-stark">{symbol}</p>
          <p className="text-sm text-muted">{shares} shares</p>
        </div>
      </div>
      <div className="text-right">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${
            type === "BUY"
              ? "bg-green-500 bg-opacity-20 text-green-400"
              : "bg-red-500 bg-opacity-20 text-red-400"
          }`}
        >
          {type}
        </span>
        <p className="text-stark font-semibold">{total}</p>
        <p className="text-sm text-muted">{price} per share</p>
      </div>
    </div>
  );
}
