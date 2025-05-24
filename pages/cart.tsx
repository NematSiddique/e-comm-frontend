import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const [searchQuery, setSearchQuery] = useState('');
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Shopping Cart - WhatBytes E-commerce</title>
        </Head>

        <div className="min-h-screen bg-gray-50">
          <Header 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
          
          <main className="container mx-auto px-4 py-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-6">Add some products to your cart to get started!</p>
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg inline-block">
                Continue Shopping
              </Link>
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
      />
        
        <main className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-baseblue hover:text-footerblue mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center justify-between w-full flex-wrap gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-24 h-24">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-[150px]">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-baseblue cursor-pointer">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">{item.category}</p>
                      <p className="text-xl font-bold text-baseblue mt-2">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        title="Decrease quantity"
                        aria-label="Decrease quantity"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        title="Increase quantity"
                        aria-label="Increase quantity"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right min-w-[80px]">
                      <p className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        title="Remove item"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 mt-2"
                      >
                        <Trash2 className="w-5 h-5" aria-hidden="true" />
                        <span className="sr-only">Remove item</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-6 mt-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Subtotal:</span>
              <span className="text-lg">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Shipping:</span>
              <span className="text-lg">Free</span>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold text-baseblue">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                className="w-full bg-baseblue hover:bg-yellow-400 hover:text-black text-white font-semibold py-2 px-6 rounded-xl text-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}