import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { generateWhatsAppUrl } from '../utils/helpers';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultUrl = generateWhatsAppUrl(
    STORE_INFO.whatsappNumber,
    'Hello ShopAtDoor, I would like to enquire about your clothing collection.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Speech Bubble Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white text-[#1c1917] text-xs font-medium rounded-lg shadow-xl border border-[#ece5da] animate-bounce-subtle">
          <span>Need help choosing an outfit? Chat on WhatsApp!</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#a8a29e] hover:text-[#1c1917] p-0.5"
            aria-label="Dismiss WhatsApp hint"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={defaultUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with ShopAtDoor on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="sr-only">WhatsApp Enquiry</span>
      </a>
    </div>
  );
};
