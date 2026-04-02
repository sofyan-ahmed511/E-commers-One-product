'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import navigationData from '@/data/navigation.json';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalItems } = useCartStore();
  const isLoading = useUIStore((state) => state.isLoading);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isDarkHero = ['/', '/about', '/collections', '/contact'].includes(pathname);
  const isTransparent = !isScrolled && isDarkHero && !isMobileMenuOpen;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={cn(
          "flex items-center justify-between px-6 md:px-8 transition-all duration-300 rounded-full py-3 w-[95%] max-w-6xl border transform-gpu will-change-transform",
          isTransparent 
            ? "bg-transparent border-white/30 text-white" 
            : "bg-white/80 backdrop-blur-md border-border text-foreground shadow-sm"
        )}>
          {/* Logo */}
          <Link href="/" className="z-50 relative flex items-center min-w-[120px]">
            {!isLoading && (
              <motion.div 
                layoutId="main-logo" 
                className="text-2xl font-bold tracking-tighter"
                transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
              >
                LUMORA<span className={isTransparent ? "text-white" : "text-primary"}>.</span>
              </motion.div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium tracking-wide uppercase group overflow-hidden"
              >
                <span className={cn(
                  "relative z-10 transition-colors duration-300",
                  isTransparent ? "group-hover:text-white/70" : "group-hover:text-primary"
                )}>
                  {item.label}
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[2px]",
                      isTransparent ? "bg-white" : "bg-primary"
                    )}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={cn(
                  "absolute left-0 bottom-0 w-full h-[1px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
                  isTransparent ? "bg-white" : "bg-primary"
                )} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 z-50 relative">
            <button
              onClick={openCart}
              className="relative p-2 group flex items-center justify-center"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={cn(
                      "absolute top-0 right-0 w-4 h-4 text-[10px] font-bold flex items-center justify-center rounded-full",
                      isTransparent ? "bg-white text-primary" : "bg-primary text-white"
                    )}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background pt-32 px-6 pb-12 flex flex-col text-foreground"
          >
            <nav className="flex flex-col gap-8 text-4xl font-bold tracking-tighter">
              {navigationData.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "hover:text-primary transition-colors",
                      pathname === item.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a href="#" className="text-sm font-medium hover:text-primary">Instagram</a>
                <a href="#" className="text-sm font-medium hover:text-primary">Twitter</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
