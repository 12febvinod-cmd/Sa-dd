import React from 'react';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#faf8f5] border-b border-[#ece5da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image / Visual Showcase */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-[#e8dfd1] bg-[#f4efe6] shadow-sm">
              <img
                src="/images/shopatdoor_frontpage_store.jpg"
                alt="ShopAtDoor Supercentre showroom in Bhadohi"
                className="w-full aspect-[4/3] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-[#1c1917]/85 backdrop-blur-md text-white text-xs rounded font-medium">
                ShopAtDoor Supercentre
              </div>
            </div>
            {/* Ambient Accent Card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-white p-5 rounded-lg border border-[#d4af37]/40 shadow-lg max-w-xs">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#8c774b]">
                Local Bhadohi Store
              </div>
              <p className="mt-1 text-xs text-[#57534e]">
                "Discover Fashion. Wear Confidence." Serving customers across Bhadohi with authentic care.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#8c774b] mb-2">
                About ShopAtDoor
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight text-balance">
                Your Local Fashion Destination in Bhadohi
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
              Located conveniently at Rajpur Crossing on Aurai Road, <strong>ShopAtDoor</strong> is dedicated to bringing stylish, comfortable, and elegant clothing directly to the people of Bhadohi and surrounding areas.
            </p>

            <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
              Whether you are looking for comfortable everyday wear, festive traditional outfits for family celebrations, or contemporary party wear, our collection is curated with an eye for fabric quality, neat finishing, and genuine value.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-md border border-[#e8dfd1]">
                <h4 className="text-sm font-semibold text-[#1c1917]">
                  Everyday & Special Occasions
                </h4>
                <p className="mt-1 text-xs text-[#78716c]">
                  Versatile outfits designed for daily comfort, work, and unforgettable family festivities.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#e8dfd1]">
                <h4 className="text-sm font-semibold text-[#1c1917]">
                  Quality & Customer Satisfaction
                </h4>
                <p className="mt-1 text-xs text-[#78716c]">
                  Careful inspection of fabric, fit, and comfort to ensure you leave with full confidence.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#e8dfd1]">
                <h4 className="text-sm font-semibold text-[#1c1917]">
                  Convenient Collection Browsing
                </h4>
                <p className="mt-1 text-xs text-[#78716c]">
                  Explore clothing online, check size availability via WhatsApp, or try them on in-store.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#e8dfd1]">
                <h4 className="text-sm font-semibold text-[#1c1917]">
                  Friendly, Personalized Service
                </h4>
                <p className="mt-1 text-xs text-[#78716c]">
                  Prompt, respectful local support dedicated to answering your fashion enquiries quickly.
                </p>
              </div>
            </div>

            {/* Store Address & Contact Quote */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#78716c]">
              <MapPin className="w-4 h-4 text-[#8c774b] shrink-0" />
              <span>{STORE_INFO.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
