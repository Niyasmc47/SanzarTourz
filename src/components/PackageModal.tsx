import React, { useState } from 'react';
import { X, Clock, MapPin, Check, Ban, Calendar, MessageCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { TourPackage } from '../types';
import { getPackageEnquiryUrl } from '../utils/whatsapp';

interface PackageModalProps {
  packageData: TourPackage | null;
  onClose: () => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  packageData,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'dates'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  if (!packageData) return null;

  const whatsappUrl = getPackageEnquiryUrl(packageData);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header with Hero Image Banner */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={packageData.heroImage}
            alt={packageData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-black/30" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close package details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title info overlay */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-600 text-white shadow-sm uppercase tracking-wide">
                {packageData.category === 'international' ? 'International Tour' : 'India Tour'}
              </span>
              <span className="flex items-center gap-1 text-xs bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                {packageData.duration}
              </span>
              <span className="flex items-center gap-1 text-xs bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-teal-300" />
                {packageData.destination}, {packageData.country}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {packageData.name}
            </h2>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Top Info Bar & Indicative Data Notice */}
          <div className="bg-sand-50 border border-sand-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Indicative Pricing</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                {packageData.pricePerPerson !== null ? (
                  <>
                    <span className="font-serif text-2xl font-bold text-navy-950">
                      ₹{packageData.pricePerPerson.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-600">/ person (twin sharing)</span>
                  </>
                ) : (
                  <span className="font-serif text-xl font-bold text-navy-900 italic">
                    Price on request (Customised based on group size & dates)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-2 rounded-xl border border-sand-200">
              <AlertCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Itinerary and rates can be customised to your preference.</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-navy-800 mb-2">Overview</h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {packageData.shortDescription}
            </p>
          </div>

          {/* Highlights */}
          {packageData.highlights && packageData.highlights.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-navy-800 mb-3">Key Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {packageData.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Tabs for Itinerary, Inclusions/Exclusions, Dates */}
          <div className="border-b border-slate-200 pt-2">
            <div className="flex gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('itinerary')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'itinerary'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-navy-900'
                }`}
              >
                Day-by-Day Itinerary ({packageData.dayByDayItinerary.length} Days)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('inclusions')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'inclusions'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-navy-900'
                }`}
              >
                Inclusions & Exclusions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('dates')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'dates'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-navy-900'
                }`}
              >
                Available Dates
              </button>
            </div>
          </div>

          {/* TAB 1: Day-by-day Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-3">
              {packageData.dayByDayItinerary.map((dayItem) => {
                const isExpanded = expandedDay === dayItem.day;
                return (
                  <div
                    key={dayItem.day}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleDay(dayItem.day)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/70 transition-colors focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/60 font-bold text-xs flex items-center justify-center shrink-0">
                          D{dayItem.day}
                        </span>
                        <span className="font-semibold text-navy-950 text-sm sm:text-base">
                          {dayItem.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                        {dayItem.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Inclusions & Exclusions */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
                <h4 className="flex items-center gap-2 font-bold text-emerald-900 text-sm uppercase tracking-wide mb-3">
                  <Check className="w-4 h-4 text-emerald-600" />
                  What's Included
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {packageData.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-5">
                <h4 className="flex items-center gap-2 font-bold text-rose-950 text-sm uppercase tracking-wide mb-3">
                  <Ban className="w-4 h-4 text-rose-600" />
                  What's Excluded
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {packageData.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Available Dates */}
          {activeTab === 'dates' && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center gap-2 text-navy-950 font-semibold mb-3">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Travel Dates & Departure Flexibility</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {packageData.availableDates.map((dateNotice, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>{dateNotice}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500 border-t border-slate-200 pt-3">
                Need specific dates for your family or friends? Contact us on WhatsApp with your travel schedule to customize this package.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
          >
            Close Details
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire on WhatsApp About This Package</span>
          </a>
        </div>
      </div>
    </div>
  );
};
