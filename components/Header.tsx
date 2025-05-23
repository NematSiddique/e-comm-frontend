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
    <header className="bg-blue-700 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-400 bg-blue-600 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <button
              type="button"
              className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg flex items-center space-x-2"
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

