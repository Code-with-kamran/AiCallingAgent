import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { useRouter } from '../../context/RouterContext';

const navLinks = [
  { name: 'Home',      path: '/' },
  { name: 'Features',  path: '/features' },
  { name: 'Use Cases', path: '/use-cases' },
  { name: 'Pricing',   path: '/pricing' },
  { name: 'About',     path: '/about' },
];

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate } = useRouter();

  const handleLink = (path) => {
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark shadow-md">
      {/* --- Desktop / Top-bar --- */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo (text only) */}
        <span
       
          className="flex items-center text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          onClick={() => handleLink('/')}
        >
          <div>
          <img src="logo.png" title="TALKGEN" className="w-10"/>
        </div>TALKGEN
        </span>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map(({ name, path }) => (
            <button
              key={path}
              onClick={() => handleLink(path)}
              className="text-light hover:text-accent font-medium"
            >
              {name}
            </button>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="ghost" onClick={() => handleLink('/login')}>
            Sign In
          </Button>
          <Button onClick={() => handleLink('/signup')}>Get Started</Button>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-light"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- Mobile overlay --- */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-dark/95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
            {navLinks.map(({ name, path }) => (
              <button
                key={path}
                onClick={() => handleLink(path)}
                className="text-2xl text-light hover:text-accent font-medium"
              >
                {name}
              </button>
            ))}

            <div className="flex flex-col space-y-4 pt-8">
              <Button variant="ghost" onClick={() => handleLink('/login')}>
                Sign In
              </Button>
              <Button onClick={() => handleLink('/signup')}>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;