import { Scissors, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 border-t border-amber-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg">
                <Scissors className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">TRIM-US</h3>
                <p className="text-xs text-amber-400 tracking-widest">LIMURU</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Redefining modern grooming for the extraordinary. Premium barbershop experience in the heart of Limuru.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Services', 'Team', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Cleanshelf, Limuru, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+254700000000" className="hover:text-amber-400 transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:hello@trimus.co.ke" className="hover:text-amber-400 transition-colors">
                  hello@trimus.co.ke
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-amber-400">9AM - 7PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-amber-400">9AM - 8PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-amber-400">10AM - 6PM</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-400/10 p-2 rounded-lg hover:bg-amber-400/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-amber-400" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-400/10 p-2 rounded-lg hover:bg-amber-400/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-amber-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2024 TRIM-US Barbershop. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <button className="hover:text-amber-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-amber-400 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
