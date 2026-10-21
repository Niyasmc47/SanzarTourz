import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Compass, 
  Sliders, 
  Headphones, 
  CalendarCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { tourPackages, popularDestinations } from '../data/packages';
import { TourPackage } from '../types';
import { PackageCard } from '../components/PackageCard';
import { PackageModal } from '../components/PackageModal';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';
import heroImage from '../assets/hero.jpeg';

export const Home: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);

  // Filter featured packages for homepage
  const featuredPackages = tourPackages.filter((pkg) => pkg.featured);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* =========================================================================
          SECTION B: HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[680px] flex items-center bg-slate-900 text-white overflow-hidden">
        {/* Hero Background Image with Subtle, Light Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Sanzar Tourz - Discover the World"
            className="w-full h-full object-cover object-center"
          />
          {/* Gentle, reduced overlay ensuring photo vibrancy while keeping text legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-navy-950/30 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Brand Accent Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950/40 backdrop-blur-md border border-teal-400/40 text-teal-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>Palakkad, Kerala • {siteConfig.brandSlogan}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-md">
              Discover the World. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-white">
                Find Your Escape.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-100 text-base sm:text-lg sm:leading-relaxed max-w-2xl font-normal drop-shadow">
              Welcome to <strong className="text-white font-semibold">{siteConfig.brandName}</strong>, your boutique travel planner based in Palakkad, Kerala. We craft thoughtfully designed domestic and international journeys, tailored to let you relax, explore, and rejuvenate.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#featured-packages"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-teal-900/30 hover:shadow-teal-800/50 transition-all duration-200"
              >
                <span>Explore Our Tours</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={getGeneralEnquiryUrl('Hero Banner CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 text-teal-400" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Personalised Itineraries</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-400 shrink-0" />
                <span>India & World Tours</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MessageCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Direct WhatsApp Planning</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: FEATURED TOUR PACKAGES
          ========================================================================= */}
      <section id="featured-packages" className="py-20 bg-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-teal-700">Handpicked Journeys</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950 mt-1">
                Featured Tour Packages
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Explore popular curated packages across India and global destinations. All itineraries can be customized according to your preferred travel dates and budget.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/international-tours"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all"
              >
                <span>International Tours</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/india-tours"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all"
              >
                <span>India Tours</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {featuredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                packageData={pkg}
                onViewDetails={(item) => setSelectedPackage(item)}
              />
            ))}
          </div>

          {/* Bottom helper text */}
          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500">
              * Indicative sample packages. Rates and inclusions may vary according to season, hotel category, and travel party size.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION D: POPULAR DESTINATIONS (ILLUSTRATIVE EXAMPLES)
          ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-teal-700">Inspiration & Ideas</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950 mt-1">
              Popular Destinations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Browse top destinations to inspire your next holiday. These illustrative examples showcase regions where we can assist you with customised planning and arrangements.
            </p>
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {popularDestinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/customised-holidays?destination=${encodeURIComponent(dest.name)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900 shadow-xs hover:shadow-lg transition-all duration-300 block"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-teal-300 border border-white/10">
                    {dest.category === 'international' ? 'Intl' : 'India'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-bold leading-tight group-hover:text-teal-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {dest.shortTag}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs">
              Destinations shown for illustrative holiday inspiration. Custom itineraries arranged on request.
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION E: WHY CHOOSE US? (FACTUAL & GENERIC CLAIMS)
          ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-teal-700">The Sanzar Way</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950 mt-1">
              Why Plan With Sanzar Tourz?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              We focus on thoughtful consultation and flexible planning so you can travel with peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Value 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-5">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                Personalised Travel Planning
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every holiday is tailored around your preferences, pacing, hotel standards, and personal travel style.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                Customised Holiday Experiences
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you desire a serene nature retreat, a family holiday, or a cultural exploration, we build itineraries that fit you.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-5">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                Direct Enquiry Assistance
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enjoy simple, responsive WhatsApp consultation with clear itinerary details and straightforward communication.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-5">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                Flexible Travel Preferences
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Adjust travel dates, add or remove activities, or customize day-by-day pacing without rigid package constraints.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION F: CUSTOMISED HOLIDAYS CTA
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        {/* Subtle decorative geometry */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-navy-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold tracking-wider uppercase border border-teal-400/30">
              Bespoke Travel Solutions
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Looking for a Trip Built Entirely Around You?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Share your preferred travel dates, ideal destination, group size, and budget. We will craft a customized itinerary and discuss it with you on WhatsApp.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/customised-holidays"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getGeneralEnquiryUrl('Customised Holiday Banner')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base transition-all"
              >
                <MessageCircle className="w-5 h-5 text-teal-400" />
                <span>Talk to Us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: CONTACT SECTION (HOMEPAGE CONTACT STRIP)
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-teal-700">Get in Touch</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950">
                We're Here to Help Plan Your Next Journey
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Have questions about a destination or ready to plan a customised tour? Reach out directly to our Palakkad team for friendly assistance.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">Office Location</h4>
                    <p className="text-sm font-medium text-navy-950 mt-0.5">{siteConfig.baseLocation.formattedAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">Phone</h4>
                    <p className="text-sm font-medium text-navy-950 mt-0.5">
                      <a href={`tel:${siteConfig.contact.phoneNumber.replace(/\s+/g, '')}`} className="hover:text-teal-700">
                        {siteConfig.contact.phoneNumber}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">Email Address</h4>
                    <p className="text-sm font-medium text-navy-950 mt-0.5">
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-teal-700">
                        {siteConfig.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: WhatsApp Direct Card */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
              <div className="max-w-md mx-auto text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                  Connect Directly on WhatsApp
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  WhatsApp is our primary channel for holiday inquiries, quotation requests, and itinerary planning. Tap below to chat instantly.
                </p>

                <div className="pt-2">
                  <a
                    href={getGeneralEnquiryUrl('Homepage Direct Contact Box')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Start WhatsApp Chat ({siteConfig.contact.whatsappDisplayNumber})</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-center items-center gap-6 text-xs text-slate-500">
                  <Link to="/contact" className="hover:text-teal-700 font-medium">
                    View Full Contact Page &rarr;
                  </Link>
                  <span>•</span>
                  <Link to="/about" className="hover:text-teal-700 font-medium">
                    About Sanzar Tourz &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Package Detail Modal */}
      <PackageModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />

    </div>
  );
};
