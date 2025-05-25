import type { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    title: 'Shoes',
    price: 99,
    image: '/shoes.jpg',
    category: 'Clothing',
    description: 'Comfortable running shoes perfect for daily exercise and long-distance runs. Features breathable mesh upper and cushioned sole for maximum comfort.',
    rating: 3.8
  },
  {
    id: '2',
    title: 'Headphones',
    price: 99,
    image: '/headphones.jpg',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals.',
    rating: 4.5
  },
  {
    id: '3',
    title: 'Backpack',
    price: 129,
    image: '/backpack.jpg',
    category: 'Home',
    description: 'Durable and spacious backpack ideal for work, school, or travel. Multiple compartments for organized storage.',
    rating: 3.9
  },
  {
    id: '4',
    title: 'Smartwatch',
    price: 249,
    image: '/smartwatch.jpg',
    category: 'Electronics',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, and smartphone connectivity.',
    rating: 4.4
  },
  {
    id: '5',
    title: 'Sunglasses',
    price: 149,
    image: '/sunglasses.jpg',
    category: 'Clothing',
    description: 'Stylish sunglasses with UV protection. Perfect for outdoor activities and fashion-forward individuals.',
    rating: 4.5 
  },
  {
    id: '6',
    title: 'Camera',
    price: 499,
    image: '/camera.jpg',
    category: 'Electronics',
    description: 'Professional-grade digital camera with high-resolution sensor and advanced features for photography enthusiasts.',
    rating: 3.8 
  },
  {
    id: '7',
    title: 'T-shirt',
    price: 29,
    image: '/tshirt.jpg',
    category: 'Clothing',
    description: 'Comfortable cotton t-shirt available in various colors. Perfect for casual wear and everyday comfort.',
    rating: 4
  },
  {
    id: '8',
    title: 'Smartphone',
    price: 699,
    image: '/smartphone.jpg',
    category: 'Electronics',
    description: 'Latest smartphone with advanced camera system, fast processor, and long-lasting battery life.',
    rating: 4.5
  }
];

export default products;