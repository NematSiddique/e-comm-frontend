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

  const renderStars = (rating?: number, productId?: string | number) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`${productId}-full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key={`${productId}-half`} className="relative w-4 h-4 inline-block">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`${productId}-empty-${i}`}
          className="w-4 h-4 text-gray-300"
        />
      );
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

      <div className="flex flex-col flex-1 p-4 text-left">
        <div className="flex-1 text-left">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-baseblue cursor-pointer line-clamp-2 text-left">
              {product.title}
            </h3>
          </Link>

          <div className="text-left">
            <span className="text-xl font-bold text-gray-900 block text-left">
              ${product.price}
            </span>
          </div>

          {product.rating && (
            <div className="mb-3 text-left">
              <div className="flex items-center space-x-1 justify-start">
                <div className="flex items-center space-x-0.5">
                  {renderStars(product.rating, product.id)}
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  ({product.rating})
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-2 w-full text-white bg-baseblue hover:bg-yellow-400 hover:text-black font-semibold py-2 px-4 rounded-xl transition-all duration-300 self-end"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
