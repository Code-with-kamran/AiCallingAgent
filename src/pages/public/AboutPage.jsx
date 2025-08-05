// AboutPage.jsx
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useRouter } from '../../context/RouterContext';

const team = [
  { name: 'Ruban Bhati', role: 'Founder', avatar: 'R' },
  { name: 'Aisha K.', role: 'AI Lead', avatar: 'A' },
  { name: 'Liam G.', role: 'Head of Design', avatar: 'L' }
];

const AboutPage = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-warm-gray">
      <Navbar onNavigate={navigate} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="font-display text-h1 font-bold text-brand mb-4">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TALKGEN</span>
            </h1>
            <p className="text-lg leading-body text-gray-700">
              We build AI phone agents that never sleep—so your revenue doesn’t
              have to either.
            </p>
          </div>
        </section>

        {/* Three-pillar grid */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Vision',
                body: 'Make every business sound like a Fortune 500—without the Fortune 500 budget.'
              },
              {
                title: 'Mission',
                body: 'Automate 1 billion calls with AI that feels human, secure, and ridiculously easy to deploy.'
              },
              {
                title: 'Values',
                body: 'Customer-obsessed, privacy-first, always shipping. We eat our own dog-food daily.'
              }
            ].map(({ title, body }) => (
              <div
                key={title}
                className="bg-white border border-gray-200 rounded-large p-6"
              >
                <h2 className="font-display text-2xl font-bold mb-3">{title}</h2>
                <p className="text-gray-600 leading-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="pb-20 md:pb-28 bg-warm-gray">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-center mb-10">
              Meet the Crew
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {team.map(({ name, role, avatar }) => (
                <div
                  key={name}
                  className="flex flex-col items-center bg-white rounded-large p-6 shadow-sm"
                >
                  <div className="w-20 h-20 mb-4 rounded-full bg-brand/10 flex items-center justify-center font-display text-2xl font-bold text-brand">
                    {avatar}
                  </div>
                  <span className="font-semibold text-gray-900">{name}</span>
                  <span className="text-sm text-gray-500">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default AboutPage;