import React from 'react';

const LogoBar = () => {
  const logos = [
    { name: 'Google', src: 'google-1-1.svg' },
    { name: 'Amazon', src: 'amazon-com-logo-1.svg' },
    { name: 'Meta', src: 'meta-3.svg' },
    { name: 'Netflix', src: 'netflix-1.svg' },
    { name: 'Microsoft', src: 'microsoft-6.svg' },
  ];

  return (
    <section className="bg-warm-gray py-16 sm:py-4">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-10">
          <span className="text-xl sm:text-2xl font-bold font-heading text-dark mr-4">
            Trusted by 300+ fast-growing companies
          </span>
          
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {logos.map((logo) => (
            <div key={logo.name} className="flex-shrink-0">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="h-8 sm:h-10 w-auto opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                onError={(e) => {
                  // Fallback to a placeholder image if the original URL fails
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/120x40/E5E7EB/4B5563?text=${logo.name}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
