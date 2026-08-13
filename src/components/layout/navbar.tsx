'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-[#003B73] rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl border border-white/10 max-w-fit overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 group whitespace-nowrap',
                  isActive 
                    ? 'bg-[#004B8D] text-white' 
                    : 'text-white/70 hover:text-white'
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white/70 group-hover:text-white")} />
                {isActive && (
                  <span className="text-sm font-semibold">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Separador vertical */}
        <div className="h-6 w-[1px] bg-white/20 mx-3 hidden sm:block" />

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2 text-white/70 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-white/70 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full border-2 border-[#003B73]" />
          </button>
          <div className="ml-2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 text-white text-xs font-bold cursor-pointer hover:bg-white/20 transition-colors shrink-0">
            RD
          </div>
        </div>
      </nav>
    </div>
  );
}
