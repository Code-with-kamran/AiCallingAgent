import React from 'react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
<div>
 <h2 className="text-3xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  VoiceAI
</h2>


  <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
  Automating your business calls with AI-driven voice technology.
  Scalable, smart, and reliable solutions for every industry.
</p>
</div>


        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/features" className="hover:text-blue-400">Features</a></li>
            <li><a href="/pricing" className="hover:text-blue-400">Pricing</a></li>
            <li><a href="/use-cases" className="hover:text-blue-400">Use Cases</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-blue-400">Blog</a></li>
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-400">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-700">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-600">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} VoiceAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
