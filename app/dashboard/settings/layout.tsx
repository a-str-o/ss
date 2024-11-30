"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, useTranslation } from "../../contexts/LanguageContext";
import { 
  KeyRound, 
  Bell, 
  Languages, 
  Palette, 
  Shield, 
  User,
  PackageOpen,
  Users
} from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isRtl, language } = useLanguage();
  const t = useTranslation();

  const settingsNavItems = [
    {
      title: t.profile || "Profile",
      titleAr: "الملف الشخصي",
      titleFr: "Profil",
      href: "/dashboard/settings/profile",
      icon: User
    },
    {
      title: t.password || "Password",
      titleAr: "كلمة المرور",
      titleFr: "Mot de passe",
      href: "/dashboard/settings/password",
      icon: KeyRound
    },
    {
      title: t.notifications || "Notifications",
      titleAr: "الإشعارات",
      titleFr: "Notifications",
      href: "/dashboard/settings/notifications",
      icon: Bell
    },
    {
      title: t.language || "Language",
      titleAr: "اللغة",
      titleFr: "Langue",
      href: "/dashboard/settings/language",
      icon: Languages
    },
    {
      title: t.appearance || "Appearance",
      titleAr: "المظهر",
      titleFr: "Apparence",
      href: "/dashboard/settings/appearance",
      icon: Palette
    },
    {
      title: t.security || "Security",
      titleAr: "الأمان",
      titleFr: "Sécurité",
      href: "/dashboard/settings/security",
      icon: Shield
    },
    {
      title: t.workers || "Workers",
      titleAr: "العاملين",
      titleFr: "Travailleurs",
      href: "/dashboard/settings/workers",
      icon: Users
    }
  ];

  const getLocalizedTitle = (item: typeof settingsNavItems[0]) => {
    switch (language) {
      case "ar":
        return item.titleAr;
      case "fr":
        return item.titleFr;
      default:
        return item.title;
    }
  };

  return (
    <div className={`space-y-6 ${isRtl ? "rtl" : "ltr"}`}>
      <div className="space-y-0.5">
        <h2 className={`text-2xl font-bold tracking-tight ${isRtl ? "text-right" : "text-left"}`}>
          {t.settings || "Settings"}
        </h2>
        <p className={`text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}>
          {t.settingsDescription || "Manage your account settings and preferences"}
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className={`lg:w-1/5 ${isRtl ? "lg:ml-12 lg:space-x-0" : "lg:space-x-12"}`}>
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {settingsNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center ${isRtl ? "flex-row-reverse" : ""} w-full rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
                    pathname === item.href
                      ? "bg-gray-100"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`} />
                  {getLocalizedTitle(item)}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
