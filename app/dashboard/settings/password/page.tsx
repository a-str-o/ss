"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function PasswordSettings() {
  const [isRtl, setIsRtl] = useState(() => localStorage.getItem("language") === "ar");

  return (
    <Card className="p-6">
      <div className={`space-y-6 ${isRtl ? "rtl" : "ltr"}`}>
        <div>
          <h3 className={`text-lg font-medium ${isRtl ? "text-right" : "text-left"}`}>
            {isRtl ? "تغيير كلمة المرور" : "Change Password"}
          </h3>
          <p className={`text-sm text-muted-foreground mt-2 ${isRtl ? "text-right" : "text-left"}`}>
            {isRtl 
              ? "قم بتحديث كلمة المرور الخاصة بك لضمان أمان حسابك"
              : "Update your password to keep your account secure"}
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {isRtl ? "كلمة المرور الحالية" : "Current Password"}
            </label>
            <input
              type="password"
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
              placeholder={isRtl ? "أدخل كلمة المرور الحالية" : "Enter current password"}
            />
          </div>
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {isRtl ? "كلمة المرور الجديدة" : "New Password"}
            </label>
            <input
              type="password"
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
              placeholder={isRtl ? "أدخل كلمة المرور الجديدة" : "Enter new password"}
            />
          </div>
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {isRtl ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password"}
            </label>
            <input
              type="password"
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
              placeholder={isRtl ? "أدخل تأكيد كلمة المرور" : "Confirm new password"}
            />
          </div>
          <div className={`pt-4 ${isRtl ? "text-left" : "text-right"}`}>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {isRtl ? "حفظ التغييرات" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}
