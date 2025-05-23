import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import products from '../data/products';
import Link from 'next/link';

// Define a type for your filters
type Filters = {
  category: string;
  priceRange: [number, number];
  searchQuery: string; // <-- not optional
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    priceRange: [0, 1000],
    searchQuery: '',
  });

  // Add the type annotation here
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredProducts = products
    .filter(product =>
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
              <div key={product.id} className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                <img src={product.image} alt={product.title} className="w-40 h-40 object-contain mb-4" />
                <h2 className="text-lg font-semibold text-center">{product.title}</h2>
                <p className="text-gray-700 font-bold mb-2">${product.price}</p>
                <Link href={`/product/${product.id}`}>
                  <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-2">
                    Add to Cart
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}