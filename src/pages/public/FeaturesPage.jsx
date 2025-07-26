import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useRouter } from '../../context/RouterContext';
import Card from '../../components/ui/Card';
import { Mic, MessageSquare, BarChart3, Shield } from 'lucide-react';

const FeaturesPage = () => {
  const { navigate } = useRouter();
  const features = [
    { icon: Mic, title: 'AI Voice', desc: 'Human-like voice with multiple tone options' },
    { icon: MessageSquare, title: 'Smart NLP', desc: 'Understands context & intent in real-time' },
    { icon: BarChart3, title: 'Analytics', desc: 'Track performance & optimize campaigns' },
    { icon: Shield, title: 'Security', desc: 'Enterprise-grade security & compliance' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} />
      <main className="flex-1 pt-16">
        <section className="py-16 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-12">Features</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card key={i} className="p-6 text-center" hover>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.desc}</p>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
