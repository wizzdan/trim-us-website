import { useEffect, useState } from 'react';
import { Instagram, Award, Scissors } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Barber } from '../types';

export default function Team() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    const { data, error } = await supabase
      .from('barbers')
      .select('*')
      .eq('is_available', true)
      .order('years_experience', { ascending: false });

    if (error) {
      console.error('Error fetching barbers:', error);
    } else if (data) {
      setBarbers(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="team" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-white">Loading team...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400 text-sm font-semibold tracking-wide">OUR TEAM</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              {' '}Masters
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert barbers dedicated to perfecting your style and elevating your confidence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div
              key={barber.id}
              className="group bg-neutral-900/50 backdrop-blur-sm border border-amber-400/20 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all hover:scale-105"
              style={{
                animation: `fade-slide-up 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src={barber.image_url}
                  alt={barber.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>

                {barber.instagram && (
                  <a
                    href={`https://instagram.com/${barber.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 bg-amber-400/90 p-2 rounded-lg hover:bg-amber-400 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-black" />
                  </a>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{barber.name}</h3>
                  <p className="text-amber-400 font-medium">{barber.title}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {barber.bio}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-300">
                    {barber.years_experience} years experience
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Scissors className="w-4 h-4 text-amber-400" />
                    <span className="font-medium text-white">Specialties:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium border border-amber-400/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
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
