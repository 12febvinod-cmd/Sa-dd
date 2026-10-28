import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';

interface PromotionalBannerProps {
  onExploreClick?: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onExploreClick }) => {
  return (
    <section className="bg-[#1c1917] text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-[#332e2a]">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#d4af37]">
          Exclusive Store Showcase
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight text-balance">
          Your Next Favourite Outfit Awaits!
        </h2>

        <p className="text-sm sm:text-base text-[#d6cbba] max-w-xl mx-auto font-normal">
          Visit ShopAtDoor at Rajpur Crossing, Aurai Road, Bhadohi. From festive traditional wear to crisp everyday casuals, find the look that defines you.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#collections"
            onClick={(e) => {
              if (onExploreClick) {
                e.preventDefault();
                onExploreClick();
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#e2c158] rounded-md transition-colors shadow-sm"
          >
            <span>Explore Fashion</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`tel:${STORE_INFO.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-[#524942] hover:bg-white/10 rounded-md transition-colors"
          >
            <span>Call {STORE_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
