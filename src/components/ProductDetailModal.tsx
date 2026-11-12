import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition-all"
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-gray-100 relative aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                <Star size={16} className="fill-amber-500" />
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              {product.name}
            </h2>

            <div className="text-2xl font-black text-indigo-600 mb-4">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-gray-600">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <span>100% Secure Guarantee</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <Truck size={18} className="text-indigo-600 shrink-0" />
                <span>{product.category === 'Digital' ? 'Instant Access' : 'Express Delivery'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <RefreshCw size={18} className="text-blue-600 shrink-0" />
                <span>30-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <Zap size={18} className="text-amber-500 shrink-0" />
                <span>24/7 Priority Support</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            {/* Quantity selector */}
            {product.category !== 'Digital' && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold text-gray-900 bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              <ShoppingBag size={18} />
              <span>{addedAnimation ? 'Successfully Added!' : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
