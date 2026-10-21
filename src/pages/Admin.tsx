import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  CheckCircle2, 
  ArrowLeft, 
  Compass, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Upload, 
  X,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { TourPackage, SiteConfig } from '../types';

export const Admin: React.FC = () => {
  const { 
    siteConfig, 
    packages, 
    updateSiteConfig, 
    addPackage, 
    updatePackage, 
    deletePackage, 
    resetToDefaults,
    updateAdminPassword,
    isAuthenticated,
    login,
    logout
  } = useSite();

  // Authentication state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'packages' | 'contact' | 'brand' | 'security'>('packages');

  // Success toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Package editing state
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [isCreatingNewPackage, setIsCreatingNewPackage] = useState(false);

  // Form states for Contact & Brand
  const [contactForm, setContactForm] = useState(siteConfig.contact);
  const [locationForm, setLocationForm] = useState(siteConfig.baseLocation);
  const [socialForm, setSocialForm] = useState(siteConfig.socialLinks);
  const [brandForm, setBrandForm] = useState({
    brandName: siteConfig.brandName,
    brandSlogan: siteConfig.brandSlogan,
  });
  const [aboutForm, setAboutForm] = useState(siteConfig.about);

  // Password change state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError('');
      const success = login(passwordInput);
      if (!success) {
        setLoginError('Incorrect admin password. Please try again.');
      } else {
        setPasswordInput('');
      }
    };

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-600/30">
              <Lock className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-navy-950">
              Sanzar Tourz Admin
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Secure portal to manage packages, WhatsApp settings, and website content
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full pl-4 pr-11 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Unlock Admin Portal
            </button>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <Link to="/" className="hover:text-teal-700 flex items-center gap-1 font-medium">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
              </Link>
              <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                Default: sanzar2026
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SAVE HANDLERS
  // -------------------------------------------------------------
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteConfig = {
      ...siteConfig,
      contact: contactForm,
      baseLocation: locationForm,
      socialLinks: socialForm,
    };
    updateSiteConfig(updated);
    showToast('Contact & WhatsApp details updated successfully!');
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteConfig = {
      ...siteConfig,
      brandName: brandForm.brandName,
      brandSlogan: brandForm.brandSlogan,
      about: aboutForm,
    };
    updateSiteConfig(updated);
    showToast('Brand and About information updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!newPasswordInput || newPasswordInput.length < 4) {
      setPasswordError('Password must be at least 4 characters long.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('Passwords do not match.');
      return;
    }
    updateAdminPassword(newPasswordInput);
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    showToast('Admin password changed successfully!');
  };

  const handleExportData = () => {
    const data = {
      siteConfig,
      packages,
      exportDate: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sanzar-tourz-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('Data exported successfully!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.siteConfig && parsed.packages) {
          updateSiteConfig(parsed.siteConfig);
          // Save packages
          localStorage.setItem('sanzar_tourz_packages', JSON.stringify(parsed.packages));
          window.location.reload();
        } else {
          alert('Invalid backup file format.');
        }
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all packages and site details to factory defaults? This cannot be undone.')) {
      resetToDefaults();
      showToast('Reset all details to default!');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  // -------------------------------------------------------------
  // RENDER MAIN ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="bg-navy-950 text-white border-b border-navy-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-navy-950 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-white">Sanzar Tourz Admin</span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Live Editor
                </span>
              </div>
              <p className="text-[11px] text-slate-400">All changes reflect live on the website immediately</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <span>View Live Website</span>
              <Globe className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'packages'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-600 hover:text-navy-950'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Tour Packages ({packages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'contact'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-600 hover:text-navy-950'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp, Phone & Location</span>
            </button>

            <button
              onClick={() => setActiveTab('brand')}
              className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'brand'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-600 hover:text-navy-950'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Brand, Slogan & About Us</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'security'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-600 hover:text-navy-950'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Security & Backup</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* =========================================================================
            TAB 1: TOUR PACKAGES
            ========================================================================= */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <h2 className="font-serif text-xl font-bold text-navy-950">
                  Manage Tour Packages
                </h2>
                <p className="text-xs text-slate-500">
                  Add new domestic and international packages, adjust prices, edit itineraries, and toggle featured packages.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingPackage({
                    id: `pkg-${Date.now()}`,
                    name: '',
                    destination: '',
                    country: '',
                    category: 'international',
                    duration: '5 Days / 4 Nights',
                    featured: false,
                    pricePerPerson: 35000,
                    shortDescription: '',
                    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
                    galleryImages: [],
                    highlights: ['Sightseeing tour', 'Daily breakfast included'],
                    availableDates: ['Custom departures year-round'],
                    dayByDayItinerary: [
                      { day: 1, title: 'Arrival & Hotel Check-in', description: 'Arrive at destination, transfer to hotel and evening leisure.' }
                    ],
                    inclusions: ['Hotel stay', 'Daily breakfast', 'Airport transfers'],
                    exclusions: ['Airfare', 'Personal expenses'],
                    tag: 'New'
                  });
                  setIsCreatingNewPackage(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Package</span>
              </button>
            </div>

            {/* Packages List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-navy-950/80 text-white backdrop-blur-sm">
                        {pkg.category}
                      </span>
                      {pkg.featured && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-500 text-navy-950">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white text-xs font-semibold">
                      {pkg.pricePerPerson !== null
                        ? `₹${pkg.pricePerPerson.toLocaleString('en-IN')}`
                        : 'On Request'}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                        {pkg.destination}, {pkg.country} • {pkg.duration}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-navy-950 mt-1 line-clamp-1">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {pkg.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPackage({ ...pkg });
                          setIsCreatingNewPackage(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-teal-700" />
                        <span>Edit Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${pkg.name}"?`)) {
                            deletePackage(pkg.id);
                            showToast('Package deleted');
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: CONTACT, WHATSAPP & LOCATION SETTINGS
            ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-950">
                Contact & WhatsApp Settings
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Changing your WhatsApp number here instantly updates all click-to-chat links, hero buttons, packages, and footer channels across the entire website.
              </p>
            </div>

            <form onSubmit={handleSaveContact} className="space-y-6">
              
              {/* WhatsApp Settings */}
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-4">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm uppercase tracking-wide">
                  <MessageCircle className="w-4 h-4 text-teal-700" />
                  <span>WhatsApp Configuration (Primary Enquiry Channel)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                      WhatsApp Number (International format, no + or spaces)
                    </label>
                    <input
                      type="text"
                      value={contactForm.whatsappNumber}
                      onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                      placeholder="e.g. 919876543210"
                      required
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">Used for wa.me URL generator</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                      WhatsApp Display Text
                    </label>
                    <input
                      type="text"
                      value={contactForm.whatsappDisplayNumber}
                      onChange={(e) => setContactForm({ ...contactForm, whatsappDisplayNumber: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">Visual text shown to visitors</p>
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={contactForm.phoneNumber}
                    onChange={(e) => setContactForm({ ...contactForm, phoneNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="enquiry@sanzartourz.com"
                    required
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Office Location */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Base Location (Palakkad, Kerala)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                    <input
                      type="text"
                      value={locationForm.city}
                      onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
                    <input
                      type="text"
                      value={locationForm.state}
                      onChange={(e) => setLocationForm({ ...locationForm, state: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
                    <input
                      type="text"
                      value={locationForm.country}
                      onChange={(e) => setLocationForm({ ...locationForm, country: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Formatted Address</label>
                  <input
                    type="text"
                    value={locationForm.formattedAddress}
                    onChange={(e) => setLocationForm({ ...locationForm, formattedAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={contactForm.workingHours}
                    onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Sunday / Weekend Notice
                  </label>
                  <input
                    type="text"
                    value={contactForm.workingDaysNotice}
                    onChange={(e) => setContactForm({ ...contactForm, workingDaysNotice: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-800">
                  Social Channels
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Instagram URL</label>
                    <input
                      type="url"
                      value={socialForm.instagram}
                      onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Facebook URL</label>
                    <input
                      type="url"
                      value={socialForm.facebook}
                      onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details Live</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* =========================================================================
            TAB 3: BRAND, SLOGAN & ABOUT US
            ========================================================================= */}
        {activeTab === 'brand' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-950">
                Brand & Company Story
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Update brand slogans, story, travel philosophy, and values shown on the About Us page and footers.
              </p>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandForm.brandName}
                    onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Brand Slogan
                  </label>
                  <input
                    type="text"
                    value={brandForm.brandSlogan}
                    onChange={(e) => setBrandForm({ ...brandForm, brandSlogan: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                  Tagline (Subtitle)
                </label>
                <input
                  type="text"
                  value={aboutForm.tagline}
                  onChange={(e) => setAboutForm({ ...aboutForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                  Short Bio (Shown in Footer & Intro)
                </label>
                <textarea
                  rows={2}
                  value={aboutForm.shortBio}
                  onChange={(e) => setAboutForm({ ...aboutForm, shortBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                  Full Story (About Us page)
                </label>
                <textarea
                  rows={4}
                  value={aboutForm.story}
                  onChange={(e) => setAboutForm({ ...aboutForm, story: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                  Travel Philosophy
                </label>
                <input
                  type="text"
                  value={aboutForm.philosophy}
                  onChange={(e) => setAboutForm({ ...aboutForm, philosophy: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand Information</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SECURITY & BACKUP
            ========================================================================= */}
        {activeTab === 'security' && (
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Change Password Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-950">
                  Change Admin Password
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Update the password used to access this administrative portal.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    required
                    placeholder="Enter new password"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    required
                    placeholder="Re-type new password"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                {passwordError && (
                  <p className="text-xs text-rose-500 font-semibold">{passwordError}</p>
                )}

                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  Update Admin Password
                </button>
              </form>
            </div>

            {/* Export & Import Backup */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-950">
                  Data Backup & Export
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Export all your current tour packages and settings into a JSON backup file, or restore from a previously exported file.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-navy-950 text-sm flex items-center gap-2">
                    <Download className="w-4 h-4 text-teal-600" />
                    <span>Download Backup</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Saves packages and business details as a JSON file to your device.
                  </p>
                  <button
                    type="button"
                    onClick={handleExportData}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-navy-950 text-sm flex items-center gap-2">
                    <Upload className="w-4 h-4 text-teal-600" />
                    <span>Restore from Backup</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Select a valid JSON backup file to restore website content.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Backup File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Danger Zone: Reset to Factory Defaults */}
              <div className="pt-6 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-rose-950 text-xs sm:text-sm">Factory Reset</h4>
                      <p className="text-xs text-rose-700 mt-0.5">
                        Clear all edits from localStorage and restore original code packages and contact information.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs whitespace-nowrap transition-colors"
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* =========================================================================
          PACKAGE MODAL / DRAWER (ADD OR EDIT)
          ========================================================================= */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-navy-950 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500 text-navy-950 flex items-center justify-center font-bold">
                  {isCreatingNewPackage ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </div>
                <h3 className="font-serif text-xl font-bold">
                  {isCreatingNewPackage ? 'Create New Tour Package' : `Edit: ${editingPackage.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              
              {/* Row 1: Package Name, Destination, Country */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Package Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingPackage.name}
                    onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                    required
                    placeholder="e.g. Dubai City & Desert Experience"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={editingPackage.category}
                    onChange={(e) => setEditingPackage({ ...editingPackage, category: e.target.value as 'international' | 'india' })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="international">International Tour</option>
                    <option value="india">India Tour</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Destination, Country, Duration, Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={editingPackage.destination}
                    onChange={(e) => setEditingPackage({ ...editingPackage, destination: e.target.value })}
                    placeholder="e.g. Dubai"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Country / State
                  </label>
                  <input
                    type="text"
                    value={editingPackage.country}
                    onChange={(e) => setEditingPackage({ ...editingPackage, country: e.target.value })}
                    placeholder="e.g. UAE"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingPackage.duration}
                    onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                    placeholder="e.g. 5 Days / 4 Nights"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={editingPackage.tag || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, tag: e.target.value })}
                    placeholder="e.g. Popular, Honeymoon"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              {/* Row 3: Pricing & Featured */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                    Price Per Person in ₹
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      disabled={editingPackage.pricePerPerson === null}
                      value={editingPackage.pricePerPerson ?? ''}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : 0;
                        setEditingPackage({ ...editingPackage, pricePerPerson: val });
                      }}
                      placeholder="e.g. 42000"
                      className="w-48 px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white disabled:opacity-50"
                    />
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingPackage.pricePerPerson === null}
                        onChange={(e) => {
                          setEditingPackage({
                            ...editingPackage,
                            pricePerPerson: e.target.checked ? null : 35000
                          });
                        }}
                        className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                      />
                      <span>Price on request</span>
                    </label>
                  </div>
                </div>

                <div className="shrink-0">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-navy-950 uppercase cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPackage.featured || false}
                      onChange={(e) => setEditingPackage({ ...editingPackage, featured: e.target.checked })}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <span>Show on Homepage Featured Section</span>
                  </label>
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                  Hero Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    value={editingPackage.heroImage}
                    onChange={(e) => setEditingPackage({ ...editingPackage, heroImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                  />
                  {editingPackage.heroImage && (
                    <img
                      src={editingPackage.heroImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingPackage.shortDescription}
                  onChange={(e) => setEditingPackage({ ...editingPackage, shortDescription: e.target.value })}
                  placeholder="Overview of the package..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              {/* Day-by-day Itinerary Editor */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-800">
                    Day-by-Day Itinerary ({editingPackage.dayByDayItinerary.length} Days)
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const nextDay = editingPackage.dayByDayItinerary.length + 1;
                      setEditingPackage({
                        ...editingPackage,
                        dayByDayItinerary: [
                          ...editingPackage.dayByDayItinerary,
                          { day: nextDay, title: `Day ${nextDay} Activity`, description: 'Sightseeing and relaxation.' }
                        ]
                      });
                    }}
                    className="text-xs text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Day
                  </button>
                </div>

                <div className="space-y-3">
                  {editingPackage.dayByDayItinerary.map((d, index) => (
                    <div key={index} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {d.day}
                        </span>
                        <input
                          type="text"
                          value={d.title}
                          onChange={(e) => {
                            const copy = [...editingPackage.dayByDayItinerary];
                            copy[index].title = e.target.value;
                            setEditingPackage({ ...editingPackage, dayByDayItinerary: copy });
                          }}
                          placeholder="Day Title"
                          className="flex-1 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const copy = editingPackage.dayByDayItinerary
                              .filter((_, i) => i !== index)
                              .map((item, i) => ({ ...item, day: i + 1 }));
                            setEditingPackage({ ...editingPackage, dayByDayItinerary: copy });
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={d.description}
                        onChange={(e) => {
                          const copy = [...editingPackage.dayByDayItinerary];
                          copy[index].description = e.target.value;
                          setEditingPackage({ ...editingPackage, dayByDayItinerary: copy });
                        }}
                        placeholder="Day plan description..."
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    Inclusions (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={editingPackage.inclusions.join('\n')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      setEditingPackage({ ...editingPackage, inclusions: lines });
                    }}
                    placeholder="Hotel accommodation&#10;Daily breakfast buffet&#10;Private transfers"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 mb-1">
                    Exclusions (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={editingPackage.exclusions.join('\n')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      setEditingPackage({ ...editingPackage, exclusions: lines });
                    }}
                    placeholder="Airfare&#10;Visa fees&#10;Personal expenses"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!editingPackage.name.trim()) {
                    alert('Please enter a package name');
                    return;
                  }
                  if (isCreatingNewPackage) {
                    addPackage(editingPackage);
                    showToast(`Created package "${editingPackage.name}"`);
                  } else {
                    updatePackage(editingPackage.id, editingPackage);
                    showToast(`Updated package "${editingPackage.name}"`);
                  }
                  setEditingPackage(null);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Package Live</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
