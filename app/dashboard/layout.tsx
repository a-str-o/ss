"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Header } from "@/app/components/Header";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="h-full relative">
        {/* Header with mobile menu button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b md:pl-72">
          <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="relative z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <Header />
        </div>

        {/* Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transform transition-transform duration-200 ease-in-out fixed inset-y-0 left-0 z-40 w-72 bg-gray-900 md:flex md:flex-col`}
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
        <main className="md:pl-72 min-h-screen bg-gray-100 pt-16">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}
