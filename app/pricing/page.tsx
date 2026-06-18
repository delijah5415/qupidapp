'use client';

import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for individual investors",
    features: [
      "Real-time market data",
      "Basic portfolio tracking",
      "Email alerts",
      "Mobile app access",
      "Community support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$79",
    description: "For active traders",
    features: [
      "Everything in Starter",
      "Advanced analytics",
      "Custom watchlists",
      "Priority support",
      "API access",
      "Risk analysis tools",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For institutions",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
      "Advanced security",
      "SLA guarantee",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-borderDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-stark">Q</span>
              </div>
              <span className="font-bold text-stark text-lg">Qupid</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-muted hover:text-stark transition">
                Home
              </Link>
              <Link
                href="/portal"
                className="bg-accent text-stark px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-stark mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Choose the perfect plan for your investment journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 transition-all ${
                plan.highlighted
                  ? "bg-accent border-2 border-accent shadow-2xl scale-105"
                  : "bg-muted border border-borderDark hover:border-accent"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-accent bg-opacity-20 text-accent text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-stark" : "text-stark"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? "text-stark" : "text-muted"}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? "text-stark" : "text-accent"}`}>
                  {plan.price}
                </span>
                {plan.price !== "Custom" && <span className={plan.highlighted ? "text-stark" : "text-muted"}>/month</span>}
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                  plan.highlighted
                    ? "bg-stark text-accent hover:bg-opacity-90"
                    : "border border-accent text-accent hover:bg-accent hover:text-background"
                }`}
              >
                Get Started
              </button>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className={plan.highlighted ? "text-stark" : "text-muted"}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-borderDark py-8">
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
