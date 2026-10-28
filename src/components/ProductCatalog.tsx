import React, { useState } from 'react';
import { Search, MessageCircle, Eye, SlidersHorizontal, Sparkles, PlusCircle } from 'lucide-react';
import { Product, ClothingCategory } from '../types';
import { formatCurrency, generateWhatsAppUrl, generateProductEnquiry, filterProducts } from '../utils/helpers';
import { STORE_INFO } from '../data/initialData';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenProductModal: (product: Product) => void;
  onOpenStoreManager?: () => void;
}

const CATEGORY_TABS: (string)[] = [
  'All',
  "Men's Wear",
  "Women's Wear",
  "Kids' Wear",
  "Casual Wear",
  "Traditional Wear",
  "Party Wear",
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenProductModal,
  onOpenStoreManager,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = filterProducts(products, selectedCategory, searchQuery, sortBy);

  const handleWhatsAppClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const msg = generateProductEnquiry(product.name, product.price);
    const url = generateWhatsAppUrl(STORE_INFO.whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="collections" className="py-20 bg-[#f7f4ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8c774b] mb-2">
            Trending Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
            Explore Our Clothing Catalogue
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534e]">
            Browse our latest clothing collections in Bhadohi. Click on any item for sizes, colours, or direct WhatsApp enquiry.
          </p>

          {/* Sample Catalog Disclosure Banner */}
          <div className="mt-4 p-3 bg-[#e8dfd1]/60 border border-[#d6cbba] rounded-lg text-xs text-[#57534e] flex flex-wrap items-center justify-between gap-2 text-left">
            <span>
              <strong className="font-semibold text-[#1c1917]">Notice:</strong> Displaying sample catalogue items until the owner finalizes in-store inventory.
            </span>
            {onOpenStoreManager && (
              <button
                onClick={onOpenStoreManager}
                className="font-medium text-[#8c774b] hover:text-[#1c1917] underline inline-flex items-center gap-1 shrink-0"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Store Owner: Edit Catalogue</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => onSelectCategory(tab)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#1c1917] text-white shadow-sm'
                        : 'bg-white text-[#57534e] hover:bg-[#ede5d8] border border-[#e2d7c5]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a89f91]" />
                <input
                  type="text"
                  placeholder="Search outfits, kurti, shirt..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#dcd3c4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8c774b] focus:border-[#8c774b]"
                  aria-label="Search clothing items"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-white border border-[#dcd3c4] rounded-md px-2.5 py-1.5 text-[#57534e] focus:outline-none focus:ring-1 focus:ring-[#8c774b]"
                aria-label="Sort products"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-[#e8dfd1] p-8">
            <p className="text-base text-[#57534e]">No clothing items match your search or filter.</p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#8c774b] underline"
            >
              Reset filters & view all items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onOpenProductModal(product)}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-[#e8dfd1] hover:border-[#d4af37] transition-all duration-300 hover:shadow-md flex flex-col justify-between"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProductModal(product);
                  }
                }}
                aria-label={`View details for ${product.name}`}
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] w-full bg-[#f4efe6] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Sample Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#1c1917]/75 backdrop-blur-xs text-[10px] text-[#f4efe6] rounded font-medium">
                    Sample Item
                  </div>

                  {/* Quick View Button overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-white text-[#1c1917] text-xs font-medium rounded shadow flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </span>
                  </div>
                </div>

                {/* Product Metadata & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label (Unboxed text with zero-pill discipline) */}
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#8c774b]">
                      {product.category}
                    </div>

                    {/* Product Name */}
                    <h3 className="mt-1 text-sm font-semibold text-[#1c1917] line-clamp-1 group-hover:text-[#8c774b] transition-colors">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-1 text-xs text-[#78716c] line-clamp-2">
                      {product.description}
                    </p>

                    {/* Sizes preview */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mt-2 text-[11px] text-[#a8a29e] flex items-center gap-1">
                        <span>Sizes:</span>
                        <span className="text-[#57534e] font-medium">{product.sizes.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & WhatsApp Button */}
                  <div className="mt-4 pt-3 border-t border-[#f4efe6] flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-bold text-[#1c1917] tabular-nums">
                        {formatCurrency(product.price)}
                      </div>
                      <span className="text-[10px] text-[#a8a29e]">Store Price</span>
                    </div>

                    <button
                      onClick={(e) => handleWhatsAppClick(e, product)}
                      className="px-3 py-1.5 text-xs font-medium text-[#1c1917] bg-[#d4af37] hover:bg-[#c49f2b] rounded transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
                      title="Enquire on WhatsApp with product name"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
