import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { generateWhatsAppUrl } from '../utils/helpers';

interface FooterProps {
  onOpenStoreManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStoreManager }) => {
  const defaultWhatsAppUrl = generateWhatsAppUrl(
    STORE_INFO.whatsappNumber,
    'Hello ShopAtDoor, I would like to enquire about your clothing collection.'
  );

  return (
    <footer className="bg-[#141210] text-[#e7e0d3] border-t border-[#2a2622] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#2a2622]">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                ShopAtDoor
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            </div>

            <p className="text-xs sm:text-sm text-[#a89f91] leading-relaxed">
              "{STORE_INFO.mainTagline}"
            </p>

            <p className="text-xs text-[#78716c] leading-relaxed">
              Premium clothing store located at Rajpur Crossing, Aurai Road, Bhadohi. Dedicated to quality collections, honest pricing, and friendly service.
            </p>

            <div className="pt-2">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#c49f2b] rounded-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Quick Links
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#b8afa0]">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Featured Categories
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Clothing Collections
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Store Location & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Contact Store
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-[#b8afa0]">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <div>Call Direct:</div>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="text-white hover:text-[#d4af37] font-semibold transition-colors"
                  >
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <div>WhatsApp Support:</div>
                  <span className="text-white font-medium">9651394959</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#a89f91] block">Location:</span>
                  <span className="text-white">Rajpur Crossing, Aurai Road, Bhadohi, UP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Hours & Owner Tool */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Visiting Hours
            </div>
            <div className="text-xs text-[#a89f91] space-y-1">
              <div>Monday – Sunday</div>
              <div className="text-white font-semibold">10:00 AM – 9:00 PM</div>
              <p className="pt-2 text-[11px] text-[#78716c]">
                Open 7 days a week for festive shopping and fitting trials.
              </p>
            </div>

            {onOpenStoreManager && (
              <div className="pt-4 border-t border-[#2a2622]">
                <button
                  onClick={onOpenStoreManager}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8c774b] hover:text-[#d4af37] transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Store Owner: Edit Catalogue</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Clean Unboxed Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <div>
            © {new Date().getFullYear()} {STORE_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Rajpur Crossing</span>
            <span aria-hidden="true">·</span>
            <span>Aurai Road, Bhadohi</span>
            <span aria-hidden="true">·</span>
            <span>Uttar Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
