import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  cleanPhoneNumber,
  generateWhatsAppUrl,
  generateProductEnquiry,
  filterProducts,
  validateContactForm,
} from './helpers';
import { Product } from '../types';

test('formatCurrency handles positive integers and fallback', () => {
  assert.equal(formatCurrency(1499), '₹1,499');
  assert.equal(formatCurrency(0), '₹0');
  assert.equal(formatCurrency(24999), '₹24,999');
});

test('cleanPhoneNumber formats 10-digit Indian numbers with 91 country code', () => {
  assert.equal(cleanPhoneNumber('9651394959'), '919651394959');
  assert.equal(cleanPhoneNumber('+91 96513-94959'), '919651394959');
  assert.equal(cleanPhoneNumber('919651394959'), '919651394959');
});

test('generateWhatsAppUrl builds valid wa.me link with encoded message', () => {
  const url = generateWhatsAppUrl('9651394959', 'Hello ShopAtDoor');
  assert.ok(url.startsWith('https://wa.me/919651394959?text=Hello%20ShopAtDoor'));
});

test('generateProductEnquiry generates comprehensive product enquiry text', () => {
  const msg = generateProductEnquiry('Embroidered Silk Kurta', 2499, 'XL', 'Beige');
  assert.ok(msg.includes('Embroidered Silk Kurta'));
  assert.ok(msg.includes('₹2,499'));
  assert.ok(msg.includes('XL'));
  assert.ok(msg.includes('Beige'));
  assert.ok(msg.includes('Rajpur Crossing, Bhadohi'));
});

test('filterProducts filters correctly by category and query', () => {
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Festive Kurta Pajama Set',
      category: 'Traditional Wear',
      price: 2499,
      sizes: ['M', 'L'],
      colors: ['Maroon', 'Beige'],
      description: 'Handcrafted festive attire for wedding and celebrations.',
      image: '',
      inStock: true,
      isFeatured: true,
      isSample: true,
    },
    {
      id: '2',
      name: 'Slim Fit Cotton Casual Shirt',
      category: "Men's Wear",
      price: 899,
      sizes: ['S', 'M', 'L'],
      colors: ['Sky Blue', 'White'],
      description: 'Breathable pure cotton shirt for daily office and outings.',
      image: '',
      inStock: true,
      isFeatured: false,
      isSample: true,
    },
    {
      id: '3',
      name: 'Designer Anarkali Suit',
      category: "Women's Wear",
      price: 3299,
      sizes: ['M', 'L', 'XL'],
      colors: ['Emerald Green', 'Wine'],
      description: 'Elegant flair anarkali suit with delicate zari embroidery.',
      image: '',
      inStock: true,
      isFeatured: true,
      isSample: true,
    },
  ];

  // Category filter
  const traditional = filterProducts(sampleProducts, 'Traditional Wear', '');
  assert.equal(traditional.length, 1);
  assert.equal(traditional[0].id, '1');

  // Search query filter
  const searchCotton = filterProducts(sampleProducts, 'All', 'cotton');
  assert.equal(searchCotton.length, 1);
  assert.equal(searchCotton[0].id, '2');

  // Sort by price ascending
  const priceAsc = filterProducts(sampleProducts, 'All', '', 'price-asc');
  assert.equal(priceAsc[0].price, 899);
  assert.equal(priceAsc[2].price, 3299);
});

test('validateContactForm checks name, 10-digit mobile, and message', () => {
  const invalid = validateContactForm({ name: '', phone: '123', message: 'hi' });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Ramesh Sharma',
    phone: '9651394959',
    message: 'I would like to visit the shop at Rajpur Crossing for wedding shopping.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
