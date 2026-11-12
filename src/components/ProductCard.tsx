import React from 'react';
import { Star, ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
            product.category === 'Digital' 
              ? 'bg-purple-600 text-white' 
              : product.category === 'Gadgets'
              ? 'bg-blue-600 text-white'
              : 'bg-indigo-600 text-white'
          }`}>
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 w-fit">
              <Zap size={10} /> Hot
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-full bg-white/95 backdrop-blur text-gray-900 py-2.5 px-4 rounded-xl font-semibold text-xs shadow-md hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <Eye size={15} /> Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
              <Star size={14} className="fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              {product.category === 'Digital' ? '⚡ Instant Download' : `${product.stock} in stock`}
            </span>
          </div>

          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-bold text-gray-900 text-base line-clamp-1 hover:text-indigo-600 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">Price</span>
            <span className="text-lg font-black text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-semibold text-xs hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm hover:shadow"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
