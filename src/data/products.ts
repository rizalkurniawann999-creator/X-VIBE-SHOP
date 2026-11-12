import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'X-VIBE Pro Wireless Earbuds',
    description: 'Active noise cancelling wireless earbuds with spatial audio and 36h battery life. IPX4 water resistant.',
    price: 129.99,
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    stock: 45,
    rating: 4.9,
    reviewsCount: 128,
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Cyberpunk Mechanical Keyboard',
    description: 'Hot-swappable wireless mechanical keyboard with RGB backlighting and custom tactile switches.',
    price: 159.00,
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    stock: 18,
    rating: 4.8,
    reviewsCount: 94,
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'Ultimate UI/UX Design System Kit (Figma)',
    description: 'Complete digital design system with 2,000+ components, auto layout 5.0, and dark mode variants.',
    price: 79.00,
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    stock: 999,
    rating: 5.0,
    reviewsCount: 310,
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'Minimalist Oversized Heavyweight Hoodie',
    description: '100% organic cotton 500GSM heavyweight hoodie with embroidered minimal X-VIBE logo.',
    price: 85.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    stock: 25,
    rating: 4.7,
    reviewsCount: 62,
    isFeatured: true
  },
  {
    id: 'prod-5',
    name: 'Cinematic Lightroom Preset Bundle (50+ Presets)',
    description: 'Professional color grading presets for desktop and mobile Lightroom. Instant digital download.',
    price: 29.99,
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
    stock: 999,
    rating: 4.9,
    reviewsCount: 215,
    isFeatured: false
  },
  {
    id: 'prod-6',
    name: 'Ergonomic Desk Mat & Wrist Rest Set',
    description: 'Water-resistant micro-weave cloth desk mat with anti-fray stitched edges and memory foam wrist rest.',
    price: 45.00,
    category: 'Physical',
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&q=80&w=800',
    stock: 50,
    rating: 4.6,
    reviewsCount: 48,
    isFeatured: false
  },
  {
    id: 'prod-7',
    name: 'X-VIBE Signature Bomber Jacket',
    description: 'Water-repellent satin bomber jacket with quilted lining and custom matte black hardware.',
    price: 145.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    rating: 4.8,
    reviewsCount: 38,
    isFeatured: true
  },
  {
    id: 'prod-8',
    name: '4K Ambient Loop Animation Pack',
    description: '10 seamless 4K abstract motion graphics loops for VJing, streaming backgrounds, and video editing.',
    price: 39.00,
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800',
    stock: 999,
    rating: 4.9,
    reviewsCount: 81,
    isFeatured: false
  }
];
