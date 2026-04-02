import { Metadata } from 'next';
import { CollectionsClient } from './client';
import productsData from '@/data/products.json';

export const metadata: Metadata = {
  title: 'Collections | LUMORA Premium Modern Clothing',
  description: 'Explore the LUMORA collections. Discover our full range of ultra-modern, minimalist clothing, from outerwear and tops to bottoms and accessories.',
  keywords: ['lumora collections', 'modern clothing collection', 'minimalist fashion', 'premium apparel'],
  openGraph: {
    title: 'Collections | LUMORA Premium Modern Clothing',
    description: 'Explore the LUMORA collections. Discover our full range of ultra-modern, minimalist clothing, from outerwear and tops to bottoms and accessories.',
    type: 'website',
  }
};

export default function CollectionsPage() {
  return <CollectionsClient products={productsData} />;
}
