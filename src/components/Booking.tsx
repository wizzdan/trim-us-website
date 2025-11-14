import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Scissors, Mail, Phone, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Service, Barber, Booking as BookingType } from '../types';

export default function Booking() {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_id: '',
    barber_id: '',
    booking_date: '',
    booking_time: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [servicesRes, barbersRes] = await Promise.all([
      supabase.from('services').select('*').order('price', { ascending: true }),
      supabase.from('barbers').select('*').eq('is_available', true),
    ]);

    if (servicesRes.data) setServices(servicesRes.data);
    if (barbersRes.data) setBarbers(barbersRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingData: Omit<BookingType, 'id' | 'created_at'> = {
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      service_id: formData.service_id,
      barber_id: formData.barber_id,
      booking_date: formData.booking_date,
      booking_time: formData.booking_time,
      notes: formData.notes,
      status: 'pending',
    };

    const { error } = await supabase.from('bookings').insert([bookingData]);

    if (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } else {
      setSuccess(true);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        service_id: '',
        barber_id: '',
        booking_date: '',
        booking_time: '',
        notes: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    }

    setSubmitting(false);
  };

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(
      'Hi TRIM-US! I would like to book an appointment. Please help me with the available slots.'
    );
    window.open(`https://wa.me/254700000000?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <section id="booking" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-white">Loading booking form...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400 text-sm font-semibold tracking-wide">BOOK NOW</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Reserve Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              {' '}Spot
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Book your appointment online or reach out via WhatsApp for instant confirmation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8 flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">Booking Confirmed!</h3>
                <p className="text-gray-400 text-sm">
                  We'll contact you shortly to confirm your appointment details.
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-amber-400" />
                Online Booking
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_name: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_email: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_phone: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Service</label>
                  <div className="relative">
                    <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <select
                      required
                      value={formData.service_id}
                      onChange={(e) =>
                        setFormData({ ...formData, service_id: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none appearance-none"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} - KES {service.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Preferred Barber</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <select
                      required
                      value={formData.barber_id}
                      onChange={(e) =>
                        setFormData({ ...formData, barber_id: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none appearance-none"
                    >
                      <option value="">Select a barber</option>
                      {barbers.map((barber) => (
                        <option key={barber.id} value={barber.id}>
                          {barber.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.booking_date}
                      onChange={(e) =>
                        setFormData({ ...formData, booking_date: e.target.value })
                      }
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 px-4 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="time"
                        required
                        value={formData.booking_time}
                        onChange={(e) =>
                          setFormData({ ...formData, booking_time: e.target.value })
                        }
                        className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 pl-11 pr-4 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full bg-neutral-900 border border-amber-400/20 rounded-lg py-3 px-4 text-white focus:border-amber-400 focus:outline-none resize-none"
                    placeholder="Any specific requests or preferences..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'BOOKING...' : 'CONFIRM BOOKING'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
                <MessageSquare className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Quick WhatsApp Booking</h3>
                <p className="text-green-100 mb-6 leading-relaxed">
                  Prefer instant confirmation? Chat with us on WhatsApp and we'll help you find the perfect time slot.
                </p>
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full bg-white text-green-700 py-4 rounded-lg font-bold hover:bg-green-50 transition-all"
                >
                  BOOK VIA WHATSAPP
                </button>
              </div>

              <div className="bg-neutral-800/50 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Booking Guidelines</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Book at least 24 hours in advance for guaranteed availability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Arrive 5 minutes early to ensure timely service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Cancellations must be made 12 hours before appointment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Walk-ins welcome based on availability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
