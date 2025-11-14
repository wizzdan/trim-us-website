import { useState, useEffect } from 'react';
import { Scissors, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-lg group-hover:scale-110 transition-transform">
              <Scissors className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                TRIM-US
              </h1>
              <p className="text-xs text-amber-400 tracking-widest">LIMURU</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              'About',
              'Services',
              'Membership',
              'Team',
              'Gallery',
              'Testimonials',
              'Contact',
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium tracking-wide"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
            >
              BOOK NOW
            </button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-amber-400/20">
          <nav className="flex flex-col px-4 py-6 gap-4">
            {[
              'About',
              'Services',
              'Membership',
              'Team',
              'Gallery',
              'Testimonials',
              'Contact',
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-amber-400 transition-colors text-left py-2 border-b border-gray-800"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-6 py-3 rounded-lg font-semibold mt-2"
            >
              BOOK NOW
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
