'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-[#003B73] rounded-full px-2.5 py-1 flex items-center gap-0.5 shadow-2xl border border-white/10 max-w-fit overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 group whitespace-nowrap',
                  isActive 
                    ? 'bg-[#004B8D] text-white' 
                    : 'text-white/70 hover:text-white'
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-white/70 group-hover:text-white")} />
                {isActive && (
                  <span className="text-[11px] font-semibold">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Separador vertical */}
        <div className="h-4 w-[1px] bg-white/20 mx-2 hidden sm:block" />

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button className="p-1.5 text-white/70 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-white/70 hover:text-white transition-colors relative">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full border border-[#003B73]" />
          </button>
          <div className="ml-1 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-white/10 text-white text-[10px] font-bold cursor-pointer hover:bg-white/20 transition-colors shrink-0">
            RD
          </div>
        </div>
      </nav>
    </div>
  );
}
