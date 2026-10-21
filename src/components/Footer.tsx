import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Phone, Mail, MessageCircle, Lock } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const { siteConfig } = useSite();
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-10 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-navy-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="w-9 h-9 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  {siteConfig.brandName}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-teal-400">
                  {siteConfig.brandSlogan}
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {siteConfig.about.shortBio}
            </p>
            <div className="pt-2">
              <a
                href={getGeneralEnquiryUrl('Footer WhatsApp Button')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 text-xs font-semibold tracking-wide transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Page Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/international-tours" className="hover:text-teal-400 transition-colors">International Tour Packages</Link>
              </li>
              <li>
                <Link to="/india-tours" className="hover:text-teal-400 transition-colors">India Tour Packages</Link>
              </li>
              <li>
                <Link to="/customised-holidays" className="hover:text-teal-400 transition-colors">Customised Holidays</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Travel Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
              Holiday Styles
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/customised-holidays" className="hover:text-teal-400 transition-colors">Bespoke Family Vacations</Link>
              </li>
              <li>
                <Link to="/customised-holidays" className="hover:text-teal-400 transition-colors">Honeymoon & Romantic Escapes</Link>
              </li>
              <li>
                <Link to="/india-tours" className="hover:text-teal-400 transition-colors">Himalayan & Hill Station Tours</Link>
              </li>
              <li>
                <Link to="/international-tours" className="hover:text-teal-400 transition-colors">Dubai & Southeast Asia Breaks</Link>
              </li>
              <li>
                <Link to="/customised-holidays" className="hover:text-teal-400 transition-colors">Tailored Group Getaways</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
              Palakkad Office & Inquiries
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>{siteConfig.baseLocation.formattedAddress}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneNumber.replace(/\s+/g, '')}`} className="hover:text-teal-400 transition-colors">
                  {siteConfig.contact.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <MessageCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <a 
                  href={getGeneralEnquiryUrl('Footer Contact Number')}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsappDisplayNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-teal-400 transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-navy-800 text-xs text-slate-400">
              <p className="font-medium text-slate-300">{siteConfig.contact.workingHours}</p>
              <p className="mt-0.5">{siteConfig.contact.workingDaysNotice}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved. Based in Palakkad, Kerala.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1">
              <span>Slogan:</span>
              <span className="text-teal-400 font-medium">{siteConfig.brandSlogan}</span>
            </div>
            <span>•</span>
            <Link
              to="/admin"
              className="text-slate-500 hover:text-teal-400 flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
