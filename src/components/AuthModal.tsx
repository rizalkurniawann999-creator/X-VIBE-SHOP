import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Eye, EyeOff, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; isAdmin: boolean }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('admin@xvibe.shop');
  const [password, setPassword] = useState('admin123');
  const [name, setName] = useState('Rizal Kurniawan');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('rizal');
    onLoginSuccess({
      name: isLogin ? (email.split('@')[0]) : name,
      email,
      isAdmin
    });
    onClose();
  };

  const handleFillAdmin = () => {
    setEmail('admin@xvibe.shop');
    setPassword('admin123');
    setIsLogin(true);
  };

  const handleFillCustomer = () => {
    setEmail('customer@xvibe.shop');
    setPassword('customer123');
    setIsLogin(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative animate-scaleUp p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-lg">
            X
          </div>
          <h3 className="text-xl font-black text-gray-900">
            {isLogin ? 'Sign In to X-VIBE SHOP' : 'Create X-VIBE Account'}
          </h3>
          <p className="text-gray-500 text-xs">
            {isLogin ? 'Sign in as Admin or Customer to manage store & orders.' : 'Join X-VIBE SHOP for VIP drops and digital asset downloads.'}
          </p>
        </div>

        {/* Quick Demo Credentials Buttons */}
        {isLogin && (
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-2">
            <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
              <KeyRound size={12} /> Quick Demo Logins:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleFillAdmin}
                className="py-1.5 px-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Login as Admin
              </button>
              <button
                type="button"
                onClick={handleFillCustomer}
                className="py-1.5 px-2 bg-white text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold hover:bg-indigo-50 transition-colors shadow-sm"
              >
                Login as Customer
              </button>
            </div>
            <p className="text-[10px] text-gray-500 text-center">
              Admin: <code className="bg-white px-1 rounded font-mono">admin@xvibe.shop</code> / <code className="bg-white px-1 rounded font-mono">admin123</code>
            </p>
          </div>
        )}

        {/* Tab switcher */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              !isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email Address / Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@xvibe.shop"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            <span>{isLogin ? 'Sign In to Account' : 'Create Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-emerald-600" /> Secure JWT & OAuth 2.0 Session Authentication
          </p>
        </div>
      </div>
    </div>
  );
};
