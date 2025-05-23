import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import products from '../data/products';
import type { FilterState, Product } from '../types';

export default function Home() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 1000],
    searchQuery: ''
  });

  // Update filters from URL params
  useEffect(() => {
    const { category, price, search } = router.query;
    
    const newFilters: Partial<FilterState> = {};
    
    if (category && typeof category === 'string') {
      newFilters.category = category;
    }
    
    if (price && typeof price === 'string') {
      const [min, max] = price.split('-').map(Number);
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        newFilters.priceRange = [min, max];
      }
    }
    
    if (search && typeof search === 'string') {
      newFilters.searchQuery = search;
    }
    
    if (Object.keys(newFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...newFilters }));
    }
  }, [router.query]);

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const query: Record<string, string> = {};
    
    if (newFilters.category !== 'All') {
      query.category = newFilters.category;
    }
    
    if (newFilters.priceRange[0] !== 0 || newFilters.priceRange[1] !== 1000) {
      query.price = `${newFilters.priceRange[0]}-${newFilters.priceRange[1]}`;
    }
    
    if (newFilters.searchQuery) {
      query.search = newFilters.searchQuery;
    }
    
    router.push({
      pathname: '/',
      query
    }, undefined, { shallow: true });
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  };

  const handleSearchChange = (searchQuery: string) => {
    handleFilterChange({ searchQuery });
  };

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Search filter
      if (filters.searchQuery && !product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  return (
    <>
      <Head>
        <title>WhatBytes E-commerce</title>
        <meta name="description" content="Modern e-commerce store built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header 
          searchQuery={filters.searchQuery} 
          onSearchChange={handleSearchChange} 
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <Sidebar 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            </aside>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Product Listing</h1>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}