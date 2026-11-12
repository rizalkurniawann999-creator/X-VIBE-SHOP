import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Zap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-gray-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/50 border border-gray-800">
            <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Global Express Delivery</h4>
              <p className="text-gray-400 text-xs mt-0.5">Free shipping over $75 worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/50 border border-gray-800">
            <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Secure Payment Gateway</h4>
              <p className="text-gray-400 text-xs mt-0.5">Stripe & PayPal encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/50 border border-gray-800">
            <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">30-Day Money Back</h4>
              <p className="text-gray-400 text-xs mt-0.5">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/50 border border-gray-800">
            <div className="p-3 rounded-xl bg-amber-600/20 text-amber-400">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Instant Digital Delivery</h4>
              <p className="text-gray-400 text-xs mt-0.5">Access digital assets instantly</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-gray-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
                X
              </div>
              <span className="font-black text-lg tracking-tight">X-VIBE SHOP</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Global e-commerce destination for physical gadgets, independent apparel, and high-performance digital design assets.
            </p>
            <div className="text-xs text-gray-500">
              © 2026 X-VIBE SHOP Inc. All rights reserved.
            </div>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider mb-4 text-indigo-400">Shop Categories</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Physical Products & Gadgets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Digital Design Assets & UI Kits</li>
              <li className="hover:text-white cursor-pointer transition-colors">Independent Apparel & Streetwear</li>
              <li className="hover:text-white cursor-pointer transition-colors">Limited Edition Drops</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider mb-4 text-indigo-400">Customer Support</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Order Tracking & Fulfillment</li>
              <li className="hover:text-white cursor-pointer transition-colors">International Shipping Rates</li>
              <li className="hover:text-white cursor-pointer transition-colors">Returns & Refund Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy & Security Terms</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider mb-4 text-indigo-400">Stay Connected</h5>
            <p className="text-gray-400 text-xs mb-3">
              Subscribe for VIP drop announcements, secret discount codes, and digital goodies.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully to X-VIBE VIP list!'); }} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>Powered by X-VIBE Enterprise E-Commerce Engine & GitHub Integration</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Built with <Heart size={14} className="text-rose-500 fill-rose-500" /> for X-VIBE SHOP
          </p>
        </div>
      </div>
    </footer>
  );
};
