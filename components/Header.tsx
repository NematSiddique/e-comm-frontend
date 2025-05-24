import { Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(useCartStore.getState().getTotalItems());
    const unsub = useCartStore.subscribe(
      state => setTotalItems(state.getTotalItems())
    );
    return unsub;
  }, []);

  return (
    <header className="bg-baseblue text-white relative">
      {/* Logo pinned absolutely to the left edge */}
      <div className="absolute left-0 top-0 h-full flex items-center px-4 lg:px-8">
        <Link href="/" className="p-1 text-2xl font-bold whitespace-nowrap">
          Logo
        </Link>
      </div>

      {/* Main container: centered with max width, padding adjusted */}
      <div className="max-w-screen-xl w-full mx-auto px-4 flex items-center justify-between p-4 gap-4 flex-wrap">
        {/* Spacer div to take space on the left so search bar stays centered */}
        <div className="w-24 lg:w-32" />

        {/* Search bar (flex-grow, max width, centered) */}
        <div className="flex-1 max-w-md mx-4 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-lightblue bg-baseblue text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Cart & User (right side) */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <Link href="/cart" className="relative">
            <button
              type="button"
              className="bg-footerblue hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-lg flex items-center space-x-2 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
          <User className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
