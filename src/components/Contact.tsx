import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400 text-sm font-semibold tracking-wide">FIND US</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Visit Us in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              {' '}Limuru
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience premium grooming in the heart of Limuru at Cleanshelf
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-400/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-gray-400">
                      Cleanshelf Building, Limuru Town
                      <br />
                      Limuru, Kenya
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-400/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+254700000000"
                      className="text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      +254 700 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-400/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:hello@trimus.co.ke"
                      className="text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      hello@trimus.co.ke
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-400/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Opening Hours</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Monday - Friday:</span>
                        <span className="text-amber-400 font-medium">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Saturday:</span>
                        <span className="text-amber-400 font-medium">9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Sunday:</span>
                        <span className="text-amber-400 font-medium">10:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-amber-400/20">
                <button
                  onClick={() => {
                    const element = document.getElementById('booking');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                >
                  BOOK AN APPOINTMENT
                </button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-sm border border-amber-400/20 rounded-2xl overflow-hidden h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.926837562983!2d36.6472!3d-1.1126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f8c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2sLimuru%2C%20Kenya!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TRIM-US Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
