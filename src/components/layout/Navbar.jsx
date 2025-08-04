import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { useRouter } from '../../context/RouterContext';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate } = useRouter();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <nav className="fixed w-full bg-dark shadow-sm z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-light rounded-lg flex items-center justify-center">
            <Phone className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-light">VoiceAI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex space-x-8">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={()=>navigate(link.path)}
              className="text-light hover:text-accent focus:rounded-md p-2  font-medium"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden xl:flex space-x-4">
          <Button variant="ghost" onClick={() => onNavigate('/login')}>Sign In</Button>
          <Button onClick={() => onNavigate('/signup')}>Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map(link => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.path);
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:text-blue-600 font-medium text-left"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t space-y-2">
              <Button variant="ghost" className="w-full" onClick={() => onNavigate('/login')}>Sign In</Button>
              <Button className="w-full" onClick={() => onNavigate('/signup')}>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
