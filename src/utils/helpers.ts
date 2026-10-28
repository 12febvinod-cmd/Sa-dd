import { Product } from '../types';

/**
 * Formats a numeric price into Indian Rupee format (e.g. ₹1,499)
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

/**
 * Strips whitespace, dashes, and formats to full international WhatsApp number
 */
export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return '91' + digits;
  }
  return digits;
}

/**
 * Generates an official WhatsApp click-to-chat URL
 */
export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Generates a prefilled enquiry message for a specific product
 */
export function generateProductEnquiry(
  productName: string,
  price?: number,
  size?: string,
  color?: string
): string {
  let msg = `Hello ShopAtDoor, I would like to enquire about the "${productName.trim()}"`;
  if (typeof price === 'number') {
    msg += ` priced at ${formatCurrency(price)}`;
  }
  if (size) {
    msg += ` (Size: ${size})`;
  }
  if (color) {
    msg += ` (Colour: ${color})`;
  }
  msg += `. Is it available at your store at Rajpur Crossing, Bhadohi?`;
  return msg;
}

/**
 * Filters and searches products by category and query
 */
export function filterProducts(
  products: Product[],
  category: string,
  searchQuery: string,
  sortBy: 'featured' | 'price-asc' | 'price-desc' = 'featured'
): Product[] {
  let filtered = [...products];

  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.colors.some((c) => c.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // featured first
    filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return filtered;
}

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: {
  name: string;
  phone: string;
  message: string;
}): {
  isValid: boolean;
  errors: { name?: string; phone?: string; message?: string };
} {
  const errors: { name?: string; phone?: string; message?: string } = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (minimum 2 characters).';
  }

  const cleanPhone = data.phone.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length !== 10) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Please provide enquiry details (minimum 5 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
