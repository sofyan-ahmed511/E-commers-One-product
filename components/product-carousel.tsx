'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  section?: string;
  image: string;
  hoverImage?: string;
}

interface ProductCarouselProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductCarousel({ title, description, products, viewAllLink }: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(Math.max(0, carouselRef.current.scrollWidth - carouselRef.current.offsetWidth));
      }
    };
    
    updateWidth();
    setTimeout(updateWidth, 500);
    
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [products]);

  const scrollLeft = () => {
    const currentX = x.get();
    const newX = Math.min(currentX + 400, 0);
    animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 });
  };

  const scrollRight = () => {
    const currentX = x.get();
    const newX = Math.max(currentX - 400, -carouselWidth);
    animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 });
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="mb-24">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-border pb-6 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {viewAllLink && (
            <Link href={viewAllLink} className="font-bold underline underline-offset-4 hover:text-primary transition-colors text-sm uppercase tracking-widest">
              View All
            </Link>
          )}
        </div>
      </div>

      <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
        <motion.div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            style={{ x }}
            className="flex gap-6 pb-8"
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px]"
              >
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
