import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Compass, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'International Tours', path: '/international-tours' },
    { name: 'India Tours', path: '/india-tours' },
    { name: 'Customised Holidays', path: '/customised-holidays' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Top micro bar for location and contact notice */}
      <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400"></span>
            <span>Based in <strong className="text-white font-medium">{siteConfig.baseLocation.shortLocation}</strong></span>
            <span className="text-navy-600 hidden md:inline">|</span>
            <span className="hidden md:inline italic text-slate-400">"{siteConfig.brandSlogan}"</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">WhatsApp Assistance:</span>
            <a 
              href={getGeneralEnquiryUrl('Quick Question')}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{siteConfig.contact.whatsappDisplayNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Slogan */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center text-teal-400 shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-navy-950 group-hover:text-teal-700 transition-colors">
                  {siteConfig.brandName}
                </span>
                <span className="text-[10.5px] uppercase tracking-widest font-semibold text-teal-700 -mt-1">
                  {siteConfig.brandSlogan}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-teal-700 bg-teal-50/80 font-semibold'
                        : 'text-navy-800 hover:text-teal-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* WhatsApp CTA Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getGeneralEnquiryUrl('Website Header CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm shadow-sm hover:shadow transition-all duration-200 group"
              >
                <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={getGeneralEnquiryUrl('Mobile Header Bar')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
                aria-label="WhatsApp Enquiry"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-navy-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-slate-200 shadow-xl px-5 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'text-teal-800 bg-teal-50 font-semibold'
                        : 'text-navy-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a
                href={getGeneralEnquiryUrl('Mobile Menu CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 text-white font-medium shadow-sm hover:bg-teal-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enquire on WhatsApp</span>
              </a>
              <p className="text-center text-xs text-slate-500 mt-2">
                Palakkad, Kerala • {siteConfig.contact.whatsappDisplayNumber}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

