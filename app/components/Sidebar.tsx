"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart,
  Users,
  Settings,
  Boxes,
  UserCircle,
  X
} from "lucide-react";
import { useLanguage, useTranslation } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isRtl } = useLanguage();
  const t = useTranslation();

  const routes = [
    {
      label: t.dashboard,
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: t.analytics,
      icon: BarChart,
      color: "text-emerald-500",
      href: "/dashboard/analytics",
    },
    {
      label: t.stock,
      icon: Boxes,
      color: "text-pink-700",
      href: "/dashboard/stock",
    },
    {
      label: t.Products,
      icon: Package,
      href: "/dashboard/Products",
      color: "text-violet-500",
    },
    
    {
      label: t.workers,
      icon: UserCircle,
      color: "text-blue-500",
      href: "/dashboard/workers",
    },
    
    {
      label: t.suppliers,
      icon: Users,
      color: "text-pink-700",
      href: "/dashboard/suppliers",
    },
    {
      label: t.orders,
      icon: ClipboardList,
      color: "text-orange-700",
      href: "/dashboard/orders",
    },
    {
      label: t.settings,
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div className={`space-y-4 py-4 flex flex-col h-full ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="px-3 py-2">
        <div className="flex items-center justify-end pl-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={onClose}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-gray-400",
                isRtl ? "flex-row-reverse" : ""
              )}
            >
              <div className={`flex items-center flex-1 ${isRtl ? "flex-row-reverse" : ""}`}>
                <route.icon className={`h-5 w-5 ${route.color} ${isRtl ? "ml-3" : "mr-3"}`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
