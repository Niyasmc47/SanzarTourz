import React from 'react';
import { Clock, MapPin, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TourPackage } from '../types';
import { getPackageEnquiryUrl } from '../utils/whatsapp';

interface PackageCardProps {
  packageData: TourPackage;
  onViewDetails: (pkg: TourPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  packageData,
  onViewDetails,
}) => {
  const whatsappUrl = getPackageEnquiryUrl(packageData);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      
      {/* Card Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={packageData.heroImage}
          alt={packageData.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Category / Highlight Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {packageData.tag && (
            <span className="px-2.5 py-1 text-xs font-semibold tracking-wide rounded-full bg-teal-600 text-white shadow-sm">
              {packageData.tag}
            </span>
          )}
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-navy-950/70 backdrop-blur-md text-white border border-white/20 capitalize">
            {packageData.category === 'international' ? 'International' : 'Domestic / India'}
          </span>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium">
          <Clock className="w-3.5 h-3.5 text-teal-300" />
          <span>{packageData.duration}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Destination location line */}
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{packageData.destination}, {packageData.country}</span>
          </div>

          {/* Package Title */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
            {packageData.name}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {packageData.shortDescription}
          </p>

          {/* Key Highlights preview */}
          {packageData.highlights && packageData.highlights.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
              {packageData.highlights.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider block">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                {packageData.pricePerPerson !== null ? (
                  <>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                      ₹{packageData.pricePerPerson.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-normal">/ person</span>
                  </>
                ) : (
                  <span className="font-serif text-lg font-bold text-navy-800 italic">
                    Price on request
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Buttons: View Package & Enquire on WhatsApp */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onViewDetails(packageData)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 hover:border-navy-800 text-navy-900 hover:text-navy-950 bg-slate-50 hover:bg-white text-xs sm:text-sm font-semibold transition-all duration-200"
            >
              <span>View Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

