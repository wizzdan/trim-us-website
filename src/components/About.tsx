import { Award, Users, Sparkles, Clock } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Award, label: 'Years of Excellence', value: '8+' },
    { icon: Users, label: 'Happy Clients', value: '5000+' },
    { icon: Sparkles, label: 'Master Barbers', value: '3' },
    { icon: Clock, label: 'Open Weekly', value: '7 Days' },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern barbershop interior"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl -z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-amber-400 rounded-2xl -z-0"></div>
          </div>

          <div>
            <div className="inline-block bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
              <span className="text-amber-400 text-sm font-semibold tracking-wide">ABOUT TRIM-US</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Crafting Confidence Through
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                {' '}Precision
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At TRIM-US, we're not just a barbershop—we're a lifestyle destination. Since our founding, we've been committed to elevating the grooming experience for the modern gentleman.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Every cut, every shave, every detail is executed with masterful precision. Our barbers blend traditional techniques with contemporary style, ensuring you leave looking sharp and feeling confident.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-neutral-800/50 backdrop-blur-sm border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/40 transition-all group"
                >
                  <stat.icon className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105">
              OUR STORY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
