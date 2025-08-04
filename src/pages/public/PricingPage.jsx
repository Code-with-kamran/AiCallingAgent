// PricingPage.jsx
import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useRouter } from '../../context/RouterContext';

const PricingPage = () => {
  const { navigate } = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 29, annual: 24 },
      desc: 'Perfect for solo founders & small teams.',
      features: ['500 minutes/mo', '1 AI agent', 'Basic analytics', 'Email support']
    },
    {
      name: 'Pro',
      price: { monthly: 99, annual: 79 },
      desc: 'Scale outreach without scaling headcount.',
      features: [
        '2 000 minutes/mo',
        '5 AI agents',
        'Advanced analytics',
        'Live chat support',
        'Zapier & API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: { custom: true },
      desc: 'Tailor-made for high-volume teams.',
      features: ['Unlimited minutes', 'Custom agents', 'Dedicated CSM', 'SOC 2 / HIPAA', 'SLA']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-h1 font-bold text-brand mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg leading-body max-w-2xl mx-auto">
              Start free, upgrade when you’re ready, cancel anytime.
            </p>

            {/* Annual / Monthly toggle */}
            <div className="mt-8 inline-flex items-center gap-4 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  !isAnnual ? 'bg-white shadow' : ''
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  isAnnual ? 'bg-white shadow' : ''
                }`}
              >
                Annual <span className="text-brand">Save 20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 max-w-6xl">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`
                  relative bg-white border rounded-large
                  ${plan.popular ? 'border-brand shadow-xl scale-105' : 'border-gray-200'}
                  p-6 flex flex-col
                `}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6 flex-1">{plan.desc}</p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price.custom ? (
                    <span className="font-display text-4xl font-bold">Custom</span>
                  ) : (
                    <>
                      <span className="font-display text-4xl font-bold">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-gray-500">/mo</span>
                      {isAnnual && (
                        <p className="text-sm text-gray-500">Billed annually</p>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-brand shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() =>
                    navigate(plan.price.custom ? '/contact' : '/signup')
                  }
                  className={`
                    w-full rounded-large py-3 font-semibold transition
                    ${
                      plan.popular
                        ? 'bg-brand text-white hover:bg-brand/90'
                        : 'bg-gray-100 text-brand hover:bg-gray-200'
                    }
                  `}
                >
                  {plan.price.custom ? 'Contact Sales' : 'Start free trial'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;