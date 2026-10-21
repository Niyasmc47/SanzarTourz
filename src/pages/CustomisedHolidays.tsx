import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  MessageCircle, 
  CheckCircle, 
  PlaneTakeoff, 
  Calendar, 
  Users, 
  IndianRupee, 
  FileText, 
  Compass, 
  ShieldCheck
} from 'lucide-react';
import { CustomTripFormData } from '../types';
import { getCustomTripEnquiryUrl } from '../utils/whatsapp';
import { siteConfig } from '../config/siteConfig';

export const CustomisedHolidays: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<CustomTripFormData>({
    fullName: '',
    phone: '',
    departureCity: '',
    destination: '',
    travelDates: '',
    travellerCount: '2 Adults',
    estimatedBudget: '',
    preferences: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomTripFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set destination if passed in query param
  useEffect(() => {
    const destParam = searchParams.get('destination');
    if (destParam) {
      setFormData((prev) => ({ ...prev, destination: destParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on input
    if (errors[name as keyof CustomTripFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomTripFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }
    if (!formData.departureCity.trim()) {
      newErrors.departureCity = 'Please enter your departure city (e.g. Cochin, Coimbatore, Bangalore)';
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Please mention your preferred destination';
    }
    if (!formData.travelDates.trim()) {
      newErrors.travelDates = 'Please enter tentative travel dates or month';
    }
    if (!formData.travellerCount.trim()) {
      newErrors.travellerCount = 'Please indicate number of travellers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitted(true);
    const whatsappUrl = getCustomTripEnquiryUrl(formData);
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor-Made Itineraries</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-navy-950 mb-4">
            Design Your Customised Holiday
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every memorable trip starts with your personal vision. Tell us where you want to travel, who is coming along, and what kind of experience you are dreaming of. We'll curate a customized day-by-day plan and connect with you on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                Share Your Trip Requirements
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill in the details below. When you click "Generate WhatsApp Enquiry", your details are validated and formatted into a direct message to our planning team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Menon"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500`}
                  />
                  {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98460 00000"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Optional, used in prefilled text</p>
                </div>
              </div>

              {/* Row 2: Departure City and Preferred Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="departureCity" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Departure City / Airport <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <PlaneTakeoff className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="departureCity"
                      name="departureCity"
                      value={formData.departureCity}
                      onChange={handleChange}
                      placeholder="e.g. Kochi, Coimbatore, Bangalore"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        errors.departureCity ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500`}
                    />
                  </div>
                  {errors.departureCity && <p className="text-xs text-rose-500 mt-1">{errors.departureCity}</p>}
                </div>

                <div>
                  <label htmlFor="destination" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Preferred Destination <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g. Kashmir, Dubai, Bali, Himachal"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        errors.destination ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500`}
                    />
                  </div>
                  {errors.destination && <p className="text-xs text-rose-500 mt-1">{errors.destination}</p>}
                </div>
              </div>

              {/* Row 3: Travel Dates and Number of Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="travelDates" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Tentative Travel Dates / Month <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="travelDates"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleChange}
                      placeholder="e.g. Mid November, or 10-16 Dec"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        errors.travelDates ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500`}
                    />
                  </div>
                  {errors.travelDates && <p className="text-xs text-rose-500 mt-1">{errors.travelDates}</p>}
                </div>

                <div>
                  <label htmlFor="travellerCount" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                    Number of Travellers <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="travellerCount"
                      name="travellerCount"
                      value={formData.travellerCount}
                      onChange={handleChange}
                      placeholder="e.g. 2 Adults, 1 Child (Age 6)"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                        errors.travellerCount ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500`}
                    />
                  </div>
                  {errors.travellerCount && <p className="text-xs text-rose-500 mt-1">{errors.travellerCount}</p>}
                </div>
              </div>

              {/* Row 4: Estimated Budget */}
              <div>
                <label htmlFor="estimatedBudget" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Estimated Budget in ₹ (Total or Per Person)
                </label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="estimatedBudget"
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    placeholder="e.g. ₹50,000 per person or ₹1.5 Lakh total"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Leave blank if flexible or if you want our recommendation</p>
              </div>

              {/* Row 5: Preferences */}
              <div>
                <label htmlFor="preferences" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Additional Preferences & Travel Notes
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    id="preferences"
                    name="preferences"
                    rows={3}
                    value={formData.preferences}
                    onChange={handleChange}
                    placeholder="e.g. 4-star hotels preferred, vegetarian food options, relaxed pacing, romantic setup..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enquire on WhatsApp with These Details</span>
                </button>
                <p className="text-center text-xs text-slate-500 mt-3">
                  Clicking will open WhatsApp directly with your pre-formatted enquiry. No server registration or payment required.
                </p>
              </div>

              {isSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>WhatsApp link triggered! If the window didn't open automatically, please ensure pop-ups are allowed or click the button again.</span>
                </div>
              )}

            </form>
          </div>

          {/* Right Column: Guidance & What Happens Next */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Process Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-navy-950">
                How Customised Planning Works
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Send Your Travel Wishlist</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Share your tentative dates, preferred region, and who you're travelling with using the form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Personalised Consultation</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      We review your details, discuss stay preferences and vehicle types with you over WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Receive Tailored Itinerary</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Get a day-by-day itinerary proposal with inclusions, exclusions, and transparent pricing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Refine & Finalise</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Adjust pacing, room types, or attractions until it is exactly what you envision.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-teal-800 bg-teal-50 p-3 rounded-xl border border-teal-100">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>No rigid tour timetables. Every schedule matches your group's comfortable pace.</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-sand-50 rounded-3xl p-6 border border-sand-200 space-y-3">
              <h4 className="font-serif text-lg font-bold text-navy-950">
                Prefer to discuss directly?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You don't need to fill out the full form if you have an open question. Reach our Palakkad desk directly on WhatsApp.
              </p>
              <div className="pt-1">
                <a
                  href={getCustomTripEnquiryUrl(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 hover:text-teal-800"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {siteConfig.contact.whatsappDisplayNumber} &rarr;</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
