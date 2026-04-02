'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <ShoppingBag className="w-16 h-16 mb-4 stroke-[1]" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm mt-2">Looks like you haven&apos;t added anything yet.</p>
                  <button 
                    onClick={closeCart}
                    className="mt-8 px-6 py-3 border border-foreground text-sm font-medium uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    className="flex gap-4"
                  >
                    <div className="relative w-24 h-32 bg-muted rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-grow py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link href={`/product/${item.productId}`} onClick={closeCart} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.color.name} / {item.size}
                        </p>
                        <p className="font-medium mt-2">{formatPrice(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 border border-border w-fit rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-background">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium">Subtotal</span>
                  <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link 
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-foreground text-background py-4 flex items-center justify-center gap-2 font-medium uppercase tracking-widest hover:bg-primary transition-colors group"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
