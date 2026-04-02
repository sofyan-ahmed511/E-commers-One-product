import { Metadata } from 'next';
import { AboutClient } from './client';

export const metadata: Metadata = {
  title: 'About LUMORA | Our Story & Design Philosophy',
  description: 'Discover the story behind LUMORA. We are dedicated to creating ultra-modern, minimalist, and high-quality contemporary clothing designed for the future of everyday wear.',
  keywords: ['about lumora', 'lumora story', 'minimalist clothing brand', 'modern fashion design'],
  openGraph: {
    title: 'About LUMORA | Our Story & Design Philosophy',
    description: 'Discover the story behind LUMORA. We are dedicated to creating ultra-modern, minimalist, and high-quality contemporary clothing designed for the future of everyday wear.',
    type: 'website',
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
