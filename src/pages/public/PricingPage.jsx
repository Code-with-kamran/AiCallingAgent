import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { useRouter } from '../../context/RouterContext';

const PricingPage = () => {
  const { navigate } = useRouter();
  const plans = [
    { name: 'Starter', price: '$29/mo', features: ['500 minutes', '1 AI Agent', 'Basic Analytics'] },
    { name: 'Pro', price: '$99/mo', features: ['2,000 minutes', '5 AI Agents', 'Advanced Analytics'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited', 'Custom AI Agents', 'Dedicated Support'] }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} />
      <main className="flex-1 pt-16">
        <section className="py-16 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-12">Pricing Plans</h1>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</p>
                <ul className="mb-6 text-gray-600">
                  {plan.features.map((f, i) => (
                    <li key={i} className="mb-2">{f}</li>
                  ))}
                </ul>
                <Button onClick={() => navigate('/signup')} className="w-full">
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
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
