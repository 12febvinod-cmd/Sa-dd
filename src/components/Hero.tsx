import React, { useState } from 'react';
import { ArrowRight, MapPin, Sparkles, Phone, MessageCircle, ZoomIn, X } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { generateWhatsAppUrl } from '../utils/helpers';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  const defaultWhatsAppUrl = generateWhatsAppUrl(
    STORE_INFO.whatsappNumber,
    'Hello ShopAtDoor, I saw your storefront at Rajpur Crossing and would like to enquire about your clothing collection.'
  );

  return (
    <section id="hero" className="relative bg-[#181614] text-[#faf8f5] overflow-hidden border-b border-[#2e2a27]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#14b8a6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Editorial Typography & Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Storefront Verified Marker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#26221e] border border-[#3d3730] rounded-full text-xs text-[#d4af37] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>ShopAtDoor Supercentre · Rajpur Crossing, Bhadohi</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.12] text-balance">
              Upgrade Your Style with ShopAtDoor
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#dcd4c7] font-normal leading-relaxed max-w-xl">
              Explore stylish clothing for everyday wear, special occasions, and every moment that matters. Visit our Bhadohi supercentre or order directly to your door!
            </p>

            {/* Tagline Callout */}
            <div className="p-3.5 bg-[#24201c] border-l-2 border-[#d4af37] rounded-r-md max-w-lg">
              <div className="text-sm font-serif italic text-[#e6ca85]">
                "{STORE_INFO.mainTagline}"
              </div>
              <div className="text-xs text-[#a89f91] mt-0.5">
                {STORE_INFO.secondaryTagline}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#collections"
                onClick={(e) => {
                  if (onExploreClick) {
                    e.preventDefault();
                    onExploreClick();
                  }
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#e2c158] rounded-md shadow-md transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 rounded-md transition-all duration-200 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[#c5bcac] hover:text-white transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call {STORE_INFO.phone}</span>
              </a>
            </div>

            {/* Store Location Quick Note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#a89f91]">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Rajpur Crossing, Aurai Road, Bhadohi, Uttar Pradesh</span>
            </div>
          </div>

          {/* Right Column (5 cols): Storefront Front Page Photo Showcase */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="relative rounded-xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl bg-[#24201c]">
                <img
                  src="/images/shopatdoor_frontpage_store.jpg"
                  alt="ShopAtDoor Supercentre Storefront at Rajpur Crossing, Aurai Road, Bhadohi"
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover object-center group-hover:scale-102 transition-transform duration-500 cursor-pointer"
                  onClick={() => setIsPhotoZoomed(true)}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 bg-[#1c1917]/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#3d3730] flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="font-semibold text-white">ShopAtDoor Supercentre</span>
                </div>

                {/* Zoom button */}
                <button
                  onClick={() => setIsPhotoZoomed(true)}
                  className="absolute bottom-3 right-3 p-2 bg-[#1c1917]/85 hover:bg-[#1c1917] text-white rounded-md border border-[#3d3730] transition-colors flex items-center gap-1.5 text-xs font-medium"
                  aria-label="View large storefront photo"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View Full Photo</span>
                </button>

                {/* Bottom Caption Bar */}
                <div className="p-3 bg-[#1c1917] border-t border-[#2e2a27] flex items-center justify-between text-xs text-[#c5bcac]">
                  <span>Rajpur Crossing, Aurai Road</span>
                  <span className="text-[#d4af37] font-medium">Bhadohi Showroom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Lightbox Modal */}
      {isPhotoZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full bg-[#1c1917] rounded-xl overflow-hidden border border-[#3d3730] shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2e2a27]">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>ShopAtDoor Supercentre · Rajpur Crossing, Aurai Road, Bhadohi</span>
              </div>
              <button
                onClick={() => setIsPhotoZoomed(false)}
                className="p-1.5 text-[#a89f91] hover:text-white rounded-md transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 bg-black flex items-center justify-center">
              <img
                src="/images/shopatdoor_frontpage_store.jpg"
                alt="ShopAtDoor Supercentre Storefront"
                className="max-h-[75vh] w-auto object-contain rounded"
              />
            </div>
            <div className="p-4 bg-[#181614] text-xs text-[#a89f91] flex items-center justify-between">
              <span>Visit us: Monday to Sunday, 10:00 AM – 9:00 PM</span>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="text-[#d4af37] font-medium hover:underline"
              >
                Call: {STORE_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
