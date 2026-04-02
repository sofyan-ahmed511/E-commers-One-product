import { Metadata } from 'next';
import { GalleryClient } from './client';

export const metadata: Metadata = {
  title: 'Gallery & Lookbook | LUMORA',
  description: 'Explore the LUMORA visual inspiration and lookbook. Discover our latest campaigns, editorials, and styling ideas for modern minimalist clothing.',
  keywords: ['lumora lookbook', 'fashion gallery', 'minimalist style inspiration', 'clothing campaigns'],
  openGraph: {
    title: 'Gallery & Lookbook | LUMORA',
    description: 'Explore the LUMORA visual inspiration and lookbook. Discover our latest campaigns, editorials, and styling ideas for modern minimalist clothing.',
    type: 'website',
  }
};

export default function GalleryPage() {
  return <GalleryClient />;
}
