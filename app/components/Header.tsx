"use client";

import { Bell, Search, User, LogOut } from 'lucide-react'
import { useLanguage, useTranslation } from '../contexts/LanguageContext'
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export function Header() {
  const { isRtl } = useLanguage();
  const t = useTranslation();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={`flex items-center p-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
      {/* Left side spacing for mobile menu */}
      <div className="w-8 md:hidden" />

      {/* Logo - visible on mobile and desktop */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <h1 className="text-lg font-bold hidden md:block">
            SMMP
          </h1>
          <h1 className="text-lg font-bold md:hidden">
            SMMP
          </h1>
        </Link>
      </div>

      <div className={`flex-1 ${isRtl ? 'ml-2 mr-4' : 'ml-4 mr-2'} flex justify-center`}>
        <div className="relative w-full max-w-xl">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground ${isRtl ? 'right-2' : 'left-2'}`} />
          <input
            type="text"
            placeholder={t?.search}
            className={`w-full py-1 text-sm bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${
              isRtl ? 'text-right pr-8 pl-3' : 'text-left pl-8 pr-3'
            }`}
          />
        </div>
      </div>

      <div className={`flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button className="relative p-1.5 hover:bg-gray-100 rounded-full">
          <Bell className="h-4 w-4" />
          <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-red-500 rounded-full" />
        </button>
        
        <button className="p-1.5 hover:bg-gray-100 rounded-full">
          <User className="h-4 w-4" />
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSignOut}
          className="p-1.5 hover:bg-gray-100 rounded-full"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
