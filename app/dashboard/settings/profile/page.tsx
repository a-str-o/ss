"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { useLanguage, useTranslation } from "@/app/contexts/LanguageContext";

export default function ProfileSettings() {
  const { isRtl } = useLanguage();
  const t = useTranslation();
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    bio: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="p-6">
      <div className={`space-y-8 ${isRtl ? "rtl" : "ltr"}`}>
        <div>
          <h3 className={`text-lg font-medium ${isRtl ? "text-right" : "text-left"}`}>
            {t.profileSettings || "Profile Settings"}
          </h3>
          <p className={`text-sm text-muted-foreground mt-2 ${isRtl ? "text-right" : "text-left"}`}>
            {t.profileSettingsDescription || "Update your profile information"}
          </p>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src="/placeholder-avatar.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className={`${isRtl ? "mr-6" : "ml-6"}`}>
            <h4 className="font-medium">{t.profilePicture || "Profile Picture"}</h4>
            <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
              {t.changePhoto || "Change Photo"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {t.firstName || "First Name"}
            </label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
            />
          </div>
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {t.lastName || "Last Name"}
            </label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
            />
          </div>
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {t.email || "Email"}
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
            />
          </div>
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {t.phone || "Phone Number"}
            </label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className={`text-sm font-medium ${isRtl ? "block text-right" : "block text-left"}`}>
              {t.bio || "Bio"}
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              rows={4}
              className={`w-full p-2 border rounded-md ${isRtl ? "text-right" : "text-left"}`}
              placeholder={t.bioPlaceholder || "Write a short bio about yourself..."}
            />
          </div>
        </div>

        <div className={`pt-4 ${isRtl ? "text-left" : "text-right"}`}>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t.saveChanges || "Save Changes"}
          </button>
        </div>
      </div>
    </Card>
  );
}
