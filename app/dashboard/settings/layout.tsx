import Link from "next/link";
import { Bell, User, Languages, Palette, Shield, Users, PackageOpen } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsNavItems = [
    {
      title: "Profile",
      href: "/dashboard/settings/profile",
      icon: User
    },
    {
      title: "Password",
      href: "/dashboard/settings/password",
      icon: PackageOpen
    },
    {
      title: "Notifications",
      href: "/dashboard/settings/notifications",
      icon: Bell
    },
    {
      title: "Language",
      href: "/dashboard/settings/language",
      icon: Languages
    },
    {
      title: "Appearance",
      href: "/dashboard/settings/appearance",
      icon: Palette
    },
    {
      title: "Security",
      href: "/dashboard/settings/security",
      icon: Shield
    },
    {
      title: "Workers",
      href: "/dashboard/settings/workers",
      icon: Users
    }
  ];

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {settingsNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
                    item.href === "/dashboard/settings/profile"
                      ? "bg-gray-100"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 mr-2`} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
