import { Metadata } from 'next';
import { CheckoutClient } from './client';

export const metadata: Metadata = {
  title: 'Checkout | LUMORA',
  description: 'Complete your purchase securely.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
