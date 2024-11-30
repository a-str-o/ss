"use client";

import { Bell, Search, User } from 'lucide-react'
import { useLanguage, useTranslation } from '../contexts/LanguageContext'
import Link from 'next/link';

export function Header() {
  const { isRtl } = useLanguage();
  const t = useTranslation();

  return (
    <div className={`flex items-center p-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
      {/* Left side spacing for mobile menu */}
      <div className="w-12 md:hidden" />

      {/* Logo - visible on mobile and desktop */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <h1 className="text-xl font-bold hidden md:block">
            SMMP
          </h1>
          <h1 className="text-xl font-bold md:hidden">
            SMMP
          </h1>
        </Link>
      </div>

      <div className={`flex-1 ${isRtl ? 'ml-4 mr-8' : 'ml-8 mr-4'} flex justify-center`}>
        <div className="relative w-full max-w-xl">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRtl ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            placeholder={t?.search}
            className={`w-full py-2 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${
              isRtl ? 'text-right pr-10 pl-4' : 'text-left pl-10 pr-4'
            }`}
          />
        </div>
      </div>

      <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
