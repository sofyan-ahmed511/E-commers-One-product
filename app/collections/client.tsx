'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { MagneticButton } from '@/components/magnetic-button';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProductCarousel } from '@/components/product-carousel';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  section?: string;
  image: string;
  hoverImage?: string;
}

const summaryItems = [
  {
    id: 1,
    tag: "The Outerwear Edit",
    title: "Aero Shell",
    description: "A pinnacle of modern outerwear featuring seamless, water-resistant construction and a minimalist silhouette.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    buttonText: "Shop Jackets",
    buttonColor: "bg-[#111111]",
    buttonHover: "hover:bg-[#333333]"
  },
  {
    id: 2,
    tag: "Womenswear",
    title: "Apex Trench",
    description: "An architectural approach to the classic trench. The Apex features exaggerated lapels and a dramatic sweeping length.",
    image: "https://images.unsplash.com/photo-1618354691714-7d92150909db?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    buttonText: "Shop Women",
    buttonColor: "bg-[#C19A6B]",
    buttonHover: "hover:bg-[#A38259]"
  },
  {
    id: 3,
    tag: "Activewear",
    title: "Dynamic Polo",
    description: "Dynamic and breathable polo shirts designed for active lifestyles, providing comfort without compromising on style.",
    image: "https://images.unsplash.com/photo-1745834311215-65e392d2e5ec?w=1400&auto=format&fit=crop&q=60",
    buttonText: "Shop Active",
    buttonColor: "bg-[#FF7F50]",
    buttonHover: "hover:bg-[#E67348]"
  }
];

export function CollectionsClient({ products }: { products: Product[] }) {
  const menProducts = products.filter(p => p.section === 'Men');
  const womenProducts = products.filter(p => p.section === 'Women');
  const childrenProducts = products.filter(p => p.section === 'Children');
  const offerProducts = products.filter(p => p.price < 150); // Example for offers
  const newArrivals = products.slice(-6).reverse(); // Example for new arrivals
  const essentials = products.filter(p => p.price < 100); // Example for essentials

  const [currentSummary, setCurrentSummary] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSummary((prev) => (prev + 1) % summaryItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSummary = () => setCurrentSummary((prev) => (prev + 1) % summaryItems.length);
  const prevSummary = () => setCurrentSummary((prev) => (prev - 1 + summaryItems.length) % summaryItems.length);

  return (
    <div className="min-h-screen bg-background overflow-hidden w-full">
      <section className="relative w-full h-[40svh] min-h-[400px] flex items-center px-6 md:px-12 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center brightness-[0.3]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=3270&auto=format&fit=crop")' }}
        />
        <div className="container mx-auto relative z-10 pt-32 md:pt-40">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white uppercase"
            >
              Collections
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-white/80 text-lg md:text-xl max-w-xl text-balance"
            >
              Explore our full range of ultra-modern, minimalist clothing for Men, Women, and Children.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Summary Section (Carousel) */}
      <section className="py-24 px-6 md:px-12 bg-background relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] -mt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] bg-[#F4F4F4] min-h-[600px] mb-24">
            <div className="p-12 md:p-24 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSummary}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-2">
                    {summaryItems[currentSummary].tag}
                  </p>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
                    {summaryItems[currentSummary].title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-10 max-w-md">
                    {summaryItems[currentSummary].description}
                  </p>
                  <div>
                    <MagneticButton className={`${summaryItems[currentSummary].buttonColor} text-white px-8 py-4 rounded-full font-medium ${summaryItems[currentSummary].buttonHover} transition-colors w-fit`}>
                      {summaryItems[currentSummary].buttonText}
                    </MagneticButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative h-[400px] lg:h-auto overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSummary}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={summaryItems[currentSummary].image}
                    alt={summaryItems[currentSummary].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-10">
                <button 
                  onClick={prevSummary}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-black" />
                </button>
                <button 
                  onClick={nextSummary}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform shadow-lg"
                >
                  <ArrowRight className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>

          <ProductCarousel 
            title="New Arrivals" 
            description="The latest additions to our collection." 
            products={newArrivals} 
          />

          <ProductCarousel 
            title="Women" 
            description="Elegance meets everyday functionality." 
            products={womenProducts} 
          />

          <ProductCarousel 
            title="Men" 
            description="Engineered for the modern lifestyle." 
            products={menProducts} 
          />

          <ProductCarousel 
            title="Children" 
            description="Durable, comfortable, and stylish for the little ones." 
            products={childrenProducts} 
          />

          <ProductCarousel 
            title="Essentials" 
            description="Everyday staples under $100." 
            products={essentials} 
          />

          <ProductCarousel 
            title="Special Offers" 
            description="Exclusive deals on our signature pieces." 
            products={offerProducts} 
          />

        </div>
      </section>

      {/* Featured Collection Banner */}
      <section className="w-full h-[60svh] relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-fixed bg-cover bg-center brightness-[0.4]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557336863-b97994102380?w=2000&auto=format&fit=crop&q=60")' }}
        />
        <div className="relative z-10 text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6"
          >
            The Summer Edit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 max-w-md mx-auto mb-8"
          >
            Discover lightweight fabrics and effortless silhouettes designed for the warmest months.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <MagneticButton className="bg-white text-black px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Explore Edit
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
