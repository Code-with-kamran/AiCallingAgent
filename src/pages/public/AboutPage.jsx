import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useRouter } from '../../context/RouterContext';

const AboutPage = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <Navbar onNavigate={navigate} />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          {/* Heading */}
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-8">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VoiceAI</span>
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            VoiceAI is an innovative AI-powered calling agent platform designed to automate and enhance your business communications. 
            Our mission is to empower teams with smart, scalable, and reliable voice solutions that save time and drive results.
          </p>

          {/* Vision */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To revolutionize customer engagement by making AI-driven voice interactions seamless, natural, and accessible for every business.
            </p>
          </section>

          {/* Why Choose Us */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">Why Choose VoiceAI?</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>24/7 intelligent call handling</li>
              <li>Easy integration with your workflow</li>
              <li>Real-time analytics and reporting</li>
              <li>Secure and privacy-focused</li>
              <li>Dedicated support team</li>
            </ul>
          </section>

          {/* Team Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">Meet the Team</h2>
            <p className="text-gray-700 mb-6">
              We are a passionate group of engineers, designers, and innovators committed to building the future of voice technology.
            </p>
            <div className="flex flex-wrap gap-8">
              {/* Team Member */}
              <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
                  R
                </div>
                <span className="mt-3 font-semibold text-gray-900">Ruban Bhati</span>
                <span className="text-sm text-gray-500">Founder</span>
              </div>
              {/* Add more team members similarly */}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
