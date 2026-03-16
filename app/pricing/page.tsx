"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, X, Sparkles, Zap, Shield, Star } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 23,
    desc: "Perfect for solopreneurs and freelancers getting started with AI automation.",
    features: [
      { text: "5 AI tasks per day", included: true },
      { text: "Email & Scheduling agents", included: true },
      { text: "Basic document creation", included: true },
      { text: "Chat interface", included: true },
      { text: "Email support", included: true },
      { text: "All 10 AI agents", included: false },
      { text: "Team collaboration", included: false },
      { text: "API access", included: false },
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=starter",
    highlight: false,
  },
  {
    name: "Professional",
    monthlyPrice: 79,
    annualPrice: 63,
    desc: "The complete AI assistant suite for growing businesses.",
    badge: "Most Popular",
    features: [
      { text: "Unlimited AI tasks", included: true },
      { text: "All 10 specialized AI agents", included: true },
      { text: "Priority processing", included: true },
      { text: "Team collaboration (3 seats)", included: true },
      { text: "Advanced analytics", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
      { text: "Custom integrations", included: false },
    ],
    cta: "Get Started",
    href: "/auth/signup?plan=professional",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 159,
    desc: "For agencies and enterprises needing custom AI solutions at scale.",
    features: [
      { text: "Everything in Professional", included: true },
      { text: "Unlimited team seats", included: true },
      { text: "Custom AI agents", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom integrations", included: true },
      { text: "SLA guarantee (99.9%)", included: true },
      { text: "White-label option", included: true },
      { text: "On-premise deployment", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlight: false,
  },
];

const faqs = [
  { q: "Is there a free trial?", a: "Yes! All plans include a 14-day free trial with no credit card required." },
  { q: "Can I change my plan later?", a: "Absolutely. Upgrade or downgrade anytime. Changes take effect immediately and billing is prorated." },
  { q: "What AI models do you use?", a: "We use Claude 3.5 Sonnet (Anthropic) for complex tasks and Claude 3 Haiku for faster, simpler requests. You get the best of both." },
  { q: "Is my data secure?", a: "Yes. All data is encrypted at rest and in transit. We never use your data to train AI models." },
  { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee if you're not satisfied." },
  { q: "Can I use the API?", a: "Yes, Professional and Enterprise plans include full API access with webhooks and SDK support." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-navy-900 text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center max-w-4xl mx-auto px-6">
        <div className="badge badge-amber mb-4">Pricing</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Simple, <span className="text-gradient">Transparent Pricing</span>
        </h1>
        <p className="text-navy-400 text-lg mb-8 max-w-xl mx-auto">
          14-day free trial · No credit card required · Cancel anytime
        </p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-3 bg-navy-800 border border-navy-700 rounded-xl p-1.5">
          <button onClick={() => setAnnual(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!annual ? "bg-primary-600 text-white" : "text-navy-400 hover:text-white"}`}>
            Monthly
          </button>
          <button onClick={() => setAnnual(true)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${annual ? "bg-primary-600 text-white" : "text-navy-400 hover:text-white"}`}>
            Annual
            <span className="text-xs font-bold text-emerald-400 bg-emerald-900/30 px-1.5 py-0.5 rounded">-20%</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-3 gap-6">
          {plans.map(({ name, monthlyPrice, annualPrice, desc, badge, features, cta, href, highlight }) => {
            const price = annual ? annualPrice : monthlyPrice;
            return (
              <div key={name} className={`card p-7 relative flex flex-col ${highlight ? "border-primary-600 shadow-glow-blue scale-105" : ""}`}>
                {badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="badge badge-blue flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />{badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">{name}</h2>
                  <p className="text-navy-400 text-sm">{desc}</p>
                </div>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-5xl font-extrabold text-white">${price}</span>
                  <span className="text-navy-400 text-sm pb-2">/month</span>
                </div>
                {annual && (
                  <p className="text-xs text-emerald-400 -mt-4 mb-6">
                    Billed annually (${price * 12}/yr, save ${(monthlyPrice - annualPrice) * 12}/yr)
                  </p>
                )}
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map(({ text, included }) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm">
                      {included
                        ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        : <X className="w-4 h-4 text-navy-600 flex-shrink-0 mt-0.5" />}
                      <span className={included ? "text-navy-200" : "text-navy-600"}>{text}</span>
                    </li>
                  ))}
                </ul>
                <Link href={href} className={`btn w-full justify-center ${highlight ? "btn-primary" : "btn-secondary"}`}>
                  {name === "Professional" && <Sparkles className="w-4 h-4" />}
                  {cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Money back guarantee */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-navy-400 text-sm">
          <Shield className="w-4 h-4 text-emerald-400" />
          30-day money-back guarantee · Secure payment via Stripe · Cancel anytime
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="card p-5">
              <h3 className="font-semibold text-white mb-2">{q}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="card p-10 text-center bg-gradient-to-br from-primary-900/40 to-indigo-900/40 border-primary-700/30">
          <h2 className="text-3xl font-bold text-white mb-3">Still not sure? Try it free.</h2>
          <p className="text-navy-300 mb-6">No credit card required. Cancel anytime. Full access for 14 days.</p>
          <Link href="/auth/signup" className="btn btn-primary btn-lg">
            <Zap className="w-5 h-5" />
            Start Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
