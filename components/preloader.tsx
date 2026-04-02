'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useUIStore } from '@/lib/store';

export function Preloader() {
  const isLoading = useUIStore((state) => state.isLoading);
  const setIsLoading = useUIStore((state) => state.setIsLoading);
  const setPreloaderDone = useUIStore((state) => state.setPreloaderDone);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <AnimatePresence onExitComplete={() => setPreloaderDone(true)}>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
          <div className="overflow-hidden">
            <motion.div
              layoutId="main-logo"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.6, 0.05, -0.01, 0.9] }}
              className="text-5xl md:text-8xl font-black tracking-tighter"
            >
              LUMORA<span className="text-primary">.</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
