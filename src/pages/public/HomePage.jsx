import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import LogoBar from '../../pages/public/LogoBar';
import AboutPage from '../../pages/public/AboutPage';
import { useRouter } from '../../context/RouterContext';

const HomePage = () => {
const { navigate } = useRouter();
const steps = [
    {
      title: 'Build your agent',
      description: 'Choose voice, language, and script in < 5 min.',
      imageUrl: 'create.svg' // Placeholder for 'Build your agent'
    },
    {
      title: 'Import contacts',
      description: 'Upload CSV, sync HubSpot, or use our API.',
      imageUrl: 'importMsg.svg' // Placeholder for 'Import contacts'
    },
    {
      title: 'Launch & learn',
      description: 'Real-time dashboard shows calls, leads, ROI.',
      imageUrl: 'lunch.svg' // Placeholder for 'Launch & learn'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-warm-gray py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-h1 font-heading  mb-6">
              Grow revenue 24/7 with AI phone agents that{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                sound human
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
             Cut support costs by 60 % and never miss another lead..
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/signup')}>Start Free Trial</Button>
              <Button variant="outline" size="lg">Watch 2-min Demo</Button>
            </div>
          </div>
        </section>

        <LogoBar />

        {/* How It Works */}
        <section className="py-8 bg-warm-gray">
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold mb-4 text-h2">How It Works</p>
            <p className="text-gray-600 mb-12 font-heading text-body">Simple 3-step process to get started</p>
            <div className="grid md:grid-cols-3 gap-8">
             {steps.map((step, index) => (
          <div
            key={index}
            className="bg-light text-dark rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            {/* Image from undraw.co */}
            <img src={step.imageUrl} alt={step.title} className="w-full h-auto mb-6" />
            
            <div className="text-5xl font-bold text-primary mb-6">
              {`0${index + 1}`}
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              {step.title}
            </h3>
            <p className="text-gray-700">
              {step.description}
            </p>
          </div>
        ))}
            </div>
          </div>
        </section>
      </main>
      <AboutPage />
      <Footer />
    </div>
  );
};

export default HomePage;
