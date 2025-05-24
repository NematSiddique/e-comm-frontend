// import { Star } from 'lucide-react';
// import Link from 'next/link';
// import type { Product } from '../types';
// import { useCartStore } from '../store/cartStore';

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const addItem = useCartStore(state => state.addItem);

//   const handleAddToCart = () => {
//     addItem(product);
//   };

//   const renderStars = (rating?: number) => {
//     if (!rating) return null;

//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }

//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
//     }

//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
//     }

//     return stars;
//   };

//   return (
//     <div className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full h-full">
//       <Link href={`/product/${product.id}`}>
//         <div className="aspect-square overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
//           />
//         </div>
//       </Link>

//       {/* Content wrapper: fill remaining height and push button to bottom */}
//       <div className="flex flex-col justify-between p-4 flex-1">
//         <div>
//           <Link href={`/product/${product.id}`}>
//             <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
//               {product.title}
//             </h3>
//           </Link>

//           <div className="flex items-center justify-between mb-3">
//             <span className="text-xl font-bold text-gray-900">
//               ${product.price}
//             </span>
//             {product.rating && (
//               <div className="flex items-center space-x-0.5">
//                 {renderStars(product.rating)}
//               </div>
//             )}
//           </div>

//           {product.description && (
//             <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//               {product.description}
//             </p>
//           )}

//           {product.category && (
//             <p className="text-sm text-gray-500 mb-3">
//               Category: {product.category}
//             </p>
//           )}
//         </div>

//         {/* Always pinned at bottom */}
//         <button
//           type="button"
//           onClick={handleAddToCart}
//           className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 mt-4"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

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

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </Link>

      {/* Content Body with full height split */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.rating && (
              <div className="flex items-center space-x-0.5">
                {renderStars(product.rating)}
              </div>
            )}
          </div>

          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {product.category && (
            <p className="text-sm text-gray-500 mb-3">
              Category: {product.category}
            </p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
