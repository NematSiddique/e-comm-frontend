# E-commerce Frontend

A modern, responsive e-commerce application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**Deployed URL:** [Your Vercel Deployment URL Here]

## 📋 Features

### ✅ Implemented Features

- **Home Page (/) - Product Listing**
  - Responsive product grid (3 columns desktop, 2 tablet, 1 mobile)
  - Category filtering with radio buttons
  - Price range slider filter
  - Search functionality with real-time filtering
  - URL-based filters (e.g., `?category=electronics&price=0-1000`)
  - Product cards with image, title, price, rating, and "Add to Cart" button

- **Product Detail Page (/product/[id])**
  - Dynamic routing with Next.js
  - Large product image display
  - Product details (title, price, description, category)
  - Star ratings display
  - Quantity selector
  - Add to cart functionality

- **Cart Page (/cart)**
  - Cart items with quantity controls
  - Remove item functionality
  - Price calculations and summary
  - Persistent cart state using localStorage
  - Empty cart state with call-to-action

- **Additional Features**
  - Client-side state management with Zustand
  - Persistent cart state in localStorage
  - Responsive design matching the provided mockup
  - Search filtering with string matching
  - Category and price filtering
  - Clean, modern UI with Tailwind CSS

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/whatbytes-ecommerce.git
cd whatbytes-ecommerce
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
whatbytes-ecommerce/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation header with search
│   ├── Sidebar.tsx      # Filter sidebar
│   ├── ProductCard.tsx  # Product card component
│   └── Footer.tsx       # Page footer
├── data/                # Mock data
│   └── products.ts      # Product data
├── pages/               # Next.js pages
│   ├── index.tsx        # Home page
│   ├── cart.tsx         # Shopping cart page
│   ├── product/         # Product detail pages
│   │   └── [id].tsx     # Dynamic product page
│   └── _app.tsx         # App configuration
├── store/               # State management
│   └── cartStore.ts     # Cart state with Zustand
├── styles/              # Global styles
│   └── globals.css      # Tailwind CSS imports
├── types/               # TypeScript type definitions
│   └── index.ts         # Interface definitions
└── README.md           # Project documentation
```

## 🎯 Key Features Implementation

### Filtering Logic
- **Category Filter:** Radio button selection with "All" option
- **Price Filter:** Range slider with real-time updates
- **Search Filter:** Text input with case-insensitive matching
- **URL Integration:** Filters reflected in URL parameters for bookmarking

### State Management
- **Cart State:** Persistent shopping cart using Zustand + localStorage
- **Filter State:** URL-synchronized filters for better UX
- **Product Data:** Mock data structure matching real e-commerce needs

### Responsive Design
- **Mobile-First:** Optimized for mobile devices
- **Breakpoints:** 
  - Mobile: Single column grid
  - Tablet: Two column grid  
  - Desktop: Three column grid + sidebar

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

## 🎨 Design Implementation

The UI closely matches the provided mockup with:
- Blue color scheme (#1d4ed8, #1e40af, #1e3a8a)
- Consistent spacing and typography
- Hover states and transitions
- Accessible form controls
- Professional product card design

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 🔮 Future Enhancements

- User authentication
- Payment integration
- Product reviews and ratings
- Wishlist functionality
- Order history
- Admin panel for product management

## 📄 License

This project is created for the WhatBytes frontend assignment.

---

Built with ❤️ using Next.js and Tailwind CSS
