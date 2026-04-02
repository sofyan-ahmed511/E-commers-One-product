'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { MagneticButton } from '@/components/magnetic-button';
import Link from 'next/link';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-[2/3]' },
  { id: 2, src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-square' },
  { id: 3, src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-[3/2]' },
  { id: 4, src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-[4/5]' },
  { id: 5, src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-[2/3]' },
  { id: 6, src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-[3/2]' },
  { id: 7, src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-square' },
  { id: 8, src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-[4/5]' },
  { id: 9, src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop', aspect: 'aspect-square' },
];

const editorialImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop', title: 'Summer Breeze' },
  { id: 2, src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', title: 'Urban Edge' },
  { id: 3, src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', title: 'Minimalist Core' },
];

const communityImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop', handle: '@styleicon' },
  { id: 2, src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop', handle: '@fashionforward' },
  { id: 3, src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop', handle: '@trendsetter' },
  { id: 4, src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop', handle: '@lumoralover' },
];

export function GalleryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-background overflow-hidden w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50svh] min-h-[500px] flex items-center px-6 md:px-12 overflow-hidden mb-24">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center brightness-[0.4]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=3270&auto=format&fit=crop")' }}
        />
        <div className="container mx-auto relative z-10 pt-32 md:pt-40 text-center">
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
              Lookbook
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-white/80 text-lg max-w-2xl mx-auto"
            >
              Visual inspiration from our latest campaigns, editorials, and the LUMORA community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid Section */}
      <section className="px-6 md:px-12 mb-32">
        <div className="container mx-auto">
          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Column 1 */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8">
              {[galleryImages[0], galleryImages[3], galleryImages[6]].map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative w-full ${img.aspect} rounded-2xl overflow-hidden bg-muted group`}
                >
                  <Image
                    src={img.src}
                    alt={`Gallery image ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 md:mt-24">
              {[galleryImages[1], galleryImages[4], galleryImages[7]].map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative w-full ${img.aspect} rounded-2xl overflow-hidden bg-muted group`}
                >
                  <Image
                    src={img.src}
                    alt={`Gallery image ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-8 md:mt-12">
              {[galleryImages[2], galleryImages[5], galleryImages[8]].map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative w-full ${img.aspect} rounded-2xl overflow-hidden bg-muted group`}
                >
                  <Image
                    src={img.src}
                    alt={`Gallery image ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Features */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Editorial Features</h2>
            <p className="text-muted-foreground mt-4 text-lg">Curated looks for the modern aesthetic.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorialImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight">{img.title}</h3>
                <div className="h-[1px] w-0 bg-foreground mt-4 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Spotlight */}
      <section className="py-24 px-6 md:px-12 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Community Spotlight</h2>
            <p className="text-muted-foreground mt-4 text-lg">How you wear LUMORA. Tag us to be featured.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {communityImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={`Community image by ${img.handle}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium tracking-wider">{img.handle}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes Section */}
      <section className="py-32 px-6 md:px-12 bg-foreground text-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col justify-center">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 uppercase"
              >
                Behind The <br/><span className="text-muted-foreground">Campaign.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 text-balance"
              >
                Get an exclusive look at the creative process behind our latest collections. From moodboards to the final shot, see how the LUMORA vision comes to life.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/about">
                  <MagneticButton className="border border-white/30 px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                    Discover More
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                alt="Behind the scenes"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
