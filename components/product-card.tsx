'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { formatPrice } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    hoverImage?: string;
    category: string;
  };
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-4"
    >
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-muted rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            fill
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Button (Desktop) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <div className="glass px-6 py-2 rounded-full text-sm font-medium text-foreground flex items-center gap-2">
            View Details <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{product.category}</p>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{product.name}</h3>
          </Link>
        </div>
        <span className="font-medium">{formatPrice(product.price)}</span>
      </div>
    </motion.div>
  );
}
