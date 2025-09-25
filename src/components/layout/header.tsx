'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { User } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { currentUser, loading } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 text-white hover:text-white/90 transition-colors">
              <Image 
                src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/BANESCO%20LOGO%20BLANCO.png"
                alt="Banesco Seguros Logo"
                width={20}
                height={20}
              />
              <span className="font-bold text-xl hidden sm:inline tracking-tighter">CONECTAD2S</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => {
                if (link.href === '/misiones') {
                  return (
                    <span
                      key={link.label}
                      className={cn(
                        'px-3 py-2 rounded-md text-xs transition-colors',
                        'font-normal text-white/40 cursor-not-allowed'
                      )}
                    >
                      {link.label}
                    </span>
                  )
                }
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-xs transition-colors',
                      pathname === link.href
                        ? 'font-bold text-white'
                        : 'font-normal text-white/70 hover:text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {loading ? (
              <>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </>
            ) : currentUser ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white">{currentUser.name}</p>
                  <p className="text-xs text-white/80">{currentUser.xp.toLocaleString()} CONECTCOINS</p>
                </div>
                <Avatar>
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
               <p className="text-sm text-white/80">No autenticado</p>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
