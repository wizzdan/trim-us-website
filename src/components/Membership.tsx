import { useEffect, useState } from 'react';
import { CheckCircle2, Crown, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { MembershipPackage } from '../types';

export default function Membership() {
  const [packages, setPackages] = useState<MembershipPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from('membership_packages')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching packages:', error);
    } else if (data) {
      setPackages(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="membership" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-white">Loading packages...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="membership" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400 text-sm font-semibold tracking-wide">MEMBERSHIP</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              {' '}TRIM-US Club
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Exclusive membership packages designed for gentlemen who demand the best
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-neutral-900/50 backdrop-blur-sm border rounded-2xl p-8 transition-all hover:scale-105 ${
                pkg.is_popular
                  ? 'border-amber-400 shadow-2xl shadow-amber-500/20'
                  : 'border-amber-400/20 hover:border-amber-400/40'
              }`}
              style={{
                animation: `fade-slide-up 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              {pkg.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4">
                  <Sparkles className="w-8 h-8 text-black" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>

                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-white">
                    {pkg.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400">KES</span>
                </div>
                <div className="text-amber-400 text-sm font-medium mt-2">
                  per {pkg.billing_cycle}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-bold transition-all ${
                  pkg.is_popular
                    ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:shadow-lg hover:shadow-amber-500/50'
                    : 'bg-neutral-800 text-white hover:bg-neutral-700'
                }`}
              >
                {pkg.is_popular ? 'GET STARTED' : 'CHOOSE PLAN'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            All memberships include priority booking and exclusive member perks
          </p>
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
