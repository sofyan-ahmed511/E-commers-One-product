'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useCartStore } from '@/lib/store';
import { formatPrice, cn } from '@/lib/utils';
import { MagneticButton } from '@/components/magnetic-button';
import { Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  hoverImage?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      });
      setIsAdding(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-32 px-6 md:px-12 overflow-hidden w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] w-full bg-muted rounded-2xl overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {product.hoverImage && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-[3/4] w-full bg-muted rounded-2xl overflow-hidden"
              >
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col lg:sticky lg:top-32 h-fit">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
              >
                {product.name}
              </motion.h1>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-2xl font-medium mb-8"
              >
                {formatPrice(product.price)}
              </motion.p>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-muted-foreground text-lg leading-relaxed mb-12"
              >
                {product.description}
              </motion.p>

              {/* Color Selection */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="mb-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium uppercase tracking-widest text-sm">Color</span>
                  <span className="text-muted-foreground text-sm">{selectedColor.name}</span>
                </div>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        selectedColor.name === color.name ? "ring-2 ring-offset-2 ring-foreground" : "ring-1 ring-border hover:ring-foreground/50"
                      )}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Select color ${color.name}`}
                    >
                      {selectedColor.name === color.name && (
                        <Check className={cn("w-4 h-4", color.hex === '#111111' ? 'text-white' : 'text-black')} />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Size Selection */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="mb-12"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium uppercase tracking-widest text-sm">Size</span>
                  <button className="text-muted-foreground text-sm underline underline-offset-4 hover:text-foreground">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "py-3 rounded-lg border text-sm font-medium transition-all duration-300",
                        selectedSize === size 
                          ? "border-foreground bg-foreground text-background" 
                          : "border-border hover:border-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Add to Cart */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <MagneticButton
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={cn(
                    "w-full py-5 rounded-full font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2",
                    isAdding ? "bg-primary text-white" : "bg-foreground text-background hover:bg-primary"
                  )}
                >
                  {isAdding ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" /> Added
                  </motion.div>
                ) : (
                  "Add to Cart"
                )}
              </MagneticButton>
              
              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4 text-sm text-muted-foreground">
                <p>Free shipping on orders over $200.</p>
                <p>30-day return policy.</p>
              </div>
            </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
