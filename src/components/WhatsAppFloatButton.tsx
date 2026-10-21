import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

export const WhatsAppFloatButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Pop-up bubble prompt */}
      {showTooltip && (
        <div className="mb-2 bg-white text-navy-950 text-xs px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <span>Need trip ideas or quotes? <strong>Chat with us on WhatsApp</strong></span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getGeneralEnquiryUrl('Floating WhatsApp Button')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Sanzar Tourz"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 stroke-[2.2]" />
      </a>
    </div>
  );
};
