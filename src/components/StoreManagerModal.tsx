import React, { useState } from 'react';
import { X, Plus, Trash2, RotateCcw, Save, SlidersHorizontal, Check } from 'lucide-react';
import { Product, ClothingCategory } from '../types';
import { formatCurrency } from '../utils/helpers';

interface StoreManagerModalProps {
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  onResetToDefault: () => void;
  onClose: () => void;
}

const CATEGORY_OPTIONS: ClothingCategory[] = [
  "Men's Wear",
  "Women's Wear",
  "Kids' Wear",
  "Casual Wear",
  "Traditional Wear",
  "Party Wear",
];

export const StoreManagerModal: React.FC<StoreManagerModalProps> = ({
  products,
  onSaveProducts,
  onResetToDefault,
  onClose,
}) => {
  const [items, setItems] = useState<Product[]>([...products]);
  const [activeTab, setActiveTab] = useState<'manage' | 'add'>('manage');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ClothingCategory>("Men's Wear");
  const [newPrice, setNewPrice] = useState<number>(1299);
  const [newSizes, setNewSizes] = useState('M, L, XL');
  const [newColors, setNewColors] = useState('Beige, Black, Blue');
  const [newDescription, setNewDescription] = useState('');
  const [newFabric, setNewFabric] = useState('Cotton Blend');
  const [newImageUrl, setNewImageUrl] = useState('/src/assets/images/category_mens_wear_1793098577941.jpg');

  const handleUpdatePrice = (id: string, price: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: Math.max(0, price) } : item))
    );
  };

  const handleToggleStock = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to remove this clothing item from the catalogue?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const sizesArr = newSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const colorsArr = newColors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const newProduct: Product = {
      id: 'prod-' + Date.now(),
      name: newTitle.trim(),
      category: newCategory,
      price: Number(newPrice) || 999,
      sizes: sizesArr.length > 0 ? sizesArr : ['Standard Size'],
      colors: colorsArr.length > 0 ? colorsArr : ['Standard Colour'],
      description: newDescription.trim() || `${newTitle} available at ShopAtDoor Bhadohi showroom.`,
      fabric: newFabric.trim(),
      image: newImageUrl.trim() || '/src/assets/images/hero_fashion_banner_1793098577760.jpg',
      inStock: true,
      isFeatured: false,
      isSample: false,
    };

    const updated = [newProduct, ...items];
    setItems(updated);
    onSaveProducts(updated);

    // reset fields
    setNewTitle('');
    setNewDescription('');
    setActiveTab('manage');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveAll = () => {
    onSaveProducts(items);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-manager-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-[#ece5da] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece5da] bg-[#faf8f5]">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#8c774b]" />
            <div>
              <h2 id="store-manager-title" className="text-lg font-serif font-bold text-[#1c1917]">
                ShopAtDoor Store Manager
              </h2>
              <p className="text-xs text-[#78716c]">
                Update products, prices, and stock easily. Saved automatically to your browser.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#78716c] hover:text-[#1c1917] rounded-md transition-colors"
            aria-label="Close manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 pt-4 border-b border-[#ece5da] bg-white">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('manage')}
              className={`pb-3 text-xs sm:text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'manage'
                  ? 'border-[#1c1917] text-[#1c1917]'
                  : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Current Products ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`pb-3 text-xs sm:text-sm font-medium transition-colors border-b-2 flex items-center gap-1 ${
                activeTab === 'add'
                  ? 'border-[#1c1917] text-[#1c1917]'
                  : 'border-transparent text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </button>
          </div>

          {savedSuccess && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 pb-3">
              <Check className="w-3.5 h-3.5" />
              Changes Saved!
            </span>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'manage' ? (
            <div className="space-y-4">
              <div className="text-xs text-[#78716c] flex items-center justify-between">
                <span>Edit prices or remove sample products to reflect your real shop inventory:</span>
                <button
                  onClick={() => {
                    if (confirm('Reset catalogue back to initial sample items?')) {
                      onResetToDefault();
                      onClose();
                    }
                  }}
                  className="text-[#8c774b] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Sample Catalogue</span>
                </button>
              </div>

              <div className="divide-y divide-[#f4efe6] border border-[#e8dfd1] rounded-lg overflow-hidden bg-white">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#faf8f5] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded object-cover bg-[#f4efe6] shrink-0"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#1c1917]">{item.name}</div>
                        <div className="text-[11px] text-[#8c774b]">{item.category}</div>
                        <div className="text-[10px] text-[#a8a29e]">
                          Sizes: {item.sizes.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#57534e]">₹</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleUpdatePrice(item.id, Number(e.target.value))}
                          className="w-20 px-2 py-1 text-xs border border-[#dcd3c4] rounded bg-white tabular-nums"
                          aria-label={`Price for ${item.name}`}
                        />
                      </div>

                      <button
                        onClick={() => handleToggleStock(item.id)}
                        className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                          item.inStock
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-[#a8a29e] hover:text-red-600 rounded transition-colors"
                        title="Delete product"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleAddNewProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Pure Cotton Mandarin Kurta"
                    className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ClothingCategory)}
                    className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Price in Indian Rupees (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Fabric / Material
                  </label>
                  <input
                    type="text"
                    value={newFabric}
                    onChange={(e) => setNewFabric(e.target.value)}
                    placeholder="e.g. 100% Breathable Cotton"
                    className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Available Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newSizes}
                    onChange={(e) => setNewSizes(e.target.value)}
                    placeholder="S, M, L, XL, XXL"
                    className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Available Colours (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newColors}
                    onChange={(e) => setNewColors(e.target.value)}
                    placeholder="Navy, White, Olive"
                    className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                  Product Image
                </label>
                <select
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md"
                >
                  <option value="/src/assets/images/category_mens_wear_1793098577941.jpg">
                    Men's Collection Studio Photo
                  </option>
                  <option value="/src/assets/images/category_womens_wear_1793098579079.jpg">
                    Women's Collection Studio Photo
                  </option>
                  <option value="/src/assets/images/category_traditional_wear_1793098578481.jpg">
                    Traditional & Ethnic Collection Photo
                  </option>
                  <option value="/src/assets/images/hero_fashion_banner_1793098577760.jpg">
                    Fashion Editorial Group Photo
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Details about cut, comfort, and occasion suitability..."
                  className="w-full px-3 py-1.5 text-xs border border-[#dcd3c4] rounded-md"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#c49f2b] rounded-md transition-colors"
                >
                  Add Product to ShopAtDoor Catalogue
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#ece5da] bg-[#faf8f5]">
          <span className="text-xs text-[#78716c]">
            ShopAtDoor · Bhadohi Store Inventory
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#57534e] hover:bg-[#ede5d8] rounded-md transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1c1917] hover:bg-[#332e2a] rounded-md transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
