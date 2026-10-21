import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Instagram, 
  Facebook, 
  ShieldAlert
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { createWhatsAppUrl, getGeneralEnquiryUrl } from '../utils/whatsapp';

export const ContactUs: React.FC = () => {
  const [quickName, setQuickName] = useState('');
  const [quickTopic, setQuickTopic] = useState('Tour Package Enquiry');
  const [quickMessage, setQuickMessage] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Sanzar Tourz! 👋

Name: ${quickName.trim() || 'Visitor'}
Subject: ${quickTopic}
Message: ${quickMessage.trim() || 'I would like to enquire about holiday planning.'}

Looking forward to your guidance!`;

    const url = createWhatsAppUrl(formatted);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-navy-950 mb-4">
            Contact Sanzar Tourz
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions about an upcoming holiday, wish to customize an itinerary, or need pricing for a family package? We're based in Palakkad, Kerala, and ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Cards Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary WhatsApp Card */}
            <div className="bg-gradient-to-br from-teal-700 to-teal-800 text-white rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-4">
                  <MessageCircle className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-500/30 text-teal-100 text-xs font-medium border border-teal-400/30">
                  Recommended
                </span>
              </div>
              
              <h3 className="font-serif text-xl font-bold mb-1">WhatsApp Enquiries</h3>
              <p className="text-teal-100 text-xs sm:text-sm mb-4 leading-relaxed">
                Fastest way to get in touch. Send us your requirements, questions, or ask for personalized quotations.
              </p>
              
              <a
                href={getGeneralEnquiryUrl('Contact Page Primary WhatsApp')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-teal-900 font-bold text-sm shadow-sm hover:bg-teal-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-teal-700" />
                <span>Chat on WhatsApp ({siteConfig.contact.whatsappDisplayNumber})</span>
              </a>
            </div>

            {/* Phone & Email Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500">Call Us</h4>
                  <p className="text-base font-semibold text-navy-950 mt-0.5">
                    <a href={`tel:${siteConfig.contact.phoneNumber.replace(/\s+/g, '')}`} className="hover:text-teal-700 transition-colors">
                      {siteConfig.contact.phoneNumber}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Direct phone assistance</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500">Email Address</h4>
                  <p className="text-base font-semibold text-navy-950 mt-0.5">
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-teal-700 transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">For detailed itineraries or corporate groups</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500">Location</h4>
                  <p className="text-sm font-semibold text-navy-950 mt-0.5">
                    {siteConfig.baseLocation.formattedAddress}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Palakkad, Kerala, India</p>
                </div>
              </div>
            </div>

            {/* Working Hours & Socials */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500">Business Hours</h4>
                  <p className="text-sm font-semibold text-navy-950 mt-0.5">{siteConfig.contact.workingHours}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{siteConfig.contact.workingDaysNotice}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs uppercase font-bold text-slate-500 mb-3">Connect on Social Channels</h4>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={siteConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Quick WhatsApp Inquiry Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                Send a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Type your inquiry below to instantly format and open your message in WhatsApp.
              </p>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div>
                <label htmlFor="quickName" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="quickName"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="quickTopic" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Topic / Purpose
                </label>
                <select
                  id="quickTopic"
                  value={quickTopic}
                  onChange={(e) => setQuickTopic(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                >
                  <option value="Tour Package Enquiry">Tour Package Enquiry</option>
                  <option value="Customised Trip Request">Customised Trip Request</option>
                  <option value="International Travel Questions">International Travel Questions</option>
                  <option value="India Holiday Planning">India Holiday Planning</option>
                  <option value="General Information">General Information</option>
                </select>
              </div>

              <div>
                <label htmlFor="quickMessage" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Your Message or Question
                </label>
                <textarea
                  id="quickMessage"
                  rows={5}
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  placeholder="Tell us what destination you're interested in, travel dates, or any questions you have..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Open & Send in WhatsApp</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  No sensitive personal data is recorded on this website. All messaging happens securely through end-to-end encrypted WhatsApp.
                </span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
