import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, Settings, Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentView: 'shop' | 'admin';
  onViewChange: (view: 'shop' | 'admin') => void;
  currentUser: { name: string; email: string; isAdmin: boolean } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currentView,
  onViewChange,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories: Category[] = ['All', 'Physical', 'Digital', 'Apparel', 'Gadgets'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top Banner */}
      <div className="bg-indigo-900 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-yellow-400 animate-pulse" />
        <span>Free Worldwide Shipping on Orders Over $75 • Instant Digital Delivery for Digital Assets</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { onViewChange('shop'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-indigo-700 transition-all">
                X
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-gray-900">X-VIBE</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-600">Global Store</span>
              </div>
            </button>
          </div>

          {/* Search bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search premium physical & digital products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {currentUser?.isAdmin && (
              <button
                onClick={() => onViewChange(currentView === 'shop' ? 'admin' : 'shop')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'admin'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings size={15} />
                <span>{currentView === 'shop' ? 'Inventory Admin' : 'Back to Shop'}</span>
              </button>
            )}

            {/* Auth Button */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-gray-900 leading-tight">{currentUser.name}</span>
                  <span className="block text-[10px] text-indigo-600 font-medium">{currentUser.isAdmin ? 'Store Admin' : 'VIP Member'}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="ml-2 p-1 text-gray-400 hover:text-rose-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all"
              >
                <User size={15} />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Categories Navbar */}
        {currentView === 'shop' && (
          <div className="hidden md:flex items-center justify-between pb-4 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck size={16} className="text-emerald-600" /> Secure SSL Checkout
              </span>
              <span>⚡ Stripe & PayPal Protected</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase px-2">Categories</p>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === cat
                    ? 'bg-indigo-50 text-indigo-600 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                onViewChange(currentView === 'shop' ? 'admin' : 'shop');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-200"
            >
              <Settings size={16} />
              <span>{currentView === 'shop' ? 'Inventory Admin Dashboard' : 'Back to Shop'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
