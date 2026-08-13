'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-[#003B73]/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-0.5 shadow-2xl border border-white/10 max-w-fit overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-200 group whitespace-nowrap',
                  isActive 
                    ? 'bg-[#FFFFFF]/10 text-white' 
                    : 'text-white/60 hover:text-white'
                )}
              >
                <Icon 
                  className={cn("w-3 h-3", isActive ? "text-white" : "text-white/60 group-hover:text-white")} 
                  strokeWidth={1.5}
                />
                {isActive && (
                  <span className="text-[9px] font-light tracking-tight">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Separador vertical */}
        <div className="h-3 w-[1px] bg-white/10 mx-2 hidden sm:block" />

        <div className="flex items-center gap-0.5 sm:gap-1 px-1">
          <button className="p-1.5 text-white/60 hover:text-white transition-colors">
            <Search className="w-3 h-3" strokeWidth={1.5} />
          </button>
          <button className="p-1.5 text-white/60 hover:text-white transition-colors relative">
            <Bell className="w-3 h-3" strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white font-light">
              4
            </span>
          </button>
          <button className="p-1.5 text-white/60 hover:text-white transition-colors">
            <User className="w-3 h-3" strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </div>
  );
}
