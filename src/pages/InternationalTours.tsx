import React, { useState, useMemo } from 'react';
import { Search, Globe, Filter, MessageCircle, AlertCircle } from 'lucide-react';
import { TourPackage } from '../types';
import { useSite } from '../context/SiteContext';
import { PackageCard } from '../components/PackageCard';
import { PackageModal } from '../components/PackageModal';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

export const InternationalTours: React.FC = () => {
  const { packages } = useSite();
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under50k' | 'above50k'>('all');

  const internationalPackages = useMemo(() => {
    return packages.filter((pkg) => pkg.category === 'international');
  }, [packages]);

  const filteredPackages = useMemo(() => {
    return internationalPackages.filter((pkg) => {
      // Search term
      const matchesSearch = 
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.country.toLowerCase().includes(searchQuery.toLowerCase());

      // Budget filter
      let matchesBudget = true;
      if (budgetFilter === 'under50k') {
        matchesBudget = pkg.pricePerPerson !== null && pkg.pricePerPerson <= 50000;
      } else if (budgetFilter === 'above50k') {
        matchesBudget = pkg.pricePerPerson === null || pkg.pricePerPerson > 50000;
      }

      return matchesSearch && matchesBudget;
    });
  }, [internationalPackages, searchQuery, budgetFilter]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-400/30">
              <Globe className="w-3.5 h-3.5" />
              <span>Worldwide Holidays</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              International Tour Packages
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our handpicked international holiday itineraries — from the desert horizons of Dubai to tropical Southeast Asian beaches. All packages can be personalized to your preferred dates, hotel choices, and family needs.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination (e.g. Dubai, Bali, Singapore)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 bg-slate-50/50"
            />
          </div>

          {/* Quick Budget Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> Budget:
            </span>
            <button
              type="button"
              onClick={() => setBudgetFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                budgetFilter === 'all'
                  ? 'bg-navy-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Packages
            </button>
            <button
              type="button"
              onClick={() => setBudgetFilter('under50k')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                budgetFilter === 'under50k'
                  ? 'bg-navy-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Under ₹50,000
            </button>
            <button
              type="button"
              onClick={() => setBudgetFilter('above50k')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                budgetFilter === 'above50k'
                  ? 'bg-navy-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ₹50,000+ / On Request
            </button>
          </div>

        </div>

        {/* Informative notice */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-teal-50/60 border border-teal-200/50 rounded-xl p-3 mb-8">
          <AlertCircle className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            Looking for a destination not listed here? We build custom itineraries for Europe, the Middle East, Southeast Asia, and more. 
            <a 
              href={getGeneralEnquiryUrl('International Tours Page Request')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-teal-700 font-semibold underline ml-1 hover:text-teal-800"
            >
              Enquire on WhatsApp
            </a>
          </span>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                packageData={pkg}
                onViewDetails={(item) => setSelectedPackage(item)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <Globe className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-navy-950">No packages match your search</h3>
            <p className="text-slate-600 text-sm mt-1 mb-5">
              We can still organize this trip for you! Reach out to us directly with your preferred destination.
            </p>
            <a
              href={getGeneralEnquiryUrl('Custom International Request')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        )}

      </div>

      {/* Package Detail Modal */}
      <PackageModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </div>
  );
};

