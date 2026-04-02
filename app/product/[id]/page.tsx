import { Metadata } from 'next';
import { ProductDetailClient } from './client';
import productsData from '@/data/products.json';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find(p => p.id === id);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | LUMORA Premium Clothing`,
    description: product.description,
    keywords: [product.name, product.category, 'lumora clothing', 'premium apparel', 'minimalist fashion'],
    openGraph: {
      title: `${product.name} | LUMORA Premium Clothing`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: product.name,
        }
      ],
      type: 'website',
    }
  };
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
