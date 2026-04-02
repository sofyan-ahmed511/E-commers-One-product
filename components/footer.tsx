import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 px-6 md:px-12 mt-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              LUMORA<span className="text-primary">.</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-lg">
              Redefining modern contemporary clothing with minimalist aesthetics and uncompromising quality.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/collections" className="hover:text-background transition-colors">All Products</Link></li>
              <li><Link href="/collections?category=Jackets" className="hover:text-background transition-colors">Jackets</Link></li>
              <li><Link href="/collections?category=Shirts" className="hover:text-background transition-colors">Shirts</Link></li>
              <li><Link href="/collections?category=Pants" className="hover:text-background transition-colors">Pants</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-background transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-background transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LUMORA. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-background transition-colors">Instagram</a>
            <a href="#" className="hover:text-background transition-colors">Twitter</a>
            <a href="#" className="hover:text-background transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
