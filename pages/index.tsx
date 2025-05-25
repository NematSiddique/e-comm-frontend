import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import products from '../data/products';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

// Define a type for your filters
type Filters = {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    priceRange: [0, 1000],
    searchQuery: '',
  });

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredProducts = products.filter(product =>
    (filters.category === 'All' || product.category === filters.category) &&
    product.price >= (filters.priceRange?.[0] ?? 0) &&
    product.price <= (filters.priceRange?.[1] ?? 1000) &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f9fc]">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <Sidebar filters={filters} onFilterChange={handleFilterChange} />

        {/* Product Listing */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Product Listing</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
