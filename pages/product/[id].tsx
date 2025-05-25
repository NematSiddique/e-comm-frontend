import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Star, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import products from '../../data/products';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore(state => state.addItem);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Create multiple images for carousel (in real app, this would come from product data)
  const productImages = [
    product.image,
    product.image, // In real app, these would be different angles/views
    product.image,
    product.image
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    router.push('/cart');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;

    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-40"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300"
        />
      );
    }

    return <>{stars}</>;
  };

  return (
    <>
      <Head>
        <title>{product.title} - E-commerce</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        
        <main className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-baseblue hover:text-darkblue mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Section with Zoom Effect */}
              <div className="flex gap-4">
                {/* Thumbnail Column */}
                {productImages.length > 1 && (
                  <div className="flex flex-col gap-2 w-16">
                    {productImages.map((image, index) => (
                      <button
                        key={`${product.id}-${image}`}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                          index === currentImageIndex
                            ? 'border-baseblue shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image Container */}
                <div className="flex-1 relative">
                  {/* Main Image with Zoom */}
                  <div 
                    ref={imageRef}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={productImages[currentImageIndex]}
                      alt={`${product.title} view ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 ease-out"
                      style={{
                        transform: isZooming ? 'scale(1.5)' : 'scale(1)',
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                      }}
                    />
                    
                    {/* Navigation Arrows */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 opacity-0 hover:opacity-100 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 opacity-0 hover:opacity-100 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                      </>
                    )}

                    {/* Zoom Indicator */}
                    {isZooming && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm pointer-events-none">
                        🔍 Hover to zoom
                      </div>
                    )}
                  </div>

                  {/* Zoom Hint */}
                  <div className="mt-2 text-center text-sm text-gray-500">
                    Hover over image to zoom
                  </div>
                </div>
              </div>

              {/* Zoomed View (Desktop Only) */}
              {isZooming && (
                <div className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl z-50 border-l border-gray-200">
                  <div className="w-full h-full relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${productImages[currentImageIndex]})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: '300%', // 3x zoom
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      Zoomed View
                    </div>
                  </div>
                </div>
              )}

              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      {renderStars(product.rating)}
                      <span className="ml-2 text-gray-600">({product.rating})</span>
                    </div>
                  )}
                  
                  <p className="text-3xl font-bold text-baseblue mb-4">
                    ${product.price}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Category</h3>
                  <span className="inline-block bg-blue-100 text-footerblue px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      title="Decrease quantity"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      title="Increase quantity"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-baseblue hover:bg-yellow-400 hover:text-black text-white font-semibold py-2 px-4 rounded-xl text-lg transition-colors"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: String(product.id) }, // Ensure id is a string
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => String(p.id) === params?.id); // Compare as string

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};