"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Header } from "@/app/components/Header";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>;
  }

  if (!user) {
    return null;
  }

  return (
    <LanguageProvider>
      <div className="h-full relative">
        {/* Header with mobile menu button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b md:pl-64 h-12">
          <div className="md:hidden absolute left-2 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="relative z-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <Header />
        </div>

        {/* Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transform transition-transform duration-200 ease-in-out fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 md:flex md:flex-col`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="pt-12 md:pl-64">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}
