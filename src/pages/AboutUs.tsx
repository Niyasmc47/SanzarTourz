import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Sliders, 
  MessageCircle, 
  ArrowRight,
  SunMedium
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

export const AboutUs: React.FC = () => {
  const { siteConfig } = useSite();
  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-14 mb-16 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider border border-teal-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>About Sanzar Tourz</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Travel. Breathe. Unwind.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Based in Palakkad, Kerala, Sanzar Tourz is committed to crafting personalized travel experiences with genuine care, flexible planning, and attentive service for families, couples, and leisure explorers.
            </p>
          </div>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-teal-700">Our Story</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950 mt-1">
                Founded with a Passion for Thoughtful Journeys
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {siteConfig.about.story}
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We understand that planning a trip shouldn't feel like a chore. From choosing the right mountain retreat or beach stay to organizing dependable transfers and local experiences, our focus is on keeping your planning smooth, transparent, and completely stress-free.
            </p>

            <div className="pt-2 flex items-center gap-3 text-sm text-navy-950 font-medium">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                <MapPin className="w-4 h-4" />
              </div>
              <span>Proudly based in {siteConfig.baseLocation.formattedAddress}</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
                alt="Traveller overlooking mountain valley"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-300 block mb-1">
                  Our Philosophy
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold">
                  "{siteConfig.about.philosophy}"
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Pillars / Values Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-teal-700">What Drives Us</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-1">
              Our Core Principles
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              How we approach every itinerary and traveller request from Palakkad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.about.values.map((v, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-serif text-base font-bold text-navy-950 mb-1.5">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <SunMedium className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
              India Holiday Packages
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Curated circuits covering Kashmir, Himachal Pradesh, Rajasthan, Andaman Islands, and South Indian retreats with private ground transportation and verified stays.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
              International Tour Packages
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Comfortable travel itineraries for Dubai, Singapore, Malaysia, Bali, Thailand, and other top global holiday destinations with hotel, transfer, and sightseeing coordination.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
              Customised Family & Group Itineraries
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Bespoke travel schedules tailored around your group's budget, preferred departure airport, dietary requirements, and comfortable pacing.
            </p>
          </div>

        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
            Ready to Plan Your Next Escape?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Get in touch with us on WhatsApp for friendly advice, itinerary suggestions, or package inquiries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link
              to="/customised-holidays"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-sm shadow-sm transition-all"
            >
              <span>Customise a Holiday</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getGeneralEnquiryUrl('About Us Page CTA')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold transition-all"
            >
              <MessageCircle className="w-4 h-4 text-teal-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
