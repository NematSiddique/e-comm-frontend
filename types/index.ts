export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
}