import React, { useState } from 'react';
import { Product, CartItem, Category } from './types';
import { initialProducts } from './data/products';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InventoryAdmin } from './components/InventoryAdmin';
import { Footer } from './components/Footer';
import { Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'shop' | 'admin'>('shop');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setSuccessToast(`Added ${product.name} to cart!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleOrderSuccess = (orderId: string) => {
    setCheckoutOpen(false);
    setCart([]);
    setSuccessToast(`Order #${orderId} placed successfully! Confirmation sent.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp text-xs sm:text-sm font-semibold border border-gray-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <InventoryAdmin
            products={products}
            onUpdateProduct={(updated) => setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))}
            onAddProduct={(newProd) => setProducts(prev => [newProd, ...prev])}
            onDeleteProduct={(id) => setProducts(prev => prev.filter(p => p.id !== id))}
          />
        ) : (
          <div className="space-y-12 pb-16">
            {/* Hero Banner (Only shown on 'All' category without search) */}
            {activeCategory === 'All' && !searchQuery && (
              <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="max-w-2xl space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                      <Sparkles size={14} className="text-yellow-400" /> X-VIBE SHOP 2026 GLOBAL RELEASE
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                      Next-Gen Physical & Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Commerce.</span>
                    </h1>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                      Discover independent streetwear apparel, elite tech gadgets, and professional digital design assets. Powered by instant international checkout and 100% secure fulfillment.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                      <button
                        onClick={() => {
                          const el = document.getElementById('catalog');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 group"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                        <ShieldCheck size={18} className="text-emerald-400" />
                        <span>Stripe & PayPal Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Hero Card */}
                  <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                      <img
                        src={featuredProducts[0]?.image}
                        alt="Featured Product"
                        className="w-full h-64 object-cover rounded-2xl"
                      />
                      <div className="flex justify-between items-center px-1">
                        <div>
                          <span className="text-indigo-300 text-[11px] font-bold uppercase tracking-wider">Featured Drop</span>
                          <h3 className="font-bold text-lg text-white">{featuredProducts[0]?.name}</h3>
                        </div>
                        <span className="text-xl font-black text-emerald-400">${featuredProducts[0]?.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Catalog Section */}
            <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {activeCategory === 'All' ? 'All Products' : `${activeCategory} Collection`}
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    Showing {filteredProducts.length} high-quality products ready for dispatch & download.
                  </p>
                </div>

                {/* Category Pills (Mobile) */}
                <div className="flex sm:hidden overflow-x-auto gap-2 pb-2">
                  {(['All', 'Physical', 'Digital', 'Apparel', 'Gadgets'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                        activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <Zap size={28} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">No products found</h3>
                  <p className="text-gray-500 text-xs max-w-sm mx-auto">
                    We couldn't find any products matching your search criteria. Try a different keyword or category.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(prod) => handleAddToCart(prod, 1)}
                      onSelectProduct={(prod) => setSelectedProduct(prod)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}

export default App;
