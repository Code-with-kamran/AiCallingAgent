import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { useRouter } from '../../context/RouterContext';

const HomePage = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Calling Agents That{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Never Sleep
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Automate inbound and outbound calls with smart AI agents that work 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/signup')}>Start Free Trial</Button>
              <Button variant="outline" size="lg">Watch Demo</Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 mb-12">Simple 3-step process to get started</p>
            <div className="grid md:grid-cols-3 gap-8">
              {['Create Your Agent', 'Upload Contacts', 'Launch & Monitor'].map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{`0${index + 1}`}</div>
                  <h3 className="text-xl font-semibold mb-2">{step}</h3>
                  <p className="text-gray-600">Quick setup and easy configuration for your campaigns.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
