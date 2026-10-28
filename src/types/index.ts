export type ClothingCategory =
  | "Men's Wear"
  | "Women's Wear"
  | "Kids' Wear"
  | "Casual Wear"
  | "Traditional Wear"
  | "Party Wear";

export interface Product {
  id: string;
  name: string;
  category: ClothingCategory;
  price: number;
  originalPrice?: number;
  sizes: string[];
  colors: string[];
  description: string;
  image: string;
  inStock: boolean;
  isFeatured?: boolean;
  fabric?: string;
  isSample: boolean;
}

export interface CategoryInfo {
  id: string;
  name: ClothingCategory;
  tagline: string;
  description: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export interface StoreInfo {
  name: string;
  category: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  mainTagline: string;
  secondaryTagline: string;
  googleMapsUrl: string;
}
