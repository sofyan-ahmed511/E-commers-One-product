import { Metadata } from 'next';
import { ContactClient } from './client';

export const metadata: Metadata = {
  title: 'Contact Us | LUMORA',
  description: 'Get in touch with the LUMORA team. Have a question about a product, order, or just want to say hello? We are here to help.',
  keywords: ['contact lumora', 'customer support', 'lumora help'],
  openGraph: {
    title: 'Contact Us | LUMORA',
    description: 'Get in touch with the LUMORA team. Have a question about a product, order, or just want to say hello? We are here to help.',
    type: 'website',
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
