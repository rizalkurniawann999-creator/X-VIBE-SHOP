export type Category = 'All' | 'Physical' | 'Digital' | 'Apparel' | 'Gadgets';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Physical' | 'Digital' | 'Apparel' | 'Gadgets';
  image: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'stripe' | 'paypal' | 'card';
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  createdAt: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Completed';
}
