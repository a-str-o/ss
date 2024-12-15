"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function NotificationSettings() {
  const { isRtl } = useLanguage();

  const notificationSettings = [
    {
      id: "email",
      title: "Email Notifications",
      titleAr: "إشعارات البريد الإلكتروني",
      description: "Receive email notifications for important updates",
      descriptionAr: "تلقي إشعارات البريد الإلكتروني للتحديثات المهمة",
    },
    {
      id: "stock",
      title: "Low Stock Alerts",
      titleAr: "تنبيهات المخزون المنخفض",
      description: "Get notified when products are running low",
      descriptionAr: "الحصول على إشعار عندما تكون المنتجات على وشك النفاد",
    },
    {
      id: "orders",
      title: "Order Updates",
      titleAr: "تحديثات الطلبات",
      description: "Receive notifications for new and updated orders",
      descriptionAr: "تلقي إشعارات للطلبات الجديدة والمحدثة",
    },
  ];

  return (
    <Card className="p-6">
      <div className={`space-y-6 ${isRtl ? "rtl" : "ltr"}`}>
        <div>
          <h3 className={`text-lg font-medium ${isRtl ? "text-right" : "text-left"}`}>
            {isRtl ? "إعدادات الإشعارات" : "Notification Settings"}
          </h3>
          <p className={`text-sm text-muted-foreground mt-2 ${isRtl ? "text-right" : "text-left"}`}>
            {isRtl 
              ? "قم بتخصيص كيفية تلقي الإشعارات من النظام"
              : "Customize how you receive notifications from the system"}
          </p>
        </div>

        <div className="space-y-4">
          {notificationSettings.map((setting) => (
            <div
              key={setting.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                isRtl ? "flex-row-reverse" : ""
              }`}
            >
              <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
                <h4 className="font-medium">
                  {isRtl ? setting.titleAr : setting.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isRtl ? setting.descriptionAr : setting.description}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>

        <div className={`pt-4 ${isRtl ? "text-left" : "text-right"}`}>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isRtl ? "حفظ التغييرات" : "Save Changes"}
          </button>
        </div>
      </div>
    </Card>
  );
}
