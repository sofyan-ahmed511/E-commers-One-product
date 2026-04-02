'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CreditCard, Truck, User, Minus, Plus } from 'lucide-react';

export function CheckoutClient() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      setOrderNumber(`LUM-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderComplete(true);
      clearCart();
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-32 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Order Confirmed</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order number is <span className="font-bold text-foreground">{orderNumber}</span>. We&apos;ll email you an order confirmation with details and tracking info.
          </p>
          <Link
            href="/"
            className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-primary transition-colors"
          >
            Return to Store
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link
            href="/collections"
            className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-primary transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Form */}
          <div className="flex-grow lg:w-2/3">
            <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Cart
            </Link>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border z-0" />
              
              <div className={`relative z-10 flex flex-col items-center gap-2 ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-background border-2 ${step >= 1 ? 'border-foreground' : 'border-border'}`}>
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-background px-2">Information</span>
              </div>
              
              <div className={`relative z-10 flex flex-col items-center gap-2 ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-background border-2 ${step >= 2 ? 'border-foreground' : 'border-border'}`}>
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-background px-2">Shipping</span>
              </div>
              
              <div className={`relative z-10 flex flex-col items-center gap-2 ${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-background border-2 ${step >= 3 ? 'border-foreground' : 'border-border'}`}>
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-background px-2">Payment</span>
              </div>
            </div>

            <form onSubmit={handleNextStep}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold tracking-tighter mb-6">Contact Information</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium uppercase tracking-widest">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold tracking-tighter mb-6">Shipping Address</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="firstName" className="text-sm font-medium uppercase tracking-widest">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                            placeholder="Jane"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="lastName" className="text-sm font-medium uppercase tracking-widest">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label htmlFor="address" className="text-sm font-medium uppercase tracking-widest">Address</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                            placeholder="123 Modernist Way"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="city" className="text-sm font-medium uppercase tracking-widest">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                            placeholder="New York"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="postalCode" className="text-sm font-medium uppercase tracking-widest">Postal Code</label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            required
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold tracking-tighter mb-6">Shipping Method</h2>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-foreground rounded-lg cursor-pointer">
                        <div className="flex items-center gap-4">
                          <input type="radio" name="shipping" defaultChecked className="w-4 h-4 accent-foreground" />
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-muted-foreground">3-5 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">Free</span>
                      </label>
                      <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:border-foreground transition-colors">
                        <div className="flex items-center gap-4">
                          <input type="radio" name="shipping" className="w-4 h-4 accent-foreground" />
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-muted-foreground">1-2 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">$15.00</span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold tracking-tighter mb-6">Payment</h2>
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cardNumber" className="text-sm font-medium uppercase tracking-widest">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="expiryDate" className="text-sm font-medium uppercase tracking-widest">Expiry Date</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            required
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="cvv" className="text-sm font-medium uppercase tracking-widest">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            required
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 flex items-center justify-between pt-8 border-t border-border">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Return to previous
                  </button>
                ) : (
                  <div />
                )}
                <button
                  type="submit"
                  className="bg-foreground text-background px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-primary transition-colors"
                >
                  {step === 3 ? 'Pay Now' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-muted/50 rounded-2xl p-8 sticky top-32">
              <h3 className="text-xl font-bold tracking-tighter mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.color.name} / {item.size}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 border border-border rounded-full px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => useCartStore.getState().updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-0.5 hover:bg-muted rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-3 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => useCartStore.getState().updateQuantity(item.id, item.quantity + 1)}
                            className="p-0.5 hover:bg-muted rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at next step</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
