import { Star } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </Link>

      {/* Content Container - flex column with space between to push button to bottom */}
      <div className="flex flex-col flex-1 p-4 text-left">
        {/* Top Content */}
        <div className="flex-1 text-left">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer line-clamp-2 text-left">
              {product.title}
            </h3>
          </Link>

          {/* Price - Left Aligned */}
          <div className="mb-3 text-left">
            <span className="text-xl font-bold text-gray-900 block text-left">
              ${product.price}
            </span>
          </div>

          {/* Rating - Left Aligned */}
          {product.rating && (
            <div className="mb-3 text-left">
              <div className="flex items-center space-x-1 justify-start">
                <div className="flex items-center space-x-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  ({product.rating})
                </span>
              </div>
            </div>
          )}

          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 text-left">
              {product.description}
            </p>
          )}

          {product.category && (
            <p className="text-sm text-gray-500 text-left">
              Category: {product.category}
            </p>
          )}
        </div>

        {/* Button fixed at bottom */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 w-full bg-yellow-400 hover:bg-green-400 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 self-end"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}