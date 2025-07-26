import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useRouter } from '../../context/RouterContext';
import { Headphones, ShoppingCart, Stethoscope, Briefcase } from 'lucide-react';

const UseCasesPage = () => {
  const { navigate } = useRouter();

  const useCases = [
    {
      icon: Headphones,
      title: 'Customer Support',
      desc: 'Handle inbound queries 24/7 with AI-driven voice agents that never sleep.'
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Sales',
      desc: 'Boost conversions with outbound sales campaigns and product recommendations.'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare',
      desc: 'Schedule patient appointments, send reminders, and handle routine inquiries.'
    },
    {
      icon: Briefcase,
      title: 'Enterprise',
      desc: 'Automate repetitive calls for HR, finance, and internal communication workflows.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <Navbar onNavigate={navigate} />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Header */}
          <h1 className="text-5xl font-bold text-center mb-6">
            Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VoiceAI Use Cases</span>
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            VoiceAI is transforming industries with intelligent voice automation. Discover how your business can benefit from AI-powered calling agents.
          </p>

          {/* Use Case Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UseCasesPage;
