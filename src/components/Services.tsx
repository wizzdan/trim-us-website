import { useEffect, useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Service } from '../types';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
    } else if (data) {
      setServices(data);
    }
    setLoading(false);
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-white">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400 text-sm font-semibold tracking-wide">OUR SERVICES</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Premium Grooming
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              {' '}Services
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Each service is crafted to deliver excellence, combining traditional techniques with modern precision
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-neutral-800/50 backdrop-blur-sm border border-amber-400/20 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all hover:scale-105"
              style={{
                animation: `fade-slide-up 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-400/90 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-400">
                      KES {service.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{service.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Premium Tools</span>
                  </div>
                </div>

                <button
                  onClick={scrollToBooking}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                >
                  BOOK THIS SERVICE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
