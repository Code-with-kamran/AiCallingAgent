// src/pages/HomePage.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import LogoBar from '../../pages/public/LogoBar';
import AboutPage from '../../pages/public/AboutPage';
import PricingPage from '../../pages/public/PricingPage';
import { useRouter } from '../../context/RouterContext';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { navigate } = useRouter();

  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // 1) Hero load animation
    gsap.fromTo(
      heroRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    // 2) Scroll-triggered card stagger
    gsap.fromTo(
      cardsRef.current?.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  const steps = [
    {
      title: 'Build your agent',
      description: 'Choose voice, language, and script in < 5 min.',
      imageUrl: 'create.svg',
    },
    {
      title: 'Import contacts',
      description: 'Upload CSV, sync HubSpot, or use our API.',
      imageUrl: 'importMsg.svg',
    },
    {
      title: 'Launch & learn',
      description: 'Real-time dashboard shows calls, leads, ROI.',
      imageUrl: 'lunch.svg',
    },
  ];

  return (
    <div className="max-h-screen flex flex-col overflow-y-auto bg-warm-gray">
      <Navbar onNavigate={navigate} />

      <main className="flex-1 pt-16">
        {/* ---------- HERO ---------- */}
        <section className="bg-warm-gray py-20">
          <div ref={heroRef} className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Grow revenue 24/7 with AI phone agents that{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                sound human
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Cut support costs by 60 % and never miss another lead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Watch 2-min Demo
              </Button>
            </div>
          </div>
        </section>

        <LogoBar />

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="py-16 bg-warm-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                How It Works
              </h2>
              <p className="text-gray-600">Simple 3-step process to get started</p>
            </div>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-light text-dark rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="w-full max-w-[240px] mx-auto mb-6"
                  />
                  <div className="text-5xl font-bold text-primary mb-4">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutPage />
        <PricingPage />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;