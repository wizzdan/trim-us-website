import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
    } else if (data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400 text-sm font-semibold tracking-wide">TESTIMONIALS</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Clients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              {' '}Say
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real experiences from gentlemen who trust TRIM-US for their grooming needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-amber-400/20 rounded-3xl p-12 md:p-16">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-amber-400/20" />

            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-400/30">
                  <img
                    src={currentTestimonial.customer_image}
                    alt={currentTestimonial.customer_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < currentTestimonial.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-white text-xl md:text-2xl text-center leading-relaxed mb-6 font-light">
                "{currentTestimonial.review}"
              </blockquote>

              <div className="text-center">
                <div className="text-white font-bold text-lg">
                  {currentTestimonial.customer_name}
                </div>
                <div className="text-amber-400 text-sm">{currentTestimonial.service_type}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-12">
              <button
                onClick={prevTestimonial}
                className="bg-neutral-800 hover:bg-amber-400 text-white hover:text-black p-3 rounded-full transition-all group"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-amber-400 w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="bg-neutral-800 hover:bg-amber-400 text-white hover:text-black p-3 rounded-full transition-all group"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
