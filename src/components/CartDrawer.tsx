import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slideLeft">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-indigo-600" size={22} />
              <h2 className="text-lg font-black text-gray-900">Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Your cart is empty</h3>
                <p className="text-gray-500 text-xs max-w-xs mx-auto">
                  Explore our premium physical and digital products and add your favorites to cart!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 relative group">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="text-xs text-indigo-600 font-semibold">${item.product.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-sm text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-black text-gray-900">
                  <span>Total</span>
                  <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Protected by Stripe & PayPal Global Encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
