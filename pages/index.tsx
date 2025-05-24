import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import products from '../data/products';
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';

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

  const addItem = useCartStore(state => state.addItem);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
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
              <div
                key={product.id}
                className="bg-white rounded-lg shadow flex flex-col justify-between h-full"
              >
                {/* Image */}
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain p-4"
                  />
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-grow p-4">
                  <Link href={`/product/${product.id}`}>
                    <h2 className="text-lg font-semibold text-left mb-2 hover:text-blue-600">
                      {product.title}
                    </h2>
                  </Link>

                  <p className="text-gray-700 font-bold text-left mb-4">
                    ${product.price}
                  </p>

                  {/* Push button to bottom */}
                  <div className="mt-auto">
                    <Link href={`/product/${product.id}`}>
                      <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-baseblue hover:bg-yellow-400 hover:text-black text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Add to Cart
                      </button>
                    </Link>
                  </div>
                </div>
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
