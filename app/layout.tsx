import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { CustomCursor } from '@/components/custom-cursor';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Preloader } from '@/components/preloader';
import { ClientLayout } from '@/components/client-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUMORA | Premium Modern Clothing',
  description: 'Ultra-modern, minimalist, high-quality contemporary clothing designed for the future of everyday wear.',
  keywords: ['fashion', 'clothing', 'modern', 'minimalist', 'premium', 'lumora', 'ecommerce'],
  authors: [{ name: 'Lumora Team' }],
  creator: 'Lumora',
  publisher: 'Lumora',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'LUMORA | Premium Modern Clothing',
    description: 'Ultra-modern, minimalist, high-quality contemporary clothing designed for the future of everyday wear.',
    url: 'https://lumora.com',
    siteName: 'LUMORA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&h=630&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Lumora Premium Clothing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUMORA | Premium Modern Clothing',
    description: 'Ultra-modern, minimalist, high-quality contemporary clothing.',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&h=630&auto=format&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth overflow-x-hidden`}>
      <body
        className="font-sans antialiased bg-[#F9F8F6] text-[#1A1A1A] selection:bg-[#2C3E2D] selection:text-white min-h-screen flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        <ClientLayout>
          <Preloader />
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <CartDrawer />
            <main className="flex-grow overflow-x-hidden w-full">{children}</main>
            <Footer />
          </SmoothScroll>
        </ClientLayout>
      </body>
    </html>
  );
}
