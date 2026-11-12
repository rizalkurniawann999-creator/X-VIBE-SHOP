import React, { useState } from 'react';
import { Package, Plus, TrendingUp, DollarSign, ShoppingCart, AlertCircle, Edit3, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface InventoryAdminProps {
  products: Product[];
  onUpdateProduct: (updated: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const InventoryAdmin: React.FC<InventoryAdminProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 49.99,
    category: 'Physical',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    stock: 100,
    rating: 5.0,
    reviewsCount: 1
  });

  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStockCount = products.filter(p => p.stock < 20 && p.category !== 'Digital').length;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    const product: Product = {
      id: 'prod-' + Date.now(),
      name: newProduct.name,
      description: newProduct.description || '',
      price: Number(newProduct.price),
      category: (newProduct.category as any) || 'Physical',
      image: newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      stock: Number(newProduct.stock) || 50,
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: false
    };

    onAddProduct(product);
    setIsAdding(false);
    setNewProduct({
      name: '',
      description: '',
      price: 49.99,
      category: 'Physical',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      stock: 100
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Inventory & Store Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage physical & digital inventory, stock levels, and store performance.</p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 shadow-md transition-all flex items-center justify-center gap-2 w-fit"
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600">
            <Package size={24} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Total Products</span>
            <span className="text-2xl font-black text-gray-900">{products.length} Items</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
            <DollarSign size={24} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Inventory Value</span>
            <span className="text-2xl font-black text-gray-900">${totalInventoryValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Global Conversion</span>
            <span className="text-2xl font-black text-gray-900">4.8%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Low Stock Alerts</span>
            <span className="text-2xl font-black text-gray-900">{lowStockCount} Items</span>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-xl font-black text-gray-900">Add New Product</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. X-VIBE Mechanical Keyboard"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value as any})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Physical">Physical</option>
                    <option value="Digital">Digital</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Gadgets">Gadgets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Product description and specs..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-lg">Product Inventory List</h2>
          <span className="text-xs text-gray-400 font-medium">Real-time stock synchronization</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-gray-900 block line-clamp-1">{product.name}</span>
                      <span className="text-xs text-gray-400">{product.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    {product.category === 'Digital' ? (
                      <span className="text-emerald-600 font-semibold text-xs flex items-center gap-1">⚡ Unlimited Digital</span>
                    ) : product.stock < 20 ? (
                      <span className="text-rose-600 font-semibold text-xs flex items-center gap-1">⚠️ Low Stock ({product.stock})</span>
                    ) : (
                      <span className="text-emerald-600 font-semibold text-xs">{product.stock} units available</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => {
                        const newStock = prompt(`Update stock for ${product.name}:`, product.stock.toString());
                        if (newStock !== null) {
                          onUpdateProduct({ ...product, stock: Number(newStock) });
                        }
                      }}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 transition-colors"
                      title="Update Stock"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
