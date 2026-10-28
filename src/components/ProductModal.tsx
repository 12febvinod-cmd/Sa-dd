import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Phone, Check, ShieldCheck, MapPin } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, generateWhatsAppUrl, generateProductEnquiry } from '../utils/helpers';
import { STORE_INFO } from '../data/initialData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleEnquireWhatsApp = () => {
    const message = generateProductEnquiry(
      product.name,
      product.price,
      selectedSize,
      selectedColor
    );
    const url = generateWhatsAppUrl(STORE_INFO.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#ece5da] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#78716c] hover:text-[#1c1917] bg-white/80 hover:bg-white rounded-full border border-[#ece5da] transition-colors"
          aria-label="Close product preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-[4/3] md:aspect-auto h-64 md:h-full bg-[#f4efe6]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#1c1917]/75 backdrop-blur-xs text-[11px] text-[#f4efe6] rounded font-medium">
              Sample Catalog Demo
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category */}
              <div className="text-xs uppercase tracking-wider font-semibold text-[#8c774b]">
                {product.category}
              </div>

              {/* Product Title */}
              <h2
                id="product-modal-title"
                className="mt-1 text-2xl font-serif font-bold text-[#1c1917]"
              >
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#1c1917] tabular-nums">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs text-[#78716c]">Store retail price</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-[#57534e] leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Details */}
              {product.fabric && (
                <div className="mt-3 text-xs text-[#78716c]">
                  <strong className="text-[#1c1917] font-medium">Fabric:</strong> {product.fabric}
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1.5">
                    Select Size:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-2.5 py-1 text-xs rounded border transition-all ${
                          selectedSize === size
                            ? 'bg-[#1c1917] text-white border-[#1c1917]'
                            : 'bg-white text-[#57534e] border-[#e2d7c5] hover:border-[#8c774b]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1.5">
                    Available Colours:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-2.5 py-1 text-xs rounded border transition-all ${
                          selectedColor === color
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#1c1917] font-medium'
                            : 'bg-white text-[#57534e] border-[#e2d7c5] hover:border-[#8c774b]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Location Notice */}
              <div className="mt-4 pt-3 border-t border-[#f4efe6] flex items-center gap-1.5 text-xs text-[#78716c]">
                <MapPin className="w-3.5 h-3.5 text-[#8c774b] shrink-0" />
                <span>Available for trial at Rajpur Crossing, Aurai Road, Bhadohi</span>
              </div>
            </div>

            {/* CTAs: WhatsApp Enquiry & Call */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleEnquireWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#c49f2b] rounded-md transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire on WhatsApp</span>
              </button>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-medium text-[#1c1917] bg-[#f4efe6] hover:bg-[#ede5d8] border border-[#e2d7c5] rounded-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store ({STORE_INFO.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
