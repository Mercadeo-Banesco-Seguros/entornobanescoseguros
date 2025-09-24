'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 text-white hover:text-white/90 transition-colors">
              <Logo />
              <span className="font-bold text-2xl hidden sm:inline tracking-wider">CONECTAD2S</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-base font-bold transition-colors',
                     'hover:text-white/80'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            {/* Mobile menu could be a dropdown here */}
          </div>
        </div>
      </nav>
    </header>
  );
}