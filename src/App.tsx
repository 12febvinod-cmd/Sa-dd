/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductCatalog } from './components/ProductCatalog';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PromotionalBanner } from './components/PromotionalBanner';
import { AboutUs } from './components/AboutUs';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductModal } from './components/ProductModal';
import { StoreManagerModal } from './components/StoreManagerModal';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, STORE_INFO } from './data/initialData';
import { CategoryInfo, ClothingCategory, Product } from './types';

const STORAGE_KEY = 'shopatdoor_products_v1';

export default function App() {
  const [categories, setCategories] = useState<CategoryInfo[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_PRODUCTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isStoreManagerOpen, setIsStoreManagerOpen] = useState(false);

  // Save changes to localStorage
  const handleSaveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    } catch {
      // ignore storage failure
    }
  };

  const handleResetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleSelectCategoryFromHeroOrCard = (categoryName: ClothingCategory) => {
    setSelectedCategory(categoryName);
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917]">
      {/* Navigation */}
      <Navbar onOpenStoreManager={() => setIsStoreManagerOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* 2. Featured Categories */}
        <FeaturedCategories
          categories={categories}
          onSelectCategory={handleSelectCategoryFromHeroOrCard}
        />

        {/* 3. Trending Collections & Product Catalogue */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenProductModal={(prod) => setSelectedProduct(prod)}
          onOpenStoreManager={() => setIsStoreManagerOpen(true)}
        />

        {/* 4. Why Choose ShopAtDoor */}
        <WhyChooseUs />

        {/* 5. Promotional Fashion Banner */}
        <PromotionalBanner onExploreClick={handleExploreClick} />

        {/* 6. About Us */}
        <AboutUs />

        {/* 7. Location & Contact */}
        <ContactAndLocation />
      </main>

      {/* Footer */}
      <Footer onOpenStoreManager={() => setIsStoreManagerOpen(true)} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Product Details & Enquiry Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Store Owner Manager Modal */}
      {isStoreManagerOpen && (
        <StoreManagerModal
          products={products}
          onSaveProducts={handleSaveProducts}
          onResetToDefault={handleResetToDefault}
          onClose={() => setIsStoreManagerOpen(false)}
        />
      )}
    </div>
  );
}
