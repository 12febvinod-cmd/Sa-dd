import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { generateWhatsAppUrl } from '../utils/helpers';

interface NavbarProps {
  onOpenStoreManager?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStoreManager }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultWhatsAppUrl = generateWhatsAppUrl(
    STORE_INFO.whatsappNumber,
    'Hello ShopAtDoor, I would like to enquire about your clothing collection.'
  );

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1c1917] text-[#e7d9c1] text-xs py-2 px-4 border-b border-[#2e2a27]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="truncate">Rajpur Crossing, Aurai Road, Bhadohi</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[#a89f91]">Store Hours: 10:00 AM – 9:00 PM</span>
            <span aria-hidden="true" className="text-[#524942]">·</span>
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="text-[#d4af37] hover:underline font-medium"
            >
              Call: {STORE_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation - Strict Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#ece5da]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#1c1917] whitespace-nowrap shrink-0 group"
          >
            <span>ShopAtDoor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] inline-block mb-1 group-hover:scale-125 transition-transform" />
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#44403c]">
            <a
              href="#hero"
              className="hover:text-[#1c1917] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Home
            </a>
            <a
              href="#categories"
              className="hover:text-[#1c1917] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Categories
            </a>
            <a
              href="#collections"
              className="hover:text-[#1c1917] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Collections
            </a>
            <a
              href="#about"
              className="hover:text-[#1c1917] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="hover:text-[#1c1917] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Location & Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Area */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1c1917] bg-[#f4efe6] border border-[#e2d7c5] rounded-md hover:bg-[#ece2d0] transition-colors whitespace-nowrap shrink-0"
              title="Call ShopAtDoor directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#1c1917]" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#c49f2b] rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="p-2 text-[#1c1917] bg-[#f4efe6] rounded-md"
              aria-label="Call Store"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1c1917] hover:bg-[#f4efe6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf8f5] border-t border-[#ece5da] px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2 text-base font-medium text-[#292524]">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#f4efe6]"
              >
                Home
              </a>
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#f4efe6]"
              >
                Featured Categories
              </a>
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#f4efe6]"
              >
                Clothing Collections
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#f4efe6]"
              >
                About ShopAtDoor
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-[#f4efe6]"
              >
                Store Location & Contact
              </a>
            </nav>

            <div className="pt-3 border-t border-[#ece5da] space-y-2">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1c1917] bg-[#d4af37] rounded-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1c1917] bg-[#f4efe6] border border-[#e2d7c5] rounded-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call {STORE_INFO.phone}</span>
              </a>

              {onOpenStoreManager && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStoreManager();
                  }}
                  className="w-full text-center text-xs text-[#78716c] hover:text-[#1c1917] pt-1"
                >
                  Store Owner: Manage Catalog
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
