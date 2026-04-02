'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { MagneticButton } from '@/components/magnetic-button';
import Link from 'next/link';

export function AboutClient() {
  return (
    <div className="min-h-screen bg-background overflow-hidden w-full">
      {/* Hero */}
      <section className="relative w-full h-[60svh] min-h-[600px] flex items-center px-6 md:px-12 mb-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center brightness-[0.4]"
          style={{ backgroundImage: 'url("https://picsum.photos/seed/lumora-about-hero-dark/1920/1080")' }}
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
            className="max-w-4xl"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-sm font-medium tracking-widest text-white/60 uppercase mb-4"
            >
              Project Name: LUMORA
            </motion.h2>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-white"
            >
              DESIGNED FOR <br className="hidden md:block" />
              <span className="text-white/70">TOMORROW.</span>
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-xl md:text-2xl text-white/80 leading-relaxed text-balance"
            >
              <strong className="text-white">LUMORA</strong> is an ultra-modern, minimalist, high-quality contemporary clothing brand designed for the future of everyday wear. We were founded on a simple principle: clothing should empower the wearer through uncompromising quality, minimalist aesthetics, and functional design.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Image Full Width */}
      <section className="w-full h-[60dvh] md:h-[80dvh] relative mb-32 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] -mt-10 z-20 overflow-hidden bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: 'url("https://picsum.photos/seed/lumora-about-hero/1920/1080")' }}
        />
      </section>

      {/* Content Grid */}
      <section className="px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We reject the cycle of fast fashion. Instead, we focus on creating timeless pieces that transcend seasonal trends. Every garment is a study in reduction—removing the unnecessary until only the essential remains.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This minimalist approach allows the quality of our materials and the precision of our tailoring to take center stage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Materials & Craft</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We source our fabrics from the world&apos;s most innovative mills, prioritizing sustainability and performance. From water-resistant technical shells to ultra-dense organic cottons, our materials are chosen for their durability and feel.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each piece is constructed by skilled artisans who share our obsession with detail, ensuring that a LUMORA garment looks as good on the inside as it does on the outside.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-32 px-6 md:px-12 bg-muted/30 mt-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">The LUMORA Process</h2>
            <p className="text-lg text-muted-foreground">From concept to creation, every step is intentional.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: '01. Ideation',
                desc: 'We begin by identifying a need. What is missing from the modern wardrobe? We sketch, prototype, and refine until the silhouette is perfect.'
              },
              {
                title: '02. Sourcing',
                desc: 'We travel globally to find materials that meet our strict standards for durability, feel, and environmental impact.'
              },
              {
                title: '03. Construction',
                desc: 'Working with master tailors, we construct garments designed to last decades, not seasons. Every seam is reinforced.'
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-background p-10 rounded-3xl shadow-sm border border-border/50"
              >
                <h3 className="text-2xl font-bold tracking-tighter mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-foreground text-background text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8"
          >
            Experience the Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-12"
          >
            Explore our latest collection and discover the future of everyday wear.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Link href="/collections">
              <MagneticButton className="bg-background text-foreground px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300">
                Shop Collection
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
