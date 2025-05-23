import { useState } from 'react';
import type { FilterState } from '../types';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export default function Sidebar({ filters, onFilterChange }: SidebarProps) {
  const categories = ['All', 'Electronics', 'Clothing', 'Home'];
  const [CategoryPrice, setCategoryPrice] = useState(filters.priceRange[1].toString());

  // Handlers for the main Filters section
  const handleCategoryChange = (category: string) => {
    onFilterChange({ category });
  };
  const handlePriceChange = (value: number, index: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange];
    newPriceRange[index] = value;
    onFilterChange({ priceRange: newPriceRange });
  };

  // Handlers for the Category section (you can connect these to a different filter state if needed)
  const handleCategoryCategoryChange = (category: string) => {
    onFilterChange({ category });
  };
  const handleCategoryPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryPrice(value);

    if (value === '') {
      // If empty, set to a high max price (or don't update filter)
      onFilterChange({ priceRange: [filters.priceRange[0], 1000] });
    } else {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        onFilterChange({ priceRange: [filters.priceRange[0], num] });
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-64">
      {/* Filters Section */}
      <div className="bg-blue-700 text-white p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Category</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-blue-300 bg-transparent border-2 border-white focus:ring-blue-300 focus:ring-2"
                />
                <span className="ml-3">{category}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Price Slider */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-4">Price</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
            className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer slider"
            title="Select maximum price"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>{filters.priceRange[0]}</span>
            <span>{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="bg-white text-blue-900 p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Category</h3>
        {/* Category */}
        <div className="mb-6">
          {categories.map((category) => (
            <label key={`Category-${category}`} className="flex items-center cursor-pointer mb-2">
              <input
                type="radio"
                name="Category-category"
                value={category}
                checked={filters.category === category}
                onChange={() => handleCategoryCategoryChange(category)}
                className="w-4 h-4 text-blue-600 bg-transparent border-2 border-blue-600 focus:ring-blue-300 focus:ring-2"
              />
              <span className="ml-3">{category}</span>
            </label>
          ))}
        </div>
        {/* Price Input */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Price</h3>
          <input
            type="number"
            value={CategoryPrice}
            onChange={handleCategoryPriceChange}
            className="w-full px-3 py-2 bg-white border border-blue-400 rounded text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Max price"
            min={0}
          />
        </div>
      </div>
    </div>
  );
}