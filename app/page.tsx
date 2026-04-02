'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, animate, useMotionValue } from 'motion/react';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';
import { ProductCard } from '@/components/product-card';
import productsData from '@/data/products.json';
import { formatPrice } from '@/lib/utils';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuredProducts = productsData.filter(p => p.featured).slice(0, 3);
  const carouselProducts = productsData;

  // Carousel Drag Logic
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
    // Small delay to ensure images are loaded
    setTimeout(updateWidth, 500);
    
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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

  const [currentSummary, setCurrentSummary] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSummary((prev) => (prev + 1) % summaryItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [summaryItems.length]);

  const nextSummary = () => setCurrentSummary((prev) => (prev + 1) % summaryItems.length);
  const prevSummary = () => setCurrentSummary((prev) => (prev - 1 + summaryItems.length) % summaryItems.length);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden px-6">
        <motion.div 
          style={{ 
            opacity, 
            backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=3270&auto=format&fit=crop")' 
          }}
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center brightness-[0.7]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        </motion.div>

        <div className="container relative z-10 mx-auto flex flex-col items-center text-center mt-20">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 2.5,
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="glass-dark px-4 py-2 rounded-full mb-8 flex items-center gap-2"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border border-white/20 overflow-hidden relative">
                    <Image src={`https://picsum.photos/seed/avatar${i}/100/100`} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-white text-xs font-medium ml-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>100k+ Happy homes</span>
              </div>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6"
            >
              REDEFINE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                MODERN
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-lg md:text-xl text-white/80 max-w-xl mb-10 text-balance"
            >
              Ultra-modern, minimalist contemporary clothing designed for the future of everyday wear.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <Link href="/collections">
                <MagneticButton className="bg-white text-black px-8 py-4 rounded-full font-medium uppercase tracking-widest flex items-center gap-3 hover:bg-primary hover:text-white transition-colors duration-300">
                  Shop Collection <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6 md:px-12 bg-background relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] -mt-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Featured Pieces</h2>
              <p className="text-muted-foreground text-lg max-w-md">Curated selection of our most iconic silhouettes.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link href="/collections" className="group flex items-center gap-2 font-medium uppercase tracking-widest text-sm">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="py-32 px-6 md:px-12 bg-foreground text-background overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://picsum.photos/seed/lumora-ethos/1000/1200"
                alt="Lumora Design Ethos"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <div className="flex flex-col justify-center">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold tracking-tighter mb-8"
              >
                FORM FOLLOWS <br/><span className="text-muted-foreground">FUNCTION.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 text-balance"
              >
                We believe that true luxury lies in the absence of the unnecessary. Every stitch, every seam, and every fabric choice is meticulously engineered to serve a purpose.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/about">
                  <MagneticButton className="border border-white/30 px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                    Our Story
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section (Carousel) */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] bg-[#F4F4F4] min-h-[600px]">
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
        </div>
      </section>

      {/* Featured Products Carousel (From Image) */}
      <section className="py-24 px-6 md:px-12 bg-background overflow-hidden">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
            >
              Featured Products
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
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
              <Link href="/collections" className="font-bold underline underline-offset-4 hover:text-primary transition-colors text-lg">
                See All
              </Link>
            </motion.div>
          </div>

          <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
            <motion.div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -carouselWidth }}
                style={{ x }}
                className="flex gap-6 pb-8"
              >
                {carouselProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className="min-w-[280px] md:min-w-[350px] flex-shrink-0"
                  >
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
