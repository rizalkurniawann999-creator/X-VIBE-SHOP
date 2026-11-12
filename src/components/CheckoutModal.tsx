import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, CheckCircle2, Lock, Sparkles, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'card'>('stripe');
  
  const [formData, setFormData] = useState({
    fullName: 'Rizal Kurniawan',
    email: 'rizalkurniawann999@gmail.com',
    address: 'Jl. Sudirman No. 45',
    city: 'Jakarta Selatan',
    country: 'Indonesia',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '888'
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      const orderId = 'XV-' + Math.floor(100000 + Math.random() * 900000);
      setTimeout(() => {
        onOrderSuccess(orderId);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-scaleUp my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-indigo-900 text-white p-6 flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
              <Lock size={14} /> 256-Bit SSL Secure International Checkout
            </div>
            <h2 className="text-xl font-black">X-VIBE SHOP Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'processing' && (
          <div className="p-16 text-center space-y-6">
            <Loader2 size={64} className="animate-spin text-indigo-600 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">Processing Secure Payment...</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Connecting securely with {paymentMethod === 'stripe' ? 'Stripe International Gateway' : paymentMethod === 'paypal' ? 'PayPal Checkout' : 'Secure Card Processor'}...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-16 text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Payment Successful!</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Thank you for shopping with <span className="font-bold text-indigo-600">X-VIBE SHOP</span>! Order confirmation and tracking details have been sent to your email.
            </p>
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-semibold">
              🎉 Your order is now queued for express fulfillment & digital delivery.
            </div>
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Payment Gateway Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Select International Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 font-semibold text-xs transition-all ${
                    paymentMethod === 'stripe'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard size={20} />
                  <span>Stripe (Cards)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 font-semibold text-xs transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Sparkles size={20} className="text-blue-600" />
                  <span>PayPal Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 font-semibold text-xs transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ShieldCheck size={20} className="text-emerald-600" />
                  <span>Apple / Google Pay</span>
                </button>
              </div>
            </div>

            {/* Shipping & Contact Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <span>Shipping & Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-gray-900 text-sm flex items-center justify-between">
                <span>Payment Details</span>
                <span className="text-xs text-indigo-600 font-normal">Sandbox Simulation Active</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={formData.expiry}
                    onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">CVC / CVV</label>
                  <input
                    type="text"
                    required
                    value={formData.cvc}
                    onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Total Amount</span>
                <span className="text-xl font-black text-gray-900">${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="py-3.5 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-200 transition-all flex items-center gap-2"
              >
                <ShieldCheck size={18} />
                <span>Pay ${total.toFixed(2)} Now</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
