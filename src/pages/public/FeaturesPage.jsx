// FeaturesPage.jsx
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useRouter } from '../../context/RouterContext';
import { Mic, MessageSquare, BarChart3, Shield } from 'lucide-react';

const FeaturesPage = () => {
  const { navigate } = useRouter();

  const features = [
    {
      Icon: Mic,
      title: 'AI Voice',
      desc: 'Human-like voices with on-brand tone and emotion.'
    },
    {
      Icon: MessageSquare,
      title: 'Smart NLP',
      desc: 'Understands context & intent in real-time.'
    },
    {
      Icon: BarChart3,
      title: 'Analytics',
      desc: 'Track performance & optimize every campaign.'
    },
    {
      Icon: Shield,
      title: 'Security',
      desc: 'Enterprise-grade security & compliance.'
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
              Powerful features, zero code
            </h1>
            <p className="text-lg leading-body max-w-2xl mx-auto">
              Everything you need to launch AI phone agents that sound human and
              scale with your business.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="
                  group
                  bg-white border border-gray-200 rounded-large p-6
                  transition hover:border-brand/30 hover:shadow-lg
                "
              >
                <div
                  className="
                    w-12 h-12 mb-4 rounded-lg
                    flex items-center justify-center
                    bg-gradient-to-br from-brand to-brand-light
                    text-white
                  "
                >
                  <Icon size={24} />
                </div>

                <h3 className="font-display text-xl font-semibold mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 leading-body">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;