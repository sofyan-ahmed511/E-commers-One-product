'use client';

import { motion } from 'motion/react';
import { MagneticButton } from '@/components/magnetic-button';
import { ArrowRight } from 'lucide-react';

import Image from 'next/image';

export function ContactClient() {
  return (
    <div className="min-h-screen bg-background overflow-hidden w-full">
      <section className="relative w-full h-[50svh] min-h-[400px] flex items-center px-6 md:px-12 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center brightness-[0.3]"
          style={{ backgroundImage: 'url("https://picsum.photos/seed/lumora-contact-hero-dark/1920/1080")' }}
        />
        <div className="container mx-auto max-w-6xl relative z-10 pt-32 md:pt-40">
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
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white"
            >
              Contact
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="text-white/80 text-lg max-w-xl"
            >
              Have a question about a product, order, or just want to say hello? We&apos;re here to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6 md:px-12 bg-background relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] -mt-10 pt-16 pb-32">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium uppercase tracking-widest">Subject</label>
                <select 
                  id="subject" 
                  className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors appearance-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="press">Press & Media</option>
                  <option value="wholesale">Wholesale</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium uppercase tracking-widest">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <MagneticButton className="bg-foreground text-background py-4 rounded-full font-medium uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-colors mt-4">
                Send Message <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Customer Service</h3>
              <p className="text-muted-foreground mb-2">support@lumora.com</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
              <p className="text-muted-foreground mt-4">Monday - Friday<br/>9:00 AM - 6:00 PM EST</p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Headquarters</h3>
              <p className="text-muted-foreground">
                100 Modernist Way<br/>
                Suite 400<br/>
                New York, NY 10001<br/>
                United States
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Follow Us</h3>
              <div className="flex gap-6">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pinterest</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="mt-32 w-full h-[50svh] relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-muted bg-fixed bg-cover bg-center grayscale opacity-80"
          style={{ backgroundImage: 'url("https://picsum.photos/seed/lumora-map/1920/800")' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-background/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center pointer-events-auto max-w-sm">
              <h3 className="text-xl font-bold tracking-tighter mb-2">LUMORA Flagship</h3>
              <p className="text-muted-foreground mb-6">100 Modernist Way, New York, NY 10001</p>
              <MagneticButton className="bg-foreground text-background px-6 py-3 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-primary transition-colors">
                Get Directions
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-12 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Find quick answers to common questions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                q: "What is your return policy?",
                a: "We accept returns within 30 days of delivery for unworn, unwashed items with original tags attached."
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination."
              },
              {
                q: "How do I track my order?",
                a: "Once your order ships, you will receive a confirmation email with a tracking link."
              },
              {
                q: "Are your materials sustainable?",
                a: "We are committed to sustainability. Over 80% of our collection uses recycled or organic materials."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-border pb-6"
              >
                <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
