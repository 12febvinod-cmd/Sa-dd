import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CategoryInfo, ClothingCategory } from '../types';

interface FeaturedCategoriesProps {
  categories: CategoryInfo[];
  onSelectCategory: (category: ClothingCategory) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-20 bg-[#faf8f5] border-b border-[#ece5da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#8c774b] mb-2">
              Curated Wardrobe
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
              Featured Categories
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#57534e] max-w-md">
            Handpicked fashion ranges designed to match everyday comfort and festive elegance in Bhadohi.
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-[#e8dfd1] hover:border-[#d4af37] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(cat.name);
                }
              }}
              aria-label={`View ${cat.name} Collection`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f4efe6]">
                <img
                  src={cat.image}
                  alt={`${cat.name} at ShopAtDoor Bhadohi`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to elegant neutral block if image loading fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#1c1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-[#1c1917]" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1c1917] group-hover:text-[#8c774b] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#78716c] line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f4efe6] flex items-center justify-between text-xs font-medium text-[#8c774b] group-hover:text-[#1c1917] transition-colors">
                  <span>Explore Outfits</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
