import React from 'react';

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Use Cases', 'Integrations'],
    Company: ['About Us', 'Careers', 'Blog'],
    Support: ['Help Center', 'Contact', 'API Docs'],
    Legal: ['Privacy Policy', 'Terms of Service']
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">VoiceAI</h3>
          <p className="text-gray-400">AI-powered calling agents for your business.</p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-semibold mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-gray-400">
        © 2024 VoiceAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
